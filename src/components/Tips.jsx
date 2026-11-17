import { useLanguage } from '../context/LanguageContext'

function Tips() {
  const { t } = useLanguage()

  return (
    <section className="section" id="tips">
      <div className="section-title">
        <h2>{t.tips.title}</h2>
        <p>{t.tips.subtitle}</p>
      </div>
      <div className="tips-grid">
        {t.tips.items.map((title, index) => (
          <div className="tip-card" key={index}>
            <span className="number">{index + 1}</span>
            <h3>{title}</h3>
            <p>{t.tips.texts[index]}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Tips
