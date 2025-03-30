import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' },
        { label: 'Success', value: 'success' },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
    },
  ],
  jsx: {
    /**
     * Convert from Lexical -> MDX:
     * <Banner type="..." >child content</Banner>
     */
    export: ({ fields, lexicalToMarkdown }) => {
      const props: any = {}
      if (fields.type) {
        props.type = fields.type
      }

      return {
        children: lexicalToMarkdown({ editorState: fields.content }),
        props,
      }
    },
    /**
     * Convert from MDX -> Lexical:
     */
    import: ({ children, markdownToLexical, props }) => {
      return {
        type: props?.type,
        content: markdownToLexical({ markdown: children }),
      }
    },
  },
  interfaceName: 'BannerBlock',
}
