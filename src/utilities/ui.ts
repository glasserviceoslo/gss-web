/**
 * Utility functions for UI components automatically added by ShadCN and used in a few of our frontend components and blocks.
 *
 * Other functions may be exported from here in the future or by installing other shadcn components.
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ParsedContent } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (error) => {
      reject(error)
    }
  })
}

export function extractImageUrls(body: string): { src: string; alt: string }[] {
  const imageRegex = /\[(.*?)\]\((.*?\.(?:jpg|png))\)/g
  const matches = body.match(imageRegex) || []
  return matches.map((match) => {
    const [_, alt, src] = match.match(/\[(.*?)\]\((.*?\.(?:jpg|png))\)/) || []
    return { alt, src }
  })
}

export function getItemHref(item: MenuItems[number]['item']) {
  switch (item.discriminant) {
    case 'page':
    case 'post':
      return `/${item.value}`
    case 'glasstype':
      return `/glasstyper/${item.value}`
    case 'custom':
      return `/${item.value.toLowerCase().replace(/\s+/g, '-')}`
  }
}

export function getExcerpt(content: string, length = 100) {
  const postContent = content
    .replace(/^\s*$(?:\r\n?|\n)/gm, '')
    .split('\n')
    .filter((line) => !line.startsWith('#') && !line.startsWith('['))
    .join(' ')

  return `${postContent.substring(0, length).trim()}...`
}

export function getStarRating(rating: string) {
  switch (rating) {
    case 'ONE':
      return 1
    case 'TWO':
      return 2
    case 'THREE':
      return 3
    case 'FOUR':
      return 4
    case 'FIVE':
      return 5
    default:
      return 0
  }
}

export function cleanComment(comment: string | undefined): string {
  if (!comment) return ''

  // If comment contains "(Original)", extract the original text
  if (comment.includes('(Original)')) {
    const originalText = comment.split('(Original)\n')[1]
    return originalText || ''
  }

  // Return the comment as-is if it doesn't contain translations
  return comment
}

export function parseLexicalContent(content: any): ParsedContent {
  const root = content.root
  const children = root.children || []

  let title = ''
  let image = ''
  let imageAlt = ''
  let text = ''
  let href = ''
  let anchorText = ''

  for (const child of children) {
    if (child.type === 'heading' && child.tag === 'h3') {
      title = child.children?.[0]?.text || ''
    } else if (child.type === 'paragraph') {
      const paragraphText = child.children?.[0]?.text || ''
      if (child.children?.[0]?.type === 'link') {
        href = child.children[0].url || ''
        anchorText = child.children[0].children?.[0]?.text || ''
      }
      text += paragraphText + ' '
    } else if (child.type === 'image') {
      image = child.src || ''
      imageAlt = child.alt || ''
    }
  }

  return {
    title,
    image,
    imageAlt,
    text: text.trim(),
    href,
    anchorText,
  }
}
