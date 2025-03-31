import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import type { FAQBlock as FAQBlockProps } from 'src/payload-types'

interface FAQItem {
  question: string
  answer: DefaultTypedEditorState
}

export type Props = {
  items: FAQItem[]
} & FAQBlockProps

export const FAQ: React.FC<Props> = ({ items }) => {
  console.log('items', items)
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger className="text-lg font-semibold italic">
            {item.question}
          </AccordionTrigger>
          <AccordionContent>
            <RichText data={item.answer} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
