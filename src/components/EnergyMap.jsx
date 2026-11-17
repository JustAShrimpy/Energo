import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

// Контур Беларуси: GeoJSON (johan/world.geo.json, BLR) → SVG viewBox 0 0 1000 866
const OUTLINE =
  'M39.4 403.9 L139.1 405.1 L251.2 339.3 L275.2 240.8 L359.8 184.9 L350.1 106.7 L412.9 77.3 L523.8 10 L632.4 53.8 L647.1 97.1 L701.3 76.3 L802.2 117.9 L812.3 199.8 L790.2 246.9 L854.9 361.2 L896.9 393 L890.7 424.6 L960.3 455.3 L990 501.8 L949.8 540 L866.5 533.9 L846.7 550.2 L870.9 608.2 L896.3 719.9 L807.7 730.3 L775.9 768.6 L769.3 856.5 L728.2 839.6 L635.1 848 L608 807.1 L569.3 837.6 L530.5 812.3 L449.2 808.8 L334 767 L229.7 753.3 L149.7 757.2 L93.2 804.5 L43.8 811.3 L41.8 733.6 L10 652.7 L71.9 617.1 L72.5 547.5 L43.9 481.1 Z'

// Центры областей в % того же viewBox (долгота со сжатием cos(53.7°), широта)
const COORDS = {
  vitebsk: { x: 59.8, y: 18.7 },
  minsk: { x: 49.5, y: 52.9 },
  grodno: { x: 16.5, y: 59 },
  mogilev: { x: 77.4, y: 55 },
  brest: { x: 18.6, y: 82.2 },
  gomel: { x: 71.2, y: 81.2 },
}

const typeClass = (type) => (type === 'АЭС' ? 'nuclear' : type === 'ГРЭС' ? 'gres' : 'tec')

export default function EnergyMap() {
  const { t } = useLanguage()
  const m = t.energyMap
  const [activeId, setActiveId] = useState('grodno')

  const active = m.regions.find((r) => r.id === activeId) || m.regions[0]

  return (
    <section className="section" id="map" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{m.title}</h2>
        <p>{m.subtitle}</p>
      </div>

      <div className="energy-map-layout">
        <div className="energy-map" role="group" aria-label={m.title}>
          <svg className="map-outline" viewBox="0 0 1000 866" aria-hidden="true">
            <path className="map-outline-shape" d={OUTLINE} />
          </svg>

          {m.regions.map((region) => {
            const pos = COORDS[region.id] || { x: 50, y: 50 }
            const isActive = region.id === activeId
            return (
              <button
                key={region.id}
                type="button"
                className={`map-region ${isActive ? 'active' : ''}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                onClick={() => setActiveId(region.id)}
                aria-pressed={isActive}
              >
                <span className="map-dot" aria-hidden="true" />
                <span className="map-name">{region.name}</span>
                <span className="map-count">{region.stations.length}</span>
              </button>
            )
          })}
        </div>

        <div className="map-detail">
          <h3>{active.name}</h3>
          <ul className="station-list">
            {active.stations.map((station) => (
              <li className="station-item" key={station.name}>
                <span className={`station-type ${typeClass(station.type)}`}>{station.type}</span>
                <div className="station-info">
                  <strong>{station.name}</strong>
                  <span className="station-desc">{m.types[station.type]}</span>
                </div>
                <span className="station-power">{station.power}</span>
              </li>
            ))}
          </ul>
          <p className="map-hint">{m.hint}</p>
          <p className="map-note">{m.note}</p>
        </div>
      </div>
    </section>
  )
}
