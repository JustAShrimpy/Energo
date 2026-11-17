import { useLanguage } from '../context/LanguageContext'

export default function Timeline() {
  const { t } = useLanguage()
  const tl = t.timeline

  return (
    <section className="section" id="timeline">
      <div className="section-title">
        <h2>{tl.title}</h2>
        <p>{tl.subtitle}</p>
      </div>

      <div className="timeline">
        {tl.events.map((event, index) => (
          <div
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            style={{ '--i': index }}
            key={event.year}
          >
            <div className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card">
              <span className="timeline-year">{event.year}</span>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
