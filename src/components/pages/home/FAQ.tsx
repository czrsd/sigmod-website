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
        <section className='px-6 md:px-16 py-16 md:py-24 max-w-3xl mx-auto'>
            <div className='text-center mb-10'>
                <h2 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                    Frequently Asked Questions
                </h2>
                <p className='text-sm text-neutral-500 dark:text-neutral-400 mt-2'>
                    Common questions about installing and using SigModz.
                </p>
            </div>

            <Accordion type='single' collapsible className='space-y-3'>
                {questions.map(({ question, answer }, i) => (
                    <AccordionItem
                        key={i}
                        value={`general-${i}`}
                        className='rounded-xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] overflow-hidden'
                    >
                        <AccordionTrigger className='px-5 py-4 text-left font-semibold text-sm md:text-base hover:no-underline hover:text-blue-500 transition-colors'>
                            {question}
                        </AccordionTrigger>
                        <AccordionContent className='px-5 pb-4 pt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                            {answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}
