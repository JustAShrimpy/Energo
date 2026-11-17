import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

const APPLIANCES = [
  { id: 'fridge', name: 'Холодильник', icon: '❄️', power: 150, essential: true },
  { id: 'lamp', name: 'Свет', icon: '💡', power: 60, essential: false },
  { id: 'tv', name: 'Телевизор', icon: '📺', power: 120, essential: false },
  { id: 'pc', name: 'Компьютер', icon: '💻', power: 200, essential: false },
  { id: 'heater', name: 'Обогреватель', icon: '🔥', power: 2000, essential: false },
  { id: 'kettle', name: 'Чайник', icon: '☕', power: 2000, essential: false },
  { id: 'charger', name: 'Зарядка', icon: '🔌', power: 5, essential: false },
  { id: 'router', name: 'Роутер', icon: '📶', power: 10, essential: true },
  { id: 'washer', name: 'Стиральная машина', icon: '👕', power: 1500, essential: false },
]

function generateRound() {
  const state = {}
  APPLIANCES.forEach((a) => {
    state[a.id] = a.essential ? true : Math.random() > 0.4
  })
  return state
}

export default function EnergyGame() {
  const { t } = useLanguage()
  const g = t.game
  const [state, setState] = useState({})
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    if (!active || finished) return
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(timer)
  }, [active, finished])

  const startGame = () => {
    setState(generateRound())
    setActive(true)
    setFinished(false)
    setScore(0)
    setMoves(0)
    setSeconds(0)
    setResult(null)
  }

  const toggle = (id) => {
    if (!active || finished) return
    setState((prev) => ({ ...prev, [id]: !prev[id] }))
    setMoves((m) => m + 1)
  }

  const checkResult = () => {
    let correct = 0
    let wrong = 0
    let savedWatts = 0
    APPLIANCES.forEach((a) => {
      const isOn = state[a.id]
      if (a.essential && isOn) {
        correct++
      } else if (!a.essential && !isOn) {
        correct++
        savedWatts += a.power
      } else if (!a.essential && isOn) {
        wrong++
      }
    })
    const points = correct * 10 - wrong * 5
    setScore(points)
    setFinished(true)
    setResult({ points, savedWatts })
  }

  return (
    <section className="section" id="game" style={{ background: 'var(--bg-light)' }}>
      <div className="section-title">
        <h2>{g.title}</h2>
        <p>{g.subtitle}</p>
      </div>

      <div className="game">
        {!active ? (
          <div className="game-intro">
            <p>{g.description}</p>
            <button className="game-start" onClick={startGame}>{g.start}</button>
          </div>
        ) : (
          <>
            <div className="game-stats">
              <div><span>{g.score}</span><strong>{score}</strong></div>
              <div><span>{g.moves}</span><strong>{moves}</strong></div>
              <div><span>{g.time}</span><strong>{seconds}s</strong></div>
            </div>

            <div className="game-grid">
              {APPLIANCES.map((a) => {
                const isOn = state[a.id]
                return (
                  <button
                    key={a.id}
                    className={`game-card ${isOn ? 'on' : 'off'}`}
                    onClick={() => toggle(a.id)}
                    disabled={finished}
                    aria-pressed={isOn}
                  >
                    <span className="game-card-icon">{a.icon}</span>
                    <span className="game-card-name">{g.appliances?.[a.id] || a.name}</span>
                    <span className="game-card-power">{a.power} W</span>
                    <span className="game-card-status">{isOn ? g.on : g.off}</span>
                  </button>
                )
              })}
            </div>

            {!finished ? (
              <button className="game-check" onClick={checkResult}>{g.check}</button>
            ) : result ? (
              <div className="game-result">
                <h3>{g.resultTitle} {result.points}</h3>
                <p>{g.resultText}</p>
                <button className="game-start" onClick={startGame}>{g.again}</button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  )
}
