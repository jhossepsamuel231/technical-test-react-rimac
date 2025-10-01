import './login.scss'
import './errorLogin.scss'
import { useId, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import hero from '@/assets/login/hero.png'
import { isDni, isRuc, isPhone } from '@/lib/validators'

type DocType = 'DNI' | 'RUC'

export default function LoginPage() {
  const idDocType = useId()
  const idDocNum = useId()
  const idPhone = useId()
  const idFormAlert = useId()

  const navigate = useNavigate()
  const { login } = useSession()

  const [docType, setDocType] = useState<DocType>('DNI')
  const [docNum, setDocNum] = useState('')
  const [phone, setPhone] = useState('')
  const [ppOk, setPpOk] = useState(false)
  const [comOk, setComOk] = useState(false)
  const [loading, setLoading] = useState(false)

  const [touched, setTouched] = useState({ docNum: false, phone: false, ppOk: false, comOk: false })
  const [formError, setFormError] = useState<string | null>(null)

  const errors = useMemo(() => {
    const e: Record<'docNum' | 'phone' | 'ppOk' | 'comOk', string | null> = {
      docNum: null,
      phone: null,
      ppOk: null,
      comOk: null,
    }
    if (!docNum.trim()) e.docNum = 'Campo requerido'
    else if (docType === 'DNI' && !isDni(docNum)) e.docNum = 'DNI inválido (8 dígitos)'
    else if (docType === 'RUC' && !isRuc(docNum))
      e.docNum = 'RUC inválido (11 dígitos y empieza con 10/20)'

    if (!phone.trim()) e.phone = 'Campo requerido'
    else if (!isPhone(phone)) e.phone = 'Celular inválido (9 dígitos)'

    if (!ppOk) e.ppOk = 'Debes aceptar la Política de Privacidad'
    if (!comOk) e.comOk = 'Debes aceptar las Comunicaciones Comerciales'

    return e
  }, [docNum, phone, ppOk, comOk, docType])

  const isValid = !errors.docNum && !errors.phone && !errors.ppOk && !errors.comOk

  function markTouchedAll() {
    setTouched({ docNum: true, phone: true, ppOk: true, comOk: true })
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError(null)
    markTouchedAll()
    if (!isValid) return

    try {
      setLoading(true)
      await login({ docType, docNum, phone })
      navigate('/planes', { replace: true })
    } catch {
      setLoading(false)
      setFormError('Usuario o datos inválidos. Verifica tu documento y celular.')
      setTimeout(() => document.getElementById(idFormAlert)?.focus(), 0)
    }
  }

  const docMax = docType === 'DNI' ? 8 : 11

  return (
    <section className="login">
      <div className="container">
        <div className="login__grid">
          <div className="login__left">
            <picture>
              <source media="(min-width: 768px)" srcSet={hero} type="image/png" />
              <source media="(max-width: 767px)" srcSet={hero} type="image/png" />
              <img
                className="login__hero"
                src={hero}
                alt="Imagen de login"
                width={1360}
                height={520}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </picture>
          </div>

          <div className="login__right">
            <header className="login__head">
              <span className="login__badge" role="note">
                Seguro Salud Flexible
              </span>
              <h1 className="login__title">Creado para ti y tu familia</h1>
              <img className="login__hero login__hero--mob" src={hero} alt="" aria-hidden="true" />
            </header>

            <div className="login__divider" aria-hidden="true" />
            <p className="login__subtitle">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100%
              online.
            </p>

            {formError && (
              <div
                id={idFormAlert}
                className="formAlert"
                role="alert"
                tabIndex={-1}
                aria-live="assertive"
              >
                {formError}
              </div>
            )}

            <form className="login__form" noValidate onSubmit={onSubmit}>
              <div className="login__row">
                <div className={`docGroup ${touched.docNum && errors.docNum ? 'is-invalid' : ''}`}>
                  <div className="docGroup__select">
                    <select
                      id={idDocType}
                      value={docType}
                      onChange={(e) => {
                        setDocType(e.target.value as DocType)
                        setDocNum('')
                        setTouched((t) => ({ ...t, docNum: true }))
                      }}
                      aria-label="Tipo de documento"
                    >
                      <option value="DNI">DNI</option>
                      <option value="RUC">RUC</option>
                    </select>
                    <span className="docGroup__icon" aria-hidden="true">
                      ▾
                    </span>
                  </div>

                  <div className="docGroup__field">
                    <input
                      id={idDocNum}
                      className="docGroup__input"
                      type="text"
                      inputMode="numeric"
                      maxLength={docMax}
                      placeholder=" "
                      value={docNum}
                      onChange={(e) => setDocNum(e.target.value.replace(/\D+/g, ''))}
                      onBlur={() => setTouched((t) => ({ ...t, docNum: true }))}
                      aria-labelledby={`${idDocNum}-label`}
                      aria-invalid={touched.docNum && !!errors.docNum}
                      aria-describedby={
                        touched.docNum && errors.docNum ? `${idDocNum}-error` : undefined
                      }
                    />
                    <label id={`${idDocNum}-label`} htmlFor={idDocNum} className="docGroup__label">
                      Nro. de documento
                    </label>
                  </div>
                </div>
                {touched.docNum && errors.docNum && (
                  <p id={`${idDocNum}-error`} className="fieldError">
                    {errors.docNum}
                  </p>
                )}
              </div>

              <div className="login__row">
                <div className={`floatField ${touched.phone && errors.phone ? 'is-invalid' : ''}`}>
                  <input
                    id={idPhone}
                    className="floatField__input"
                    type="text"
                    inputMode="tel"
                    maxLength={9}
                    placeholder=" "
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D+/g, ''))}
                    onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
                    aria-labelledby={`${idPhone}-label`}
                    aria-invalid={touched.phone && !!errors.phone}
                    aria-describedby={
                      touched.phone && errors.phone ? `${idPhone}-error` : undefined
                    }
                  />
                  <label id={`${idPhone}-label`} htmlFor={idPhone} className="floatField__label">
                    Celular
                  </label>
                </div>
                {touched.phone && errors.phone && (
                  <p id={`${idPhone}-error`} className="fieldError">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="login__checks">
                <Checkbox
                  id="chk-pp"
                  checked={ppOk}
                  onChange={(e) => {
                    setPpOk(e.currentTarget.checked)
                    setTouched((t) => ({ ...t, ppOk: true }))
                  }}
                  label="Acepto la Política de Privacidad"
                  required
                  aria-invalid={touched.ppOk && !!errors.ppOk}
                  aria-describedby={touched.ppOk && errors.ppOk ? 'chk-pp-error' : undefined}
                />
                {touched.ppOk && errors.ppOk && (
                  <p id="chk-pp-error" className="fieldError">
                    {errors.ppOk}
                  </p>
                )}

                <Checkbox
                  id="chk-com"
                  checked={comOk}
                  onChange={(e) => {
                    setComOk(e.currentTarget.checked)
                    setTouched((t) => ({ ...t, comOk: true }))
                  }}
                  label="Acepto la Política Comunicaciones Comerciales"
                  required
                  aria-invalid={touched.comOk && !!errors.comOk}
                  aria-describedby={touched.comOk && errors.comOk ? 'chk-com-error' : undefined}
                />
                {touched.comOk && errors.comOk && (
                  <p id="chk-com-error" className="fieldError">
                    {errors.comOk}
                  </p>
                )}
              </div>

              <div className="login__actions">
                <a className="login__terms" href="#">
                  Aplican Términos y Condiciones.
                </a>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={!isValid || loading}
                  aria-busy={loading || undefined}
                >
                  {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="btnSpinner" aria-hidden="true" />
                      Cotizando
                    </div>
                  ) : (
                    'Cotiza aquí'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
