import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

const LINKS = {
    sigfixes: '/sigfixes',
    guide: '/guide',
};

export function WhySigMod() {
    const t = useTranslations('SigModPage.WhySigMod');

    const paragraphs = ['desc1', 'desc2'].map((key) => (
        <p
            key={key}
            className='text-base text-muted-foreground max-w-2xl mx-auto'
        >
            {t(key)}
        </p>
    ));

    return (
        <section className='max-w-3xl mx-auto space-y-8 text-center px-6 py-12'>
            <h2 className='text-3xl font-semibold'>{t('title')}</h2>

            {paragraphs}

            <p className='text-sm text-muted-foreground max-w-2xl mx-auto'>
                {t('performance')}{' '}
                <Link href={LINKS.sigfixes} className='underline'>
                    SigFixes
                </Link>{' '}
                {t('smooth')}
            </p>

            <Button className='mx-auto mt-4 px-6 py-3' asChild>
                <Link href={LINKS.guide}>
                    {t('getStarted') ?? 'Get Started with SigMod'}
                </Link>
            </Button>
        </section>
    );
}
