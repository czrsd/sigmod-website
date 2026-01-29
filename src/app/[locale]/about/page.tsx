'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Rocket, History, Milestone, Users, MessageSquare } from 'lucide-react';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <main className='max-w-5xl mx-auto px-6 py-20 space-y-24'>
            <header className='space-y-4'>
                <h1 className='text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase leading-none'>
                    {t('title')}
                </h1>
                <p className='text-blue-500 font-bold uppercase tracking-[0.3em] text-xs'>
                    {t('subtitle')}
                </p>
            </header>

            <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
                <div className='lg:col-span-5 space-y-6'>
                    <div className='bg-white/[0.03] border border-white/10 p-8 rounded-3xl relative overflow-hidden group'>
                        <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
                            <Rocket size={80} />
                        </div>
                        <h3 className='text-2xl font-black italic uppercase text-white mb-4 flex items-center gap-2'>
                            <Milestone className='text-blue-500' size={20} />
                            {t('tldr.title')}
                        </h3>
                        <p className='text-neutral-400 leading-relaxed relative z-10'>
                            {t('tldr.text')}
                        </p>
                    </div>

                    <Button
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-black h-14 rounded-2xl shadow-lg'
                        asChild
                    >
                        <Link
                            href='https://discord.gg/QyUhvUC8AD'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <MessageSquare className='mr-2' size={20} />
                            {t('joinDiscord')}
                        </Link>
                    </Button>
                </div>

                <div className='lg:col-span-7 space-y-6 text-neutral-300 leading-relaxed text-lg'>
                    <h3 className='text-white font-bold flex items-center gap-2 uppercase tracking-widest text-sm mb-8'>
                        <History size={16} className='text-blue-500' />
                        {t('story.title')}
                    </h3>
                    <p>{t('story.intro')}</p>
                    <p className='text-neutral-500 italic border-l-2 border-white/10 pl-6 my-8'>
                        {t('story.sigmodStart')}
                    </p>
                    <p>{t('story.sigmod')}</p>
                    <p>{t('story.sigfixes')}</p>
                    <p>{t('story.community')}</p>
                    <div className='pt-4 flex items-center gap-4 text-sm font-medium text-neutral-500'>
                        <Users size={18} className='text-blue-500' />
                        {t('story.thanks')}
                    </div>
                </div>
            </div>

            {/* Roadmap Section */}
            <section className='pt-10 space-y-12'>
                <div className='text-center'>
                    <h2 className='text-3xl font-black italic uppercase text-white tracking-tighter'>
                        {t('roadmap.title')}
                    </h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 relative'>
                    {/* Roadmap Cards */}
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
            className={`p-8 rounded-3xl border transition-all duration-500 ${
                active
                    ? 'bg-blue-600/10 border-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.1)]'
                    : 'bg-white/[0.02] border-white/5'
            }`}
        >
            <span
                className={`text-[10px] font-black tracking-[0.3em] uppercase mb-4 block ${
                    active ? 'text-blue-500' : 'text-neutral-600'
                }`}
            >
                Phase {phase} — {date}
            </span>
            <h4 className='text-white font-bold text-xl mb-4 italic uppercase tracking-tight'>
                {title}
            </h4>
            <p className='text-neutral-500 text-sm leading-relaxed'>{desc}</p>
        </div>
    );
}
