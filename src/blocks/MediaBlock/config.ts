import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  jsx: {
    export: (data) => {
      return {
        children: '',
        props: {
          media: data.fields.media,
        },
      }
    },
    import: (data) => {
      console.log(data)
      return {
        media: data.props?.media,
      }
    },
  },
}
