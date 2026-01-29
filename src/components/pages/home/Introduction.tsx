import { useTranslations } from 'next-intl';
import { Info, Zap } from 'lucide-react';

export function IntroductionSection() {
    const t = useTranslations('HomePage.introduction');

    return (
        <section className='max-w-7xl mx-auto px-6 py-20 relative'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[var(--glow)]/5 blur-[120px] rounded-full -z-10' />

            <div className='grid md:grid-cols-2 gap-8'>
                <div className='group relative p-8 rounded-[2rem] bg-neutral-900/40 backdrop-blur-md border border-white/5 hover:border-[var(--glow)]/30 transition-all duration-500'>
                    <div className='w-12 h-12 mb-6 rounded-2xl bg-[var(--glow)]/10 flex items-center justify-center text-[var(--glow)]'>
                        <Info size={28} />
                    </div>

                    <h3 className='text-2xl font-black uppercase italic tracking-tight mb-4'>
                        {t('what.title')}
                    </h3>

                    <p className='text-neutral-400 text-sm md:text-base leading-relaxed'>
                        {t('what.desc')}
                    </p>
                </div>

                <div className='group relative p-8 rounded-[2rem] bg-neutral-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/30 transition-all duration-500'>
                    <div className='w-12 h-12 mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400'>
                        <Zap size={28} />
                    </div>

                    <h3 className='text-2xl font-black uppercase italic tracking-tight mb-4'>
                        {t('why.title')}{' '}
                        <span className='text-blue-500'>Sigmally Modz</span>?
                    </h3>

                    <p className='text-neutral-400 text-sm md:text-base leading-relaxed'>
                        {t('why.desc')}
                    </p>
                </div>
            </div>
        </section>
    );
}
