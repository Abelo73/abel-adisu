import { Link } from 'react-router-dom'
import { profile } from '@/content/profile'
import { Container } from '@/components/ui/Container'
import { isConfiguredUrl } from '@/lib/links'

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg">{profile.name}</p>
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
          {isConfiguredUrl(profile.social.github) ? (
            <li>
              <a href={profile.social.github} className="underline-offset-4 hover:underline">
                GitHub
              </a>
            </li>
          ) : null}
          {isConfiguredUrl(profile.social.linkedin) ? (
            <li>
              <a href={profile.social.linkedin} className="underline-offset-4 hover:underline">
                LinkedIn
              </a>
            </li>
          ) : null}
          {isConfiguredUrl(profile.social.upwork) ? (
            <li>
              <a href={profile.social.upwork} className="underline-offset-4 hover:underline">
                Upwork
              </a>
            </li>
          ) : null}
        </ul>
      </Container>
    </footer>
  )
}
