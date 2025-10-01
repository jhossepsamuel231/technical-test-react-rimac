import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSession, login as loginService, logout as logoutService } from '@/services/auth'
import type { Session, DocType } from '@/types/auth'

export function SessionProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function useSession() {
  const queryClient = useQueryClient()

  const { data: session } = useQuery<Session | null>({
    queryKey: ['session'],
    queryFn: () => Promise.resolve(getSession()),

    initialData: () => getSession(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
  })

  const loginMutation = useMutation({
    mutationFn: (payload: { docType: DocType; docNum: string; phone: string }) =>
      loginService(payload),
    onSuccess: (newSession) => {
      queryClient.setQueryData(['session'], newSession)
    },
  })

  function logout() {
    logoutService()
    queryClient.setQueryData(['session'], null)
  }

  return {
    session: session ?? null,
    isAuthenticated: Boolean(session),
    login: (payload: { docType: DocType; docNum: string; phone: string }) =>
      loginMutation.mutateAsync(payload),
    logout,
  }
}
