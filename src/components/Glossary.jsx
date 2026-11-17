import { useLanguage } from '../context/LanguageContext'

export default function Glossary() {
  const { t } = useLanguage()
  const gl = t.glossary

  return (
    <section className="section" id="glossary">
      <div className="section-title">
        <h2>{gl.title}</h2>
        <p>{gl.subtitle}</p>
      </div>

      <div className="glossary-grid">
        {gl.terms.map((item) => (
          <div className="glossary-card" key={item.term}>
            <h3>{item.term}</h3>
            <p>{item.def}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
