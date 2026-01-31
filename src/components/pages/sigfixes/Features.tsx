'use client';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import Autoplay from 'embla-carousel-autoplay';
import {
    Gauge,
    MousePointerClick,
    Eye,
    SplitSquareHorizontal,
    LayoutTemplate,
    Paintbrush2,
    FileCog,
    Layers,
    Focus,
    Info,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

// Icons passend zu SigFixes Features
const icons = [
    Gauge, // Performance
    MousePointerClick, // Input
    SplitSquareHorizontal, // Multiboxing
    LayoutTemplate, // UI/Layout
    Eye, // Visuals
    Paintbrush2, // Customization
    FileCog, // Settings/Patches
    Focus, // Camera
    Layers, // Rendering
];

export function Features() {
    const t = useTranslations('SigFixesPage.Features');
    const features = t.raw('list') as {
        title: string;
        summary: string;
        details: string;
    }[];

    return (
        <section
            className='max-w-6xl mx-auto px-6 py-24 space-y-12 scroll-mt-24'
            id='features'
        >
            <div className='text-center space-y-4'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1.5 w-24 bg-cyan-500 mx-auto rounded-full shadow-[0_0_15px_rgba(34,211,238,0.6)]' />
            </div>

            <Carousel
                opts={{ loop: true, align: 'start' }}
                plugins={[Autoplay({ delay: 3500, stopOnInteraction: true })]}
                className='w-full'
            >
                <CarouselContent className='-ml-4 py-2'>
                    {features.map((f, i) => {
                        const Icon = icons[i] || Info;
                        return (
                            <CarouselItem
                                key={f.title}
                                className='pl-4 md:basis-1/2 lg:basis-1/3'
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className='group cursor-pointer relative h-full flex flex-col p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.05] to-transparent backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-cyan-500/30'>
                                            <div className='mb-6 flex items-center justify-between'>
                                                <div className='p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]'>
                                                    <Icon size={24} />
                                                </div>
                                                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-cyan-500/50 transition-colors'>
                                                    Feature {i + 1}
                                                </span>
                                            </div>

                                            <div className='space-y-3 flex-grow'>
                                                <h3 className='text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-cyan-400 transition-colors'>
                                                    {f.title}
                                                </h3>
                                                <p className='text-sm leading-relaxed text-neutral-400 font-medium line-clamp-3 group-hover:text-neutral-300 transition-colors'>
                                                    {f.summary}
                                                </p>
                                            </div>

                                            <div className='mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0'>
                                                {t('viewMore')}{' '}
                                                <Info size={12} />
                                            </div>
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent className='bg-neutral-950/95 backdrop-blur-xl border-white/10 rounded-[2.5rem] max-w-lg'>
                                        <DialogHeader className='space-y-4'>
                                            <div className='mx-auto p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit'>
                                                <Icon size={32} />
                                            </div>
                                            <DialogTitle className='text-3xl font-black uppercase italic tracking-tighter text-center'>
                                                {f.title}
                                            </DialogTitle>
                                            <div className='h-1.5 w-12 bg-cyan-500 mx-auto rounded-full' />
                                            <DialogDescription className='text-neutral-300 text-base leading-relaxed text-center pt-4'>
                                                {f.details}
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>

                <div className='flex justify-center gap-4 mt-12'>
                    <CarouselPrevious className='static translate-y-0 h-12 w-12 bg-white/5 border-white/10 hover:bg-cyan-500 hover:text-black transition-all duration-300' />
                    <CarouselNext className='static translate-y-0 h-12 w-12 bg-white/5 border-white/10 hover:bg-cyan-500 hover:text-black transition-all duration-300' />
                </div>
            </Carousel>
        </section>
    );
}
