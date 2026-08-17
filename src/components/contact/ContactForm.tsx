import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { contactSchema } from '@/lib/contactSchema'
import { submitContact } from '@/lib/contactService'

const intents = [
  'Build a backend system',
  'Build a full-stack application',
  'Automate a workflow',
  'Build an AI automation system',
  'Improve an existing application',
  'Discuss freelance work',
]

const fieldClass = 'mt-2 min-h-12 w-full rounded-full border border-line bg-card px-4'

export function ContactForm() {
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
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <Field label="Your full name" name="name" error={errors.name} autoComplete="name" />
      <Field label="Email address" name="email" type="email" error={errors.email} autoComplete="email" />
      <Field label="Company" name="company" error={errors.company} optional autoComplete="organization" />
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium">
          What this is about
        </label>
        <select
          id="projectType"
          name="projectType"
          aria-invalid={Boolean(errors.projectType)}
          className={fieldClass}
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
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 w-full rounded-[24px] border border-line bg-card px-4 py-3"
        />
        {errors.message ? <p className="mt-1 text-sm text-danger">{errors.message}</p> : null}
      </div>
      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </Button>
      {status === 'ok' ? (
        <p className="text-sm text-ok" role="status">
          Thanks for writing. I’ll reply by email.
        </p>
      ) : null}
      {status === 'error' ? (
        <p className="text-sm text-danger" role="alert">
          {message}
        </p>
      ) : null}
    </form>
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
        aria-invalid={Boolean(error)}
        className={fieldClass}
      />
      {error ? <p className="mt-1 text-sm text-danger">{error}</p> : null}
    </div>
  )
}
