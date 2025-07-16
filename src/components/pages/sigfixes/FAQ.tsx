'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';

export function FAQ() {
    const t = useTranslations('SigFixesPage.FAQ');

    const faqData = t.raw('list') as {
        question: string;
        answer: string;
    }[];

    return (
        <section className='max-w-4xl mx-auto space-y-6'>
            <h2 className='text-3xl font-semibold text-center mb-8'>
                {t('title')}
            </h2>
            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(({ question, answer }, i) => (
                    <AccordionItem key={i} value={`general-${i}`}>
                        <AccordionTrigger>{question}</AccordionTrigger>
                        <AccordionContent>{answer}</AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
