export interface ParsedContent {
  title: string
  image: string
  imageAlt: string
  text: string
  href?: string
  anchorText?: string
}

export type Theme = 'dark' | 'light'
