import { useState, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

const TARIFF = 0.35
const CO2_FACTOR = 0.4
const HOURS_PER_DAY = 4
const BULBS = 10
const DAYS = 365

function calcAnnualCost(watts) {
  return (watts / 1000) * HOURS_PER_DAY * DAYS * TARIFF
}

function calcAnnualKwh(watts) {
  return (watts / 1000) * HOURS_PER_DAY * DAYS
}

export default function ComparisonSlider() {
  const { t } = useLanguage()
  const [position, setPosition] = useState(50)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef(null)

  const handleMove = (clientX) => {
    if (!trackRef.current) return
    const rect = trackRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    setPosition(percentage)
  }

  const startDrag = (e) => {
    setDragging(true)
    handleMove(e.clientX ?? e.touches?.[0]?.clientX)
  }

  const move = (e) => {
    if (!dragging) return
    handleMove(e.clientX ?? e.touches?.[0]?.clientX)
  }

  const endDrag = () => setDragging(false)

  const oldCost = calcAnnualCost(60)
  const newCost = calcAnnualCost(10)
  const apartmentOld = oldCost * BULBS
  const apartmentNew = newCost * BULBS
  const apartmentSavings = apartmentOld - apartmentNew
  const apartmentCo2 = (calcAnnualKwh(60) - calcAnnualKwh(10)) * BULBS * CO2_FACTOR

  return (
    <section className="section" id="comparison" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{t.comparison.title}</h2>
        <p>{t.comparison.subtitle}</p>
      </div>

      <div className="comparison-wrapper">
        <div
          ref={trackRef}
          className="comparison-track"
          onMouseDown={startDrag}
          onMouseMove={move}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={startDrag}
          onTouchMove={move}
          onTouchEnd={endDrag}
        >
          <div className="comparison-layer comparison-old">
            <div className="comparison-content left">
              <span className="comparison-label red">{t.comparison.old}</span>
              <div className="comparison-value">60W</div>
              <p>⚡ {calcAnnualKwh(60).toFixed(0)} кВт·ч/{t.comparison.year}</p>
              <p>⏱️ 1 000 {t.comparison.hours}</p>
              <p>💸 {oldCost.toFixed(0)} BYN/{t.comparison.year}</p>
            </div>
          </div>
          <div
            className="comparison-layer comparison-new"
            style={{ clipPath: `inset(0 0 0 ${position}%)` }}
          >
            <div className="comparison-content right">
              <span className="comparison-label green">{t.comparison.new}</span>
              <div className="comparison-value">10W</div>
              <p>💡 {calcAnnualKwh(10).toFixed(0)} кВт·ч/{t.comparison.year}</p>
              <p>⏱ 50 000 {t.comparison.hours}</p>
              <p>💰 {newCost.toFixed(0)} BYN/{t.comparison.year}</p>
            </div>
          </div>
          <div className="comparison-divider" style={{ left: `${position}%` }}>
            <span className="comparison-handle">↔</span>
          </div>
        </div>

        <div className="comparison-summary">
          <h3>{t.comparison.impactTitle}</h3>
          <p>{t.comparison.impactText}</p>
          <div className="comparison-summary-grid">
            <div>
              <span>{t.comparison.oldCost}</span>
              <strong>{apartmentOld.toFixed(0)} BYN</strong>
            </div>
            <div>
              <span>{t.comparison.newCost}</span>
              <strong>{apartmentNew.toFixed(0)} BYN</strong>
            </div>
            <div className="highlight">
              <span>{t.comparison.savings}</span>
              <strong>{apartmentSavings.toFixed(0)} BYN / {t.comparison.year}</strong>
            </div>
            <div className="highlight co2">
              <span>CO₂</span>
              <strong>−{apartmentCo2.toFixed(0)} {t.comparison.kg}/{t.comparison.year}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
