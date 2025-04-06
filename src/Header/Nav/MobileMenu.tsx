import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

type NavItem = NonNullable<Header['navItems']>[number]
type NavChild = NonNullable<NavItem['children']>[number]
type NavGrandchild = NonNullable<NavChild['grandchildren']>[number]

interface MobileMenuProps {
  menuItems: NonNullable<Header['navItems']>
}

export function MobileMenu({ menuItems }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({ ...prev, [title]: !prev[title] }))
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const renderMenuItem = (item: NavItem | NavChild, level: number = 0) => {
    const hasChildren = 'children' in item && item.children && item.children.length > 0
    const hasGrandchildren =
      'grandchildren' in item && item.grandchildren && item.grandchildren.length > 0

    if (level === 0) {
      return (
        <Collapsible
          key={item.item.link.label}
          open={openItems[item.item.link.label]}
          onOpenChange={() => toggleItem(item.item.link.label)}
        >
          <CollapsibleTrigger className="flex w-full items-center justify-between text-lg font-medium">
            {hasChildren ? (
              <span>{item.item.link.label}</span>
            ) : (
              <div onClick={handleLinkClick}>
                <CMSLink appearance="link" {...item.item.link} className="w-full text-left" />
              </div>
            )}
            {hasChildren && (
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  openItems[item.item.link.label] && 'rotate-180',
                )}
              />
            )}
          </CollapsibleTrigger>
          {hasChildren && (
            <CollapsibleContent className="mt-2 space-y-2">
              {item.children?.map((child) => renderMenuItem(child, level + 1))}
            </CollapsibleContent>
          )}
        </Collapsible>
      )
    } else if (level === 1) {
      const child = item as NavChild
      if (hasGrandchildren) {
        return (
          <Collapsible
            key={child.item.link.label}
            open={openItems[child.item.link.label]}
            onOpenChange={() => toggleItem(child.item.link.label)}
          >
            <CollapsibleTrigger className="flex w-full items-center justify-between text-base font-medium pl-4 pr-2">
              <div onClick={handleLinkClick}>
                <CMSLink appearance="link" {...child.item.link} className="w-full text-left" />
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  openItems[child.item.link.label] && 'rotate-180',
                )}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2 pl-8">
              {child.grandchildren?.map((grandchild: NavGrandchild) => (
                <div key={grandchild.item.link.label} onClick={handleLinkClick}>
                  <CMSLink appearance="link" {...grandchild.item.link} className="block text-sm" />
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        )
      } else {
        return (
          <div key={child.item.link.label} onClick={handleLinkClick}>
            <CMSLink
              appearance="link"
              {...child.item.link}
              className="block text-base font-medium pl-4"
            />
          </div>
        )
      }
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => renderMenuItem(item))}
          <Link
            href="/befaring"
            className={cn(
              'relative text-center cursor-pointer flex justify-center items-center rounded-lg text-white dark:text-black bg-blue-500 dark:bg-blue-500 px-4 py-2',
            )}
            style={
              {
                '--pulse-color': '#0096ff',
                '--duration': '1.5s',
              } as React.CSSProperties
            }
            onClick={handleLinkClick}
          >
            <div className="relative z-10 dark:text-white">Book Befaring</div>
            <div className="absolute top-1/2 left-1/2 size-full rounded-lg bg-inherit animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
