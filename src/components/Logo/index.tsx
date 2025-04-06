'use client'

import { useTheme } from '@/providers/Theme'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Glass-Service Svendsen og Sønn AS Logo"
      sizes="50em, 30em, 20em"
      width={100}
      height={40}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('mr-3 block h-10 w-auto dark:block md:h-12', className)}
      src={
        mounted
          ? theme === 'dark'
            ? '/assets/logo-light.svg'
            : '/assets/logo-dark.svg'
          : '/assets/logo-dark.svg'
      }
    />
  )
}
