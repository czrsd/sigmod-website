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
    Settings2,
    Users2,
    LayoutDashboard,
    Eye,
    Camera,
    Type,
    User,
    BarChart,
    MessageSquareText,
    Info,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons = [
    Settings2,
    Users2,
    LayoutDashboard,
    Eye,
    Camera,
    Type,
    User,
    BarChart,
    MessageSquareText,
];

export function Features() {
    const t = useTranslations('SigModPage.Features');
    const features = t.raw('list') as {
        title: string;
        summary: string;
        details: string;
    }[];

    return (
        <section
            className='max-w-6xl mx-auto px-6 py-20 space-y-12 scroll-mt-24'
            id='features'
        >
            <div className='text-center space-y-4'>
                <h2 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h2>
                <div className='h-1.5 w-24 bg-primary mx-auto rounded-full' />
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
                                        <div className='group cursor-pointer relative h-full flex flex-col p-8 rounded-[2rem] border border-white/5 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/30'>
                                            <div className='mb-6 flex items-center justify-between'>
                                                <div className='p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary group-hover:scale-110 transition-transform duration-500'>
                                                    <Icon size={24} />
                                                </div>
                                                <span className='text-[10px] font-black uppercase tracking-[0.2em] text-white/20 group-hover:text-primary/50 transition-colors'>
                                                    Feature {i + 1}
                                                </span>
                                            </div>

                                            <div className='space-y-3 flex-grow'>
                                                <h3 className='text-xl font-black uppercase italic tracking-tighter text-white group-hover:text-primary transition-colors'>
                                                    {f.title}
                                                </h3>
                                                <p className='text-sm leading-relaxed text-neutral-400 font-medium line-clamp-3'>
                                                    {f.summary}
                                                </p>
                                            </div>

                                            <div className='mt-6 pt-6 border-t border-white/5 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0'>
                                                {t('viewMore')}{' '}
                                                <Info size={12} />
                                            </div>
                                        </div>
                                    </DialogTrigger>

                                    <DialogContent className='bg-neutral-950 border-white/10 rounded-[2rem] max-w-lg'>
                                        <DialogHeader className='space-y-4'>
                                            <div className='mx-auto p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary w-fit'>
                                                <Icon size={32} />
                                            </div>
                                            <DialogTitle className='text-3xl font-black uppercase italic tracking-tighter text-center'>
                                                {f.title}
                                            </DialogTitle>
                                            <div className='h-1 w-12 bg-primary mx-auto rounded-full' />
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
                    <CarouselPrevious className='static translate-y-0 h-12 w-12 bg-white/5 border-white/10 transition-all' />
                    <CarouselNext className='static translate-y-0 h-12 w-12 bg-white/5 border-white/10 transition-all' />
                </div>
            </Carousel>
        </section>
    );
}
