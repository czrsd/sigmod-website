'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
    Eye,
    Heart,
    Calendar,
    ArrowLeft,
    PlayCircle,
    Image as ImageIcon,
    Share2,
} from 'lucide-react';
import { YoutubeIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ITutorialPopulated as Tutorial } from '@/models/Tutorial';
import { Serializable } from '@/types/utils';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

function ZoomableImage({
    title,
    src,
    alt,
}: {
    title: string;
    src: string;
    alt: string;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img
                    src={src}
                    className='w-full h-full object-contain cursor-zoom-in hover:opacity-95 transition-opacity'
                    alt={alt}
                />
            </DialogTrigger>
            <DialogContent className='max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent flex flex-col items-center justify-center shadow-none'>
                <DialogTitle className='text-lg font-bold text-white mb-2'>
                    {title}
                </DialogTitle>
                <img
                    src={src}
                    className='w-full h-full max-h-[90vh] object-contain rounded-xl'
                    alt={alt}
                />
            </DialogContent>
        </Dialog>
    );
}

export default function TutorialDetailPage({
    initialTutorial,
}: {
    initialTutorial?: Serializable<Tutorial> | null;
}) {
    const t = useTranslations('TutorialPage.tutorialDetail');
    const { id } = useParams();
    const { data: session } = useSession();
    const [tutorial, setTutorial] = useState<Serializable<Tutorial> | null>(
        initialTutorial ?? null
    );
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        if (initialTutorial) return;

        fetch(`/api/tutorials/${id}`)
            .then((res) => res.json())
            .then((data) => setTutorial(data));
    }, [id, initialTutorial]);

    const handleLike = async () => {
        if (!session) return alert(t('loginToLike'));
        setIsLiking(true);
        const res = await fetch(`/api/tutorials/${tutorial?._id || id}`, {
            method: 'POST',
        });
        const data = await res.json();
        if (tutorial) setTutorial({ ...tutorial, likes: data.likes });
        setIsLiking(false);
    };

    const handleShare = async () => {
        const shareData = {
            title: t('shareTitle'),
            url: window.location.href,
        };

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                toast.success(t('copied'), {
                    style: {
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                });
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                toast.error(t('shareFailed'));
            }
        }
    };

    if (!tutorial)
        return (
            <div className='py-24 text-center text-sm text-neutral-400 animate-pulse'>
                {t('loading')}
            </div>
        );

    const hasLiked =
        session?.user?.id && tutorial.likes?.includes(session.user.id);

    return (
        <div className='max-w-5xl mx-auto px-6 py-12 md:py-16'>
            <Button
                variant='ghost'
                size='sm'
                onClick={() => window.history.back()}
                className='mb-6 text-neutral-500 hover:text-foreground -ml-2'
            >
                <ArrowLeft size={16} className='mr-1.5' /> {t('back')}
            </Button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
                {/* Main Content (Media & Details) */}
                <div className='lg:col-span-2 space-y-6'>
                    <div className='relative aspect-video rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-neutral-900 shadow-md'>
                        {tutorial?.contentUrls && tutorial.contentUrls.length > 0 ? (
                            <>
                                {tutorial.type === 'youtube' ? (
                                    <iframe
                                        className='w-full h-full'
                                        src={`https://www.youtube.com/embed/${
                                            tutorial.contentUrls[0].includes('v=')
                                                ? tutorial.contentUrls[0]
                                                      .split('v=')[1]
                                                      .split('&')[0]
                                                : tutorial.contentUrls[0]
                                                      .split('/')
                                                      .pop()
                                        }`}
                                        allowFullScreen
                                    />
                                ) : tutorial.type === 'images' ? (
                                    tutorial.contentUrls.length > 1 ? (
                                        <Carousel className='w-full h-full group'>
                                            <CarouselContent className='h-full ml-0'>
                                                {tutorial.contentUrls.map(
                                                    (url, index) => (
                                                        <CarouselItem
                                                            key={index}
                                                            className='pl-0 h-full flex items-center justify-center'
                                                        >
                                                            <ZoomableImage
                                                                title={tutorial.title}
                                                                src={url}
                                                                alt={`${tutorial.title} - ${index + 1}`}
                                                            />
                                                        </CarouselItem>
                                                    )
                                                )}
                                            </CarouselContent>
                                            <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
                                                <CarouselPrevious className='left-4' />
                                                <CarouselNext className='right-4' />
                                            </div>
                                        </Carousel>
                                    ) : (
                                        <ZoomableImage
                                            title={tutorial.title}
                                            src={tutorial.contentUrls[0]}
                                            alt={tutorial.title}
                                        />
                                    )
                                ) : (
                                    <video
                                        src={tutorial.contentUrls[0]}
                                        controls
                                        className='w-full h-full'
                                    />
                                )}
                            </>
                        ) : (
                            <div className='w-full h-full flex items-center justify-center text-neutral-500 text-sm'>
                                {t('noContent')}
                            </div>
                        )}
                    </div>

                    <div className='space-y-3'>
                        {tutorial.tags && tutorial.tags.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                                {tutorial.tags.map((tag) => (
                                    <span
                                        key={tag._id}
                                        className='px-2.5 py-0.5 rounded-md text-xs font-medium border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04]'
                                        style={{ color: tag.color }}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        <h1 className='text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight'>
                            {tutorial.title}
                        </h1>

                        <p className='text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm sm:text-base'>
                            {tutorial.description}
                        </p>
                    </div>
                </div>

                {/* Sidebar Details Card */}
                <div className='p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] space-y-6'>
                    {/* Author */}
                    <div className='flex items-center gap-3.5 pb-5 border-b border-black/5 dark:border-white/10'>
                        {tutorial.authorId?.image ? (
                            <img
                                src={tutorial.authorId.image}
                                alt={tutorial.authorId.name}
                                className='w-11 h-11 rounded-xl object-cover'
                            />
                        ) : (
                            <div className='w-11 h-11 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-600'>
                                {tutorial.authorId?.name?.[0] || '?'}
                            </div>
                        )}

                        <div className='flex flex-col'>
                            <span className='text-sm font-bold text-foreground'>
                                {tutorial.authorId?.name || t('unknownUser')}
                            </span>
                            <span className='text-xs text-neutral-500 capitalize'>
                                {tutorial.authorId?.role || t('member')}
                            </span>
                        </div>
                    </div>

                    {/* Stats (Views & Likes) */}
                    <div className='flex justify-between items-center py-1'>
                        <div className='flex items-center gap-2 text-neutral-600 dark:text-neutral-400 text-sm'>
                            <Eye size={16} />
                            <span>{tutorial.views || 0} views</span>
                        </div>

                        <button
                            onClick={handleLike}
                            disabled={isLiking}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                                hasLiked
                                    ? 'bg-red-500/10 text-red-500'
                                    : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-red-500'
                            }`}
                        >
                            <Heart
                                size={14}
                                className={hasLiked ? 'fill-current' : ''}
                            />
                            <span>{tutorial.likes?.length || 0}</span>
                        </button>
                    </div>

                    {/* Info */}
                    <div className='space-y-3 pt-2 border-t border-black/5 dark:border-white/10 text-xs text-neutral-500'>
                        <div className='flex items-center gap-2'>
                            <Calendar size={14} />
                            <span>
                                {new Date(tutorial.createdAt).toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                })}
                            </span>
                        </div>
                        <div className='flex items-center gap-2 capitalize'>
                            {tutorial.type === 'youtube' ? (
                                <YoutubeIcon size={14} />
                            ) : tutorial.type === 'video' ? (
                                <PlayCircle size={14} />
                            ) : (
                                <ImageIcon size={14} />
                            )}
                            <span>{tutorial.type}</span>
                        </div>
                    </div>

                    {/* Share Button */}
                    <Button
                        className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-11 rounded-xl shadow-sm text-xs'
                        onClick={handleShare}
                    >
                        <Share2 size={14} className='mr-1.5' />
                        {t('share')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
