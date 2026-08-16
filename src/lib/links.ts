export function isConfiguredUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://')
}

export function isConfiguredEmail(value: string) {
  return value.includes('@') && !value.includes('EMAIL_')
}
