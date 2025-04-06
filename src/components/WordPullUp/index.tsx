import { motion, type Variants } from 'motion/react'
import { Highlight } from '../ui/hero-highlight'
import { cn } from '@/utilities/ui'

interface WordPullUpProps {
  words: string
  delayMultiple?: number
  wrapperFramerProps?: Variants
  framerProps?: Variants
  className?: string
}

export default function WordPullUp({
  words,
  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  className,
}: WordPullUpProps) {
  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        'font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-xs',
        className,
      )}
    >
      <Highlight>
        {words.split(' ').map((word, i) => (
          <motion.span key={i} variants={framerProps} className="inline-block px-1 md:px-2">
            {word === '' ? <span>&nbsp;</span> : word}
          </motion.span>
        ))}
      </Highlight>
    </motion.h1>
  )
}
