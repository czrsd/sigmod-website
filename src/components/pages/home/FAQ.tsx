import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

export function FAQSection() {
    const t = useTranslations('HomePage.faq');
    const questions = t.raw('questions') as {
        question: string;
        answer: string;
    }[];

    return (
        <section className='px-6 md:px-16 py-24 max-w-3xl mx-auto'>
            <div className='flex flex-col items-center mb-12'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-4'>
                    <HelpCircle size={14} />
                    <span>Support</span>
                </div>
                <h4 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-center'>
                    FAQ
                </h4>
            </div>

            <Accordion type='single' collapsible className='space-y-4'>
                {questions.map(({ question, answer }, i) => (
                    <AccordionItem
                        key={i}
                        value={`general-${i}`}
                        className='border-none'
                    >
                        <AccordionTrigger className='flex gap-4 px-6 py-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] hover:no-underline transition-all group data-[state=open]:rounded-b-none data-[state=open]:border-primary/30'>
                            <div className='flex items-center gap-4 text-left font-bold uppercase italic tracking-tight group-hover:text-primary transition-colors'>
                                <HelpCircle
                                    size={18}
                                    className='text-primary opacity-50 group-hover:opacity-100 shrink-0'
                                />
                                {question}
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className='px-6 py-4 rounded-b-2xl bg-black/[0.01] dark:bg-white/[0.01] border-x border-b border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
