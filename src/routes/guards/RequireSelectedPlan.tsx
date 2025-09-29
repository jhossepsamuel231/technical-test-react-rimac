import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const hasSelectedPlan = () => !!localStorage.getItem('selectedPlan')

export default function RequireSelectedPlan({ children }: { children: ReactNode }) {
  const loc = useLocation()
  if (!localStorage.getItem('isSessionReady')) return <Navigate to="/login" replace />
  if (!hasSelectedPlan()) return <Navigate to="/planes" replace state={{ from: loc }} />
  return <>{children}</>
}
