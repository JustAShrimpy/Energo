import { useState, useMemo } from 'react'
import { useLanguage } from '../context/LanguageContext'

const TARIFF = 0.35
const CO2_FACTOR = 0.4
const DAYS = 30

const BASE_APPLIANCES = [
  { power: 0.01 },
  { power: 0.06 },
  { power: 0.06 },
  { power: 0.1 },
  { power: 0.15 },
  { power: 2.0 },
  { power: 2.0 },
  { power: 1.0 },
  { power: 2.0 },
]

export default function Calculator() {
  const { t } = useLanguage()
  const appliancesList = useMemo(
    () =>
      t.calculator.appliances.map((a, i) => ({
        ...a,
        power: BASE_APPLIANCES[i].power,
      })),
    [t.calculator.appliances]
  )

  const getAppliance = (index) => appliancesList[index] || appliancesList[0]

  const [appliances, setAppliances] = useState([{ id: 1, index: 0, hours: 5 }])

  const updateAppliance = (id, field, value) => {
    setAppliances((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const addAppliance = () => {
    const newId = appliances.length > 0 ? Math.max(...appliances.map((a) => a.id)) + 1 : 1
    setAppliances([...appliances, { id: newId, index: 0, hours: 5 }])
  }

  const removeAppliance = (id) => {
    setAppliances(appliances.filter((item) => item.id !== id))
  }

  const { dailyKwh, dailyCost, monthlyCost, monthlyCo2, potentialSavings } = useMemo(() => {
    const getAppliance = (index) => appliancesList[index] || appliancesList[0]
    const daily = appliances.reduce((sum, item) => {
      const appliance = getAppliance(item.index)
      return sum + appliance.power * item.hours
    }, 0)
    const monthlyKwh = daily * DAYS
    const monthlyEfficient = monthlyKwh * 0.7
    return {
      dailyKwh: daily,
      dailyCost: daily * TARIFF,
      monthlyCost: monthlyKwh * TARIFF,
      monthlyCo2: monthlyKwh * CO2_FACTOR,
      potentialSavings: (monthlyKwh - monthlyEfficient) * TARIFF,
    }
  }, [appliances, appliancesList])

  return (
    <section className="section" id="calculator">
      <div className="section-title">
        <h2>{t.calculator.title}</h2>
        <p>{t.calculator.subtitle}</p>
      </div>

      <div className="calculator">
        <div className="calculator-summary">
          <div className="calc-card">
            <span>{t.calculator.daily}</span>
            <strong>{dailyKwh.toFixed(2)} kWh</strong>
          </div>
          <div className="calc-card">
            <span>{t.calculator.costLabel}</span>
            <strong>{dailyCost.toFixed(2)} BYN</strong>
          </div>
          <div className="calc-card highlight">
            <span>{t.calculator.monthly}</span>
            <strong>{monthlyCost.toFixed(2)} BYN</strong>
          </div>
          <div className="calc-card co2">
            <span>CO₂ / {t.calculator.monthShort}</span>
            <strong>{monthlyCo2.toFixed(1)} {t.comparison.kg}</strong>
          </div>
        </div>

        <div className="appliance-list">
          {appliances.map((item) => {
            const appliance = getAppliance(item.index)
            const itemKwh = appliance.power * item.hours
            return (
              <div className="appliance-item" key={item.id}>
                <span className="appliance-icon">{appliance.icon}</span>
                <select
                  value={item.index}
                  onChange={(e) => updateAppliance(item.id, 'index', Number(e.target.value))}
                >
                  {appliancesList.map((a, i) => (
                    <option key={i} value={i}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <div className="appliance-hours">
                  <input
                    type="range"
                    min="0"
                    max="24"
                    step="0.5"
                    value={item.hours}
                    onChange={(e) => updateAppliance(item.id, 'hours', Number(e.target.value))}
                  />
                  <span>{item.hours} {t.calculator.hours}</span>
                </div>
                <div className="appliance-kwh">
                  <strong>{itemKwh.toFixed(2)}</strong>
                  <span>kWh</span>
                </div>
                <button className="remove-btn" onClick={() => removeAppliance(item.id)} aria-label="remove">
                  ×
                </button>
              </div>
            )
          })}
        </div>

        <button className="add-btn" onClick={addAppliance}>
          {t.calculator.add}
        </button>

        <div className="calculator-result">
          <h3>{t.calculator.savingsLabel}</h3>
          <div className="amount">≈ {potentialSavings.toFixed(2)} BYN/{t.calculator.monthShort}</div>
          <p>{t.calculator.savingsHint}</p>
        </div>

        <div className="tariff-note">{t.calculator.tariff}</div>
      </div>
    </section>
  )
}
