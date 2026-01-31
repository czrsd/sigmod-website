import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import ViewLog from '@/models/ViewLog';
import crypto from 'crypto';
import mongoose from 'mongoose';
import User from '@/models/User';

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    await dbConnect();
    const { id } = await params;

    const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { slug: id };

    const tutorial = await Tutorial.findOne(query)
        .populate('tags')
        .populate({ path: 'authorId', select: 'name image role', model: User });
    if (!tutorial)
        return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const ip = req.headers.get('x-forwarded-for') || '0.0.0.0';
    const ua = req.headers.get('user-agent') || 'unknown';

    const viewHash = crypto
        .createHash('sha256')
        .update(`${tutorial._id}-${ip}-${ua}`)
        .digest('hex');

    try {
        await ViewLog.create({ identifier: viewHash });

        const updatedTutorial = await Tutorial.findByIdAndUpdate(
            tutorial._id,
            { $inc: { views: 1 } },
            { new: true }
        ).populate('tags');

        return NextResponse.json(updatedTutorial);
    } catch (e) {
        return NextResponse.json(tutorial);
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await dbConnect();

    const userId = session.user.id;

    const query = mongoose.Types.ObjectId.isValid(id)
        ? { _id: id }
        : { slug: id };

    const tutorial = await Tutorial.findOne(query);

    if (!tutorial)
        return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const hasLiked = tutorial.likes.includes(userId);

    if (hasLiked) {
        tutorial.likes = tutorial.likes.filter((lid: string) => lid !== userId);
    } else {
        tutorial.likes.push(userId);
    }

    await tutorial.save();

    return NextResponse.json({
        likes: tutorial.likes,
        hasLiked: !hasLiked,
    });
}

// ADMIN/MODERATOR ROUTES

export async function DELETE(req: Request, { params }: RouteParams) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    await dbConnect();

    try {
        const tutorial = await Tutorial.findById(id);
        if (!tutorial)
            return NextResponse.json({ error: 'Not found' }, { status: 404 });

        const isAuthor = tutorial.authorId === session.user.id;
        const isAdmin =
            session.user.role === 'admin' || session.user.role === 'moderator';
        if (!isAuthor && !isAdmin)
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

        const filesToDelete = [...(tutorial.contentUrls || [])];
        if (tutorial.thumbnailUrl) filesToDelete.push(tutorial.thumbnailUrl);

        const cdnFiles = filesToDelete.filter((url) =>
            url.includes('cdn.sigmally.xyz')
        );

        if (cdnFiles.length > 0) {
            try {
                await Promise.all(
                    cdnFiles.map(async (fileUrl) => {
                        await fetch('https://cdn.sigmally.xyz/delete', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': process.env.CDN_API_KEY as string,
                            },
                            body: JSON.stringify({ fileUrl }),
                        });
                    })
                );
            } catch (cdnErr) {
                console.error('Failed to notify CDN about deletion:', cdnErr);
            }
        }

        await Tutorial.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Tutorial and associated files deleted',
        });
    } catch (error) {
        console.error('Delete Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request, { params }: RouteParams) {
    const session = await getServerSession(authOptions);
    if (!session)
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    await dbConnect();

    try {
        const body = await req.json();
        const tutorial = await Tutorial.findById(id);

        if (!tutorial) {
            return NextResponse.json(
                { error: 'Tutorial not found' },
                { status: 404 }
            );
        }

        const isAuthor = tutorial.authorId === session.user.id;
        const isAdmin =
            session.user.role === 'admin' || session.user.role === 'moderator';

        if (!isAuthor && !isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        if (body.status && body.status !== tutorial.status && !isAdmin) {
            return NextResponse.json(
                { error: 'Only admins can change status' },
                { status: 403 }
            );
        }

        const updatedTutorial = await Tutorial.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        return NextResponse.json(updatedTutorial);
    } catch (error) {
        console.error('Update Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
