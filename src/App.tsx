import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import SignatureTacos from './components/SignatureTacos';
import CustomizeTacos from './components/CustomizeTacos';
import StreetExperience from './components/StreetExperience';
import OrderNow from './components/OrderNow';
import Location from './components/Location';
import OrderModal from './components/OrderModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import './components/OrderModal.css';
import './index.css';
import React from 'react';

export default function App(): JSX.Element {
  return <div>App</div>;
}
function App() {
  const [scrolled, setScrolled] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-logo">NEW SCHOOL TACOS</div>
          <div className="nav-links">
            <a href="#menu">Menu</a>
            <a href="#custom">Créer</a>
            <a href="#order" className="nav-cta">Commander</a>
          </div>
        </div>
      </nav>

      <Hero onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <SignatureTacos onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <CustomizeTacos onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <StreetExperience />
      <OrderNow onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <Location />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />

      <FloatingWhatsApp onOpenOrderModal={() => setIsOrderModalOpen(true)} />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>NEW SCHOOL TACOS</h3>
            <p>Tanger, Morocco</p>
          </div>
          <div className="footer-links">
            <a href="https://wa.me/212653129843?text=Bonjour,%20je%20veux%20commander%20un%20tacos" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href="https://www.instagram.com/newschooltacosmaroc" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href="https://www.tiktok.com/@newschooltacos" target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="#menu">Menu</a>
            <a href="#custom">Créer ton tacos</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 New School Tacos. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
