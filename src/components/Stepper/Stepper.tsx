import './stepper.scss'

type Step = { id: 'plans' | 'summary'; label: string; number: 1 | 2 }

type Props = {
  active: Step['id']
  className?: string
}

const STEPS: Step[] = [
  { id: 'plans', label: 'Planes y coberturas', number: 1 },
  { id: 'summary', label: 'Resumen', number: 2 },
]

export default function Stepper({ active, className }: Props) {
  return (
    <nav className={`stepper ${className ?? ''}`} aria-label="Progreso">
      <ol className="stepper__list">
        {STEPS.map((s, i) => {
          const isActive = s.id === active
          const isLast = i === STEPS.length - 1
          return (
            <li key={s.id} className="stepper__item">
              <span
                aria-current={isActive ? 'step' : undefined}
                className={`stepper__badge ${isActive ? 'is-active' : 'is-idle'}`}
              >
                {s.number}
              </span>
              <span className={`stepper__label ${isActive ? 'is-active' : 'is-idle'}`}>
                {s.label}
              </span>
              {!isLast && (
                <span className="stepper__dots" aria-hidden="true">
                  •••
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
