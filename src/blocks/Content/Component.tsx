import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { contentColumnVariants } from './variants'
import { TracingBeam } from '@/components/ui/tracing-beam'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  return (
    <div className="container my-16">
      <TracingBeam>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-y-8 gap-x-16">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col
              return (
                <div className={contentColumnVariants({ size: size || 'full' })} key={index}>
                  {richText && <RichText data={richText} enableGutter={false} />}
                  {enableLink && <CMSLink {...link} />}
                </div>
              )
            })}
        </div>
      </TracingBeam>
    </div>
  )
}
