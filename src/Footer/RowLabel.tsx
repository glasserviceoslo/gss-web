'use client'
import { Footer } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

type NavItem = NonNullable<NonNullable<Footer['navGroups']>[number]['items']>[number]
type NavGroup = NonNullable<Footer['navGroups']>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NavItem | NavGroup>()

  let label = 'Row'
  if ('link' in data?.data) {
    label = data?.data?.link?.label ? data?.data?.link?.label : 'Row'
  } else {
    label = data?.data?.label ? data?.data?.label : 'Row'
  }

  return <div>{label}</div>
}
