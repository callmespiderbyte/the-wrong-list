const COOKIE_NAME = 'twl_cookie_consent'
const COOKIE_DAYS = 365

export function getConsent(): 'accepted' | 'declined' | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  const val = decodeURIComponent(match[1])
  if (val === 'accepted' || val === 'declined') return val
  return null
}

export function setConsent(value: 'accepted' | 'declined'): void {
  if (typeof document === 'undefined') return
  const expires = new Date()
  expires.setDate(expires.getDate() + COOKIE_DAYS)
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
}

export function hasConsented(): boolean {
  return getConsent() === 'accepted'
}

export function clearConsent(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}
