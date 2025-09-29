export type DocType = 'DNI' | 'RUC'

export interface UserProfile {
  name: string
  lastName: string
  birthDay: string
}

export interface Session {
  profile: UserProfile
  docType: DocType
  docNum: string
  phone: string
  createdAt: number
  expiresAt: number
}
