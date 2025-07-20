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

type FAQItem = {
    question: string;
    answer: (t: ReturnType<typeof useTranslations>) => React.ReactNode;
};

const createLink = (href: string) => (chunks: React.ReactNode) =>
    (
        <Link
            href={href}
            className='underline text-blue-400 hover:text-blue-500'
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
                    strong: (c) => <strong>{c}</strong>,
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
    prefix,
    t,
}: {
    titleKey: string;
    items: FAQItem[];
    prefix: string;
    t: ReturnType<typeof useTranslations>;
}) => (
    <section>
        <h2 className='text-2xl font-semibold mb-6'>
            {t(`${titleKey}.title`)}
        </h2>
        {titleKey === 'sigfixes' && (
            <p className='text-muted-foreground mb-4'>
                {t.rich('sigfixes.note', {
                    strong: (c) => <strong>{c}</strong>,
                })}
            </p>
        )}
        <Accordion type='single' collapsible className='space-y-4'>
            {items.map(({ question, answer }, i) => (
                <AccordionItem key={i} value={`${prefix}-${i}`}>
                    <AccordionTrigger>{t(question)}</AccordionTrigger>
                    <AccordionContent>{answer(t)}</AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </section>
);

export default function FAQPage() {
    const t = useTranslations('FAQPage');

    return (
        <section className='max-w-4xl mx-auto px-6 md:px-16 py-24 space-y-16'>
            <h1 className='text-4xl font-bold text-center mb-12'>
                {t('title')}
            </h1>
            <RenderSection
                titleKey='general'
                items={faqData.general}
                prefix='general'
                t={t}
            />
            <RenderSection
                titleKey='sigmod'
                items={faqData.sigmod}
                prefix='sigmod'
                t={t}
            />
            <RenderSection
                titleKey='sigfixes'
                items={faqData.sigfixes}
                prefix='sigfixes'
                t={t}
            />

            <section className='flex flex-col items-center gap-3'>
                <p className='text-sm'>{t('needHelp')}</p>
                <Button variant='outline' asChild>
                    <Link
                        href={discordLink}
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {t('joinDiscord')}
                    </Link>
                </Button>
            </section>
        </section>
    );
}
