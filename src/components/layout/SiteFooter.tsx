import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'
import { Container } from '@/components/ui/Container'
import { isConfiguredEmail, isConfiguredUrl, newTab } from '@/lib/links'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line/60 pb-28">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.signal}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li>
            <Link to="/projects" className="underline-offset-4 hover:underline">
              Work
            </Link>
          </li>
          <li>
            <Link to="/contact" className="underline-offset-4 hover:underline">
              Contact
            </Link>
          </li>
          {isConfiguredEmail(profile.email) ? (
            <li>
              <a href={`mailto:${profile.email}`} className="underline-offset-4 hover:underline">
                Email
              </a>
            </li>
          ) : null}
          {isConfiguredUrl(profile.social.github) ? (
            <li>
              <a href={profile.social.github} {...newTab} className="underline-offset-4 hover:underline">
                GitHub
              </a>
            </li>
          ) : null}
          {isConfiguredUrl(profile.social.linkedin) ? (
            <li>
              <a href={profile.social.linkedin} {...newTab} className="underline-offset-4 hover:underline">
                LinkedIn
              </a>
            </li>
          ) : null}
          {isConfiguredUrl(profile.social.upwork) ? (
            <li>
              <a href={profile.social.upwork} {...newTab} className="underline-offset-4 hover:underline">
                Upwork
              </a>
            </li>
          ) : null}
        </ul>
      </Container>
    </footer>
  )
}
