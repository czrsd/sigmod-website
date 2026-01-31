'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import {
    Eye,
    Heart,
    Calendar,
    ArrowLeft,
    Youtube as YoutubeIcon,
    PlayCircle,
    Image as ImageIcon,
} from 'lucide-react';
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

export default function TutorialDetailPage() {
    const { id } = useParams();
    const { data: session } = useSession();
    const [t, setTutorial] = useState<Serializable<Tutorial> | null>(null);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        fetch(`/api/tutorials/${id}`)
            .then((res) => res.json())
            .then((data) => setTutorial(data));
    }, [id]);

    const handleLike = async () => {
        if (!session) return alert('Please login to like!');
        setIsLiking(true);
        const res = await fetch(`/api/tutorials/${t?._id || id}`, {
            method: 'POST',
        });
        const data = await res.json();
        if (t) setTutorial({ ...t, likes: data.likes });
        setIsLiking(false);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Check out this Tutorial',
            url: window.location.href,
        };

        try {
            if (navigator.share && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(shareData.url);
                toast.success('Tutorial URL copied to clipboard!', {
                    style: {
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        color: '#22c55e',
                        border: '1px solid rgba(34, 197, 94, 0.2)',
                    },
                });
            }
        } catch (error) {
            if ((error as Error).name !== 'AbortError') {
                console.error('Sharing failed', error);
                toast.error('Could not share or copy the link.');
            }
        }
    };

    if (!t)
        return (
            <div className='py-20 text-center animate-pulse'>
                Loading Tutorial...
            </div>
        );

    const hasLiked = session?.user?.id && t.likes?.includes(session.user.id);

    const ZoomableImage = ({
        title,
        src,
        alt,
    }: {
        title: string;
        src: string;
        alt: string;
    }) => (
        <Dialog>
            <DialogTrigger asChild>
                <img
                    src={src}
                    className='w-full h-full object-contain cursor-zoom-in hover:opacity-90 transition-opacity'
                    alt={alt}
                />
            </DialogTrigger>
            <DialogContent className='max-w-[95vw] max-h-[95vh] p-0 border-none bg-transparent flex flex-col items-center justify-center shadow-none'>
                <DialogTitle className='text-2xl font-bold uppercase italic'>
                    {title}
                </DialogTitle>
                <img
                    src={src}
                    className='w-full h-full max-h-[90vh] object-contain rounded-lg'
                    alt={alt}
                />
            </DialogContent>
        </Dialog>
    );

    return (
        <div className='max-w-5xl mx-auto px-6 py-12'>
            <Button
                variant='ghost'
                onClick={() => window.history.back()}
                className='mb-8 text-neutral-400'
            >
                <ArrowLeft size={16} className='mr-2' /> Back
            </Button>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
                <div className='lg:col-span-2 space-y-8'>
                    <div className='relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-black shadow-2xl'>
                        {t?.contentUrls && t.contentUrls.length > 0 ? (
                            <>
                                {t.type === 'youtube' ? (
                                    <iframe
                                        className='w-full h-full'
                                        src={`https://www.youtube.com/embed/${
                                            t.contentUrls[0].includes('v=')
                                                ? t.contentUrls[0]
                                                      .split('v=')[1]
                                                      .split('&')[0]
                                                : t.contentUrls[0]
                                                      .split('/')
                                                      .pop()
                                        }`}
                                        allowFullScreen
                                    />
                                ) : t.type === 'images' ? (
                                    t.contentUrls.length > 1 ? (
                                        <Carousel className='w-full h-full group'>
                                            <CarouselContent className='h-full ml-0'>
                                                {t.contentUrls.map(
                                                    (url, index) => (
                                                        <CarouselItem
                                                            key={index}
                                                            className='pl-0 h-full flex items-center justify-center'
                                                        >
                                                            <ZoomableImage
                                                                title={t.title}
                                                                src={url}
                                                                alt={`${
                                                                    t.title
                                                                } - ${
                                                                    index + 1
                                                                }`}
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
                                            title={t.title}
                                            src={t.contentUrls[0]}
                                            alt={t.title}
                                        />
                                    )
                                ) : (
                                    <video
                                        src={t.contentUrls[0]}
                                        controls
                                        className='w-full h-full'
                                    />
                                )}
                            </>
                        ) : (
                            <div className='w-full h-full flex items-center justify-center text-neutral-600'>
                                No content available
                            </div>
                        )}
                    </div>

                    <div className='space-y-4'>
                        <div className='flex flex-wrap gap-2'>
                            {t.tags?.map((tag) => (
                                <span
                                    key={tag._id}
                                    className='px-3 py-1 rounded-full text-[10px] font-bold uppercase italic border border-white/10 bg-white/5'
                                    style={{ color: tag.color }}
                                >
                                    {tag.name}
                                </span>
                            ))}
                        </div>
                        <h1 className='text-4xl font-black uppercase italic tracking-tighter text-white leading-none'>
                            {t.title}
                        </h1>
                        <p className='text-neutral-400 leading-relaxed text-lg'>
                            {t.description}
                        </p>
                    </div>
                </div>

                <div className='space-y-6'>
                    <div className='p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md space-y-8'>
                        <div className='flex items-center gap-4 pb-6 border-b border-white/5'>
                            <div className='relative'>
                                {t.authorId?.image ? (
                                    <img
                                        src={t.authorId.image}
                                        alt={t.authorId.name}
                                        className='w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-inner'
                                    />
                                ) : (
                                    <div className='w-14 h-14 rounded-2xl bg-neutral-800 border border-white/10 flex items-center justify-center'>
                                        <span className='text-xl font-black italic text-neutral-600'>
                                            {t.authorId?.name?.[0] || '?'}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className='flex flex-col gap-0.5'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-[10px] font-bold text-primary uppercase tracking-[0.2em] italic'>
                                        {t.authorId?.role || 'Member'}
                                    </span>
                                </div>
                                <h4 className='text-xl font-black italic uppercase leading-tight text-white tracking-tighter'>
                                    {t.authorId?.name || 'Unknown User'}
                                </h4>
                                <span className='text-[10px] font-medium text-neutral-500 uppercase'>
                                    Content Creator
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='space-y-1'>
                                <span className='text-xs font-bold text-neutral-500 uppercase tracking-widest'>
                                    Views
                                </span>
                                <div className='flex items-center gap-2 text-2xl font-black italic text-white'>
                                    <Eye className='text-primary' /> {t.views}
                                </div>
                            </div>
                            <button
                                onClick={handleLike}
                                disabled={isLiking}
                                className={`group flex flex-col items-center gap-1 transition-all cursor-pointer ${
                                    hasLiked
                                        ? 'text-red-500'
                                        : 'text-neutral-500 hover:text-red-400'
                                }`}
                            >
                                <Heart
                                    size={32}
                                    className={`${
                                        hasLiked
                                            ? 'fill-current scale-110'
                                            : 'group-hover:scale-110'
                                    } transition-transform`}
                                />
                                <span className='text-xs font-bold'>
                                    {t.likes.length}
                                </span>
                            </button>
                        </div>

                        <div className='pt-6 border-t border-white/5 space-y-4'>
                            <div className='flex items-center gap-3 text-neutral-400'>
                                <Calendar size={18} />
                                <span className='text-sm font-medium'>
                                    {new Date(t.createdAt).toLocaleDateString(
                                        'de-DE',
                                        {
                                            day: '2-digit',
                                            month: 'long',
                                            year: 'numeric',
                                        }
                                    )}
                                </span>
                            </div>
                            <div className='flex items-center gap-3 text-neutral-400'>
                                {t.type === 'youtube' ? (
                                    <YoutubeIcon size={18} />
                                ) : t.type === 'video' ? (
                                    <PlayCircle size={18} />
                                ) : (
                                    <ImageIcon size={18} />
                                )}
                                <span className='text-sm font-medium uppercase italic'>
                                    {t.type} content
                                </span>
                            </div>
                        </div>

                        <Button
                            className='w-full bg-primary hover:bg-primary/80 text-black font-black uppercase italic py-6 rounded-xl shadow-lg shadow-primary/20'
                            onClick={handleShare}
                        >
                            Share Tutorial
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
