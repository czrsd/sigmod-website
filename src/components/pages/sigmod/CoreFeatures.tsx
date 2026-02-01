'use client';

import { Tag, Cpu, Palette, LucideIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons: LucideIcon[] = [Cpu, Tag, Palette];

export function CoreFeatures() {
    const t = useTranslations('SigModPage.CoreFeatures');

    const features = ['macros', 'party', 'customization'].map((key, i) => ({
        Icon: icons[i],
        title: t(`${key}.title`),
        description: t(`${key}.desc`),
        color: i === 0 ? '#A855F7' : i === 1 ? '#3B82F6' : '#EC4899',
    }));

    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20 px-4'>
            {features.map(({ Icon, title, description, color }, i) => (
                <div
                    key={title}
                    className='group relative flex flex-col items-center text-center p-8 rounded-[2rem] border border-black/5 dark:border-white/5 bg-gradient-to-b from-black/[0.07] dark:from-white/[0.07] to-transparent backdrop-blur-sm transition-all duration-500 hover:-translate-y-2'
                >
                    <div
                        className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2rem] blur-2xl'
                        style={{ backgroundColor: color }}
                    />

                    <div className='relative mb-6'>
                        <div
                            className='absolute inset-0 blur-lg opacity-55 dark:opacity-40 group-hover:opacity-100 transition-opacity duration-500'
                            style={{ backgroundColor: color }}
                        />
                        <div className='relative bg-black/40 p-4 rounded-2xl border border-black/10 dark:border-white/10 group-hover:border-white/20 transition-colors'>
                            <Icon
                                size={32}
                                className='transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3'
                                style={{
                                    stroke: color,
                                    filter: `drop-shadow(0 0 8px ${color})`,
                                }}
                            />
                        </div>
                    </div>

                    <h3 className='text-xl font-black uppercase italic tracking-tighter mb-3 bg-gradient-to-r from-black dark:from-white to-black/60 dark:to-white/60 bg-clip-text text-transparent'>
                        {title}
                    </h3>

                    <p className='text-sm leading-relaxed text-neutral-400 font-medium'>
                        {description}
                    </p>

                    <div
                        className='absolute bottom-6 w-0 h-[2px] rounded-full transition-all duration-500 group-hover:w-12'
                        style={{ backgroundColor: color }}
                    />
                </div>
            ))}
        </section>
    );
}
