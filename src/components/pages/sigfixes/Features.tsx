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
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import {
    Gauge,
    MousePointerClick,
    Eye,
    SplitSquareHorizontal,
    LayoutTemplate,
    Paintbrush2,
    FileCog,
    LucideIcon,
    Layers,
    Focus,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const icons: LucideIcon[] = [
    Gauge,
    MousePointerClick,
    SplitSquareHorizontal,
    LayoutTemplate,
    Eye,
    Paintbrush2,
    FileCog,
    Focus,
    Layers,
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
            className='max-w-4xl mx-auto px-6 py-12 space-y-8 scroll-mt-24'
            id='features'
        >
            <h2 className='text-3xl font-semibold text-center'>{t('title')}</h2>
            <Carousel
                opts={{ loop: true }}
                plugins={[Autoplay({ delay: 2500 })]}
            >
                <CarouselContent className='items-center'>
                    {features.map((f, i) => {
                        const Icon = icons[i];
                        return (
                            <CarouselItem
                                key={f.title}
                                className='pl-4 md:basis-1/2 lg:basis-1/3'
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className='flex items-center gap-2 text-base'>
                                            <Icon
                                                size={16}
                                                aria-hidden='true'
                                            />
                                            {f.title}
                                        </CardTitle>
                                        <CardDescription className='max-w-prose'>
                                            {f.summary}
                                        </CardDescription>
                                        <Dialog>
                                            <DialogTrigger
                                                className='mt-1'
                                                asChild
                                            >
                                                <Button variant='outline'>
                                                    {t('viewMore')}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        {f.title}
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        {f.details}
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </CardHeader>
                                </Card>
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
