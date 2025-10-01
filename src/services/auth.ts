import { getJSON } from './api'
import type { Session, UserProfile, DocType } from '@/types/auth'
import { isDni as isValidDNI, isRuc as isValidRUC, isPhone as isValidPhone } from '@/lib/validators'

const SESSION_KEY = 'app.session.v1'
const SESSION_TTL_MS = 2 * 60 * 60 * 1000

const VALID_USERS: Array<{ docType: DocType; docNum: string; phone: string }> = [
  { docType: 'DNI', docNum: '30216147', phone: '987654321' },
  { docType: 'RUC', docNum: '20123456789', phone: '912345678' },
]

export function getSession(): Session | null {
  try {
    const serialized = localStorage.getItem(SESSION_KEY)
    if (!serialized) return null

    const storedSession = JSON.parse(serialized) as Session
    const nowMs = Date.now()

    if (nowMs > storedSession.expiresAt) {
      localStorage.removeItem(SESSION_KEY)
      return null
    }
    return storedSession
  } catch {
    localStorage.removeItem(SESSION_KEY)
    return null
  }
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
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

  const isValidCredentials = VALID_USERS.some(
    (user) =>
      user.docType === params.docType &&
      user.docNum === params.docNum &&
      user.phone === params.phone,
  )
  if (!isValidCredentials) throw new Error('Credenciales incorrectas.')

  const userProfile = await getJSON<UserProfile>(
    'https://rimac-front-end-challenge.netlify.app/api/user.json',
  )

  const nowMs = Date.now()
  const newSession: Session = {
    profile: userProfile,
    ...params,
    createdAt: nowMs,
    expiresAt: nowMs + SESSION_TTL_MS,
  }

  setSession(newSession)
  return newSession
}

export function logout() {
  clearSession()
}
