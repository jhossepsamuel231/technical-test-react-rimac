import { Link } from 'react-router-dom'
import logoRed from '@/assets/brand/rimac-logo-red.svg'

type NavbarProps = {
  phoneLabel?: string
  phoneHref?: string
  homeHref?: string
}

export default function Navbar({
  phoneLabel = '(01) 411 6001',
  phoneHref = 'tel:+5114116001',
  homeHref = '/login',
}: NavbarProps) {
  return (
    <header className="navbar" role="banner" aria-label="Barra superior">
      <div className="container">
        <div className="navbar__inner grid-12" role="navigation" aria-label="Navegación principal">
          <div className="navbar__brand">
            <Link to={homeHref} aria-label="RIMAC — ir al inicio" className="navbar__brandLink">
              <img src={logoRed} alt="RIMAC" className="navbar__logo" />
            </Link>
          </div>

          <div className="navbar__contact" aria-label="Contacto por teléfono">
            <span className="navbar__note" aria-hidden="true">
              ¡Compra por este medio!
            </span>

            <a className="navbar__phone" href={phoneHref} aria-label={`Llamar al ${phoneLabel}`}>
              <svg
                className="navbar__phoneIcon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M6.6 10.8a14 14 0 006.6 6.6l2.2-2.2a1 1 0 011.1-.22c1.2.48 2.5.74 3.8.78a1 1 0 011 .99v3.25a1 1 0 01-.93 1A19 19 0 013 5.93 1 1 0 014 5h3.25a1 1 0 01.99 1c.04 1.3.3 2.6.78 3.8a1 1 0 01-.22 1.1L6.6 10.8z"
                  fill="currentColor"
                />
              </svg>
              <span className="navbar__phoneText">{phoneLabel}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
