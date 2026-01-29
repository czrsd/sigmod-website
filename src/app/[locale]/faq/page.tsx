'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { discordLink } from '@/utils/getLink';
import { HelpCircle, Terminal, Wrench, MessageSquare } from 'lucide-react';

type FAQItem = {
    question: string;
    answer: (t: any) => React.ReactNode;
};

const createLink = (href: string) => (chunks: React.ReactNode) =>
    (
        <Link
            href={href}
            className='text-blue-400 hover:text-blue-500 font-bold transition-colors'
        >
            {chunks}
        </Link>
    );

const faqData: Record<string, FAQItem[]> = {
    general: [
        {
            question: 'general.installMods.question',
            answer: (t) =>
                t.rich('general.installMods.answer', {
                    link: createLink('/guide'),
                }),
        },
        {
            question: 'general.modsNotWorking.question',
            answer: (t) =>
                t.rich('general.modsNotWorking.answer', {
                    link: createLink('/guide/developer-mode'),
                }),
        },
        {
            question: 'general.safe.question',
            answer: (t) => t('general.safe.answer'),
        },
        {
            question: 'general.sigmodAndSigfixes.question',
            answer: (t) => t('general.sigmodAndSigfixes.answer'),
        },
        {
            question: 'general.multibox.question',
            answer: (t) =>
                t.rich('general.multibox.answer', {
                    strong: (c: any) => (
                        <strong className='text-white'>{c}</strong>
                    ),
                    link: createLink('/guide'),
                }),
        },
        {
            question: 'general.uninstallMods.question',
            answer: (t) => t('general.uninstallMods.answer'),
        },
    ],
    sigmod: [
        'coreFeatures',
        'customization',
        'tagSystem',
        'friendSystem',
        'openMenu',
        'customHotkeys',
        'performance',
    ].map((key) => ({
        question: `sigmod.${key}.question`,
        answer: (t) => t(`sigmod.${key}.answer`),
    })),
    sigfixes: [
        'improvements',
        'multibox',
        'fps',
        'compatibility',
        'config',
    ].map((key) => ({
        question: `sigfixes.${key}.question`,
        answer: (t) => t(`sigfixes.${key}.answer`),
    })),
};

const RenderSection = ({
    titleKey,
    items,
    icon: Icon,
    t,
}: {
    titleKey: string;
    items: FAQItem[];
    icon: any;
    t: any;
}) => (
    <div className='bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 flex flex-col h-full'>
        <div className='flex items-center gap-4 border-b border-white/5 pb-6 mb-2'>
            <div className='w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0'>
                <Icon size={24} />
            </div>
            <div>
                <h2 className='text-2xl font-black italic uppercase tracking-tighter text-white leading-none'>
                    {t(`${titleKey}.title`)}
                </h2>
                {titleKey === 'sigfixes' && (
                    <p className='text-neutral-500 text-[10px] mt-2 uppercase tracking-widest font-bold'>
                        {t.rich('sigfixes.note', {
                            strong: (c: any) => (
                                <span className='text-neutral-400'>{c}</span>
                            ),
                        })}
                    </p>
                )}
            </div>
        </div>

        <Accordion type='single' collapsible className='w-full'>
            {items.map(({ question, answer }, i) => (
                <AccordionItem
                    key={i}
                    value={`${titleKey}-${i}`}
                    className='border-white/5 last:border-0'
                >
                    <AccordionTrigger className='text-left text-neutral-300 hover:text-white transition-all py-4 font-bold tracking-tight text-sm md:text-base'>
                        {t(question)}
                    </AccordionTrigger>
                    <AccordionContent className='text-neutral-400 leading-relaxed pb-6 pt-2 text-sm md:text-base'>
                        {answer(t)}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);

export default function FAQPage() {
    const t = useTranslations('FAQPage');

    return (
        <main className='max-w-6xl mx-auto px-6 py-20 space-y-16'>
            {/* Header Section */}
            <div className='text-center space-y-4'>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4'>
                    <HelpCircle size={12} className='text-blue-500' />
                    {t('statusLabel')}
                </div>
                <h1 className='text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none'>
                    {t('title')}
                </h1>
                <p className='text-neutral-500 text-lg max-w-xl mx-auto italic'>
                    {t('subtitle')}
                </p>
            </div>

            {/* Content Grid */}
            <div className='grid gap-8'>
                {/* General Section (Full Width) */}
                <RenderSection
                    titleKey='general'
                    items={faqData.general}
                    icon={HelpCircle}
                    t={t}
                />

                {/* Specific Sections (Two Columns) */}
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <RenderSection
                        titleKey='sigmod'
                        items={faqData.sigmod}
                        icon={Terminal}
                        t={t}
                    />
                    <RenderSection
                        titleKey='sigfixes'
                        items={faqData.sigfixes}
                        icon={Wrench}
                        t={t}
                    />
                </div>
            </div>

            {/* Support Callout */}
            <div className='bg-gradient-to-br from-blue-600 to-purple-700 rounded-[2.5rem] p-10 text-center relative overflow-hidden group shadow-[0_20px_50px_rgba(37,99,235,0.25)]'>
                <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                <div className='relative z-10 space-y-6'>
                    <div className='w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto border border-white/20 rotate-3 group-hover:rotate-0 transition-transform'>
                        <MessageSquare className='text-white' size={32} />
                    </div>
                    <div className='space-y-2'>
                        <h2 className='text-3xl font-black italic uppercase tracking-tighter text-white'>
                            {t('needHelp')}
                        </h2>
                        <p className='text-white/70 max-w-md mx-auto font-medium'>
                            {t('discordDesc')}
                        </p>
                    </div>
                    <Button
                        size='lg'
                        className='bg-white text-black hover:bg-neutral-100 font-black px-12 h-14 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95'
                        asChild
                    >
                        <Link
                            href={discordLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {t('joinDiscord')}
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
