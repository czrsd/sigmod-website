'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import { HelpCircle } from 'lucide-react';

export function FAQ() {
    const t = useTranslations('SigModPage.FAQ');

    const faqData = t.raw('list') as {
        question: string;
        answer: string;
    }[];

    return (
        <section className='max-w-3xl mx-auto py-20 px-6 space-y-10'>
            <div className='text-center space-y-3'>
                <h2 className='text-4xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1.5 w-16 bg-primary mx-auto rounded-full' />
            </div>

            <Accordion type='single' collapsible className='space-y-4'>
                {faqData.map(({ question, answer }, i) => (
                    <AccordionItem
                        key={i}
                        value={`general-${i}`}
                        className='border-none'
                    >
                        <AccordionTrigger className='flex gap-4 px-6 py-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] hover:no-underline transition-all group data-[state=open]:rounded-b-none data-[state=open]:border-primary/30'>
                            <div className='flex items-center gap-4 text-left font-bold uppercase italic tracking-tight group-hover:text-primary transition-colors'>
                                <HelpCircle
                                    size={18}
                                    className='text-primary opacity-50 group-hover:opacity-100 shrink-0'
                                />
                                {question}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-6 py-4 rounded-b-2xl bg-white/[0.01] border-x border-b border-white/5 text-neutral-400 leading-relaxed'>
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
