import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <p>{t.footer.copy}</p>
      <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.7 }}>{t.footer.slogan}</p>
    </footer>
  )
}

export default Footer
