'use client'

import React from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import type { Header } from '@/payload-types'

interface NavMenuClientProps {
  menuItems: Header['navItems']
}

export function NavMenuClient({ menuItems }: NavMenuClientProps) {
  const getItemHref = (item: NonNullable<Header['navItems']>[number]['link']) => {
    if (item.type === 'reference' && item.reference) {
      const { relationTo, value } = item.reference
      return `/${relationTo}/${value}`
    }
    return item.url || '#'
  }

  if (!menuItems) return null

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <Link
              href={getItemHref(item.link)}
              className={navigationMenuTriggerStyle()}
              target={item.link.newTab ? '_blank' : undefined}
              rel={item.link.newTab ? 'noopener noreferrer' : undefined}
            >
              {item.link.label}
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
