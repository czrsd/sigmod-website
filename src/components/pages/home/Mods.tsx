'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

type ModItemProps = {
    img: string;
    alt: string;
    title: string;
    desc: string;
    learnMore: string;
    link: string;
    features: string[];
    index: number;
};

const ModItem = ({
    img,
    alt,
    title,
    desc,
    learnMore,
    link,
    features,
    index,
}: ModItemProps) => (
    <article
        className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
            index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
        }`}
    >
        <div className='w-full lg:w-1/2 group relative'>
            <div className='absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-700' />
            <div className='relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 backdrop-blur-sm p-2 shadow-2xl'>
                <Image
                    src={img}
                    width={520}
                    height={350}
                    alt={alt}
                    className='rounded-xl transition-transform duration-700 group-hover:scale-[1.02]'
                />
            </div>
        </div>

        <div className='w-full lg:w-1/2 space-y-6'>
            <div className='space-y-2'>
                <h3 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground'>
                    {title}
                </h3>
                <div className='h-1 w-20 bg-blue-600 rounded-full' />
            </div>

            <p className='text-lg leading-relaxed text-neutral-600 dark:text-neutral-300'>
                {desc}
            </p>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2'>
                {features.map((feature, i) => (
                    <li
                        key={i}
                        className='flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-200'
                    >
                        <CheckCircle2 className='text-blue-500 w-4 h-4' />
                        {feature}
                    </li>
                ))}
            </ul>

            <div className='pt-4'>
                <Button
                    asChild
                    variant='outline'
                    className='rounded-full px-8 h-12 border-black/10 dark:border-white/10 hover:bg-white/5 font-bold uppercase italic tracking-wider transition-all hover:gap-4'
                >
                    <Link href={link}>
                        {learnMore} <ArrowRight className='w-4 h-4' />
                    </Link>
                </Button>
            </div>
        </div>
    </article>
);

export function ModsSection() {
    const t = useTranslations('HomePage.mods');

    return (
        <section className='flex flex-col gap-32 md:gap-48 px-6 md:px-16 py-32 max-w-7xl mx-auto overflow-hidden'>
            <ModItem
                index={0}
                img='/preview/sigmod_menu.png'
                alt='SigMod preview'
                title={t('sigmod.title')}
                desc={t('sigmod.desc')}
                learnMore={t('sigmod.learnMore')}
                link='/sigmod'
                features={t.raw('sigmod.features')}
            />
            <ModItem
                index={1}
                img='/preview/multibox.png'
                alt='SigFixes preview'
                title={t('sigfixes.title')}
                desc={t('sigfixes.desc')}
                learnMore={t('sigfixes.learnMore')}
                link='/sigfixes'
                features={t.raw('sigfixes.features')}
            />
        </section>
    );
}
