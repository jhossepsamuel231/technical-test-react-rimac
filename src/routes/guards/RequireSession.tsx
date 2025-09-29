import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const isSessionReady = () => localStorage.getItem('isSessionReady') === '1'

export default function RequireSession({ children }: { children: ReactNode }) {
  const loc = useLocation()
  if (!isSessionReady()) return <Navigate to="/login" replace state={{ from: loc }} />
  return <>{children}</>
}
