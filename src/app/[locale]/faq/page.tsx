'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { discordLink } from '@/utils/getLink';
import {
    HelpCircle,
    Terminal,
    Wrench,
    MessageSquare,
    type LucideIcon,
} from 'lucide-react';

type Translator = ReturnType<typeof useTranslations>;

type FAQItem = {
    question: string;
    answer: (t: Translator) => React.ReactNode;
};

const createLink = (href: string) => (chunks: React.ReactNode) =>
    (
        <Link
            href={href}
            className='text-blue-500 hover:underline font-semibold'
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
                    strong: (c: React.ReactNode) => (
                        <strong className='font-semibold text-foreground'>{c}</strong>
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
    icon: LucideIcon;
    t: Translator;
}) => (
    <div className='bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 rounded-2xl p-6 md:p-8 flex flex-col h-full'>
        <div className='flex items-center gap-3.5 border-b border-black/5 dark:border-white/10 pb-5 mb-3'>
            <div className='w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0'>
                <Icon size={20} />
            </div>
            <div>
                <h2 className='text-xl font-bold tracking-tight text-foreground'>
                    {t(`${titleKey}.title`)}
                </h2>
                {titleKey === 'sigfixes' && (
                    <p className='text-neutral-500 text-xs mt-0.5'>
                        {t.rich('sigfixes.note', {
                            strong: (c: React.ReactNode) => (
                                <span className='font-semibold text-foreground'>{c}</span>
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
                    className='border-black/5 dark:border-white/10 last:border-0'
                >
                    <AccordionTrigger className='text-left text-neutral-800 dark:text-neutral-200 hover:text-blue-500 hover:no-underline transition-colors py-4 font-semibold text-sm md:text-base'>
                        {t(question)}
                    </AccordionTrigger>
                    <AccordionContent className='text-neutral-600 dark:text-neutral-400 leading-relaxed pb-5 pt-1 text-sm'>
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
        <main className='max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-12'>
            <div className='text-center space-y-3 max-w-xl mx-auto'>
                <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]'>
                    {t('title')}
                </h1>
                <p className='text-neutral-600 dark:text-neutral-400 text-base'>
                    {t('subtitle')}
                </p>
            </div>

            <div className='space-y-6'>
                <RenderSection
                    titleKey='general'
                    items={faqData.general}
                    icon={HelpCircle}
                    t={t}
                />

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
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

            <div className='rounded-2xl p-8 sm:p-10 text-center bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10'>
                <div className='max-w-md mx-auto space-y-4'>
                    <div className='w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center mx-auto text-[#5865F2]'>
                        <MessageSquare size={24} />
                    </div>
                    <div className='space-y-1.5'>
                        <h2 className='text-2xl font-bold tracking-tight text-foreground'>
                            {t('needHelp')}
                        </h2>
                        <p className='text-xs sm:text-sm text-neutral-500 leading-relaxed'>
                            {t('discordDesc')}
                        </p>
                    </div>
                    <div className='pt-2'>
                        <Button
                            size='lg'
                            className='bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-8 h-12 rounded-full shadow-sm'
                            asChild
                        >
                            <a
                                href={discordLink}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {t('joinDiscord')}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    );
}
