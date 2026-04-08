const features = [
  {
    icon: '🔥',
    title: 'Fresh & Hot',
    description: 'Préparés à la minute pour une fraîcheur maximale'
  },
  {
    icon: '🎨',
    title: 'Créativité',
    description: 'Des combinaisons uniques et audacieuses'
  },
  {
    icon: '⚡',
    title: 'Rapide',
    description: 'Commande et récupère en moins de 15 min'
  },
  {
    icon: '💯',
    title: 'Qualité Premium',
    description: 'Ingrédients sélectionnés avec soin'
  }
];

const StreetExperience = () => {
  return (
    <section className="street-experience">
      <div className="section-container">
        <div className="experience-content">
          <div className="experience-text">
            <span className="section-badge">L'expérience</span>
            <h2 className="section-title">
              Street Food<br />
              <span className="text-gradient">Nouvelle Génération</span>
            </h2>
            <p className="experience-description">
              New School Tacos révolutionne la street food à Tanger.
              Une fusion parfaite entre tradition et modernité, où chaque
              tacos devient une expérience gustative unique.
            </p>
            <p className="experience-description">
              Rejoins la communauté des vrais amateurs de tacos et découvre
              pourquoi on est l'adresse incontournable de la ville.
            </p>

            <div className="experience-stats">
              <div className="stat">
                <div className="stat-number">500+</div>
                <div className="stat-label">Tacos vendus/mois</div>
              </div>
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Combinaisons possibles</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Fait maison</div>
              </div>
            </div>
          </div>

          <div className="experience-features">
            {features.map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StreetExperience;
