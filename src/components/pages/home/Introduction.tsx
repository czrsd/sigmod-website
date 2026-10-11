import { useTranslations } from 'next-intl';
import { Gamepad2, Sparkles } from 'lucide-react';

export function IntroductionSection() {
    const t = useTranslations('HomePage.introduction');

    return (
        <section className='max-w-7xl mx-auto px-6 py-16 md:py-20'>
            <div className='grid md:grid-cols-2 gap-6 md:gap-8'>
                <div className='p-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-colors'>
                    <div className='w-11 h-11 mb-6 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500'>
                        <Gamepad2 size={22} />
                    </div>

                    <h2 className='text-2xl font-bold tracking-tight text-foreground mb-3'>
                        {t('what.title')}
                    </h2>

                    <p className='text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed'>
                        {t('what.desc')}
                    </p>
                </div>

                <div className='p-8 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-colors'>
                    <div className='w-11 h-11 mb-6 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500'>
                        <Sparkles size={22} />
                    </div>

                    <h2 className='text-2xl font-bold tracking-tight text-foreground mb-3'>
                        {t('why.title')} Sigmally Modz?
                    </h2>

                    <p className='text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed'>
                        {t('why.desc')}
                    </p>
                </div>
            </div>
        </section>
    );
}
