import type { Metadata } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import { pageMetadata } from '@/lib/seo';

type Params = { locale: string; id: string };

function findQuery(id: string) {
    return mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
}

function youtubeThumbnail(url?: string) {
    if (!url) return undefined;
    const match = url.match(/(?:youtu\.be\/|v=|embed\/)([^&?/]+)/);
    return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : undefined;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { locale, id } = await params;

    try {
        await dbConnect();
        const tutorial = await Tutorial.findOne({
            ...findQuery(id),
            status: 'approved',
        })
            .select('slug title description type contentUrls thumbnailUrl updatedAt')
            .lean();

        if (!tutorial) {
            return pageMetadata({
                locale,
                pathname: `/tutorials/${id}`,
                title: 'Tutorial not found',
                description: 'This Sigmally tutorial is not available.',
                noIndex: true,
            });
        }

        const slug = tutorial.slug;
        const description = tutorial.description.replace(/\s+/g, ' ').trim().slice(0, 155);
        return pageMetadata({
            locale,
            pathname: `/tutorials/${slug}`,
            title: tutorial.title,
            description,
            image: tutorial.thumbnailUrl || youtubeThumbnail(tutorial.contentUrls?.[0]) || '/SigModzBanner.png',
        });
    } catch {
        return pageMetadata({
            locale,
            pathname: `/tutorials/${id}`,
            title: 'Sigmally Tutorial',
            description: 'Community tutorials for Sigmally mods.',
            noIndex: true,
        });
    }
}

export default function TutorialIdLayout({ children }: { children: React.ReactNode }) {
    return children;
}
