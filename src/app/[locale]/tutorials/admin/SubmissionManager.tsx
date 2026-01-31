'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Edit, Trash2, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TutorialForm from '@/components/pages/tutorials/TutorialForm';

interface Tutorial {
    _id: string;
    title: string;
    description: string;
    type: 'youtube' | 'video' | 'image';
    contentUrls: string[];
    authorId: string;
    tags: Tag[];
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
}

interface Tag {
    _id: string;
    name: string;
    color: string;
}

export default function SubmissionManager({
    tutorials,
    tags,
}: {
    tutorials: Tutorial[];
    tags: Tag[];
}) {
    const router = useRouter();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const editingTutorial = tutorials.find((t) => t._id === editingId);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        setLoadingId(id);
        try {
            const res = await fetch(`/api/tutorials/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) throw new Error('Failed to update');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error updating status');
        } finally {
            setLoadingId(null);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this tutorial?')) return;
        setLoadingId(id);
        try {
            const res = await fetch(`/api/tutorials/${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete');
            router.refresh();
        } catch (error) {
            alert('Error deleting tutorial');
        } finally {
            setLoadingId(null);
        }
    };

    if (editingId && editingTutorial) {
        return (
            <div className='w-full max-w-3xl animate-in slide-in-from-right-4'>
                <Button
                    variant='ghost'
                    onClick={() => setEditingId(null)}
                    className='mb-6 hover:bg-white/10 text-neutral-400 hover:text-white'
                >
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Back to Submissions
                </Button>

                <div className='mb-6 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase italic flex items-center gap-3'>
                    <Edit size={16} />
                    Editing: {editingTutorial.title}
                </div>

                <TutorialForm tags={tags} initialData={editingTutorial} />
            </div>
        );
    }

    return (
        <div className='w-full max-w-5xl grid gap-4'>
            {tutorials.length === 0 ? (
                <div className='text-center p-10 border border-white/5 rounded-3xl bg-white/5 text-neutral-500 italic'>
                    No submissions found.
                </div>
            ) : (
                tutorials.map((tutorial) => (
                    <div
                        key={tutorial._id}
                        className='group relative flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all'
                    >
                        {/* Info Section */}
                        <div className='space-y-1'>
                            <div className='flex items-center gap-3'>
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        tutorial.status === 'approved'
                                            ? 'bg-green-500 shadow-[0_0_10px_#22c55e]'
                                            : tutorial.status === 'rejected'
                                            ? 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                                            : 'bg-yellow-500 shadow-[0_0_10px_#eab308]'
                                    }`}
                                />
                                <h3 className='font-bold text-lg text-white group-hover:text-primary transition-colors'>
                                    {tutorial.title}
                                </h3>
                            </div>
                            <div className='flex items-center gap-4 text-xs font-medium text-neutral-500 uppercase italic'>
                                <span>{tutorial.type}</span>
                                <span>•</span>
                                <span>
                                    {format(
                                        new Date(tutorial.createdAt),
                                        'dd MMM yyyy'
                                    )}
                                </span>
                                <span>•</span>
                                <span
                                    className={
                                        tutorial.status === 'pending'
                                            ? 'text-yellow-500'
                                            : tutorial.status === 'approved'
                                            ? 'text-green-500'
                                            : 'text-red-500'
                                    }
                                >
                                    {tutorial.status}
                                </span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            {tutorial.status !== 'approved' && (
                                <Button
                                    size='icon'
                                    variant='ghost'
                                    disabled={loadingId === tutorial._id}
                                    onClick={() =>
                                        handleStatusUpdate(
                                            tutorial._id,
                                            'approved'
                                        )
                                    }
                                    className='h-10 w-10 rounded-xl hover:bg-green-500/20 hover:text-green-500 text-neutral-600'
                                    title='Approve'
                                >
                                    <CheckCircle size={18} />
                                </Button>
                            )}

                            {tutorial.status !== 'rejected' && (
                                <Button
                                    size='icon'
                                    variant='ghost'
                                    disabled={loadingId === tutorial._id}
                                    onClick={() =>
                                        handleStatusUpdate(
                                            tutorial._id,
                                            'rejected'
                                        )
                                    }
                                    className='h-10 w-10 rounded-xl hover:bg-red-500/20 hover:text-red-500 text-neutral-600'
                                    title='Reject'
                                >
                                    <XCircle size={18} />
                                </Button>
                            )}

                            <div className='w-px h-6 bg-white/10 mx-1' />

                            <Button
                                size='icon'
                                variant='ghost'
                                onClick={() => setEditingId(tutorial._id)}
                                className='h-10 w-10 rounded-xl hover:bg-white/10 text-neutral-400'
                                title='Edit'
                            >
                                <Edit size={18} />
                            </Button>

                            <Button
                                size='icon'
                                variant='ghost'
                                disabled={loadingId === tutorial._id}
                                onClick={() => handleDelete(tutorial._id)}
                                className='h-10 w-10 rounded-xl hover:bg-red-500/10 hover:text-red-500 text-neutral-400'
                                title='Delete'
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
