'use client';

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
        <section className='w-full max-w-3xl mx-auto px-6 space-y-10 py-10'>
            <div className='text-center space-y-2'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1 w-20 bg-primary mx-auto rounded-full' />
            </div>

            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(
                    (item: { question: string; answer: string }, i: number) => (
                        <AccordionItem
                            key={i}
                            value={`general-${i}`}
                            className='border-none bg-white/5 dark:bg-neutral-900/40 backdrop-blur-md rounded-2xl px-6 overflow-hidden transition-all hover:bg-white/10 dark:hover:bg-white/5 border border-white/10 dark:border-white/5'
                        >
                            <AccordionTrigger className='text-left text-base hover:no-underline py-6'>
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className='text-left text-neutral-500 dark:text-neutral-400 text-md leading-relaxed pb-6'>
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    )
                )}
            </Accordion>
        </section>
    );
}
