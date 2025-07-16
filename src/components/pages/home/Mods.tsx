import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function ModsSection() {
    const t = useTranslations('HomePage.mods');
    return (
        <section className='flex flex-col gap-24 px-6 md:px-16 py-32 max-w-screen-xl mx-auto'>
            <article className='flex flex-col md:flex-row items-center md:items-start gap-12'>
                <div className='md:w-1/2 flex justify-center md:justify-end'>
                    <Image
                        src='/screenshots/sigmod_menu.png'
                        width={600}
                        height={400}
                        alt='SigMod preview'
                        className='rounded-lg shadow-lg'
                        priority
                    />
                </div>
                <div className='md:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl font-semibold mb-4'>
                        {t('sigmod.title')}
                    </h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        {t('sigmod.desc')}
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigmod'>{t('learnMore')}</Link>
                        </Button>
                    </div>
                </div>
            </article>

            <article className='flex flex-col md:flex-row-reverse items-center md:items-start gap-12'>
                <div className='md:w-1/2 flex justify-center md:justify-start'>
                    <Image
                        src='/screenshots/customization.png'
                        width={600}
                        height={400}
                        alt='SigFixes preview'
                        className='rounded-lg shadow-lg'
                        priority
                    />
                </div>
                <div className='md:w-1/2 flex flex-col justify-center'>
                    <h2 className='text-3xl font-semibold mb-4'>
                        {t('sigfixes.title')}
                    </h2>
                    <p className='text-base leading-relaxed text-muted-foreground'>
                        {t('sigfixes.desc')}
                    </p>
                    <div className='mt-6'>
                        <Button asChild>
                            <Link href='/guide/sigfixes'>{t('learnMore')}</Link>
                        </Button>
                    </div>
                </div>
            </article>
        </section>
    );
}
