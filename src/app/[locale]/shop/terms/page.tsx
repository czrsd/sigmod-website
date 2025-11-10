import { discordLink } from '@/utils/getLink';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function TermsOfServicePage() {
    const t = useTranslations('Shop.TermsPage');

    const sections = t.raw('sections') as Record<
        string,
        { title: string; content: string } | string
    >;

    return (
        <main className='max-w-3xl mx-auto py-12 px-4 flex flex-col space-y-6'>
            <h1 className='text-3xl font-bold'>{t('title')}</h1>
            <span className='text-neutral-600 dark:text-neutral-400'>
                {t('lastUpdated')}
            </span>
            <Card>
                <CardContent className='space-y-4'>
                    <p>{t('intro')}</p>

                    {Object.entries(sections).map(([key, section]) => {
                        if (
                            key === 'discordLink' ||
                            typeof section === 'string'
                        )
                            return null;
                        return (
                            <div key={key}>
                                <h2 className='text-2xl font-semibold'>
                                    {section.title}
                                </h2>
                                <p>{section.content}</p>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            <Link className='mt-16 underline' href={discordLink}>
                {sections.discordLink as string}
            </Link>
        </main>
    );
}
