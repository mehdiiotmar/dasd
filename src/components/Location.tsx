import { useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Location = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  const handleGoogleMapsNavigation = () => {
    const destination = "Q5GW+R5C, Ave Mohammed V, Tangier 90000, Morocco";
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleWhatsAppOrder = () => {
    const message = "Bonjour! Je souhaite commander des tacos.";
    const whatsappUrl = `https://wa.me/212653129843?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="location" ref={sectionRef}>
      <div className="section-container">
        <div className={`section-header section-animate ${isVisible ? 'visible' : ''}`}>
          <span className="section-badge">Viens nous voir</span>
          <h2 className="section-title">
            Notre <span className="text-gradient">Localisation</span>
          </h2>
          <p className="section-subtitle">
            Retrouve-nous à Tanger pour déguster nos tacos
          </p>
        </div>

        <div className={`location-map-wrapper section-animate ${isVisible ? 'visible' : ''}`}>
          <div className="location-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.8963574!2d-5.824!3d35.777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQ2JzM3LjIiTiA1wrA0OScyNi40Ilc!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="New School Tacos Location - Q5GW+R5C, Ave Mohammed V, Tangier"
            ></iframe>
          </div>

          <div className="location-info-card">
            <div className="location-address">
              <div className="address-icon">📍</div>
              <div className="address-text">
                <h3>Notre Adresse</h3>
                <p>Q5GW+R5C, Ave Mohammed V</p>
                <p>Tangier 90000, Morocco</p>
              </div>
            </div>

            <div className="location-buttons">
              <button
                className="btn btn-maps"
                onClick={handleGoogleMapsNavigation}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                </svg>
                <span>Itinéraire Google Maps</span>
              </button>

              <button
                className="btn btn-whatsapp-order"
                onClick={handleWhatsAppOrder}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
                </svg>
                <span>Commander sur WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
