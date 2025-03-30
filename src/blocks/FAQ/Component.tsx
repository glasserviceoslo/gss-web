import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface FAQItem {
  question: string
  answer: DefaultTypedEditorState
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
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
