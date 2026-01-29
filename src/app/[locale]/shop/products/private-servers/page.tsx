'use client';

import { useEffect, useState } from 'react';
import { getAllPrivateServers } from '@/services/shop';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Check,
    Server as ServerIcon,
    MessageCircle,
    Globe,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Server } from '@/types/shopTypes';

type PricingDuration =
    | 'fourteenDays'
    | 'oneMonth'
    | 'threeMonths'
    | 'sixMonths'
    | 'twelveMonths';

export default function PrivateServersPage() {
    const t = useTranslations('Shop.Products.Servers');
    const [servers, setServers] = useState<Server[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    const [selectedDuration, setSelectedDuration] =
        useState<PricingDuration>('oneMonth');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllPrivateServers();
                if (!data) throw new Error('No data');
                setServers(data);
            } catch {
                setFailed(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <LoadingSkeleton />;

    if (failed || !servers) {
        return (
            <div className='flex flex-col items-center justify-center py-20 text-neutral-400 space-y-4'>
                <ServerIcon size={48} className='opacity-20' />
                <p>{t('notFound')}</p>
            </div>
        );
    }

    return (
        <section className='flex flex-col items-center w-full max-w-7xl mx-auto space-y-12 animate-in fade-in zoom-in duration-500'>
            <div className='text-center space-y-4 max-w-2xl px-4'>
                <h2 className='text-3xl md:text-5xl font-bold tracking-tight'>
                    {t('title')}
                </h2>
                <p className='text-neutral-500 dark:text-neutral-400 text-lg'>
                    {t('description')}
                </p>
            </div>

            <div className='w-full flex justify-center px-4'>
                <Tabs
                    defaultValue='oneMonth'
                    className='w-full max-w-3xl'
                    onValueChange={(val) =>
                        setSelectedDuration(val as PricingDuration)
                    }
                >
                    <TabsList className='grid w-full grid-cols-5 h-12 bg-neutral-100 dark:bg-neutral-900/50 border dark:border-neutral-800 p-1'>
                        <TabsTrigger
                            value='fourteenDays'
                            className='text-xs sm:text-sm'
                        >
                            {t('durations.14d')}
                        </TabsTrigger>
                        <TabsTrigger
                            value='oneMonth'
                            className='text-xs sm:text-sm'
                        >
                            {t('durations.1m')}
                        </TabsTrigger>
                        <TabsTrigger
                            value='threeMonths'
                            className='text-xs sm:text-sm'
                        >
                            {t('durations.3m')}
                        </TabsTrigger>
                        <TabsTrigger
                            value='sixMonths'
                            className='text-xs sm:text-sm'
                        >
                            {t('durations.6m')}
                        </TabsTrigger>
                        <TabsTrigger
                            value='twelveMonths'
                            className='text-xs sm:text-sm'
                        >
                            {t('durations.12m')}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4'>
                {servers.map((server, index) => (
                    <ProductCard
                        key={server._id}
                        server={server}
                        duration={selectedDuration}
                        isPopular={index === 1}
                        t={t}
                    />
                ))}
            </div>
        </section>
    );
}

function ProductCard({
    server,
    duration,
    isPopular,
    t,
}: {
    server: Server;
    duration: PricingDuration;
    isPopular: boolean;
    t: any;
}) {
    const price = server.pricing?.[duration] ?? 0;

    return (
        <Card
            className={`relative flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
            ${
                isPopular
                    ? 'border-orange-500/50 shadow-orange-500/10 dark:bg-neutral-900 z-10 scale-105 md:scale-110'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950/50'
            }`}
        >
            {isPopular && (
                <div className='absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500' />
            )}

            <CardHeader className='pb-4'>
                <div className='flex justify-between items-start mb-2'>
                    <Badge
                        variant={isPopular ? 'default' : 'outline'}
                        className={
                            isPopular
                                ? 'bg-orange-500 hover:bg-orange-600 border-none'
                                : ''
                        }
                    >
                        {server.maxPlayers} Slots
                    </Badge>
                    {isPopular && (
                        <Badge
                            variant='secondary'
                            className='text-orange-500 bg-orange-500/10'
                        >
                            Most Popular
                        </Badge>
                    )}
                </div>
                <CardTitle className='text-2xl font-bold'>
                    {server.title}
                </CardTitle>
                <CardDescription className='flex items-center gap-2 mt-1'>
                    <Globe size={14} />
                    {server.regions.length} {t('regionsAvailable')}
                </CardDescription>
            </CardHeader>

            <div className='px-6 pb-6'>
                <div className='relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 group'>
                    <Image
                        src='/images/dashboard-placeholder.png'
                        alt='Server Dashboard Interface'
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                    <div className='absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors' />
                </div>
            </div>

            <CardContent className='flex-1 space-y-6'>
                <div className='space-y-2'>
                    <span className='text-4xl font-extrabold tracking-tight'>
                        €{price.toFixed(2)}
                    </span>
                    <span className='text-neutral-500 dark:text-neutral-400 text-sm font-medium ml-2'>
                        / {t(`period.${duration}`)}
                    </span>
                </div>

                <div className='space-y-3'>
                    {server.features.map((feature, i) => (
                        <div
                            key={i}
                            className='flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300'
                        >
                            <div className='mt-0.5 min-w-[16px]'>
                                <Check size={16} className='text-orange-500' />
                            </div>
                            {feature}
                        </div>
                    ))}
                </div>
            </CardContent>

            <CardFooter className='pt-2 pb-8'>
                <Button
                    className={`w-full font-bold gap-2 shadow-lg transition-all
                    ${
                        isPopular
                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0'
                            : ''
                    }`}
                    variant={isPopular ? 'default' : 'secondary'}
                    size='lg'
                    onClick={() =>
                        (window.location.href = 'mailto:support@sigmodz.com')
                    }
                >
                    <MessageCircle size={18} />
                    {t('ctaButton')}
                </Button>
            </CardFooter>
        </Card>
    );
}

function LoadingSkeleton() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-4 mt-10'>
            {[1, 2, 3].map((i) => (
                <Skeleton
                    key={i}
                    className='h-[500px] w-full bg-neutral-100 dark:bg-neutral-900 rounded-xl'
                />
            ))}
        </div>
    );
}
