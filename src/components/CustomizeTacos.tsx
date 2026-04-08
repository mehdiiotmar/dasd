import { useState, useRef } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    id: 1,
    title: 'Choisir la viande',
    icon: '🥩',
    options: ['Poulet', 'Bœuf', 'Kefta', 'Merguez', 'Cordon Bleu', 'Mix Viandes']
  },
  {
    id: 2,
    title: 'Choisir la sauce',
    icon: '🌶️',
    options: ['Samouraï', 'Algérienne', 'Blanche', 'Harissa', 'Pink Pepper', 'BBQ']
  },
  {
    id: 3,
    title: 'Ajouter les extras',
    icon: '✨',
    options: ['Double Fromage', 'Oignons Caramélisés', 'Jalapeños', 'Champignons', 'Frites Inside', 'Œuf']
  }
];

interface CustomizeTacosProps {
  onOpenOrderModal: () => void;
}

const CustomizeTacos = ({ onOpenOrderModal }: CustomizeTacosProps) => {
  const [activeStep, setActiveStep] = useState(1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useScrollAnimation(sectionRef);

  return (
    <section className="customize-tacos" id="custom" ref={sectionRef}>
      <div className="section-container">
        <div className={`section-header section-animate ${isVisible ? 'visible' : ''}`}>
          <span className="section-badge">Ton tacos, ta création</span>
          <h2 className="section-title">
            Crée <span className="text-gradient">Ton Tacos</span>
          </h2>
          <p className="section-subtitle">
            Personnalise ton tacos selon tes envies, étape par étape
          </p>
        </div>

        <div className="customize-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`step-card step-card-animate ${activeStep === step.id ? 'active' : ''} ${isVisible ? 'visible' : ''}`}
              onClick={() => setActiveStep(step.id)}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>

              <div className="step-options">
                {step.options.map((option, idx) => (
                  <div key={idx} className="option-tag">
                    {option}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="customize-cta">
          <button
            className="btn btn-primary btn-large"
            onClick={onOpenOrderModal}
          >
            <span>Créer mon tacos maintenant</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomizeTacos;
