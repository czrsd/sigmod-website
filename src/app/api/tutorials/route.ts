import { NextResponse } from 'next/server';
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
