export function isConfiguredUrl(value: string) {
  return value.startsWith('http://') || value.startsWith('https://')
}

export function isConfiguredEmail(value: string) {
  return value.includes('@') && !value.includes('EMAIL_')
}

export const newTab = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const
