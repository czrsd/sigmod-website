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
                <h3 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-center'>
                    FAQ
                </h3>
            </div>

            <Accordion type='single' collapsible className='w-full space-y-3'>
                {questions.map((item, i) => (
                    <AccordionItem
                        key={i}
                        value={`item-${i}`}
                        className='border border-white/5 bg-neutral-900/40 backdrop-blur-sm rounded-2xl px-4 transition-all hover:border-white/10'
                    >
                        <AccordionTrigger className='hover:no-underline font-bold text-left py-5'>
                            {item.question}
                        </AccordionTrigger>
                        <AccordionContent className='text-neutral-400 leading-relaxed pb-5'>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
