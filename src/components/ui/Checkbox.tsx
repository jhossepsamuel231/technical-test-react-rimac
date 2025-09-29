import { forwardRef, type InputHTMLAttributes } from 'react'

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  hintId?: string
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { id, label, hintId, error, className, ...rest },
  ref,
) {
  const describedBy =
    [hintId, error ? `${id}-error` : undefined].filter(Boolean).join(' ') || undefined

  return (
    <label className={`checkbox ${className ?? ''}`}>
      <input
        id={id}
        ref={ref}
        type="checkbox"
        className="checkbox__input"
        aria-describedby={describedBy}
        aria-invalid={!!error || undefined}
        {...rest}
      />
      <span aria-hidden="true" className="checkbox__box">
        <svg viewBox="0 0 24 24" className="checkbox__check">
          <path
            d="M20 6L9 17l-5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="checkbox__label">{label}</span>
      {error && (
        <span id={`${id}-error`} className="checkbox__error">
          {error}
        </span>
      )}
    </label>
  )
})

export default Checkbox
