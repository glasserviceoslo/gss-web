import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import type { ElementType } from 'react'

import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  FAQBlock as FAQBlockProps,
} from '@/payload-types'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { cn } from '@/utilities/ui'
import { FAQBlock } from '@/blocks/FAQ/Component'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | FAQBlockProps
    >

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {
    banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-start-1 col-span-3"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
    cta: ({ node }) => <CallToActionBlock {...node.fields} />,
    faqBlock: ({ node }) => {
      console.log('node', node)
      return <FAQBlock {...node.fields} items={node.fields.items || []} />
    },
  },
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag as ElementType
    return <Tag className="mt-8 mb-4">{nodesToJSX({ nodes: node.children })}</Tag>
  },
  blockquote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic">
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    )
  },
  orderedList: ({ node, nodesToJSX }) => {
    return (
      <ol className="list-decimal pl-6 my-4 space-y-2">{nodesToJSX({ nodes: node.children })}</ol>
    )
  },
  unorderedList: ({ node, nodesToJSX }) => {
    return <ul className="list-disc pl-6 my-4 space-y-2">{nodesToJSX({ nodes: node.children })}</ul>
  },
  listItem: ({ node, nodesToJSX }) => {
    return <li className="pl-2">{nodesToJSX({ nodes: node.children })}</li>
  },
  table: ({ node, nodesToJSX }) => {
    return (
      <table className="table-auto border-collapse border border-gray-300">
        {nodesToJSX({ nodes: node.children })}
      </table>
    )
  },
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
