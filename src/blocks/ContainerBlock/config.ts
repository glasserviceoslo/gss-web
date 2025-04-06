import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Container: Block = {
  slug: 'container',
  interfaceName: 'ContainerBlock',
  fields: [
    {
      name: 'crop',
      type: 'select',
      defaultValue: 'default',
      options: [
        {
          label: 'Default',
          value: 'default',
        },
        {
          label: 'Wide',
          value: 'wide',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'Narrow',
          value: 'narrow',
        },
      ],
      label: 'Container Type',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Content',
      required: true,
    },
  ],
  labels: {
    plural: 'Containers',
    singular: 'Container',
  },
}
