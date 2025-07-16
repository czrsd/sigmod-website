import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const LINKS = {
    sigmod: '/sigmod',
    guide: '/guide',
};

export function WhySigFixes() {
    const t = useTranslations('SigFixesPage.WhySigFixes');

    return (
        <section className='max-w-3xl mx-auto space-y-8 text-center px-6 py-12'>
            <h2 className='text-3xl font-semibold'>{t('title')}</h2>

            <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                {t('desc1')}
            </p>

            <p className='text-base text-muted-foreground max-w-2xl mx-auto'>
                {t('desc2')}
            </p>

            <p className='text-sm text-muted-foreground max-w-2xl mx-auto'>
                {t('worksWith')}{' '}
                <Link href={LINKS.sigmod} className='underline'>
                    SigMod
                </Link>
                {t('combo')}
            </p>

            <Button className='mx-auto mt-4 px-6 py-3' asChild>
                <Link href={LINKS.guide}>{t('getStarted')}</Link>
            </Button>
        </section>
    );
}
