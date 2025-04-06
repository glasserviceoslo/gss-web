'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { Media } from '@/components/Media'
import WordPullUp from '@/components/WordPullUp'

export const AnimatedHero: React.FC<Page['hero'] & { title: string }> = ({ media, title }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <article
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      // className="group min-h-[calc(100vh-289px)]"
      data-theme="dark"
    >
      {/* <div className="min-h-[80vh] select-none"> */}
      <div className="relative h-[80vh] select-none min-h-[500px] w-full mb-12">
        {media && typeof media === 'object' && (
          <>
            <Media fill imgClassName="-z-10 object-cover" priority resource={media} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30 transition-opacity duration-300 group-hover:opacity-90" />
            <header className="relative h-full flex flex-col items-center justify-center px-4">
              <WordPullUp
                className="max-w-5xl mx-auto text-center text-4xl font-bold tracking-[-0.02em] text-white md:text-7xl leading-[3rem] md:leading-[6rem]"
                words={title}
              />
            </header>
          </>
        )}
      </div>
    </article>
  )
}
