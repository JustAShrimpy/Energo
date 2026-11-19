import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ITEMS = [
  { id: 'led', ru: 'Заменить лампы на LED', by: 'Змяніць лямпы на LED' },
  { id: 'socket', ru: 'Отключать розетки на ночь', by: 'Адключаць разеткі на ноч' },
  { id: 'fridge', ru: 'Не ставить горячее в холодильник', by: 'Не ставіць гарачае ў халадзільнік' },
  { id: 'boiler', ru: 'Снизить температуру водонагревателя', by: 'Знізіць тэмпературу ваданагравальніка' },
  { id: 'windows', ru: 'Уплотнить окна на зиму', by: 'Зшчыльніць вокны на зіму' },
  { id: 'sun', ru: 'Закрывать шторы в жару', by: 'Зачыняць фіранкі ў спёку' },
  { id: 'wash', ru: 'Стирка при 30 °C', by: 'Пранне пры 30 °C' },
  { id: 'standby', ru: 'Не оставлять приборы в режиме ожидания', by: 'Не пакідаць прыборы ў чаканні' },
]

function Checklist() {
  const { lang } = useLanguage()
  const [checked, setChecked] = useState(() => {
    if (typeof window === 'undefined') return {}
    const saved = localStorage.getItem('energyChecklist')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    localStorage.setItem('energyChecklist', JSON.stringify(checked))
  }, [checked])

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const completed = Object.values(checked).filter(Boolean).length
  const total = ITEMS.length
  const progress = Math.round((completed / total) * 100)

  return (
    <section className="section" id="checklist">
      <div className="section-title">
        <h2>{lang === 'by' ? 'Чэк-ліст па энергазахаванні' : 'Чек-лист энергосбережения'}</h2>
        <p>{lang === 'by' ? 'Адзначай выкананыя пункты і глядзі сваю эканомію' : 'Отмечай выполненные пункты и смотри свою экономию'}</p>
      </div>

      <div className="checklist-card">
        <div className="checklist-progress">
          <div className="checklist-progress-bar">
            <div className="checklist-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="checklist-progress-text">
            {lang === 'by' ? 'Выканана' : 'Выполнено'}: {completed} / {total} ({progress}%)
          </p>
        </div>

        <ul className="checklist-items">
          {ITEMS.map((item) => (
            <li
              key={item.id}
              className={`checklist-item ${checked[item.id] ? 'checked' : ''}`}
              onClick={() => toggle(item.id)}
            >
              <span className="checklist-checkbox" aria-hidden="true">
                {checked[item.id] ? '✅' : '⬜'}
              </span>
              <span className="checklist-text">{item[lang]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Checklist
