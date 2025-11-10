import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function InfoPart() {
    const t = useTranslations('Shop.MainPage.Info');

    return (
        <div className='flex flex-col gap-2 mt-10'>
            <span className=' text-sm text-neutral-600 dark:text-neutral-400'>
                {t('shop')}
            </span>
            <div className='flex flex-col md:flex-row gap-4'>
                <Link
                    href='/shop/refund/'
                    className='underline text-neutral-600 dark:text-neutral-400'
                >
                    {t('refund')}
                </Link>
                <Link
                    href='/shop/terms/'
                    className='underline text-neutral-600 dark:text-neutral-400'
                >
                    {t('terms')}
                </Link>
                <Link
                    href='/shop/privacy/'
                    className='underline text-neutral-600 dark:text-neutral-400'
                >
                    {t('privacy')}
                </Link>
            </div>
        </div>
    );
}
