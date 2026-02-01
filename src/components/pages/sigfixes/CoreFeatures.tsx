'use client';

import {
    GaugeCircle,
    Layers,
    MousePointerClick,
    LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons: LucideIcon[] = [GaugeCircle, Layers, MousePointerClick];

export function CoreFeatures() {
    const t = useTranslations('SigFixesPage.CoreFeatures');

    const features = ['performance', 'multiboxing', 'input'].map((key, i) => ({
        Icon: icons[i],
        title: t(`${key}.title`),
        description: t(`${key}.desc`),
        color: i === 0 ? '#22D3EE' : i === 1 ? '#3B82F6' : '#6366F1',
    }));

    return (
        <section className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-24 px-6'>
            {features.map(({ Icon, title, description, color }) => (
                <div
                    key={title}
                    className='group relative flex flex-col items-center text-center p-8 rounded-[2.5rem] border border-black/5 dark:border-white/5 bg-gradient-to-b from-black/[0.05] dark:from-white/[0.05] to-transparent backdrop-blur-md transition-all duration-500 hover:-translate-y-2'
                >
                    <div
                        className='absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[2.5rem] blur-3xl'
                        style={{ backgroundColor: color }}
                    />

                    <div className='relative mb-8'>
                        <div
                            className='absolute inset-0 blur-xl opacity-20 group-hover:opacity-100 transition-opacity duration-500'
                            style={{ backgroundColor: color }}
                        />
                        <div className='relative bg-neutral-200/80 dark:bg-neutral-900/80 p-5 rounded-2xl border border-black/10 dark:border-white/10 group-hover:border-white/20 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(var(--color),0.3)]'>
                            <Icon
                                size={36}
                                className='transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3'
                                style={{
                                    stroke: color,
                                    filter: `drop-shadow(0 0 10px ${color}80)`,
                                }}
                            />
                        </div>
                    </div>

                    <div className='space-y-3 relative z-10'>
                        <h3 className='text-2xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-black dark:from-white to-black/60 dark:to-white/60 bg-clip-text text-transparent'>
                            {title}
                        </h3>

                        <p className='text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-medium'>
                            {description}
                        </p>
                    </div>

                    <div
                        className='absolute bottom-8 w-0 h-1 rounded-full transition-all duration-500 group-hover:w-16'
                        style={{
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`,
                        }}
                    />
                </div>
            ))}
        </section>
    );
}
