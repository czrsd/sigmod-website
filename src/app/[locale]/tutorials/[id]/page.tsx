import { notFound } from 'next/navigation';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import User from '@/models/User';
import { Serializable } from '@/types/utils';
import { ITutorialPopulated as TutorialData } from '@/models/Tutorial';
import TutorialDetailClient from './TutorialDetailClient';

function queryForId(id: string) {
    return mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
}

export default async function TutorialDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    let tutorial: unknown = null;

    try {
        await dbConnect();
        tutorial = await Tutorial.findOne({
            ...queryForId(id),
            status: 'approved',
        })
            .populate('tags')
            .populate({
                path: 'authorId',
                select: 'name image role',
                model: User,
            })
            .lean();

    } catch {
        return <TutorialDetailClient />;
    }

    if (!tutorial) notFound();

    const serialized = JSON.parse(JSON.stringify(tutorial)) as Serializable<TutorialData>;
    return <TutorialDetailClient initialTutorial={serialized} />;
}
