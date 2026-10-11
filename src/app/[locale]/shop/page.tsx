import Hero from '@/components/pages/shop/Hero';
import ProductList from '@/components/pages/shop/products';
import SpecialBundles from '@/components/pages/shop/specialBundles';
import WhyBuyHere from '@/components/pages/shop/WhyBuyHere';
import FAQPage from '@/components/pages/shop/FAQ';
import ContactPage from '@/components/pages/shop/Contact';
import {
    getSpecialBundles,
    getCoinPackage,
    getSubscriptionPackage,
    getSale,
} from '@/services/shop';
import { FullBundle, Bundle } from '@/types/shopTypes';
import { getTranslations } from 'next-intl/server';
import InfoPart from '@/components/pages/shop/Info';

export default async function ShopPage() {
    const t = await getTranslations('Shop.MainPage');
    let preparedBundles: FullBundle[] = [];
    let sale = 1;
    let limitedEndsAt: number | null = null;
    let startedAt: number | null = null;
    let isError = false;

    try {
        const bundlesRes = await getSpecialBundles();
        limitedEndsAt = bundlesRes?.limitedEndsAt || null;
        startedAt = bundlesRes?.startedAt || null;

        if (bundlesRes?.specialBundles?.length) {
            preparedBundles = await Promise.all(
                bundlesRes.specialBundles.map(async (bundle: Bundle) => {
                    const [coinPackage, subPackage] = await Promise.all([
                        getCoinPackage(bundle.combined?.[0]),
                        getSubscriptionPackage(bundle.combined?.[1]),
                    ]);

                    if (!coinPackage || !subPackage)
                        throw new Error('Invalid bundle data');

                    return { ...bundle, coinPackage, subPackage };
                })
            );

            sale = (await getSale()) || 1;
        }
    } catch (e) {
        console.error(e);
        isError = true;
    }

    if (isError) {
        return (
            <main className='flex flex-col items-center justify-center py-20'>
                <p className='text-neutral-500'>{t('failed')}</p>
            </main>
        );
    }

    return (
        <main className='flex flex-col items-center text-center space-y-16 py-12 max-w-7xl mx-auto px-6'>
            <Hero
                limitedEndsAt={limitedEndsAt}
                startedAt={startedAt}
            />

            {preparedBundles && preparedBundles.length > 0 && (
                <div className='w-full'>
                    <SpecialBundles bundles={preparedBundles} sale={sale} />
                </div>
            )}

            <div className='w-full max-w-4xl h-px bg-black/5 dark:bg-white/10' />

            <ProductList />

            <div className='w-full max-w-4xl h-px bg-black/5 dark:bg-white/10' />

            <WhyBuyHere />

            <div className='w-full max-w-4xl h-px bg-black/5 dark:bg-white/10' />

            <FAQPage />

            <div className='w-full max-w-4xl h-px bg-black/5 dark:bg-white/10' />

            <ContactPage />

            <InfoPart />
        </main>
    );
}
