import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string
  label: string
  hint?: string
  error?: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, hint, error, startAdornment, endAdornment, required, ...rest },
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
        <input
          id={id}
          ref={ref}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          required={required}
          {...rest}
        />
        {endAdornment}
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

export default TextField
