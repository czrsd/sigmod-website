import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function InfoPart() {
    const t = useTranslations('Shop.MainPage.Info');

    return (
        <div className='flex flex-col items-center gap-3 mt-16 pb-10 opacity-60 hover:opacity-100 transition-opacity duration-300'>
            <span className='text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-500'>
                {t('shop')}
            </span>

            <div className='flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[12px] font-medium text-neutral-500 dark:text-neutral-500'>
                <Link
                    href='/shop/refund/'
                    className='hover:text-primary transition-colors'
                >
                    {t('refund')}
                </Link>
                <span className='w-1 h-1 bg-neutral-700 rounded-full' />{' '}
                <Link
                    href='/shop/terms/'
                    className='hover:text-primary transition-colors'
                >
                    {t('terms')}
                </Link>
                <span className='w-1 h-1 bg-neutral-700 rounded-full' />{' '}
                <Link
                    href='/shop/privacy/'
                    className='hover:text-primary transition-colors'
                >
                    {t('privacy')}
                </Link>
            </div>
        </div>
    );
}
