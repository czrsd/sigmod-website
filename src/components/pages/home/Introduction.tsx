import { useTranslations } from 'next-intl';

export function IntroductionSection() {
    const t = useTranslations('HomePage.introduction');

    return (
        <section className='max-w-screen-lg mx-auto px-6 md:px-16 py-14'>
            <div className='flex flex-col md:flex-row gap-12 md:gap-24'>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>
                        {t('what.title')}
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        {t('what.desc')}
                    </p>
                </div>
                <div className='md:w-1/2 text-center md:text-left space-y-4'>
                    <h3 className='text-2xl font-semibold'>
                        <span>{t('why.title')} </span>
                        <span className='text-highlight'>Sigmally Modz</span>
                        <span>?</span>
                    </h3>
                    <p className='text-muted-foreground text-base leading-relaxed'>
                        {t('why.desc')}
                    </p>
                </div>
            </div>
        </section>
    );
}
