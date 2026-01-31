import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';

export async function GET() {
    try {
        await dbConnect();
        const tags = await Tag.find({});
        return NextResponse.json(tags);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch tags' },
            { status: 500 }
        );
    }
}
