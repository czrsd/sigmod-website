import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Community() {
    const t = useTranslations('SigModPage.Community');
    return (
        <section className='max-w-3xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-semibold'>{t('title')}</h2>
            <p className='text-muted-foreground max-w-prose mx-auto'>
                {t('text')}
            </p>
            <Button variant='outline' asChild>
                <Link href='https://discord.gg/QyUhvUC8AD' target='_blank'>
                    <MessageSquare className='inline mr-2' /> {t('discord')}
                </Link>
            </Button>
            <p className='text-muted-foreground text-sm'>
                {t('explore')}{' '}
                <Link
                    href='https://github.com/czrsd/sigmod'
                    target='_blank'
                    className='underline flex items-center justify-center gap-1'
                >
                    GitHub
                </Link>
            </p>
        </section>
    );
}
