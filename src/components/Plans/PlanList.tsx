import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import './PlanList.scss'
import PlanCard from './PlanCard'
import iconHome from '@/assets/plan-icons/home.svg'
import iconClinic from '@/assets/plan-icons/clinic.svg'

type Plan = { name: string; price: number; description: string[]; age: number }

type Props = {
  plans: Plan[]
  recommendedIndex?: number | null
  onSelectPlan?: (plan: Plan) => void
  forWhom: 'me' | 'other'
}

export default function PlanList({ plans, recommendedIndex = null, onSelectPlan, forWhom }: Props) {
  const isOther = forWhom === 'other'

  const orderedPlans = useMemo(() => {
    if (!plans?.length) return []
    const arr = [...plans]
    if (recommendedIndex != null && recommendedIndex >= 0 && recommendedIndex < arr.length) {
      const [rec] = arr.splice(recommendedIndex, 1)
      arr.unshift(rec)
    }
    return arr
  }, [plans, recommendedIndex])

  const icons = useMemo(
    () => orderedPlans.map((_, i) => (i % 2 === 0 ? iconHome : iconClinic)),
    [orderedPlans],
  )

  const getPerView = () => (window.innerWidth >= 1100 ? 3 : window.innerWidth >= 740 ? 2 : 1)

  const [perView, setPerView] = useState<number>(getPerView())
  useEffect(() => {
    const onResize = () => setPerView(getPerView())
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const totalPages = Math.max(1, orderedPlans.length - perView + 1)
  const [page, setPage] = useState(0)
  useEffect(() => setPage(0), [perView, orderedPlans.length])

  const prev = () => setPage((p) => Math.max(0, p - 1))
  const next = () => setPage((p) => Math.min(totalPages - 1, p + 1))

  const translatePct = (100 / perView) * page

  type ViewportStyle = CSSProperties & { ['--per-view']?: number }
  const viewportStyle: ViewportStyle = useMemo(() => ({ ['--per-view']: perView }), [perView])

  return (
    <section className="plans" aria-label="Lista de planes">
      <div className="plans__viewport" style={viewportStyle}>
        <button
          type="button"
          className="plans__nav plans__nav--prev"
          onClick={prev}
          aria-label="Anterior"
          aria-disabled={page === 0}
        >
          ‹
        </button>

        <div className="plans__mask">
          <ul
            className="plans__track"
            style={{ transform: `translateX(-${translatePct}%)` }}
            role="list"
          >
            {orderedPlans.map((plan, i) => (
              <li className="plans__slide" key={plan.name} role="listitem">
                <PlanCard
                  plan={plan}
                  iconUrl={icons[i]}
                  recommended={i === 0}
                  onSelect={() => onSelectPlan?.(plan)}
                  oldPrice={isOther ? Number((plan.price / 0.95).toFixed(2)) : undefined}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className="plans__nav plans__nav--next"
          onClick={next}
          aria-label="Siguiente"
          aria-disabled={page === totalPages - 1}
        >
          ›
        </button>
      </div>

      {/* Paginador simple */}
      <div className="plans__pager" aria-live="polite">
        {page + 1} / {totalPages}
      </div>
    </section>
  )
}
