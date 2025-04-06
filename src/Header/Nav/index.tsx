'use client'

import React, { useEffect } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { BookBefaring } from '@/components/BookBefaring'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { NavMenu } from './NavMenu'
import { Logo } from '@/components/Logo'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data.navItems || []

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-border bg-primary-foreground px-4 py-3">
      <div className="flex flex-wrap items-center justify-between px-4 lg:px-12">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <div className="flex items-center gap-2 md:order-2">
          <Link href="/search">
            <span className="sr-only">Search</span>
            <SearchIcon className="w-5 text-primary" />
          </Link>
          <ThemeSelector />
          <BookBefaring pulsate />
          {/* <MobileMenu client:load menuItems={menuItems} /> */}
        </div>
        <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
          <NavMenu menuItems={navItems} />
        </div>
      </div>
    </nav>
    // <nav className="fixed left-0 top-0 z-30 w-full border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-600 dark:bg-background">
    //   <Link href="/">
    //     <Logo loading="eager" priority="high" />
    //   </Link>
    //   {/* {navItems.map(({ item }, i) => {
    //     return <CMSLink key={i} {...item.link} appearance="link" />
    //   })} */}
    //   <div className="flex flex-wrap items-center justify-between px-4 lg:px-12">
    //     <div className="flex items-center gap-2 md:order-2">
    //       <ThemeSelector />
    //       <BookBefaring pulsate />
    //       <Link href="/search">
    //         <span className="sr-only">Search</span>
    //         <SearchIcon className="w-5 text-primary" />
    //       </Link>
    //       {/* <MobileMenu client:load menuItems={menuItems} /> */}
    //     </div>
    //     <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto">
    //       <NavMenu menuItems={navItems} />
    //     </div>
    //   </div>
    // </nav>
  )
}
