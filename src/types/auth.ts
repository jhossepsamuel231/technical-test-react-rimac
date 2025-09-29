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
