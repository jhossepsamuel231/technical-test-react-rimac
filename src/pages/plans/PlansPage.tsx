import './plan.scss'
import { useMemo, useState } from 'react'
import Stepper from '@/components/Stepper/Stepper'
import PlanHero from '@/components/Plans/PlanHero'
import PlanSelector, { type ForWhom } from '../../components/Plans/PlanSelector'
import { usePlans } from '@/hooks/usePlans'
import { calcAge, filterByAge, pickRecommendedIndex, finalPrice, type Plan } from '@/lib/plan-logic'
import PlanList from '@/components/Plans/PlanList'
import { useNavigate } from 'react-router-dom'
import { saveSelectedPlanToLocalStorage } from '@/features/plan/selectedPlanStorage'

export default function PlansPage() {
  // Cambiar mas adelante por datos reales de sesión
  const sessionUserFirstName = 'Rocío'
  const sessionUserFullName = 'Rocio Miranda Díaz'
  const sessionUserBirthDateISO = '1999-04-10'
  const sessionUserDocType: 'DNI' | 'RUC' = 'DNI'
  const sessionUserDocNumber = '444888888'
  const sessionUserMobileNumber = '5130216147'

  const navigate = useNavigate()

  const [forWhom, setForWhom] = useState<ForWhom | null>(null)

  const { data: allPlans, isLoading, isError, refetch } = usePlans(!!forWhom)

  const userAge = useMemo(() => calcAge(sessionUserBirthDateISO), [sessionUserBirthDateISO])

  const visiblePlans: Plan[] = useMemo(() => {
    if (!allPlans) return []
    const base = filterByAge(allPlans, userAge)
    if (!forWhom) return base
    const discount = forWhom === 'other'
    return base.map((p) => ({ ...p, price: finalPrice(p.price, discount) }))
  }, [allPlans, userAge, forWhom])

  const recommendedIndex = useMemo(
    () => (visiblePlans.length ? pickRecommendedIndex(visiblePlans, userAge) : null),
    [visiblePlans, userAge],
  )

  const handlePlanSelectionAndNavigate = (selectedPlanFromList: Plan) => {
    saveSelectedPlanToLocalStorage({
      insuredFullName: sessionUserFullName,
      payerDocumentType: sessionUserDocType,
      payerDocumentNumber: sessionUserDocNumber,
      payerMobileNumber: sessionUserMobileNumber,
      chosenPlanName: selectedPlanFromList.name,
      chosenPlanMonthlyPrice: selectedPlanFromList.price,
    })

    localStorage.setItem('isSessionReady', '1')

    navigate('/resumen')
  }

  return (
    <main className="plans-page">
      <Stepper active="plans" />
      <PlanHero username={sessionUserFirstName} />
      <PlanSelector value={forWhom} onChange={setForWhom} />

      {!forWhom && (
        <p style={{ textAlign: 'center', opacity: 0.7 }}>Elige una opción para ver los planes.</p>
      )}

      {forWhom && (
        <section aria-live="polite" aria-busy={isLoading}>
          {isLoading && <p style={{ textAlign: 'center' }}>Cargando planes…</p>}

          {isError && (
            <div role="alert" style={{ textAlign: 'center' }}>
              <p>Hubo un problema al cargar los planes.</p>
              <button onClick={() => refetch()}>Intentar de nuevo</button>
            </div>
          )}

          {!isLoading && !isError && visiblePlans.length === 0 && (
            <p style={{ textAlign: 'center' }}>
              No hay planes disponibles para tu edad ({userAge}).
            </p>
          )}

          {!isLoading && !isError && visiblePlans.length > 0 && (
            <PlanList
              plans={visiblePlans}
              recommendedIndex={recommendedIndex}
              forWhom={forWhom}
              onSelectPlan={handlePlanSelectionAndNavigate}
            />
          )}
        </section>
      )}
    </main>
  )
}
