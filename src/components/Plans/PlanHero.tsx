import { Link } from 'react-router-dom'
import './PlanHero.scss'
import arrowLeftUrl from '@/assets/icons/arrow-left-circle.svg'

type Props = { username: string }

export default function PlanHero({ username }: Props) {
  return (
    <header className="plan-hero" aria-labelledby="plan-hero-title">
      <div className="plan-hero__top">
        <Link to="/login" className="plan-hero__back">
          <img src={arrowLeftUrl} alt="" width={20} height={20} aria-hidden="true" />
          Cerrar Sesión
        </Link>
      </div>

      <h1 id="plan-hero-title" className="plan-hero__title">
        {username} ¿Para quién deseas cotizar?
      </h1>

      <p className="plan-hero__subtitle">
        Selecciona la opción que se ajuste más a tus necesidades.
      </p>
    </header>
  )
}
