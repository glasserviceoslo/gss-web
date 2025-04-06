import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

// interface FAQItem {
//   question: string
//   answer: any // Using any for now since we don't have access to the Lexical editor state type
// }

export const FAQBlock: Block = {
  slug: 'faqBlock',
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
  // jsx: {
  //   /**
  //    * Convert from Lexical -> MDX:
  //    */
  //   export: ({ fields }) => {
  //     const items =
  //       fields.items?.map((item: FAQItem) => ({
  //         question: item.question,
  //         answer: item.answer,
  //       })) || []

  //     return {
  //       props: { items },
  //       children: '', // FAQ component uses props instead of children
  //     }
  //   },
  //   /**
  //    * Convert from MDX -> Lexical:
  //    */
  //   import: ({ children, markdownToLexical, props }) => {
  //     try {
  //       if (!props?.items) {
  //         return { items: [] }
  //       }

  //       return {
  //         items: props.items.map((item: FAQItem) => ({
  //           question: item.question,
  //           // If the answer is a string, convert it to Lexical format
  //           answer:
  //             typeof item.answer === 'string'
  //               ? markdownToLexical({ markdown: item.answer })
  //               : item.answer,
  //         })),
  //       }
  //     } catch (error) {
  //       console.error('Error parsing FAQ items:', error)
  //       return { items: [] }
  //     }
  //   },
  // },
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  interfaceName: 'FAQBlock',
}
