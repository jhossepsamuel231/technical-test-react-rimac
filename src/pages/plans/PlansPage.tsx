// src/pages/plans/PlansPage.tsx
import './plan.scss'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Stepper from '@/components/Stepper/Stepper'
import PlanHero from '@/components/Plans/PlanHero'
import PlanSelector, { type ForWhom } from '@/components/Plans/PlanSelector'
import PlanList from '@/components/Plans/PlanList'
import { usePlans } from '@/hooks/usePlans'
import { filterByAge, pickRecommendedIndex, finalPrice } from '@/lib/plan-logic'
import { saveSelectedPlanToLocalStorage } from '@/features/plan/selectedPlanStorage'
import { useUserInfo } from '@/hooks/useUserInfo'
import type { Plan } from '@/types/auth'

export default function PlansPage() {
  const navigate = useNavigate()

  const { isAuthenticated, user, ageYears } = useUserInfo()

  useEffect(() => {
    if (!isAuthenticated) navigate('/login', { replace: true })
  }, [isAuthenticated, navigate])

  const [forWhom, setForWhom] = useState<ForWhom | null>(null)

  const { data: allPlans, isLoading, isError, refetch } = usePlans(!!forWhom)

  const visiblePlans: Plan[] = useMemo(() => {
    if (!allPlans) return []
    const base = ageYears == null ? allPlans : filterByAge(allPlans, ageYears)
    if (!forWhom) return base
    const hasDiscount = forWhom === 'other'
    return base.map((plan) => ({ ...plan, price: finalPrice(plan.price, hasDiscount) }))
  }, [allPlans, ageYears, forWhom])

  const recommendedIndex = useMemo(
    () =>
      visiblePlans.length && ageYears != null ? pickRecommendedIndex(visiblePlans, ageYears) : null,
    [visiblePlans, ageYears],
  )

  const handlePlanSelectionAndNavigate = (selectedPlan: Plan) => {
    saveSelectedPlanToLocalStorage({
      insuredFullName: user.fullName,
      payerDocumentType: user.documentType,
      payerDocumentNumber: user.documentNumber,
      payerMobileNumber: user.mobilePhone,
      chosenPlanName: selectedPlan.name,
      chosenPlanMonthlyPrice: selectedPlan.price,
    })

    localStorage.setItem('isSessionReady', '1')
    navigate('/resumen')
  }

  return (
    <main className="plans-page">
      <Stepper active="plans" />
      <PlanHero username={user.firstName} />
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
              <button type="button" onClick={() => refetch()}>
                Intentar de nuevo
              </button>
            </div>
          )}

          {!isLoading && !isError && visiblePlans.length === 0 && (
            <p style={{ textAlign: 'center' }}>
              {ageYears == null
                ? 'No pudimos calcular tu edad. No hay planes disponibles.'
                : `No hay planes disponibles para tu edad (${ageYears}).`}
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
