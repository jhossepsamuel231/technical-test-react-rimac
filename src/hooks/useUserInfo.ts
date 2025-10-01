import { useMemo } from 'react'
import { useSession } from '@/hooks/useSession'
import { normalizeUser } from '@/lib/user-normalize'
import { calcAge } from '@/lib/plan-logic'

export function useUserInfo() {
  const { session, isAuthenticated } = useSession()

  const normalizedUser = useMemo(() => normalizeUser(session?.profile, session), [session])

  const ageYears = useMemo(
    () => (normalizedUser.birthDateISO ? calcAge(normalizedUser.birthDateISO) : null),
    [normalizedUser.birthDateISO],
  )

  return {
    isAuthenticated,
    session,
    user: normalizedUser,
    ageYears,
  }
}
