'use client'

import React, { useState } from 'react'
import { cn, getItemHref } from '@/utilities/ui'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'

type NavItem = NonNullable<Header['navItems']>[number]

interface NavMenuProps {
  menuItems: NavItem[]
}

export function NavMenu({ menuItems }: NavMenuProps) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const renderMenuItem = (item: NavItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const hasGrandchildren = item.grandchildren && item.grandchildren.length > 0

    if (level === 0) {
      return (
        <NavigationMenuItem key={item.item.link.label}>
          {hasChildren ? (
            <>
              <NavigationMenuTrigger className="bg-primary-foreground">
                {item.item.link.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-primary-foreground">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {item.children?.map((child) => renderMenuItem(child, level + 1))}
                </ul>
              </NavigationMenuContent>
            </>
          ) : (
            <CMSLink
              appearance="link"
              className={navigationMenuTriggerStyle()}
              {...item.item.link}
            />
          )}
        </NavigationMenuItem>
      )
    } else if (level === 1) {
      if (hasGrandchildren) {
        return (
          <li key={item.item.link.label}>
            <Collapsible
              open={openItems[item.item.link.label]}
              onOpenChange={() => toggleItem(item.item.link.label)}
            >
              <div className="flex items-center justify-between">
                <a
                  href={getItemHref(item.item)}
                  className="flex-grow py-2 text-sm font-medium hover:text-accent-foreground"
                >
                  {item.item.link.label}
                </a>
                <CollapsibleTrigger className="p-2">
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      openItems[item.item.link.label] && 'rotate-180',
                    )}
                  />
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent>
                <ul className="mt-2 space-y-1 pl-4">
                  {item.grandchildren?.map((grandchild) => (
                    <li key={grandchild.navigationTitle}>
                      <a
                        href={getItemHref(grandchild.item)}
                        className="block py-1 text-sm text-muted-foreground hover:text-accent-foreground"
                      >
                        {grandchild.navigationTitle}
                      </a>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
        )
      } else {
        return (
          <li key={item.item.link.label}>
            <CMSLink
              appearance="link"
              {...item.item.link}
              className="block py-2 text-sm font-medium hover:text-accent-foreground"
            >
              {item.item.link.label}
            </CMSLink>
          </li>
        )
      }
    }
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>{menuItems.map((item) => renderMenuItem(item))}</NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<React.ComponentRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </div>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'
