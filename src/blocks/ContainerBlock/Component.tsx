'use client'
import type { ContainerBlock as ContainerBlockProps } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'
import { ExpandableCard } from '@/components/ExpandableCard'

export const ContainerBlock: React.FC<ContainerBlockProps & { id?: string }> = (props) => {
  const { id, content, crop = 'default' } = props

  if (crop === 'wide') {
    return (
      <div className="py-4 mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4" id={`block-${id}`}>
        <RichText data={content} />
      </div>
    )
  }

  if (crop === 'normal') {
    return (
      <div id={`block-${id}`}>
        <ExpandableCard content={content} />
      </div>
    )
  }

  if (crop === 'narrow') {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" id={`block-${id}`}>
        <RichText data={content} />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-6 md:px-12 xl:px-6" id={`block-${id}`}>
      <RichText data={content} />
    </div>
  )
}
