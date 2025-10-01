import type { Session, UserProfile } from '@/types/auth'

export type NormalizedUser = {
  firstName: string
  fullName: string
  birthDateISO: string | null
  documentType: 'DNI' | 'RUC'
  documentNumber: string
  mobilePhone: string
}

export function parseBirthDateToISO(birthDay?: string): string | null {
  if (!birthDay) return null
  const [dd, mm, yyyy] = birthDay.split('-')
  if (!dd || !mm || !yyyy) return null
  const iso = `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`
  const check = new Date(`${iso}T00:00:00`)
  return Number.isNaN(check.getTime()) ? null : iso
}

export function normalizeUser(profile?: UserProfile, session?: Session | null): NormalizedUser {
  const firstName = (profile?.name ?? '').trim()
  const lastName = (profile?.lastName ?? '').trim()
  const fullName = [firstName, lastName].filter(Boolean).join(' ').trim() || 'Usuario'

  return {
    firstName: firstName || 'Usuario',
    fullName,
    birthDateISO: parseBirthDateToISO(profile?.birthDay),
    documentType: (session?.docType ?? 'DNI') as 'DNI' | 'RUC',
    documentNumber: session?.docNum ?? '',
    mobilePhone: session?.phone ?? '',
  }
}
