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
    try {
        const bundlesRes = await getSpecialBundles();
        const limitedEndsAt = bundlesRes?.limitedEndsAt || 0;
        const startedAt = bundlesRes?.startedAt || 0;

        let preparedBundles: FullBundle[] = [];
        let sale = 1;

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

        return (
            <main className='flex flex-col items-center text-center space-y-10 py-12'>
                <Hero
                    limitedEndsAt={limitedEndsAt || null}
                    startedAt={startedAt || null}
                />
                {preparedBundles && preparedBundles.length > 0 && (
                    <>
                        <SpecialBundles bundles={preparedBundles} sale={sale} />
                        <hr className='w-1/2' />
                    </>
                )}
                <ProductList />
                <hr className='w-1/2' />
                <WhyBuyHere />
                <hr className='w-1/2' />
                <FAQPage />
                <hr className='w-1/2' />
                <ContactPage />
                <InfoPart />
            </main>
        );
    } catch {
        return (
            <main className='flex flex-col items-center justify-center py-20'>
                <p className='text-neutral-400'>{t('failed')}</p>
            </main>
        );
    }
}
