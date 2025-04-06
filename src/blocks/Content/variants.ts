import { cva } from 'class-variance-authority'

export const contentColumnVariants = cva('px-6 md:px-32 xl:px-6', {
  variants: {
    size: {
      full: 'col-span-4 md:col-span-8 lg:col-span-12',
      half: 'col-span-4 md:col-span-4 lg:col-span-6',
      oneThird: 'col-span-4 md:col-span-4 lg:col-span-4',
      twoThirds: 'col-span-4 md:col-span-4 lg:col-span-8',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})
