'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Rocket, History, Milestone, Users, MessageSquare } from 'lucide-react';
import { discordLink } from '@/utils/getLink';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <main className='max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-20'>
            {/* Header */}
            <header className='space-y-3 max-w-2xl'>
                <h1 className='text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.05]'>
                    {t('title')}
                </h1>
                <p className='text-base text-neutral-500 dark:text-neutral-400'>
                    {t('subtitle')}
                </p>
            </header>

            {/* TLDR & Story Split */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-start'>
                {/* TLDR Card */}
                <div className='lg:col-span-5 space-y-4'>
                    <div className='bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 p-6 sm:p-8 rounded-2xl relative overflow-hidden'>
                        <h2 className='text-lg font-bold text-foreground mb-3 flex items-center gap-2'>
                            <Milestone className='text-blue-500' size={18} />
                            {t('tldr.title')}
                        </h2>
                        <p className='text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed'>
                            {t('tldr.text')}
                        </p>
                    </div>

                    <Button
                        className='w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold h-12 rounded-xl transition-colors shadow-sm'
                        asChild
                    >
                        <a
                            href={discordLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <MessageSquare className='mr-2' size={18} />
                            {t('joinDiscord')}
                        </a>
                    </Button>
                </div>

                {/* Story */}
                <div className='lg:col-span-7 space-y-5 text-neutral-600 dark:text-neutral-400 leading-relaxed text-base'>
                    <div className='flex items-center gap-2 text-foreground font-semibold text-sm pb-1 border-b border-black/5 dark:border-white/10'>
                        <History size={16} className='text-blue-500' />
                        {t('story.title')}
                    </div>
                    <p>{t('story.intro')}</p>
                    <p className='text-neutral-700 dark:text-neutral-300 border-l-2 border-blue-500 pl-4 py-1 italic text-sm'>
                        {t('story.sigmodStart')}
                    </p>
                    <p>{t('story.sigmod')}</p>
                    <p>{t('story.sigfixes')}</p>
                    <p>{t('story.community')}</p>
                    <div className='pt-2 flex items-center gap-2.5 text-xs text-neutral-500 font-medium'>
                        <Users size={16} className='text-blue-500' />
                        {t('story.thanks')}
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <section className='space-y-8 pt-4'>
                <div>
                    <h2 className='text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground'>
                        {t('roadmap.title')}
                    </h2>
                    <p className='text-xs text-neutral-500 mt-1'>
                        Project milestones and ongoing updates.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                    <RoadmapStep
                        phase='01'
                        title={t('roadmap.phase1.title')}
                        date={t('roadmap.phase1.date')}
                        desc={t('roadmap.phase1.desc')}
                    />
                    <RoadmapStep
                        phase='02'
                        title={t('roadmap.phase2.title')}
                        date={t('roadmap.phase2.date')}
                        desc={t('roadmap.phase2.desc')}
                        active
                    />
                    <RoadmapStep
                        phase='03'
                        title={t('roadmap.phase3.title')}
                        date={t('roadmap.phase3.date')}
                        desc={t('roadmap.phase3.desc')}
                    />
                </div>
            </section>
        </main>
    );
}

function RoadmapStep({
    phase,
    title,
    date,
    desc,
    active = false,
}: {
    phase: string;
    title: string;
    date: string;
    desc: string;
    active?: boolean;
}) {
    return (
        <div
            className={`p-6 rounded-2xl border transition-all ${
                active
                    ? 'bg-blue-500/[0.04] border-blue-500/30 ring-1 ring-blue-500/20'
                    : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/10 dark:border-white/10'
            }`}
        >
            <span
                className={`text-[11px] font-semibold tracking-wider uppercase mb-2 block ${
                    active ? 'text-blue-500' : 'text-neutral-400'
                }`}
            >
                Phase {phase} — {date}
            </span>
            <h3 className='font-bold text-base text-foreground mb-2'>
                {title}
            </h3>
            <p className='text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed'>
                {desc}
            </p>
        </div>
    );
}
