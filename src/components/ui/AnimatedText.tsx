import { Children, cloneElement, isValidElement, type ElementType, type ReactElement, type ReactNode } from 'react'
import { motion } from 'motion/react'
import { useReducedMotion } from '@/hooks/useMedia'

type Props = {
  as?: ElementType
  className?: string
  children: ReactNode
  /** Seconds between words. Headings feel best slow, paragraphs fast. */
  stagger?: number
  delay?: number
}

/** Reveals text word by word (blur to sharp, rising) once it scrolls into view.
 *  Gradient spans are kept whole so their background-clip keeps working. */
export function AnimatedText({ as: Tag = 'p', className, children, stagger = 0.06, delay = 0 }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return <Tag className={className}>{children}</Tag>

  let index = 0
  const unit = (content: ReactNode, key: string, extraClass?: string) => {
    const i = index++
    return (
      <motion.span
        key={key}
        className={`inline-block${extraClass ? ` ${extraClass}` : ''}`}
        initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {content}
      </motion.span>
    )
  }

  const walk = (node: ReactNode, path: string): ReactNode =>
    Children.map(node, (child, i) => {
      const key = `${path}-${i}`
      if (typeof child === 'string') {
        return child.split(/(\s+)/).map((part, j) =>
          /^\s+$/.test(part) || part === '' ? part : unit(part, `${key}-${j}`),
        )
      }
      if (isValidElement(child)) {
        const el = child as ReactElement<{ className?: string; children?: ReactNode }>
        if (el.props.className?.includes('story-gradient')) {
          return cloneElement(unit(el.props.children, key, el.props.className) as ReactElement, { key })
        }
        return cloneElement(el, { key }, walk(el.props.children, key))
      }
      return child
    })

  return <Tag className={className}>{walk(children, 'w')}</Tag>
}
