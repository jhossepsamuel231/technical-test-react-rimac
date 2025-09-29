import { useId } from 'react'
import './plan-selector.scss'

export type ForWhom = 'me' | 'other'

type Option = {
  id: ForWhom
  title: string
  description: string
  icon?: React.ReactNode
}

const OPTIONS: Option[] = [
  {
    id: 'me',
    title: 'Para mí',
    description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
  },
  {
    id: 'other',
    title: 'Para alguien más',
    description: 'Realiza una cotización para uno de tus familiares o cualquier persona.',
  },
]

type Props = {
  username: string // "Rocío"
  value: ForWhom | null
  onChange: (v: ForWhom) => void // aquí podrás disparar el fetch
}

export default function PlanSelector({ username, value, onChange }: Props) {
  const groupId = useId()

  return (
    <section aria-labelledby="plans-heading">
      {/* Breadcrumb */}
      <div className="plan-hero__breadcrumb" aria-label="Progreso">
        <span className="plan-hero__step--active">1 Planes y coberturas</span>
        <span className="plan-hero__step">2 Resumen</span>
      </div>

      {/* Títulos */}
      <header className="plan-hero" id="plans-heading">
        <h1 className="plan-hero__title">{username} ¿Para quién deseas cotizar?</h1>
        <p className="plan-hero__subtitle">
          Selecciona la opción que se ajuste más a tus necesidades.
        </p>
      </header>

      {/* RadioGroup accesible */}
      <div role="radiogroup" aria-labelledby="plans-heading" className="option-grid">
        {OPTIONS.map((opt) => {
          const checked = value === opt.id
          const inputId = `${groupId}-${opt.id}`
          return (
            <label
              key={opt.id}
              htmlFor={inputId}
              role="radio"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onChange(opt.id)
                }
              }}
              className={`option-card ${checked ? 'option-card--checked' : ''}`}
            >
              <input
                id={inputId}
                className="option-card__input"
                type="radio"
                name={groupId}
                checked={checked}
                onChange={() => onChange(opt.id)}
              />
              <div className="option-card__radio" aria-hidden="true" />
              {opt.icon}
              <h3 className="option-card__title">{opt.title}</h3>
              <p className="option-card__desc">{opt.description}</p>
            </label>
          )
        })}
      </div>
    </section>
  )
}
