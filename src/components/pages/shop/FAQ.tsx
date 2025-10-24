import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
    const t = useTranslations('Shop.MainPage.FAQ');

    const faqData = t.raw('items');

    return (
        <section className='mx-10 sm:w-1/2 lg:w-1/3 space-y-6'>
            <h2 className='text-3xl font-semibold text-center mb-8'>
                {t('title')}
            </h2>
            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(
                    (item: { question: string; answer: string }, i: number) => (
                        <AccordionItem key={i} value={`general-${i}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent className='text-left'>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                )}
            </Accordion>
        </section>
    );
}
