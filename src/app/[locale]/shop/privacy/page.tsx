import { Card, CardContent } from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicyPage() {
    const t = useTranslations('Shop.PrivacyPage');

    const sections = t.raw('sections') as Record<
        string,
        { title: string; content: string }
    >;

    return (
        <main className='flex flex-col items-center py-12 px-6 max-w-3xl mx-auto space-y-6'>
            <h1 className='text-4xl font-bold text-center'>{t('title')}</h1>
            <span className='text-neutral-600 dark:text-neutral-400'>
                {t('lastUpdated')}
            </span>
            <Card>
                <CardContent className='space-y-4'>
                    <p>{t('intro')}</p>

                    {Object.entries(sections).map(([key, section]) => (
                        <div key={key}>
                            <h2 className='text-2xl font-semibold'>
                                {section.title}
                            </h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </main>
    );
}
