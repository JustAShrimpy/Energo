import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function InstallPrompt() {
  const { t } = useLanguage()
  const [prompt, setPrompt] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setPrompt(e)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = () => {
    if (!prompt) return
    prompt.prompt()
    prompt.userChoice.then(() => {
      setVisible(false)
      setPrompt(null)
    })
  }

  if (!visible) return null

  return (
    <button className="install-btn" onClick={handleInstall}>
      {t.install || 'Установить'}
    </button>
  )
}

export default InstallPrompt
