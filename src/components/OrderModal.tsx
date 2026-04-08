import { useState } from 'react';
import { createOrder, generateWhatsAppMessage } from '../lib/supabase';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMeat?: string;
  preselectedSauce?: string;
}

const sizes = [
  { name: 'M', price: 30 },
  { name: 'L', price: 35 },
  { name: 'XL', price: 45 }
];

const meats = [
  'Poulet',
  'Steak',
  'Kefta',
  'Mix Viandes',
  'Cordon Bleu',
  'Merguez'
];

const sauces = [
  'Fromagère',
  'Algérienne',
  'Barbecue',
  'Samurai',
  'Andalouse',
  'Harissa'
];

const extras = [
  { name: 'Fromage', price: 5 },
  { name: 'Frites', price: 5 },
  { name: 'Oignons', price: 3 },
  { name: 'Jalapeños', price: 5 },
  { name: 'Champignons', price: 5 },
  { name: 'Oeuf', price: 5 }
];

export default function OrderModal({ isOpen, onClose, preselectedMeat = '', preselectedSauce = '' }: OrderModalProps) {
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedMeat, setSelectedMeat] = useState(preselectedMeat);
  const [selectedSauce, setSelectedSauce] = useState(preselectedSauce);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const toggleExtra = (extraName: string) => {
    setSelectedExtras(prev =>
      prev.includes(extraName)
        ? prev.filter(e => e !== extraName)
        : [...prev, extraName]
    );
  };

  const calculateTotal = () => {
    const sizePrice = sizes.find(s => s.name === selectedSize)?.price || 35;
    let extrasTotal = 0;
    selectedExtras.forEach(extraName => {
      const extra = extras.find(e => e.name === extraName);
      if (extra) extrasTotal += extra.price;
    });
    return (sizePrice + extrasTotal) * quantity;
  };

  const handleSubmit = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !selectedMeat || !selectedSauce || !deliveryAddress.trim()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        customer_name: customerName.trim(),
        customer_phone: customerPhone.trim(),
        delivery_address: deliveryAddress.trim(),
        size: selectedSize,
        meat: selectedMeat,
        sauce: selectedSauce,
        extras: selectedExtras,
        quantity: quantity,
        special_instructions: specialInstructions.trim(),
        total_price: calculateTotal()
      };

      console.log('Creating order with data:', orderData);
      const order = await createOrder(orderData);
      console.log('Order created:', order);

      if (order && order.order_number) {
        const message = generateWhatsAppMessage(orderData, order.order_number);
        const whatsappUrl = `https://wa.me/212653129843?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

        resetForm();
        onClose();
      } else {
        throw new Error('Numéro de commande non reçu');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      alert(`Erreur: ${errorMessage}. Veuillez réessayer.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setCustomerName('');
    setCustomerPhone('');
    setDeliveryAddress('');
    setSelectedSize('L');
    setSelectedMeat(preselectedMeat);
    setSelectedSauce(preselectedSauce);
    setSelectedExtras([]);
    setQuantity(1);
    setSpecialInstructions('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>×</button>

        <div className="modal-header">
          <h2>Créer votre commande</h2>
          <div className="modal-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>2</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>3</div>
            <div className="step-line"></div>
            <div className={`step ${step >= 4 ? 'active' : ''}`}>4</div>
          </div>
        </div>

        <div className="modal-body">
          {step === 1 && (
            <div className="modal-step">
              <h3>Vos informations</h3>
              <div className="form-group">
                <label>Nom complet *</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Votre nom"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Numéro de téléphone *</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+212 6XX XXX XXX"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Adresse de livraison *</label>
                <textarea
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Votre adresse complète pour la livraison"
                  className="form-textarea"
                  rows={3}
                />
              </div>
              <button
                className="btn btn-primary btn-full"
                onClick={() => setStep(2)}
                disabled={!customerName || !customerPhone || !deliveryAddress}
              >
                Continuer
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="modal-step">
              <h3>Choisissez la taille</h3>

              <div className="form-section">
                <label className="section-label">Taille *</label>
                <div className="selection-grid">
                  {sizes.map((size) => (
                    <button
                      key={size.name}
                      className={`selection-item ${selectedSize === size.name ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size.name)}
                    >
                      <span style={{ fontSize: '1.5rem', fontWeight: '900' }}>{size.name}</span>
                      <span style={{ fontSize: '1rem', color: '#ff2c92', fontWeight: '700' }}>{size.price} DH</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setStep(1)}>
                  Retour
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(3)}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="modal-step">
              <h3>Choisissez votre tacos</h3>

              <div className="form-section">
                <label className="section-label">Viande *</label>
                <div className="selection-grid">
                  {meats.map((meat) => (
                    <button
                      key={meat}
                      className={`selection-item ${selectedMeat === meat ? 'selected' : ''}`}
                      onClick={() => setSelectedMeat(meat)}
                    >
                      {meat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <label className="section-label">Sauce *</label>
                <div className="selection-grid">
                  {sauces.map((sauce) => (
                    <button
                      key={sauce}
                      className={`selection-item ${selectedSauce === sauce ? 'selected' : ''}`}
                      onClick={() => setSelectedSauce(sauce)}
                    >
                      {sauce}
                    </button>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setStep(2)}>
                  Retour
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => setStep(4)}
                  disabled={!selectedMeat || !selectedSauce}
                >
                  Continuer
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="modal-step">
              <h3>Personnalisez votre tacos</h3>

              <div className="form-section">
                <label className="section-label">Extras</label>
                <div className="extras-grid">
                  {extras.map((extra) => (
                    <button
                      key={extra.name}
                      className={`extra-item ${selectedExtras.includes(extra.name) ? 'selected' : ''}`}
                      onClick={() => toggleExtra(extra.name)}
                    >
                      <span>{extra.name}</span>
                      <span className="extra-price">+{extra.price} DH</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Quantité</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ width: '48px', height: '48px', padding: '0' }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="form-input"
                    style={{ textAlign: 'center', maxWidth: '80px' }}
                    min="1"
                  />
                  <button
                    className="btn btn-secondary"
                    onClick={() => setQuantity(quantity + 1)}
                    style={{ width: '48px', height: '48px', padding: '0' }}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Instructions spéciales</label>
                <textarea
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Allergies, préférences, etc."
                  className="form-textarea"
                  rows={3}
                />
              </div>

              <div className="order-summary">
                <h4>Récapitulatif</h4>
                <div className="summary-item">
                  <span>Tacos {selectedSize}</span>
                  <span>{sizes.find(s => s.name === selectedSize)?.price} DH</span>
                </div>
                {quantity > 1 && (
                  <div className="summary-item">
                    <span>Quantité</span>
                    <span>x{quantity}</span>
                  </div>
                )}
                {selectedExtras.map((extraName) => {
                  const extra = extras.find(e => e.name === extraName);
                  return (
                    <div key={extraName} className="summary-item">
                      <span>{extraName}</span>
                      <span>+{extra?.price} DH</span>
                    </div>
                  );
                })}
                <div className="summary-total">
                  <span>Total</span>
                  <span>{calculateTotal()} DH</span>
                </div>
              </div>

              <div className="modal-actions">
                <button className="btn btn-secondary" onClick={() => setStep(3)}>
                  Retour
                </button>
                <button
                  className="btn btn-primary btn-whatsapp-submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Envoi...'
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Commander sur WhatsApp
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
