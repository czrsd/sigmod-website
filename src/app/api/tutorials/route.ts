import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import Tag from '@/models/Tag';
import { slugify } from '@/lib/utils';
import User from '@/models/User';

export async function GET(req: Request) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const tagSlug = searchParams.get('tag');
    const type = searchParams.get('type');
    const sort = searchParams.get('sort');

    try {
        let query: any = { status: 'approved' };

        if (tagSlug && tagSlug !== 'all') {
            const tag = await Tag.findOne({ slug: tagSlug });
            if (tag) query.tags = tag._id;
        }

        if (type && type !== 'all') {
            query.type = type;
        }

        let sortQuery: any = { likes: -1, createdAt: -1 };

        if (sort === 'views') {
            sortQuery = { views: -1, createdAt: -1 };
        } else if (sort === 'newest') {
            sortQuery = { createdAt: -1 };
        } else if (sort === 'likes') {
            sortQuery = { likes: -1, createdAt: -1 };
        }

        const tutorials = await Tutorial.find(query)
            .populate('tags')
            .populate({ path: 'authorId', select: 'name image', model: User })
            .sort(sortQuery)
            .lean();

        return NextResponse.json(tutorials);
    } catch (error) {
        console.error(error);
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

        if (!title || !description || !type || !contentUrls?.length) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        let baseSlug = slugify(title);
        let finalSlug = baseSlug;

        const existingCount = await Tutorial.countDocuments({
            slug: { $regex: new RegExp(`^${baseSlug}(-[0-9]+)?$`, 'i') },
        });

        if (existingCount > 0) {
            const randomSuffix = Math.random().toString(36).substring(2, 7);
            finalSlug = `${baseSlug}-${randomSuffix}`;
        }

        const tutorial = await Tutorial.create({
            title,
            slug: finalSlug,
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

        if ((error as any).code === 11000) {
            return NextResponse.json(
                {
                    error: 'Titel oder Slug bereits vergeben. Bitte versuche einen anderen Titel.',
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
