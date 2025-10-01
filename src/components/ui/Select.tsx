import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react'

type Option = { value: string; label: string; disabled?: boolean }

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  options: Option[]
  hint?: string
  error?: string
  startAdornment?: ReactNode
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { id, label, options, hint, error, startAdornment, required, ...rest },
  ref,
) {
  const describedBy =
    [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className="field" data-has-error={!!error || undefined}>
      <label htmlFor={id}>
        {label}
        {required && ' *'}
      </label>

      <div className="field__control">
        {startAdornment}
        <select
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={required}
          {...rest}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {hint && (
        <div id={`${id}-hint`} role="note" className="field__hint">
          {hint}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} role="alert" className="field__error">
          {error}
        </div>
      )}
    </div>
  )
})

export default Select
