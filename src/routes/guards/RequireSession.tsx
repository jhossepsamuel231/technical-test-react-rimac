import { Navigate, useLocation } from 'react-router-dom'
import { useSession } from '@/hooks/useSession'

export default function RequireSession({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useSession()
  const loc = useLocation()
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: loc }} />
  return <>{children}</>
}
