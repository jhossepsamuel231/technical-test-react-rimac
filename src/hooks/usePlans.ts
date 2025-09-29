import { useQuery } from '@tanstack/react-query'
import type { PlansResponse, Plan } from '@/lib/plan-logic'

export function usePlans(enabled: boolean) {
  return useQuery<Plan[]>({
    queryKey: ['plans'],
    queryFn: async ({ signal }) => {
      const res = await fetch('https://rimac-front-end-challenge.netlify.app/api/plans.json', {
        signal,
      })
      if (!res.ok) throw new Error('Error al cargar planes')
      const json = (await res.json()) as PlansResponse
      return json.list
    },
    enabled,
    staleTime: 300_000,
    retry: 1,
  })
}
