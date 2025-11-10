import { discordLink } from '@/utils/getLink';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function RefundPolicyPage() {
    const t = useTranslations('Shop.RefundPage');

    const sections = t.raw('sections') as Record<
        string,
        { title: string; content: string } | string
    >;

    return (
        <main className='max-w-3xl mx-auto py-12 px-4 flex flex-col'>
            <h1 className='text-3xl font-bold mb-6'>{t('title')}</h1>
            <span className='text-neutral-600 dark:text-neutral-400'>
                {t('lastUpdated')}
            </span>

            {Object.entries(sections).map(([key, section]) => {
                if (key === 'discordLink') return null;
                if (typeof section === 'string') return null;
                return (
                    <section key={key} className='mb-6'>
                        <h2 className='text-xl font-semibold mb-2'>
                            {section.title}
                        </h2>
                        <p>{section.content}</p>
                    </section>
                );
            })}

            <Link className='mt-16 underline' href={discordLink}>
                {sections.discordLink as string}
            </Link>
        </main>
    );
}
