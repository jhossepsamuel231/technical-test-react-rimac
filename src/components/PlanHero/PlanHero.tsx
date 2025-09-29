import './plan-hero.scss'

type Props = { username: string; onBack?: () => void }

export default function PlanHero({ username, onBack }: Props) {
  return (
    <header className="plan-hero" aria-labelledby="plan-hero-title">
      <div className="plan-hero__top">
        {onBack && (
          <button type="button" className="plan-hero__back" onClick={onBack}>
            Volver
          </button>
        )}
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
