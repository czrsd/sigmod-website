'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
    const t = useTranslations('AboutPage');

    return (
        <section className='max-w-3xl mx-auto px-6 md:px-16 py-30 space-y-6'>
            <h1 className='text-4xl font-bold mb-6'>{t('title')}</h1>

            <h3 className='text-2xl font-semibold'>{t('tldr.title')}</h3>
            <p>{t('tldr.text')}</p>

            <hr />

            <h3 className='text-2xl font-semibold'>{t('story.title')}</h3>

            <p>{t('story.intro')}</p>
            <p>{t('story.sigmodStart')}</p>
            <p>{t('story.sigmod')}</p>
            <p>{t('story.sigfixes')}</p>
            <p>{t('story.community')}</p>
            <p>{t('story.thanks')}</p>

            <div className='pt-6'>
                <Button variant='outline' asChild>
                    <Link
                        href='https://discord.gg/QyUhvUC8AD'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {t('joinDiscord')}
                    </Link>
                </Button>
            </div>
        </section>
    );
}
