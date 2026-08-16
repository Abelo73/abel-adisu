import { useState, type FormEvent } from 'react'
import { profile } from '@/content/profile'
import { labItems } from '@/content/lab'
import { Button } from '@/components/ui/Button'
import { Container, PageIntro } from '@/components/ui/Container'
import { contactSchema } from '@/lib/contactSchema'
import { submitContact } from '@/lib/contactService'
import { isConfiguredEmail, isConfiguredUrl } from '@/lib/links'

const intents = [
  'Build a backend system',
  'Build a full-stack application',
  'Automate a workflow',
  'Build an AI automation system',
  'Improve an existing application',
  'Discuss freelance work',
]

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const parsed = contactSchema.safeParse({
      name: form.get('name'),
      email: form.get('email'),
      company: form.get('company') || undefined,
      projectType: form.get('projectType'),
      message: form.get('message'),
    })
    if (!parsed.success) {
      const next: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0])
        if (!next[key]) next[key] = issue.message
      }
      setErrors(next)
      setStatus('idle')
      return
    }
    setErrors({})
    setStatus('submitting')
    const result = await submitContact(parsed.data)
    if (result.ok) {
      setStatus('ok')
      event.currentTarget.reset()
    } else {
      setStatus('error')
      setMessage(result.error)
    }
  }

  return (
    <Container as="article" className="pb-20">
      <PageIntro
        eyebrow="Contact"
        title="Have a system you want to build?"
        lede="Pick the shape of the work, then send enough context to start a real conversation."
      />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <form onSubmit={onSubmit} className="space-y-5" noValidate>
          <Field label="Name" name="name" error={errors.name} autoComplete="name" />
          <Field label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
          <Field label="Company" name="company" error={errors.company} optional autoComplete="organization" />
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium">
              Project type
            </label>
            <select
              id="projectType"
              name="projectType"
              className="mt-2 min-h-12 w-full rounded-[8px] border border-line bg-bg px-3"
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              {intents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </select>
            {errors.projectType ? <p className="mt-1 text-sm text-danger">{errors.projectType}</p> : null}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              className="mt-2 w-full rounded-[8px] border border-line bg-bg px-3 py-3"
            />
            {errors.message ? <p className="mt-1 text-sm text-danger">{errors.message}</p> : null}
          </div>
          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </Button>
          {status === 'ok' ? (
            <p className="text-sm text-ok" role="status">
              Message recorded. Connect VITE_CONTACT_ENDPOINT to deliver it to an inbox.
            </p>
          ) : null}
          {status === 'error' ? (
            <p className="text-sm text-danger" role="alert">
              {message}
            </p>
          ) : null}
        </form>
        <aside>
          <h2 className="font-display text-2xl">Other channels</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              Email:{' '}
              {isConfiguredEmail(profile.email) ? (
                <a className="underline" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              ) : (
                <span className="text-muted">set EMAIL_ADDRESS in profile.ts</span>
              )}
            </li>
            <li>
              GitHub:{' '}
              {isConfiguredUrl(profile.social.github) ? (
                <a className="underline" href={profile.social.github}>
                  Profile
                </a>
              ) : (
                <span className="text-muted">GITHUB_PROFILE_URL</span>
              )}
            </li>
            <li>
              LinkedIn:{' '}
              {isConfiguredUrl(profile.social.linkedin) ? (
                <a className="underline" href={profile.social.linkedin}>
                  Profile
                </a>
              ) : (
                <span className="text-muted">LINKEDIN_PROFILE_URL</span>
              )}
            </li>
            <li>
              Upwork:{' '}
              {isConfiguredUrl(profile.social.upwork) ? (
                <a className="underline" href={profile.social.upwork}>
                  Profile
                </a>
              ) : (
                <span className="text-muted">UPWORK_PROFILE_URL</span>
              )}
            </li>
          </ul>
          <p className="mt-8 text-sm text-muted">
            Currently exploring: {labItems.map((item) => item.title).slice(0, 3).join(', ')}.
          </p>
        </aside>
      </div>
    </Container>
  )
}

function Field({
  label,
  name,
  error,
  type = 'text',
  optional,
  autoComplete,
}: {
  label: string
  name: string
  error?: string
  type?: string
  optional?: boolean
  autoComplete?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {optional ? <span className="text-muted"> (optional)</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-2 min-h-12 w-full rounded-[8px] border border-line bg-bg px-3"
      />
      {error ? <p className="mt-1 text-sm text-danger">{error}</p> : null}
    </div>
  )
}
