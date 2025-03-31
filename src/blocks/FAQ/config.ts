import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

interface FAQItem {
  question: string
  answer: any // Using any for now since we don't have access to the Lexical editor state type
}

export const FAQ: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'items',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/blocks/FAQ/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          required: true,
        },
      ],
    },
  ],
  jsx: {
    /**
     * Convert from Lexical -> MDX:
     */
    export: ({ fields, lexicalToMarkdown }) => {
      const items =
        fields.items?.map((item: FAQItem) => ({
          question: item.question,
          answer: lexicalToMarkdown({ editorState: item.answer }),
        })) || []

      return {
        children: `{JSON.stringify(${JSON.stringify(items)})}`,
        props: {},
      }
    },
    /**
     * Convert from MDX -> Lexical:
     */
    import: ({ children, markdownToLexical }) => {
      try {
        console.log('children', children)
        const items = JSON.parse(children) as FAQItem[]
        return {
          items: items.map((item: FAQItem) => ({
            question: item.question,
            answer: markdownToLexical({ markdown: item.answer }),
          })),
        }
      } catch (error) {
        console.error('Error parsing FAQ items:', error)
        return { items: [] }
      }
    },
  },
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  interfaceName: 'FAQBlock',
}
