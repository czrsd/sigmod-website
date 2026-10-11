'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
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
        className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
            index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
        }`}
    >
        <div className='w-full lg:w-1/2'>
            <div className='relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-900/40 shadow-lg p-2'>
                <Image
                    src={img}
                    alt={alt}
                    width={520}
                    height={350}
                    sizes='(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 520px'
                    decoding='async'
                    className='rounded-xl w-full h-auto object-cover'
                />
            </div>
        </div>

        <div className='w-full lg:w-1/2 space-y-6'>
            <div className='space-y-3'>
                <h3 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                    {title}
                </h3>
                <p className='text-base md:text-lg leading-relaxed text-neutral-600 dark:text-neutral-400'>
                    {desc}
                </p>
            </div>

            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1'>
                {features.map((feature, i) => (
                    <li
                        key={i}
                        className='flex items-center gap-2.5 text-sm text-neutral-600 dark:text-neutral-300'
                    >
                        <CheckCircle2 className='text-blue-500 w-4 h-4 shrink-0' />
                        <span>{feature}</span>
                    </li>
                ))}
            </ul>

            <div className='pt-2'>
                <Button
                    asChild
                    variant='outline'
                    className='rounded-full px-6 h-11 border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                >
                    <Link href={link}>
                        {learnMore} <ArrowRight className='w-4 h-4 ml-1.5' />
                    </Link>
                </Button>
            </div>
        </div>
    </article>
);

export function ModsSection() {
    const t = useTranslations('HomePage.mods');

    return (
        <section className='flex flex-col gap-20 md:gap-28 px-6 md:px-16 py-16 md:py-24 max-w-7xl mx-auto'>
            <ModItem
                index={0}
                img='/preview/sigmod_menu.webp'
                alt='SigMod preview'
                title={t('sigmod.title')}
                desc={t('sigmod.desc')}
                learnMore={t('sigmod.learnMore')}
                link='/sigmod'
                features={t.raw('sigmod.features')}
            />
            <ModItem
                index={1}
                img='/preview/multibox.webp'
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
