import { mkdir, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs', 'screenshots')
const PORT = 9230
const BASE = 'http://localhost:5173'
const CHROME = '/usr/bin/google-chrome-stable'

const shots = [
  { file: 'hero.jpg', path: '/', heading: null },
  { file: 'how-i-ship.jpg', path: '/', heading: 'From a single UI to production-ready.' },
  { file: 'user-stories.jpg', path: '/', heading: 'User stories' },
  { file: 'shipped.jpg', path: '/', heading: 'Shipped.' },
  { file: 'services.jpg', path: '/', heading: 'How you can hire the practice' },
  { file: 'about.jpg', path: '/about', heading: null },
]

function rpc(ws) {
  let n = 0
  return (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++n
      const onMessage = (event) => {
        const msg = JSON.parse(typeof event.data === 'string' ? event.data : String(event.data))
        if (msg.id !== id) return
        ws.removeEventListener('message', onMessage)
        if (msg.error) reject(new Error(`${method}: ${JSON.stringify(msg.error)}`))
        else resolve(msg.result)
      }
      ws.addEventListener('message', onMessage)
      ws.send(JSON.stringify({ id, method, params }))
    })
}

async function waitJson(url, tries = 50) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 200))
  }
  throw new Error(`Timed out waiting for ${url}`)
}

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    '--remote-debugging-address=127.0.0.1',
    '--window-size=1440,900',
    'about:blank',
  ],
  { stdio: 'ignore' },
)

try {
  await mkdir(OUT, { recursive: true })
  const pages = await waitJson(`http://127.0.0.1:${PORT}/json/list`)
  const page = pages.find((item) => item.type === 'page') ?? pages[0]
  if (!page?.webSocketDebuggerUrl) throw new Error('No Chrome page target')

  const ws = new WebSocket(page.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve)
    ws.addEventListener('error', reject)
  })
  const send = rpc(ws)

  await send('Page.enable')
  await send('Runtime.enable')
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false,
  })
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  })

  async function open(url) {
    const loaded = new Promise((resolve) => {
      const onMessage = (event) => {
        const msg = JSON.parse(typeof event.data === 'string' ? event.data : String(event.data))
        if (msg.method === 'Page.loadEventFired') {
          ws.removeEventListener('message', onMessage)
          resolve()
        }
      }
      ws.addEventListener('message', onMessage)
    })
    await send('Page.navigate', { url })
    await Promise.race([loaded, new Promise((r) => setTimeout(r, 8000))])
    await new Promise((r) => setTimeout(r, 1200))
    await send('Runtime.evaluate', {
      expression: `(() => {
        localStorage.setItem('abel-theme', 'dark');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        for (const el of document.querySelectorAll('.fixed.inset-x-0.bottom-5')) el.style.visibility = 'hidden';
        return document.readyState;
      })()`,
    })
    await new Promise((r) => setTimeout(r, 500))
  }

  for (const shot of shots) {
    await open(`${BASE}${shot.path}`)
    if (shot.heading) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          const el = [...document.querySelectorAll('h2')].find((h) => (h.textContent || '').includes(${JSON.stringify(shot.heading)}));
          if (!el) return false;
          window.scrollTo(0, Math.max(0, el.getBoundingClientRect().top + window.scrollY - 88));
          for (const dock of document.querySelectorAll('.fixed.inset-x-0.bottom-5')) dock.style.visibility = 'hidden';
          return true;
        })()`,
      })
      await new Promise((r) => setTimeout(r, 600))
    }
    const { data } = await send('Page.captureScreenshot', {
      format: 'jpeg',
      quality: 86,
      fromSurface: true,
    })
    const dest = join(OUT, shot.file)
    await writeFile(dest, Buffer.from(data, 'base64'))
    console.log('wrote', shot.file)
  }

  ws.close()
} finally {
  try {
    chrome.kill('SIGKILL')
  } catch {
    /* sandbox may deny kill */
  }
}
