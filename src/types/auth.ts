export type DocType = 'DNI' | 'RUC'

export type UserProfile = {
  name: string
  lastName: string
  birthDay: string
}

export type Session = {
  profile: UserProfile
  docType: DocType
  docNum: string
  phone: string
  createdAt: number
  expiresAt: number
}

export type Plan = { name: string; price: number; description: string[]; age: number }
export type PlansResponse = { list: Plan[] }
