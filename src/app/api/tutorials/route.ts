import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import Tag from '@/models/Tag';

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const tagSlug = searchParams.get('tag');
    const type = searchParams.get('type');

    try {
        let query: any = { status: 'approved' };

        if (tagSlug && tagSlug !== 'all') {
            const tag = await Tag.findOne({ slug: tagSlug });
            if (tag) query.tags = tag._id;
        }

        if (type && type !== 'all') {
            query.type = type;
        }

        const tutorials = await Tutorial.find(query)
            .populate('tags')
            .sort({ createdAt: -1 });

        return NextResponse.json(tutorials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();

    try {
        const body = await req.json();
        const { title, description, type, contentUrls, thumbnailUrl, tags } =
            body;

        if (!title || !description || !type || !contentUrls.length) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const tutorial = await Tutorial.create({
            title,
            description,
            type,
            contentUrls,
            thumbnailUrl,
            tags,
            authorId: session.user.id,
            status: 'pending',
            duration: 0,
            likes: [],
            views: 0,
        });

        return NextResponse.json(tutorial);
    } catch (error) {
        console.error('Create Tutorial Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
