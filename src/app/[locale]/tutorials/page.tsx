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
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tutorial, Tag } from '@/types/communityTypes';

export default function TutorialsPage() {
    const { data: session } = useSession();
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
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

    return (
        <div className='max-w-7xl mx-auto px-6 py-12 space-y-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center p-4 rounded-3xl bg-white/5 border border-white/10 gap-4'>
                <div className='flex items-center gap-3'>
                    <PlusCircle className='text-primary' size={24} />
                    <span className='font-black uppercase italic text-sm tracking-tight'>
                        Community Hub
                    </span>
                </div>
                <div className='flex gap-2'>
                    {session ? (
                        <>
                            {session.user.role === 'admin' ||
                            session.user.role === 'moderator' ? (
                                <Button
                                    asChild
                                    variant='default'
                                    className='bg-blue-400 text-black font-bold uppercase italic rounded-xl h-10'
                                >
                                    <Link href='/tutorials/admin'>
                                        <ShieldUser
                                            size={16}
                                            className='mr-2'
                                        />{' '}
                                        Manage Submissions
                                    </Link>
                                </Button>
                            ) : (
                                <></>
                            )}
                            <Button
                                asChild
                                variant='default'
                                className='bg-primary font-bold uppercase italic rounded-xl h-10'
                            >
                                <Link href='/tutorials/dashboard'>
                                    <Upload size={16} className='mr-2' /> Upload
                                </Link>
                            </Button>
                            <Button
                                onClick={() => signOut()}
                                variant='ghost'
                                className='text-neutral-500 hover:text-white text-xs uppercase font-bold italic'
                            >
                                <LogOut size={16} />
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => signIn('discord')}
                            className='bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold uppercase italic rounded-xl h-10'
                            title='Log out'
                        >
                            Login with Discord
                        </Button>
                    )}
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='md:col-span-2 relative'>
                    <Search
                        className='absolute left-4 top-1/2 -translate-y-1/2 text-white/20'
                        size={18}
                    />
                    <Input
                        placeholder='Search tutorials...'
                        className='pl-12 bg-white/5 border-white/10 h-12 rounded-xl focus:ring-1 ring-primary/50 transition-all'
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='flex bg-white/5 p-1 rounded-xl border border-white/10'>
                    {['all', 'youtube', 'video', 'images'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setActiveType(type)}
                            className={`flex-1 text-[10px] font-black uppercase italic rounded-lg transition-all ${
                                activeType === type
                                    ? 'bg-white/10 text-primary'
                                    : 'text-neutral-500 hover:text-white'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className='space-y-3'>
                <div className='flex items-center gap-2 text-neutral-500 text-[10px] font-black uppercase italic'>
                    <Filter size={12} /> Filter by Category
                </div>
                <div className='flex flex-wrap gap-2'>
                    <button
                        onClick={() => setActiveTag('all')}
                        className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase italic transition-all ${
                            activeTag === 'all'
                                ? 'bg-primary border-primary text-black'
                                : 'bg-white/5 border-white/10 text-white'
                        }`}
                    >
                        All
                    </button>
                    {tags.map((tag) => (
                        <button
                            key={tag._id}
                            onClick={() => setActiveTag(tag.slug)}
                            className={`px-4 py-2 rounded-full border text-[10px] font-black uppercase italic transition-all ${
                                activeTag === tag.slug
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/30'
                            }`}
                            style={
                                activeTag === tag.slug
                                    ? {
                                          backgroundColor: tag.color,
                                          borderColor: tag.color,
                                      }
                                    : {}
                            }
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className='py-20 text-center animate-pulse font-black italic text-neutral-500 uppercase'>
                    Syncing Data...
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {filtered.map((t) => (
                        <div
                            key={t._id}
                            className='group p-6 rounded-[2rem] border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300'
                        >
                            <div className='flex justify-between mb-4'>
                                <div className='text-primary opacity-50 group-hover:opacity-100 transition-opacity'>
                                    {t.type === 'youtube' ? (
                                        <Youtube size={20} />
                                    ) : t.type === 'video' ? (
                                        <PlayCircle size={20} />
                                    ) : (
                                        <ImageIcon size={20} />
                                    )}
                                </div>
                                <div className='flex gap-1'>
                                    {t.tags.slice(0, 1).map((tag) => (
                                        <span
                                            key={tag._id}
                                            className='text-[8px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400 uppercase tracking-widest'
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <h3 className='text-xl font-black uppercase italic tracking-tighter mb-2 line-clamp-1'>
                                {t.title}
                            </h3>
                            <p className='text-neutral-500 text-xs leading-relaxed line-clamp-2 mb-6'>
                                {t.description}
                            </p>
                            <Button className='w-full bg-white/5 hover:bg-primary hover:text-black border-white/5 rounded-xl text-xs font-black uppercase italic transition-all group-hover:translate-y-[-2px]'>
                                Start Learning{' '}
                                <Star size={12} className='ml-2 fill-current' />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
