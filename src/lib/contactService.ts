export type ContactPayload = {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
}

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string }

/**
 * Swap this for a real HTTP call when VITE_CONTACT_ENDPOINT is set.
 * Never log the message body in production telemetry without consent.
 */
export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600))
    if (import.meta.env.DEV) {
      console.info('[contact] endpoint unset — payload accepted locally', {
        name: payload.name,
        projectType: payload.projectType,
      })
    }
    return { ok: true }
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      return { ok: false, error: 'The message could not be sent. Try email instead.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Try again or use email.' }
  }
}
