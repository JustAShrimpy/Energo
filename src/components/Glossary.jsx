import { useMemo, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function Glossary() {
  const { t } = useLanguage()
  const gl = t.glossary
  const [query, setQuery] = useState('')

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return gl.terms
    return gl.terms.filter(
      (item) => item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q)
    )
  }, [gl.terms, query])

  return (
    <section className="section" id="glossary">
      <div className="section-title">
        <h2>{gl.title}</h2>
        <p>{gl.subtitle}</p>
      </div>

      <div className="glossary-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск термина..."
          aria-label="Поиск по глоссарию"
        />
      </div>

      <div className="glossary-grid">
        {filteredTerms.map((item) => (
          <div className="glossary-card" key={item.term}>
            <h3>{item.term}</h3>
            <p>{item.def}</p>
          </div>
        ))}
      </div>
      {filteredTerms.length === 0 && (
        <p className="glossary-empty">Ничего не найдено</p>
      )}
    </section>
  )
}
