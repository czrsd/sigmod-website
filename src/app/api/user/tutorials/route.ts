import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    try {
        const tutorials = await Tutorial.find({ authorId: session.user.id })
            .populate('tags')
            .sort({ createdAt: -1 });

        return NextResponse.json(tutorials);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
