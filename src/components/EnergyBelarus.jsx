import { useLanguage } from '../context/LanguageContext'

export default function EnergyBelarus() {
  const { t } = useLanguage()
  const e = t.energyBelarus
  return (
    <section className="section" id="energy" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{e.title}</h2>
        <p>{e.subtitle}</p>
      </div>

      <div className="energy-grid">
        {e.sources.map((source, index) => (
          <div className="energy-source-card" key={index}>
            <div className="energy-bar" style={{ '--value': `${source.value}%` }}>
              <span>{source.value}%</span>
            </div>
            <div className="energy-source-info">
              <h3>{source.label}</h3>
              <p>{source.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="energy-cards">
        {e.cards.map((card, index) => (
          <div className="energy-card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
