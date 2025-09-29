import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header role="banner" aria-label="Cabecera">
      <nav role="navigation" aria-label="Barra de navegación principal">
        <div>
          <Link to="/login" aria-label="Ir a inicio (login)">
            RIMAC
          </Link>
        </div>
        <ul>
          <li>
            <Link to="/planes">Planes</Link>
          </li>
          <li>
            <Link to="/resumen">Resumen</Link>
          </li>
        </ul>
        <div aria-label="Contacto telefónico">¡Compra por este medio! (01) 411 6001</div>
      </nav>
    </header>
  )
}
