import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { sigfixLink } from '@/utils/getLink';

export function Hero() {
    const t = useTranslations('SigFixesPage.Hero');

    return (
        <section className='max-w-5xl mx-auto px-6 py-16 flex flex-col items-center gap-10 text-center'>
            <div className='space-y-4'>
                <h1 className='text-6xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text pb-3'>
                    {t('title')}
                </h1>
                <p className='text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto'>
                    {t('sub')}
                </p>
            </div>

            <div className='space-x-2'>
                <Button className='font-semibold px-6 py-3' asChild>
                    <Link href={sigfixLink}>{t('install')}</Link>
                </Button>

                <Button variant={'outline'} className='px-6 py-3' asChild>
                    <Link href='#features'>
                        {t('explore')}
                        <ArrowRight />
                    </Link>
                </Button>
            </div>

            <p className='text-sm text-muted-foreground max-w-md'>
                {t('require')}{' '}
                <Link href='https://tampermonkey.net' className='underline'>
                    Tampermonkey
                </Link>{' '}
                {t('or')}{' '}
                <Link
                    href='https://violentmonkey.github.io'
                    className='underline'
                >
                    Violentmonkey
                </Link>
                .
            </p>
        </section>
    );
}
