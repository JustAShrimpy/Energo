import { useLanguage } from '../context/LanguageContext'

export default function EnergyData() {
  const { t } = useLanguage()
  const d = t.energyData

  return (
    <section className="section" id="data" style={{ background: 'var(--bg)' }}>
      <div className="section-title">
        <h2>{d.title}</h2>
        <p>{d.subtitle}</p>
      </div>

      <div className="data-grid">
        {d.stats.map((stat, index) => (
          <div className="data-card" key={index}>
            <div className="data-value">{stat.value}</div>
            <div className="data-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="data-program">
        <h3>{d.programTitle}</h3>
        <p>{d.programText}</p>
        <div className="data-targets">
          {d.targets.map((target, index) => (
            <div className="data-target" key={index}>
              <strong>{target.value}</strong>
              <span>{target.label}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="data-sources">{d.sources}</p>
    </section>
  )
}
