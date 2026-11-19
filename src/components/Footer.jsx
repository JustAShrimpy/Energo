import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p>{t.footer.copy}</p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>{t.footer.slogan}</p>
      <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', opacity: 0.6 }}>JustAShrimp — Лебедев Денис Григорьевич</p>
    </footer>
  )
}

export default Footer
