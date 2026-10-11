'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import {
    Search,
    Upload,
    PlayCircle,
    Image as ImageIcon,
    Filter,
    ShieldUser,
    LogOut,
    Eye,
    Heart,
    ArrowUpRight,
    SlidersHorizontal,
    Video,
} from 'lucide-react';
import { Youtube } from '@/components/icons';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ITutorialPopulated as Tutorial } from '@/models/Tutorial';
import { ITagData as Tag } from '@/models/Tag';
import { Serializable } from '@/types/utils';
import Image from 'next/image';

export default function TutorialsPage() {
    const t = useTranslations('TutorialPage.overview');
    const { data: session } = useSession();
    const [tutorials, setTutorials] = useState<Serializable<Tutorial[]>>([]);
    const [tags, setTags] = useState<Serializable<Tag[]>>([]);
    const [activeTag, setActiveTag] = useState('all');
    const [activeType, setActiveType] = useState('all');
    const [sortBy, setSortBy] = useState('likes');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/tutorials/tags')
            .then((res) => res.json())
            .then((data) => setTags(data));
    }, []);

    useEffect(() => {
        const fetchTutorials = async () => {
            setLoading(true);
            const res = await fetch(
                `/api/tutorials?tag=${activeTag}&type=${activeType}&sort=${sortBy}`
            );
            const data = await res.json();
            setTutorials(data);
            setLoading(false);
        };
        fetchTutorials();
    }, [activeTag, activeType, sortBy]);

    const filtered = tutorials.filter((x) =>
        x.title.toLowerCase().includes(search.toLowerCase())
    );

    const getYoutubeThumbnail = (url: string) => {
        const regExp =
            /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            const videoId = match[2];
            return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
        return null;
    };

    return (
        <div className='max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-8'>
            {/* Header */}
            <div className='flex flex-col md:flex-row justify-between items-start md:items-end gap-6'>
                <div className='max-w-2xl space-y-3'>
                    <h1 className='text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground'>
                        {t('title')}
                    </h1>
                    <p className='text-base text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                        {t('description')}
                    </p>
                </div>

                {/* Session / Action Controls */}
                <div className='flex items-center gap-2.5'>
                    {session ? (
                        <>
                            {(session.user.role === 'admin' ||
                                session.user.role === 'moderator') && (
                                <Button
                                    asChild
                                    variant='outline'
                                    size='sm'
                                    className='rounded-xl h-10 border-black/10 dark:border-white/10 text-xs font-semibold'
                                >
                                    <Link href='/tutorials/admin'>
                                        <ShieldUser size={15} className='mr-1.5' />
                                        {t('admin')}
                                    </Link>
                                </Button>
                            )}

                            <Button
                                asChild
                                size='sm'
                                className='bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-10 px-5 shadow-sm text-xs'
                            >
                                <Link href='/tutorials/dashboard'>
                                    <Upload size={15} className='mr-1.5' />
                                    {t('upload')}
                                </Link>
                            </Button>

                            <Button
                                onClick={() => signOut()}
                                variant='ghost'
                                size='icon'
                                className='text-neutral-500 hover:text-red-500 rounded-xl h-10 w-10'
                                title='Sign out'
                            >
                                <LogOut size={16} />
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => signIn('discord')}
                            className='bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-xl h-10 px-5 text-xs shadow-sm'
                        >
                            {t('loginDiscord')}
                        </Button>
                    )}
                </div>
            </div>

            {/* Filters Row */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end pt-2'>
                <div className='lg:col-span-5 relative'>
                    <Input
                        placeholder={t('searchPlaceholder')}
                        className='pl-10 bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 h-11 rounded-xl text-sm focus:ring-1 focus:ring-blue-500'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search
                        size={16}
                        className='absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none'
                    />
                </div>

                <div className='lg:col-span-3'>
                    <Select value={activeTag} onValueChange={setActiveTag}>
                        <SelectTrigger className='bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 h-11 rounded-xl text-xs font-medium'>
                            <SelectValue placeholder={t('category')} />
                        </SelectTrigger>
                        <SelectContent className='border-black/10 dark:border-white/10'>
                            <SelectItem value='all' className='text-xs'>
                                {t('allCategories')}
                            </SelectItem>
                            {tags.map((tag) => (
                                <SelectItem
                                    key={tag._id}
                                    value={tag.slug}
                                    className='text-xs'
                                >
                                    <div className='flex items-center gap-2'>
                                        <span
                                            className='w-2 h-2 rounded-full'
                                            style={{ backgroundColor: tag.color }}
                                        />
                                        <span>{tag.name}</span>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='lg:col-span-2'>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className='bg-black/[0.02] dark:bg-white/[0.03] border-black/10 dark:border-white/10 h-11 rounded-xl text-xs font-medium'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className='border-black/10 dark:border-white/10'>
                            <SelectItem value='newest' className='text-xs'>
                                {t('newestFirst')}
                            </SelectItem>
                            <SelectItem value='views' className='text-xs'>
                                {t('mostViewed')}
                            </SelectItem>
                            <SelectItem value='likes' className='text-xs'>
                                {t('mostLiked')}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Content Type Filter Pills */}
                <div className='lg:col-span-2 flex bg-black/[0.03] dark:bg-white/[0.04] p-1 rounded-xl border border-black/5 dark:border-white/5 h-11 items-center'>
                    {['all', 'youtube', 'video', 'images'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex-1 text-[11px] font-medium rounded-lg transition-colors py-1.5 ${
                                activeType === type
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-neutral-500 hover:text-foreground'
                            }`}
                        >
                            {t(`type.${type}`)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tutorials Grid */}
            {loading ? (
                <div className='py-28 text-center text-sm text-neutral-400 animate-pulse'>
                    {t('syncing')}
                </div>
            ) : filtered.length === 0 ? (
                <div className='py-24 text-center rounded-2xl border border-dashed border-black/10 dark:border-white/10 p-12'>
                    <p className='text-neutral-500 text-sm'>
                        No tutorials found matching your search.
                    </p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2'>
                    {filtered.map((x) => {
                        const ytThumb =
                            x.type === 'youtube' && x.contentUrls?.[0]
                                ? getYoutubeThumbnail(x.contentUrls[0])
                                : null;
                        const displayImage =
                            x.thumbnailUrl ||
                            ytThumb ||
                            (x.type === 'images' && x.contentUrls?.[0]
                                ? x.contentUrls[0]
                                : null);

                        return (
                            <Link
                                href={`/tutorials/${x.slug || x._id}`}
                                key={x._id}
                                className='group flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all overflow-hidden shadow-sm'
                            >
                                <div className='relative aspect-video overflow-hidden bg-neutral-900'>
                                    {displayImage ? (
                                        <Image
                                            src={displayImage}
                                            alt={x.title}
                                            width={400}
                                            height={225}
                                            className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                                        />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center text-neutral-600'>
                                            {x.type === 'youtube' ? (
                                                <Youtube size={36} />
                                            ) : x.type === 'video' ? (
                                                <PlayCircle size={36} />
                                            ) : (
                                                <ImageIcon size={36} />
                                            )}
                                        </div>
                                    )}

                                    {/* Type badge */}
                                    <div className='absolute top-3 left-3 p-1.5 rounded-lg bg-black/60 text-white backdrop-blur-md text-xs'>
                                        {x.type === 'youtube' ? (
                                            <Youtube size={14} />
                                        ) : x.type === 'video' ? (
                                            <PlayCircle size={14} />
                                        ) : (
                                            <ImageIcon size={14} />
                                        )}
                                    </div>

                                    {/* Author tag */}
                                    <div className='absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white'>
                                        {x.authorId?.image ? (
                                            <Image
                                                src={x.authorId.image}
                                                width={16}
                                                height={16}
                                                className='w-4 h-4 rounded-full object-cover'
                                                alt=''
                                            />
                                        ) : null}
                                        <span className='truncate max-w-[100px]'>
                                            {x.authorId?.name || t('unknown')}
                                        </span>
                                    </div>
                                </div>

                                <div className='p-5 flex flex-col flex-1 justify-between space-y-4'>
                                    <h3 className='text-base font-bold text-foreground group-hover:text-blue-500 transition-colors line-clamp-2 leading-snug'>
                                        {x.title}
                                    </h3>

                                    <div className='pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-neutral-500'>
                                        <div className='flex items-center gap-3.5'>
                                            <span className='flex items-center gap-1'>
                                                <Eye size={13} />
                                                <span>{x.views || 0}</span>
                                            </span>
                                            <span className='flex items-center gap-1'>
                                                <Heart
                                                    size={13}
                                                    className={
                                                        x.likes?.length > 0
                                                            ? 'fill-red-500 text-red-500'
                                                            : ''
                                                    }
                                                />
                                                <span>{x.likes?.length || 0}</span>
                                            </span>
                                        </div>

                                        <span className='inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-0.5 transition-transform'>
                                            {t('view')}
                                            <ArrowUpRight size={13} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
