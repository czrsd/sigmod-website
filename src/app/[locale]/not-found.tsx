import { useTranslations } from 'next-intl';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <div className='min-h-[calc(100vh-220px)] md:min-h-[calc(100vh-166px)] flex items-center justify-center text-center'>
            <div>
                <h1 className='text-4xl font-bold'>{t('title')}</h1>
                <p className='mt-2 text-muted-foreground'>{t('message')}</p>
            </div>
        </div>
    );
}
