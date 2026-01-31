import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        const cdnResponse = await fetch('http://localhost:3019/upload', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.CDN_API_SECRET!,
            },
            body: formData,
        });

        if (!cdnResponse.ok) {
            throw new Error('CDN Upload failed');
        }

        const data = await cdnResponse.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
