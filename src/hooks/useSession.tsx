import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getSession, login as authLogin, logout as authLogout } from '@/services/auth'
import type { Session, DocType } from '@/types/auth'

type Ctx = {
  session: Session | null
  isAuthenticated: boolean
  login: (p: { docType: DocType; docNum: string; phone: string }) => Promise<void>
  logout: () => void
}

const SessionCtx = createContext<Ctx | null>(null)

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    setSession(getSession())
  }, [])

  const api = useMemo<Ctx>(
    () => ({
      session,
      isAuthenticated: !!session,
      async login(p) {
        const s = await authLogin(p)
        setSession(s)
      },
      logout() {
        authLogout()
        setSession(null)
      },
    }),
    [session],
  )

  return <SessionCtx.Provider value={api}>{children}</SessionCtx.Provider>
}

export function useSession() {
  const ctx = useContext(SessionCtx)
  if (!ctx) throw new Error('useSession must be used within SessionProvider')
  return ctx
}
