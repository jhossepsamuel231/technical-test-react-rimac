import logoWhite from '@/assets/brand/rimac-logo-white.svg'
import logoMobileWhite from '@/assets/brand/rimac-logo-white-mobile.svg'

type FooterProps = { year?: number }

export default function Footer({ year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer
      className="footer footer--public  u-full-bleed"
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="container">
        <div className="footer__inner grid-12">
          <div className="footer__brand">
            <picture>
              <source media="(max-width: 640px)" srcSet={logoMobileWhite} />
              <img src={logoWhite} alt="RIMAC" className="footer__logo" />
            </picture>
          </div>

          <div className="footer__copy">
            <small>© {year} RIMAC Seguros y Reaseguros.</small>
          </div>
          <div className="footer__divider" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
