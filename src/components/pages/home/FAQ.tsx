import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
    const t = useTranslations('HomePage.faq');
    const questions = t.raw('questions') as {
        question: string;
        answer: string;
    }[];

    return (
        <section className='px-6 md:px-16 py-32 max-w-4xl mx-auto'>
            <h3 className='text-4xl font-bold text-center mb-12'>FAQ</h3>
            <Accordion type='single' collapsible className='space-y-4'>
                {questions.map((item, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
