'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Send, Hash, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface Tag {
    _id: string;
    name: string;
    color: string;
}

export default function TutorialForm({
    tags,
    initialData,
}: {
    tags: Tag[];
    initialData?: any;
}) {
    const t = useTranslations('TutorialPage.dashboard.upload');
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form States
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(
        initialData?.description || ''
    );
    const [youtubeUrl, setYoutubeUrl] = useState(
        initialData?.contentUrls?.[0] || ''
    );

    // Media States
    const [mediaType, setMediaType] = useState<'youtube' | 'video' | 'images'>(
        initialData?.type || 'youtube'
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialData?.tags || []
    );

    // Thumbnail & File States
    const [useYoutubeThumbnail, setUseYoutubeThumbnail] = useState(true);
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    // --- Helpers ---

    const toggleTag = (id: string) => {
        setSelectedTags((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            // If uploading custom thumbnail for YT, allow only 1 image
            if (mediaType === 'youtube') {
                const file = acceptedFiles[0];
                setFiles([file]);
                setPreviews([URL.createObjectURL(file)]);
                return;
            }

            const newFiles =
                mediaType === 'video' ? [acceptedFiles[0]] : acceptedFiles;
            setFiles(newFiles);
            setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
        },
        [mediaType]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept:
            mediaType === 'video'
                ? { 'video/*': ['.mp4', '.webm'] }
                : { 'image/*': ['.jpeg', '.png', '.webp', '.gif'] },
        multiple: mediaType === 'images',
        maxFiles: mediaType === 'video' || mediaType === 'youtube' ? 1 : 10,
    });

    // --- Upload Logic ---

    const uploadFileToProxy = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        return data.url; // The CDN URL
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let contentUrls: string[] = [];
            let thumbnailUrl = null;

            // 1. Handle File Uploads based on type
            if (mediaType === 'youtube') {
                contentUrls = [youtubeUrl];
                // Handle Custom Thumbnail
                if (!useYoutubeThumbnail && files.length > 0) {
                    thumbnailUrl = await uploadFileToProxy(files[0]);
                }
            } else {
                // Upload Video or Images
                const uploadPromises = files.map((file) =>
                    uploadFileToProxy(file)
                );
                contentUrls = await Promise.all(uploadPromises);
            }

            if (contentUrls.length === 0) {
                alert('Please provide content (URL or Files)');
                setLoading(false);
                return;
            }

            // 2. Submit Tutorial Data
            const payload = {
                title,
                description,
                type: mediaType,
                contentUrls,
                thumbnailUrl,
                tags: selectedTags,
            };

            const endpoint = initialData
                ? `/api/tutorials/${initialData._id}`
                : '/api/tutorials';
            const method = initialData ? 'PATCH' : 'POST';

            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Submission failed');

            router.push('/tutorials');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Check console.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full max-w-3xl space-y-8 p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl'
        >
            {/* Title & Type */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                        {t('title')}
                    </label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='bg-white/5 border-white/10 h-14 rounded-2xl font-bold'
                        required
                    />
                </div>
                <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                        {t('mediaType')}
                    </label>
                    <select
                        value={mediaType}
                        onChange={(e) => {
                            setMediaType(e.target.value as any);
                            setFiles([]);
                            setPreviews([]);
                            setUseYoutubeThumbnail(true);
                        }}
                        className='w-full h-14 bg-[#0c0c0c] border border-white/10 rounded-2xl px-4 text-sm font-bold text-white outline-none focus:border-primary'
                    >
                        <option value='youtube'>YouTube Video</option>
                        <option value='video'>Direct MP4</option>
                        <option value='images'>Images / Graphic</option>
                    </select>
                </div>
            </div>

            {/* Media Area */}
            <div className='space-y-4'>
                {mediaType === 'youtube' && (
                    <div className='space-y-4 animate-in fade-in slide-in-from-top-2'>
                        <Input
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            placeholder='https://youtube.com/watch?v=...'
                            className='bg-white/5 border-white/10 h-14 rounded-2xl font-bold'
                            required
                        />
                        <div className='flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10'>
                            <span className='text-xs font-bold uppercase italic'>
                                {t('youtube.autoThumbnail')}
                            </span>
                            <Switch
                                checked={useYoutubeThumbnail}
                                onCheckedChange={setUseYoutubeThumbnail}
                            />
                        </div>
                    </div>
                )}

                {/* Dropzone for Video, Images, or Custom Thumbnail */}
                {(mediaType !== 'youtube' || !useYoutubeThumbnail) && (
                    <div
                        {...getRootProps()}
                        className={`relative border-2 border-dashed rounded-3xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                            isDragActive
                                ? 'border-primary bg-primary/5'
                                : 'border-white/10 hover:border-white/20 bg-white/5'
                        }`}
                    >
                        <input {...getInputProps()} />
                        {previews.length > 0 ? (
                            <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full'>
                                {previews.map((p, i) => (
                                    <div
                                        key={i}
                                        className='relative aspect-video rounded-xl overflow-hidden border border-white/10'
                                    >
                                        {mediaType === 'video' ? (
                                            <video
                                                src={p}
                                                className='w-full h-full object-cover'
                                            />
                                        ) : (
                                            <img
                                                src={p}
                                                className='w-full h-full object-cover'
                                                alt='Preview'
                                            />
                                        )}
                                        <button
                                            type='button'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setPreviews([]);
                                                setFiles([]);
                                            }}
                                            className='absolute top-2 right-2 p-1 bg-black/50 rounded-full hover:bg-red-500 transition-colors'
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <div className='p-4 rounded-full bg-white/5 text-primary'>
                                    <Upload size={24} />
                                </div>
                                <p className='text-[10px] font-black uppercase italic text-neutral-400'>
                                    {t(
                                        `dropzone.${
                                            mediaType === 'youtube'
                                                ? 'thumbnail'
                                                : mediaType
                                        }`
                                    )}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Description */}
            <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                    {t('description')}
                </label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='bg-white/5 border-white/10 min-h-[120px] rounded-2xl font-medium'
                    required
                />
            </div>

            {/* Tags */}
            <div className='space-y-3'>
                <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2 flex items-center gap-2'>
                    <Hash size={12} /> {t('tags')}
                </label>
                <div className='flex flex-wrap gap-2 p-4 rounded-2xl bg-black/40 border border-white/5'>
                    {tags.map((tag) => (
                        <button
                            key={tag._id}
                            type='button'
                            onClick={() => toggleTag(tag._id)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase italic border transition-all ${
                                selectedTags.includes(tag._id)
                                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                    : 'bg-white/5 border-white/10 text-neutral-500 hover:border-white/20'
                            }`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>

            <Button
                disabled={loading}
                type='submit'
                className='w-full h-16 bg-primary hover:bg-primary/90 text-black font-black uppercase italic rounded-2xl text-lg shadow-2xl transition-all active:scale-[0.98]'
            >
                {loading
                    ? t('processing')
                    : initialData
                    ? t('update')
                    : t('submit')}
                <Send size={20} className='ml-2' />
            </Button>
        </form>
    );
}
