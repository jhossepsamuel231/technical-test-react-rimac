import { useQuery } from '@tanstack/react-query'
import { getPlans } from '@/services/plans'
import type { Plan } from '@/types/auth'

export function usePlans(enabled = true) {
  return useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: () => getPlans(),
    enabled,
    staleTime: 300_000,
    retry: 1,
  })
}
