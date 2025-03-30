'use client'

import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

interface FAQItem {
  question: string
  answer: {
    [k: string]: unknown
  }[]
}

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<FAQItem>()
  return <div>{data.data.question}</div>
}
