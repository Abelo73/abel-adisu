# Design System — Abel Adisu

Source: UI UX Pro Max search + frontend-design critique + effective-ui-design rules.
Stack: React 19 + Vite + Tailwind v4 + React Router + Motion + Lucide.

## Brief

- Subject: Abel Adisu, full-stack engineer (Java/Spring, React, cloud, n8n).
- Audience: clients, recruiters, engineering collaborators.
- Job: prove he ships production systems — then make it easy to hire him.

## Pattern (adapted)

Hero-Centric + Trust. No fake logos, stats, reviews, or certifications.

Home sequence: thesis hero + living architecture → capability strip → selected studies → services → contact.

Site is a multi-route product, not a single long landing page.

## Style

**Rejected from Pro Max:** Liquid Glass (conflicts with “no cheap glassmorphism”), Cormorant/Montserrat (fashion, not engineering), indigo/purple SaaS palettes (AI default).

**Chosen:** Minimal Swiss structure + engineering-lab atmosphere.
- Fine grid, hairline borders, restrained tungsten accent
- Signature: interactive architecture graph (the one bold element)
- Motion: standard (300–450ms), skip under `prefers-reduced-motion`

## Color (pure black / pure white)

User override of the first palette. No warm paper, no tungsten gold.

### Dark (default)

| Token | Hex | Role |
|---|---|---|
| background | `#050505` | canvas |
| foreground | `#FFFFFF` | text |
| muted | `#A3A3A3` | secondary |
| accent | `#FFFFFF` | inverted CTA |
| accent-fg | `#050505` | text on CTA |
| line | `#1F1F1F` | borders |

### Light

| Token | Hex | Role |
|---|---|---|
| background | `#FFFFFF` | canvas |
| foreground | `#0A0A0A` | text |
| muted | `#525252` | secondary |
| accent | `#0A0A0A` | inverted CTA |
| accent-fg | `#FFFFFF` | text on CTA |
| line | `#E5E5E5` | borders |

Contrast targets: body ≥ 4.5:1, UI chrome ≥ 3:1.

## Typography

| Role | Face | Use |
|---|---|---|
| Display | Bricolage Grotesque | hero + page titles only |
| Body | Schibsted Grotesk | UI, body, nav |
| Mono | IBM Plex Mono | system labels, node names, code |

Scale (fluid, 8pt rhythm):
- display: clamp(2.5rem, 5vw, 4.5rem) / 1.1
- h1: clamp(2rem, 3vw, 2.75rem)
- h2: 1.75rem / 2.25rem
- h3: 1.25rem / 1.75rem
- body: 1.0625rem / 1.7
- ui: 0.875rem / 1.4
- mono label: 0.6875rem / 1.4 / tracking 0.08em uppercase

Weights: 400, 500, 700 only.

## Layout

Product shell: sticky 64px command bar, max content 1120px, 8pt spacing (8/16/24/32/48/80).
Hairline radius: 8px controls, 12px panels. No giant cards.

## Signature

Living architecture graph: React → gateway → Spring → Kafka → Postgres, with an n8n automation branch. Click a node to read a short explanation. Pulse data-flow. Static under reduced motion.

## Motion

- Page enter: 180ms opacity + 8px translate
- Hover: 150–200ms
- Stagger: 40–60ms, max 6 items
- No parallax, no bounce, no infinite pulse on CTAs
- Magnetic buttons: desktop only, 8px max pull

## Anti-patterns

No emoji icons, no skill %, no fake metrics, no neon, no Inter, no purple gradients, no acid green, no cream+terracotta, no lorem ipsum.
