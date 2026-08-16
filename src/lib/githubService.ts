export type GithubRepo = {
  name: string
  description: string
  url: string
  language: string | null
  updatedAt: string
}

export type GithubResult =
  | { status: 'disabled'; repos: [] }
  | { status: 'ok'; repos: GithubRepo[] }
  | { status: 'error'; repos: []; error: string }

/**
 * Optional live GitHub. Set VITE_GITHUB_USERNAME to enable.
 * No tokens. Public repos only.
 */
export async function listPublicRepos(): Promise<GithubResult> {
  const username = import.meta.env.VITE_GITHUB_USERNAME?.trim()
  if (!username) {
    return { status: 'disabled', repos: [] }
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=6`,
    )
    if (!response.ok) {
      return { status: 'error', repos: [], error: 'GitHub is unavailable right now.' }
    }
    const data = (await response.json()) as Array<{
      name: string
      description: string | null
      html_url: string
      language: string | null
      updated_at: string
      fork: boolean
    }>
    return {
      status: 'ok',
      repos: data
        .filter((repo) => !repo.fork)
        .slice(0, 6)
        .map((repo) => ({
          name: repo.name,
          description: repo.description ?? 'No description.',
          url: repo.html_url,
          language: repo.language,
          updatedAt: repo.updated_at,
        })),
    }
  } catch {
    return { status: 'error', repos: [], error: 'GitHub could not be reached.' }
  }
}
