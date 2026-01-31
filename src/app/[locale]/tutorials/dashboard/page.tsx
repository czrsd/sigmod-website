'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
    LayoutDashboard,
    Clock,
    CheckCircle2,
    XCircle,
    Plus,
    ExternalLink,
    BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ITutorialData as Tutorial } from '@/models/Tutorial';
import { Serializable } from '@/types/utils';

export default function UploaderDashboard() {
    const { data: session } = useSession();
    const [myTutorials, setMyTutorials] = useState<Serializable<Tutorial[]>>(
        []
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/user/tutorials')
            .then((res) => res.json())
            .then((data) => {
                setMyTutorials(data);
                setLoading(false);
            });
    }, []);

    const stats = {
        total: myTutorials.length,
        approved: myTutorials.filter((t) => t.status === 'approved').length,
        pending: myTutorials.filter((t) => t.status === 'pending').length,
    };

    if (!session)
        return (
            <div className='h-screen flex items-center justify-center font-black italic uppercase'>
                Access Denied
            </div>
        );

    return (
        <div className='max-w-6xl mx-auto px-6 py-12 space-y-10'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-6'>
                <div>
                    <h1 className='text-4xl font-black uppercase italic tracking-tighter'>
                        Creator <span className='text-primary'>Dashboard</span>
                    </h1>
                    <p className='text-neutral-500 text-sm font-medium'>
                        Manage your contributions and track approval status.
                    </p>
                </div>
                <Button
                    asChild
                    className='bg-primary hover:bg-primary/90 text-black font-black uppercase italic rounded-xl px-6 h-12 shadow-[0_0_20px_rgba(var(--primary),0.2)]'
                >
                    <Link href='/tutorials/dashboard/upload'>
                        <Plus size={18} className='mr-2' strokeWidth={3} /> New
                        Tutorial
                    </Link>
                </Button>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                {[
                    {
                        label: 'Total Uploads',
                        val: stats.total,
                        icon: BarChart3,
                        color: 'text-white',
                    },
                    {
                        label: 'Approved',
                        val: stats.approved,
                        icon: CheckCircle2,
                        color: 'text-green-500',
                    },
                    {
                        label: 'Pending',
                        val: stats.pending,
                        icon: Clock,
                        color: 'text-yellow-500',
                    },
                ].map((stat, i) => (
                    <div
                        key={i}
                        className='p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between'
                    >
                        <div>
                            <p className='text-[10px] font-black uppercase italic text-neutral-500 mb-1'>
                                {stat.label}
                            </p>
                            <p
                                className={`text-3xl font-black italic ${stat.color}`}
                            >
                                {stat.val}
                            </p>
                        </div>
                        <stat.icon size={32} className='opacity-20' />
                    </div>
                ))}
            </div>

            <div className='space-y-4'>
                <h2 className='text-xl font-black uppercase italic tracking-tight flex items-center gap-2'>
                    <LayoutDashboard size={20} className='text-primary' /> Your
                    Submissions
                </h2>

                <div className='overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02]'>
                    <table className='w-full text-left border-collapse'>
                        <thead className='bg-white/5 text-[10px] font-black uppercase italic text-neutral-500'>
                            <tr>
                                <th className='px-6 py-4'>Tutorial</th>
                                <th className='px-6 py-4'>Category</th>
                                <th className='px-6 py-4'>Status</th>
                                <th className='px-6 py-4 text-right'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-white/5'>
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className='px-6 py-10 text-center animate-pulse font-bold italic text-neutral-600'
                                    >
                                        Loading your data...
                                    </td>
                                </tr>
                            ) : myTutorials.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className='px-6 py-10 text-center text-neutral-500 font-medium text-sm'
                                    >
                                        No tutorials uploaded yet.
                                    </td>
                                </tr>
                            ) : (
                                myTutorials.map((t) => (
                                    <tr
                                        key={t._id}
                                        className='group hover:bg-white/[0.03] transition-colors'
                                    >
                                        <td className='px-6 py-4'>
                                            <div className='font-black uppercase italic text-sm group-hover:text-primary transition-colors'>
                                                {t.title}
                                            </div>
                                            <div className='text-[10px] text-neutral-500 font-medium uppercase'>
                                                {new Date(
                                                    t.createdAt
                                                ).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='flex gap-1'>
                                                {t.tags.map((tag) => (
                                                    <span
                                                        key={tag._id}
                                                        className='text-[9px] px-2 py-0.5 rounded bg-white/5 border border-white/10 font-bold uppercase'
                                                        style={{
                                                            color: tag.color,
                                                        }}
                                                    >
                                                        {tag.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase italic border ${
                                                    t.status === 'approved'
                                                        ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                                        : t.status ===
                                                          'rejected'
                                                        ? 'bg-red-500/10 border-red-500/20 text-red-500'
                                                        : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                                                }`}
                                            >
                                                {t.status === 'approved' && (
                                                    <CheckCircle2 size={10} />
                                                )}
                                                {t.status === 'pending' && (
                                                    <Clock size={10} />
                                                )}
                                                {t.status === 'rejected' && (
                                                    <XCircle size={10} />
                                                )}
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 text-right'>
                                            <button className='p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all'>
                                                <ExternalLink size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
