'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useDropzone } from 'react-dropzone';
import { Send, Hash, ImageIcon, Upload, X } from 'lucide-react';
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

    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(
        initialData?.description || ''
    );
    const [youtubeUrl, setYoutubeUrl] = useState(
        initialData?.contentUrls?.[0] || ''
    );
    const [mediaType, setMediaType] = useState<'youtube' | 'video' | 'images'>(
        initialData?.type || 'youtube'
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialData?.tags || []
    );

    const [contentFiles, setContentFiles] = useState<File[]>([]);
    const [contentPreviews, setContentPreviews] = useState<string[]>([]);

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        initialData?.thumbnailUrl || null
    );
    const [useYoutubeThumbnail, setUseYoutubeThumbnail] = useState(
        !initialData?.thumbnailUrl
    );

    const MAX_TAGS = 5;

    const toggleTag = (id: string) => {
        setSelectedTags((prev) => {
            if (prev.includes(id)) {
                return prev.filter((i) => i !== id);
            }

            if (prev.length >= MAX_TAGS) {
                return prev;
            }

            return [...prev, id];
        });
    };
    const onDropContent = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles =
                mediaType === 'video' ? [acceptedFiles[0]] : acceptedFiles;
            setContentFiles(newFiles);
            setContentPreviews(
                newFiles.map((file) => URL.createObjectURL(file))
            );
        },
        [mediaType]
    );

    const onDropThumbnail = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setThumbnailFile(file);
        setThumbnailPreview(URL.createObjectURL(file));
    }, []);

    const contentDropzone = useDropzone({
        onDrop: onDropContent,
        accept:
            mediaType === 'video'
                ? { 'video/*': ['.mp4', '.webm'] }
                : { 'image/*': ['.jpeg', '.png', '.webp'] },
        multiple: mediaType === 'images',
    });

    const thumbnailDropzone = useDropzone({
        onDrop: onDropThumbnail,
        accept: { 'image/*': ['.jpeg', '.png', '.webp'] },
        multiple: false,
    });

    const uploadFileToProxy = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) throw new Error('Upload failed');
        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let contentUrls: string[] = [];
            let finalThumbnailUrl = initialData?.thumbnailUrl || null;

            if (
                (mediaType !== 'youtube' || !useYoutubeThumbnail) &&
                thumbnailFile
            ) {
                finalThumbnailUrl = await uploadFileToProxy(thumbnailFile);
            }

            if (mediaType === 'youtube') {
                contentUrls = [youtubeUrl];
            } else {
                const uploadPromises = contentFiles.map((file) =>
                    uploadFileToProxy(file)
                );
                contentUrls = await Promise.all(uploadPromises);
                if (contentUrls.length === 0 && initialData)
                    contentUrls = initialData.contentUrls;
            }

            if (contentUrls.length === 0) {
                alert('Please provide content');
                setLoading(false);
                return;
            }

            const payload = {
                title,
                description,
                type: mediaType,
                contentUrls,
                thumbnailUrl: finalThumbnailUrl,
                tags: selectedTags,
            };

            const endpoint = initialData
                ? `/api/tutorials/${initialData._id}`
                : '/api/tutorials';
            const res = await fetch(endpoint, {
                method: initialData ? 'PATCH' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Submission failed');
            router.push('/tutorials');
            router.refresh();
        } catch (error) {
            console.error(error);
            alert('Error during upload');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full max-w-3xl space-y-8 p-8 rounded-[2.5rem] border border-white/5 bg-white/[0.02] backdrop-blur-xl'
        >
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                    <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                        {t('title')}
                    </label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='bg-white/5 border-white/10 h-14 rounded-2xl font-bold'
                        placeholder='How to...'
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
                            setContentFiles([]);
                            setContentPreviews([]);
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

            <div className='space-y-4'>
                {mediaType === 'youtube' ? (
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
                ) : (
                    <div className='space-y-2 animate-in fade-in slide-in-from-top-2'>
                        <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                            {mediaType === 'video'
                                ? 'Upload Video (MP4)'
                                : 'Upload Images'}
                        </label>
                        <div
                            {...contentDropzone.getRootProps()}
                            className={`relative border-2 border-dashed rounded-3xl p-10 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
                                contentDropzone.isDragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-white/10 hover:border-white/20 bg-white/5'
                            }`}
                        >
                            <input {...contentDropzone.getInputProps()} />
                            {contentPreviews.length > 0 ? (
                                <div className='grid grid-cols-2 md:grid-cols-3 gap-4 w-full'>
                                    {contentPreviews.map((p, i) => (
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
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <>
                                    <div className='p-4 rounded-full bg-white/5 text-primary'>
                                        <Upload size={24} />
                                    </div>
                                    <p className='text-[10px] font-black uppercase italic text-neutral-400'>
                                        {mediaType === 'video'
                                            ? 'Drop your video here'
                                            : 'Drop your images here'}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {(mediaType !== 'youtube' || !useYoutubeThumbnail) && (
                    <div className='space-y-2 animate-in fade-in'>
                        <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                            Thumbnail
                        </label>
                        <div
                            {...thumbnailDropzone.getRootProps()}
                            className={`relative border-2 border-dashed rounded-3xl p-6 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                thumbnailDropzone.isDragActive
                                    ? 'border-primary bg-primary/5'
                                    : 'border-white/10 bg-white/5'
                            }`}
                        >
                            <input {...thumbnailDropzone.getInputProps()} />
                            {thumbnailPreview ? (
                                <div className='relative w-40 aspect-video rounded-lg overflow-hidden border border-white/20'>
                                    <img
                                        src={thumbnailPreview}
                                        className='w-full h-full object-cover'
                                        alt='thumbnail'
                                    />
                                    <button
                                        type='button'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setThumbnailFile(null);
                                            setThumbnailPreview(null);
                                        }}
                                        className='absolute top-1 right-1 p-1 bg-black/50 rounded-full hover:bg-red-500'
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <ImageIcon
                                        size={20}
                                        className='text-neutral-500'
                                    />
                                    <p className='text-[10px] font-black uppercase italic text-neutral-400'>
                                        Upload custom thumbnail
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2'>
                    {t('description')}
                </label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='bg-white/5 border-white/10 min-h-[120px] rounded-2xl font-medium'
                    placeholder='This video shows...'
                    required
                />
            </div>

            <div className='space-y-3'>
                <div className='space-y-3'>
                    <label className='text-[10px] font-black uppercase italic text-neutral-500 ml-2 flex items-center justify-between'>
                        <span className='flex items-center gap-2'>
                            <Hash size={12} /> {t('tags')}
                        </span>
                        <span
                            className={
                                selectedTags.length >= 5 ? 'text-primary' : ''
                            }
                        >
                            {selectedTags.length} / 5
                        </span>
                    </label>
                    <div className='flex flex-wrap gap-2 p-4 rounded-2xl bg-black/40 border border-white/5'>
                        {tags.map((tag) => {
                            const isSelected = selectedTags.includes(tag._id);
                            const isLimitReached = selectedTags.length >= 5;

                            return (
                                <button
                                    key={tag._id}
                                    type='button'
                                    onClick={() => toggleTag(tag._id)}
                                    disabled={!isSelected && isLimitReached}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase italic border transition-all ${
                                        isSelected
                                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                                            : isLimitReached
                                            ? 'bg-white/5 border-white/5 text-neutral-700 cursor-not-allowed'
                                            : 'bg-white/5 border-white/10 text-neutral-500 hover:border-white/20'
                                    }`}
                                >
                                    {tag.name}
                                </button>
                            );
                        })}
                    </div>
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
