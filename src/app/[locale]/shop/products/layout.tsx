'use client';

import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = useTranslations('Shop.Products');
    const router = useRouter();
    const pathname = usePathname();

    const handleBack = () => {
        const parts = pathname?.split('/').filter(Boolean) ?? [];
        if (
            parts.join('/').endsWith('shop/products') ||
            pathname?.endsWith('/shop/products')
        ) {
            router.push('/shop');
            return;
        }

        if (parts.length > 1) {
            const newPath = '/' + parts.slice(0, -1).join('/');
            router.push(newPath);
            return;
        }

        router.push('/');
    };

    return (
        <div className='flex flex-col w-full mx-auto px-6 pt-6'>
            <div className='relative flex items-center w-full gap-3'>
                <Button
                    variant='outline'
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={handleBack}
                >
                    <ArrowLeft size={16} />
                    {t('back')}
                </Button>

                <div className='absolute left-1/2 -translate-x-1/2'>
                    <h1 className='text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text pb-1'>
                        SigModz Shop
                    </h1>
                </div>
            </div>

            <div className='h-[1px] w-xl bg-gradient-to-r from-transparent via-orange-400 to-transparent self-center mt-5'></div>

            <main className='flex flex-col items-center text-center space-y-10 pt-10 pb-16'>
                {children}
            </main>
        </div>
    );
}
