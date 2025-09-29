import React from 'react'
import './PlanCard.scss'

type Plan = {
  name: string
  price: number // precio a mostrar (con o sin descuento)
  description: string[]
}

type Props = {
  plan: Plan
  iconUrl: string
  recommended?: boolean
  onSelect?: () => void
  actionLabel?: string
  oldPrice?: number
}

function PlanCardBase({
  plan,
  iconUrl,
  recommended,
  onSelect,
  actionLabel = 'Seleccionar Plan',
  oldPrice,
}: Props) {
  return (
    <article className="plan-card" aria-labelledby={`${plan.name}-title`}>
      {recommended && (
        <span className="plan-card__badge" aria-label="Plan recomendado">
          Plan recomendado
        </span>
      )}

      <header className="plan-card__header">
        <h3 id={`${plan.name}-title`} className="plan-card__title">
          {plan.name}
        </h3>
        <img className="plan-card__icon" src={iconUrl} alt="" />
      </header>

      <div className="plan-card__price-block" aria-label="Costo del plan">
        <span className="plan-card__price-label">COSTO DEL PLAN</span>

        {typeof oldPrice === 'number' && (
          <span className="plan-card__oldprice">S/{oldPrice} antes</span>
        )}

        <p className="plan-card__price">
          S/{plan.price} <span className="plan-card__price-sufix">al mes</span>
        </p>

        <hr className="plan-card__divider" />
      </div>

      <ul className="plan-card__features">
        {plan.description.map((line, i) => (
          <li key={i} className="plan-card__feature">
            {line}
          </li>
        ))}
      </ul>

      <div className="plan-card__cta">
        <button type="button" className="plan-card__button" onClick={onSelect}>
          {actionLabel}
        </button>
      </div>
    </article>
  )
}

export default React.memo(PlanCardBase)
