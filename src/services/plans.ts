import { getJSON } from './api'
import type { PlansResponse, Plan } from '@/types/auth'

export function getPlans() {
  return getJSON<PlansResponse>(
    'https://rimac-front-end-challenge.netlify.app/api/plans.json',
  ).then((res) => res.list as Plan[])
}
