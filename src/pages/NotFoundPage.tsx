import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'

export function NotFoundPage() {
  return (
    <Container className="py-24">
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted">404</p>
      <h1 className="font-display mt-4 text-4xl">This route is not in the system.</h1>
      <p className="mt-4 text-muted">The page may have moved, or it never existed.</p>
      <Link to="/" className="mt-8 inline-flex min-h-12 items-center underline-offset-4 hover:underline">
        Back to home
      </Link>
    </Container>
  )
}
