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
    const faqData = t.raw('items') as { question: string; answer: string }[];

    return (
        <section className='w-full max-w-3xl mx-auto px-4 space-y-8 py-6'>
            <div className='text-center space-y-2'>
                <h2 className='text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground'>
                    {t('title')}
                </h2>
                <p className='text-sm text-neutral-500 max-w-md mx-auto'>
                    Common questions regarding shop orders, coins, and delivery.
                </p>
            </div>

            <Accordion type='single' collapsible className='space-y-3'>
                {faqData.map((item, i) => (
                    <AccordionItem
                        key={i}
                        value={`shop-faq-${i}`}
                        className='rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden text-left'
                    >
                        <AccordionTrigger className='px-5 py-4 text-left font-semibold text-sm md:text-base hover:no-underline hover:text-blue-500 transition-colors'>
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className='px-5 pb-4 pt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
