import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, PlayCircle, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Guide.Overview' });

    return pageMetadata({
        locale,
        pathname: '/guide',
        title: t('title'),
        description: t('desc'),
    });
}

export default function GuideOverview() {
    const t = useTranslations('Guide.Overview');

    return (
        <section className='flex flex-col xl:flex-row justify-between gap-12 items-start'>
            <div className='max-w-xl space-y-6'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-3 text-blue-500'>
                        <BookOpen size={28} />
                        <span className='text-xs font-semibold uppercase tracking-wider text-blue-500'>
                            Installation Guide
                        </span>
                    </div>

                    <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
                        {t('title')}
                    </h1>

                    <div className='space-y-4 text-neutral-600 dark:text-neutral-400 text-base leading-relaxed'>
                        <p>{t('desc')}</p>
                        <div className='p-4 rounded-xl bg-blue-500/5 border border-blue-500/15 text-sm text-neutral-600 dark:text-neutral-300'>
                            {t('access')}
                        </div>
                    </div>
                </div>

                <div className='flex flex-wrap gap-3.5 pt-2'>
                    <Button
                        size='lg'
                        className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full px-7 h-12 shadow-sm'
                        asChild
                    >
                        <Link href='/guide/userscript-manager'>
                            {t('start')}
                            <ArrowRight className='ml-2 h-4 w-4' />
                        </Link>
                    </Button>

                    <Button
                        variant='outline'
                        size='lg'
                        className='border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] font-semibold rounded-full px-7 h-12'
                        asChild
                    >
                        <Link href='/quick-guide'>
                            <Zap className='mr-2 h-4 w-4 text-neutral-500' />
                            {t('quickGuide')}
                        </Link>
                    </Button>
                </div>
            </div>

            <div className='flex flex-col gap-3 w-full xl:max-w-lg'>
                <div className='relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-neutral-900/60 p-2 shadow-lg'>
                    <div className='flex items-center gap-2 mb-2 px-2 pt-1'>
                        <PlayCircle size={16} className='text-blue-500' />
                        <h2 className='text-xs font-semibold text-neutral-700 dark:text-neutral-300'>
                            {t('video.title')}
                        </h2>
                    </div>
                    <video
                        src='/guide/videos/tutorial.mp4'
                        poster='/guide/main_menu.png'
                        preload='metadata'
                        className='w-full rounded-xl bg-black aspect-video'
                        width={520}
                        height={288}
                        controls
                    />
                </div>
                <div className='px-1 space-y-1 text-xs text-neutral-500'>
                    <p>{t('video.desc')}</p>
                    <p className='text-[11px] text-neutral-400 text-right' title={t('video.creditTitle')}>
                        {t('video.credit')}
                    </p>
                </div>
            </div>
        </section>
    );
}
