import './index.css'
import { Suspense, lazy } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import Particles from './components/Particles'
import SideRails from './components/SideRails'
import Loader from './components/Loader'
import InstallPrompt from './components/InstallPrompt'
import Reveal from './components/Reveal'

const Header = lazy(() => import('./components/Header'))
const Hero = lazy(() => import('./components/Hero'))
const Facts = lazy(() => import('./components/Facts'))
const Why = lazy(() => import('./components/Why'))
const ComparisonSlider = lazy(() => import('./components/ComparisonSlider'))
const EnergyBelarus = lazy(() => import('./components/EnergyBelarus'))
const EnergyData = lazy(() => import('./components/EnergyData'))
const Timeline = lazy(() => import('./components/Timeline'))
const EnergyMap = lazy(() => import('./components/EnergyMap'))
const Calculator = lazy(() => import('./components/Calculator'))
const Tips = lazy(() => import('./components/Tips'))
const Quiz = lazy(() => import('./components/Quiz'))
const Glossary = lazy(() => import('./components/Glossary'))
const EnergyGame = lazy(() => import('./components/EnergyGame'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Particles />
        <SideRails />
        <Suspense fallback={<Loader />}>
          <Header />
          <Hero />
          <Reveal>
            <Facts />
          </Reveal>
          <Reveal>
            <Why />
          </Reveal>
          <Reveal>
            <EnergyBelarus />
          </Reveal>
          <Reveal>
            <EnergyData />
          </Reveal>
          <Reveal>
            <Timeline />
          </Reveal>
          <Reveal>
            <EnergyMap />
          </Reveal>
          <Reveal>
            <ComparisonSlider />
          </Reveal>
          <Reveal>
            <Calculator />
          </Reveal>
          <Reveal>
            <Tips />
          </Reveal>
          <Reveal>
            <Quiz />
          </Reveal>
          <Reveal>
            <Glossary />
          </Reveal>
          <Reveal>
            <EnergyGame />
          </Reveal>
          <Reveal>
            <Footer />
          </Reveal>
          <InstallPrompt />
        </Suspense>
      </div>
    </LanguageProvider>
  )
}

export default App
