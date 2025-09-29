import { useId } from 'react'
import './plan-selector.scss'

import iconMeUrl from '@/assets/icons/me.svg'
import iconOtherUrl from '@/assets/icons/other.svg'

export type ForWhom = 'me' | 'other'

type Option = {
  id: ForWhom
  title: string
  description: string
  iconUrl: string
}

const OPTIONS: Option[] = [
  {
    id: 'me',
    title: 'Para mí',
    description: 'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
    iconUrl: iconMeUrl,
  },
  {
    id: 'other',
    title: 'Para alguien más',
    description: 'Realiza una cotización para uno de tus familiares o cualquier persona.',
    iconUrl: iconOtherUrl,
  },
]

type PlanSelectorProps = {
  value: ForWhom | null
  onChange: (v: ForWhom) => void
}

export default function PlanSelector({ value, onChange }: PlanSelectorProps) {
  const groupId = useId()

  return (
    <section aria-labelledby="plans-heading">
      <div role="radiogroup" aria-labelledby="plans-heading" className="option-grid">
        {OPTIONS.map(({ id, title, description, iconUrl }) => {
          const checked = value === id
          const inputId = `${groupId}-${id}`
          return (
            <label
              key={id}
              htmlFor={inputId}
              role="radio"
              aria-checked={checked}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onChange(id)
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
                onChange={() => onChange(id)}
              />
              <div className="option-card__radio" aria-hidden="true" />

              <img src={iconUrl} alt="" className="option-card__icon" />
              <h3 className="option-card__title">{title}</h3>
              <p className="option-card__desc">{description}</p>
            </label>
          )
        })}
      </div>
    </section>
  )
}
