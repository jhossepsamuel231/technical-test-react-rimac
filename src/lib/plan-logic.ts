import type { Plan } from '@/types/auth'

export function calcAge(dob: string | Date, now = new Date()): number {
  const birth = new Date(dob)
  const age = now.getFullYear() - birth.getFullYear()
  const hadBirthday =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate())
  return hadBirthday ? age : age - 1
}

export const filterByAge = (plans: Plan[], userAge: number) => plans.filter((p) => userAge <= p.age)

export function pickRecommendedIndex(plans: Plan[], userAge: number): number | null {
  if (!plans.length) return null
  let best = 0
  let bestDiff = plans[0].age - userAge
  for (let i = 1; i < plans.length; i++) {
    const diff = plans[i].age - userAge
    if (diff < bestDiff || (diff === bestDiff && plans[i].price < plans[best].price)) {
      best = i
      bestDiff = diff
    }
  }
  return best
}

export const finalPrice = (price: number, forSomeoneElse: boolean) =>
  forSomeoneElse ? Math.round(price * 0.95 * 100) / 100 : price
