import { useMemo, useState } from 'react'
import Stepper from '@/components/Stepper/Stepper'
import PlanHero from '@/components/PlanHero/PlanHero'
import PlanSelector, { type ForWhom } from './PlanSelector'

import { usePlans } from '@/hooks/usePlans'
import { calcAge, filterByAge, pickRecommendedIndex, finalPrice, type Plan } from '@/lib/plan-logic'
import PlanList from '@/components/Plans/PlanList'

export default function PlansPage() {
  const username = 'Rocío'
  const dob = '1999-04-10'

  const [forWhom, setForWhom] = useState<ForWhom | null>(null)

  const { data: allPlans, isLoading, isError, refetch } = usePlans(!!forWhom)

  const userAge = useMemo(() => calcAge(dob), [dob])

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

  return (
    <main>
      <Stepper active="plans" />
      <PlanHero username={username} onBack={() => history.back()} />
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
              onSelectPlan={(plan: Plan) => {
                console.log('Elegido:', { forWhom, plan })
              }}
            />
          )}
        </section>
      )}
    </main>
  )
}
