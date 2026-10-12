import { useEffect, useState } from 'react'
import { listPublicRepos, type GithubResult } from '@/lib/githubService'
import { newTab } from '@/lib/links'

export function GithubRepos() {
  const [result, setResult] = useState<GithubResult | { status: 'loading'; repos: [] }>({
    status: 'loading',
    repos: [],
  })

  useEffect(() => {
    let cancelled = false
    listPublicRepos().then((next) => {
      if (!cancelled) setResult(next)
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (result.status === 'loading') {
    return (
      <p className="text-sm text-muted" role="status">
        Checking GitHub…
      </p>
    )
  }
  if (result.status === 'disabled') {
    return (
      <p className="text-sm text-muted">
        Public GitHub listing is off until <code className="font-mono text-xs">VITE_GITHUB_USERNAME</code> is set.
      </p>
    )
  }
  if (result.status === 'error') {
    return (
      <p className="text-sm text-danger" role="alert">
        {result.error}
      </p>
    )
  }
  if (result.repos.length === 0) {
    return <p className="text-sm text-muted">No public repositories to show.</p>
  }

  return (
    <ul className="overflow-hidden rounded-[16px] border border-line bg-card">
      {result.repos.map((repo) => (
        <li key={repo.url} className="border-b border-line last:border-b-0">
          <a href={repo.url} {...newTab} className="block px-4 py-3 hover:bg-fg/5">
            <span className="font-medium">{repo.name}</span>
            <span className="mt-1 block text-sm text-muted">{repo.description}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
