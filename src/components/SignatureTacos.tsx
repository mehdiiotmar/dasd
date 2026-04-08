const tacos = [
  {
    id: 1,
    name: 'Beef Legend',
    description: 'Viande hachée épicée, sauce samouraï, fromage fondant',
    price: '35 DH',
    meat: 'Steak',
    sauce: 'Samurai',
    image: 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: 2,
    name: 'Le Classik',
    description: 'Poulet grillé, sauce blanche, crudités fraîches',
    price: '30 DH',
    meat: 'Poulet',
    sauce: 'Fromagère',
    image: 'https://images.pexels.com/photos/7613568/pexels-photo-7613568.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false
  },
  {
    id: 3,
    name: 'Pinky Blindé',
    description: 'Mix viandes, double fromage, sauce pink pepper',
    price: '45 DH',
    meat: 'Mix Viandes',
    sauce: 'Barbecue',
    image: 'https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: true
  },
  {
    id: 4,
    name: 'Street Fusion',
    description: 'Kefta maison, sauce harissa crémeuse, oignons caramélisés',
    price: '38 DH',
    meat: 'Kefta',
    sauce: 'Harissa',
    image: 'https://images.pexels.com/photos/4958642/pexels-photo-4958642.jpeg?auto=compress&cs=tinysrgb&w=800',
    popular: false
  }
];

import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SignatureTacosProps {
  onOpenOrderModal: () => void;
}

const SignatureTacos = ({ onOpenOrderModal }: SignatureTacosProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section className="signature-tacos" id="menu" ref={sectionRef}>
      <div className="section-container">
        <div className={`section-header section-animate ${isVisible ? 'visible' : ''}`}>
          <span className="section-badge">Nos Signatures</span>
          <h2 className="section-title">
            Les <span className="text-gradient">Incontournables</span>
          </h2>
          <p className="section-subtitle">
            Nos créations les plus populaires, pensées pour les vrais amateurs
          </p>
        </div>

        <div className="tacos-grid">
          {tacos.map((taco, index) => (
            <div
              key={taco.id}
              className={`taco-card taco-card-animate ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {taco.popular && (
                <div className="taco-badge">Populaire</div>
              )}
              <div className="taco-image">
                <img src={taco.image} alt={taco.name} loading="lazy" />
                <div className="taco-overlay">
                  <button
                    className="btn-order"
                    onClick={() => {
                      const message = `🌮 *COMMANDE NEW SCHOOL TACOS*\n\n*${taco.name}*\n${taco.description}\n\n💰 Prix: ${taco.price}\n📍 Localisation: New School Tacos, Casablanca\n\nJe souhaite commander!`;
                      const whatsappUrl = `https://wa.me/212653129843?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                  >
                    Commander
                  </button>
                </div>
              </div>
              <div className="taco-info">
                <div className="taco-header">
                  <h3>{taco.name}</h3>
                  <span className="taco-price">{taco.price}</span>
                </div>
                <p className="taco-description">{taco.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureTacos;
