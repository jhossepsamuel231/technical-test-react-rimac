import './summary.scss'
import { Link } from 'react-router-dom'
import { readSelectedPlanFromLocalStorage } from '@/features/plan/selectedPlanStorage'
import userIconUrl from '@/assets/icons/user-24.svg'
import arrowLeftUrl from '@/assets/icons/arrow-left-circle.svg'
import Stepper from '@/components/Stepper/Stepper'

export default function SummaryPage() {
  const selectedPlan = readSelectedPlanFromLocalStorage()
  if (!selectedPlan) return null

  const {
    insuredFullName,
    payerDocumentType,
    payerDocumentNumber,
    payerMobileNumber,
    chosenPlanName,
    chosenPlanMonthlyPrice,
  } = selectedPlan

  return (
    <>
      <Stepper active="summary" />
      <section className="summary" aria-labelledby="summary-title">
        <div className="summary__container">
          <Link to="/planes" className="summary__back">
            <img src={arrowLeftUrl} alt="" width={20} height={20} aria-hidden="true" />
            Volver
          </Link>

          <h1 id="summary-title" className="summary__title">
            Resumen del seguro
          </h1>

          <article className="summary-card" aria-labelledby="calc-for-title">
            <div className="summary-card__header">
              <p id="calc-for-title" className="summary-card__eyebrow">
                Precios calculados para:
              </p>

              <div className="summary-card__headline">
                <img
                  src={userIconUrl}
                  alt=""
                  width={24}
                  height={24}
                  className="summary-card__icon"
                  aria-hidden="true"
                />
                <p className="summary-card__name">{insuredFullName}</p>
              </div>
            </div>

            <hr className="summary-card__divider" role="separator" />

            <div className="summary-card__grid">
              <section className="summary-card__block" aria-labelledby="payer-title">
                <h2 id="payer-title" className="summary-card__block-title">
                  Responsable de pago
                </h2>
                <p className="summary-card__text">
                  {payerDocumentType}: {payerDocumentNumber}
                </p>
                <p className="summary-card__text">Celular: {payerMobileNumber}</p>
              </section>

              <section className="summary-card__block" aria-labelledby="plan-title">
                <h2 id="plan-title" className="summary-card__block-title">
                  Plan elegido
                </h2>
                <p className="summary-card__text">{chosenPlanName}</p>
                <p className="summary-card__text">
                  Costo del Plan: ${chosenPlanMonthlyPrice} al mes
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
