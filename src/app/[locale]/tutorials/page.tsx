'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import {
    Search,
    Upload,
    PlusCircle,
    Youtube,
    PlayCircle,
    Image as ImageIcon,
    Star,
    Filter,
    ShieldUser,
    LogOut,
    Eye,
    Heart,
    ArrowUpRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ITutorialData as Tutorial } from '@/models/Tutorial';
import { ITagData as Tag } from '@/models/Tag';
import { Serializable } from '@/types/utils';

export default function TutorialsPage() {
    const { data: session } = useSession();
    const [tutorials, setTutorials] = useState<Serializable<Tutorial[]>>([]);
    const [tags, setTags] = useState<Serializable<Tag[]>>([]);
    const [activeTag, setActiveTag] = useState('all');
    const [activeType, setActiveType] = useState('all');
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
                `/api/tutorials?tag=${activeTag}&type=${activeType}`
            );
            const data = await res.json();
            setTutorials(data);
            setLoading(false);
        };
        fetchTutorials();
    }, [activeTag, activeType]);

    const filtered = tutorials.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
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
        <div className='max-w-7xl mx-auto px-6 py-12 space-y-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 rounded-3xl bg-white/5 border border-white/10 gap-4 backdrop-blur-md'>
                <div className='flex items-center gap-3'>
                    <div className='p-2 bg-primary/20 rounded-xl'>
                        <PlusCircle className='text-primary' size={24} />
                    </div>
                    <span className='font-black uppercase italic text-sm tracking-widest text-white'>
                        Community Hub
                    </span>
                </div>
                <div className='flex gap-2'>
                    {session ? (
                        <>
                            {(session.user.role === 'admin' ||
                                session.user.role === 'moderator') && (
                                <Button
                                    asChild
                                    variant='default'
                                    className='bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 font-bold uppercase italic rounded-xl h-10'
                                >
                                    <Link href='/tutorials/admin'>
                                        <ShieldUser
                                            size={16}
                                            className='mr-2'
                                        />{' '}
                                        Admin
                                    </Link>
                                </Button>
                            )}
                            <div className='relative group'>
                                <div className='absolute -inset-1.5 bg-gradient-to-r from-emerald-600 to-emerald-300 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-all duration-500' />

                                <Button
                                    asChild
                                    className='relative bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 text-neutral-800 font-black uppercase italic rounded-xl h-10 px-6 transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-300/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]'
                                >
                                    <Link
                                        href='/tutorials/dashboard'
                                        className='flex items-center'
                                    >
                                        <Upload
                                            size={16}
                                            className='mr-2 stroke-[3px]'
                                        />
                                        Upload
                                    </Link>
                                </Button>
                            </div>
                            <Button
                                onClick={() => signOut()}
                                variant='ghost'
                                className='text-neutral-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl h-10 transition-all'
                            >
                                <LogOut size={16} />
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => signIn('discord')}
                            className='bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase italic rounded-xl h-10 shadow-lg shadow-[#5865F2]/20'
                        >
                            Login with Discord
                        </Button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='md:col-span-2 relative group'>
                    <Search
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-primary transition-colors'
                        size={18}
                    />
                    <Input
                        placeholder='Search tutorials...'
                        className='pl-12 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-1 ring-primary/50 transition-all placeholder:text-neutral-600 font-medium'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='flex bg-white/5 p-1 rounded-xl border border-white/10'>
                    {['all', 'youtube', 'video', 'image'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex-1 text-[10px] font-black uppercase italic rounded-lg transition-all py-2 ${
                                activeType === type
                                    ? 'bg-white/10 text-primary shadow-inner'
                                    : 'text-neutral-500 hover:text-white'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className='space-y-3'>
                <div className='flex items-center gap-2 text-neutral-500 text-[10px] font-black uppercase italic tracking-widest'>
                    <Filter size={12} className='text-primary' /> Filter by
                    Category
                </div>
                <div className='flex flex-wrap gap-2'>
                    <button
                        onClick={() => setActiveTag('all')}
                        className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase italic transition-all ${
                            activeTag === 'all'
                                ? 'bg-primary border-primary text-black'
                                : 'bg-white/5 border-white/10 text-white hover:border-white/30'
                        }`}
                    >
                        All
                    </button>
                    {tags.map((tag) => (
                        <button
                            key={tag._id}
                            onClick={() => setActiveTag(tag.slug)}
                            className={`px-5 py-2 rounded-full border text-[10px] font-black uppercase italic transition-all ${
                                activeTag === tag.slug
                                    ? 'brightness-125 shadow-[0_0_15px_rgba(255,255,255,0.1)]'
                                    : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/40'
                            }`}
                            style={{
                                backgroundColor:
                                    activeTag === tag.slug
                                        ? tag.color
                                        : 'transparent',
                                borderColor:
                                    activeTag === tag.slug ? tag.color : '',
                                color: activeTag === tag.slug ? '#000' : '',
                            }}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className='py-32 text-center animate-pulse font-black italic text-neutral-600 uppercase tracking-widest'>
                    Syncing...
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filtered.map((t) => (
                        <Link
                            href={`/tutorials/${t._id}`}
                            key={t._id}
                            className='group relative block p-px rounded-[2.2rem] bg-gradient-to-br from-white/10 to-transparent hover:from-primary/20 transition-all duration-500'
                        >
                            <div className='h-full overflow-hidden rounded-[2.1rem] bg-[#0A0A0A] border border-white/5 flex flex-col'>
                                <div className='relative aspect-video overflow-hidden border-b border-white/5 bg-neutral-900'>
                                    {(() => {
                                        const ytThumb =
                                            t.type === 'youtube' &&
                                            t.contentUrls?.[0]
                                                ? getYoutubeThumbnail(
                                                      t.contentUrls[0]
                                                  )
                                                : null;
                                        const displayImage =
                                            t.thumbnailUrl || ytThumb;

                                        if (displayImage) {
                                            return (
                                                <img
                                                    src={displayImage}
                                                    alt={t.title}
                                                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                                                    onError={(e) => {
                                                        const target =
                                                            e.target as HTMLImageElement;
                                                        if (
                                                            ytThumb &&
                                                            target.src.includes(
                                                                'maxresdefault'
                                                            )
                                                        ) {
                                                            target.src =
                                                                ytThumb.replace(
                                                                    'maxresdefault',
                                                                    'hqdefault'
                                                                );
                                                        }
                                                    }}
                                                />
                                            );
                                        }

                                        return (
                                            <div className='w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900'>
                                                <div className='opacity-20 group-hover:opacity-40 transition-opacity'>
                                                    {t.type === 'youtube' ? (
                                                        <Youtube size={48} />
                                                    ) : t.type === 'video' ? (
                                                        <PlayCircle size={48} />
                                                    ) : (
                                                        <ImageIcon size={48} />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className='absolute top-4 left-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-primary'>
                                        {t.type === 'youtube' ? (
                                            <Youtube size={16} />
                                        ) : t.type === 'video' ? (
                                            <PlayCircle size={16} />
                                        ) : (
                                            <ImageIcon size={16} />
                                        )}
                                    </div>
                                </div>

                                <div className='p-6 flex flex-col flex-grow'>
                                    <div className='flex justify-between items-start mb-4'>
                                        <div className='flex flex-wrap gap-1'>
                                            {t.tags.slice(0, 2).map((tag) => (
                                                <span
                                                    key={tag._id}
                                                    className='text-[9px] font-bold px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-tighter'
                                                >
                                                    {tag.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className='text-xl font-black uppercase italic tracking-tighter mb-6 leading-tight group-hover:text-primary transition-colors line-clamp-2'>
                                        {t.title}
                                    </h3>

                                    <div className='mt-auto pt-5 border-t border-white/5 flex items-center justify-between'>
                                        <div className='flex items-center gap-4'>
                                            <div className='flex items-center gap-1.5 text-neutral-500 group-hover:text-neutral-300 transition-colors'>
                                                <Eye size={14} />
                                                <span className='text-[10px] font-black italic uppercase'>
                                                    {t.views || 0}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-1.5 text-neutral-500 group-hover:text-red-400 transition-colors'>
                                                <Heart
                                                    size={14}
                                                    className={
                                                        t.likes?.length > 0
                                                            ? 'fill-current'
                                                            : ''
                                                    }
                                                />
                                                <span className='text-[10px] font-black italic uppercase'>
                                                    {t.likes?.length || 0}
                                                </span>
                                            </div>
                                        </div>

                                        <div className='flex items-center gap-1 text-primary text-[10px] font-black uppercase italic opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all'>
                                            View <ArrowUpRight size={14} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
