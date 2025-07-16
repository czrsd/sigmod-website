import { useTranslations } from 'next-intl';
import { discordLink } from '@/utils/getLink';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CommunitySection() {
    const t = useTranslations('HomePage.community');
    return (
        <section className='px-6 md:px-16 py-24 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8'>
            <h3 className='text-4xl font-bold'>{t('title')}</h3>
            <p className='text-base text-muted-foreground max-w-prose'>
                {t('desc')}
            </p>
            <Button
                className='bg-blue-700 hover:bg-blue-800 text-foreground px-6 py-4 text-base font-medium'
                asChild
            >
                <Link href={discordLink} target='_blank'>
                    {t('join')}
                </Link>
            </Button>
        </section>
    );
}
