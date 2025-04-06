import type { CollectionBeforeChangeHook } from 'payload'

export const changeLabel: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    console.log('data', req)
    if (req.data && !req.data.label) {
      return {
        ...data,
        label: data.title,
      }
    }
  }

  return data
}
