import { getJSON } from './api'
import type { Session, UserProfile, DocType } from '@/types/auth'

const SESSION_KEY = 'app.session.v1'
const SESSION_TTL_MS = 2 * 60 * 60 * 1000

const VALID_USERS: Array<{ docType: DocType; docNum: string; phone: string }> = [
  { docType: 'DNI', docNum: '30216147', phone: '987654321' },
  { docType: 'RUC', docNum: '20123456789', phone: '912345678' },
]

const isValidDNI = (v: string) => /^\d{8}$/.test(v)
const isValidRUC = (v: string) => /^(10|20)\d{9}$/.test(v)
const isValidPhone = (v: string) => /^\d{9}$/.test(v)

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as Session
    if (Date.now() > s.expiresAt) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return s
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function setSession(s: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(s))
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

export async function login(params: {
  docType: DocType
  docNum: string
  phone: string
}): Promise<Session> {
  if (params.docType === 'DNI' && !isValidDNI(params.docNum)) {
    throw new Error('DNI inválido (8 dígitos).')
  }
  if (params.docType === 'RUC' && !isValidRUC(params.docNum)) {
    throw new Error('RUC inválido (11 dígitos y empieza con 10/20).')
  }
  if (!isValidPhone(params.phone)) {
    throw new Error('Celular inválido (9 dígitos).')
  }

  const ok = VALID_USERS.some(
    (u) => u.docType === params.docType && u.docNum === params.docNum && u.phone === params.phone,
  )
  if (!ok) throw new Error('Credenciales incorrectas.')

  const profile = await getJSON<UserProfile>(
    'https://rimac-front-end-challenge.netlify.app/api/user.json',
  )

  const now = Date.now()
  const session: Session = {
    profile,
    ...params,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
  }

  setSession(session)
  return session
}

export function logout() {
  clearSession()
}
