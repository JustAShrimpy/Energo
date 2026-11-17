import { useLanguage } from '../context/LanguageContext'

function Why() {
  const { t } = useLanguage()

  return (
    <section className="section" id="why" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{t.why.title}</h2>
        <p>{t.why.subtitle}</p>
      </div>
      <div className="why-grid">
        {t.why.cards.map((card, index) => (
          <div className="why-card" key={index}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Why
