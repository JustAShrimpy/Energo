import { useLanguage } from '../context/LanguageContext'

function Header() {
  const { lang, setLang, t } = useLanguage()

  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span>{t.header.logo}</span>
        </div>
        <nav className="nav">
          <a href="#facts">{t.header.facts}</a>
          <a href="#why">{t.header.why}</a>
          <a href="#energy">{t.header.energy}</a>
          <a href="#timeline">{t.header.timeline}</a>
          <a href="#map">{t.header.map}</a>
          <a href="#calculator">{t.header.calculator}</a>
          <a href="#tips">{t.header.tips}</a>
          <a href="#quiz">{t.header.quiz}</a>
          <a href="#glossary">{t.header.glossary}</a>
          <a href="#game">{t.header.game}</a>
        </nav>
        <div className="lang-switcher">
          <button className={lang === 'ru' ? 'active' : ''} onClick={() => setLang('ru')}>RU</button>
          <button className={lang === 'by' ? 'active' : ''} onClick={() => setLang('by')}>BY</button>
        </div>
      </div>
    </header>
  )
}

export default Header
