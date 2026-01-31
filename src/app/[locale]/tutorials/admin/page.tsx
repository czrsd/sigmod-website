import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import Tutorial from '@/models/Tutorial';
import SubmissionManager from './SubmissionManager';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminSubmissionsPage() {
    const session = await getServerSession(authOptions);

    if (
        !session ||
        (session.user.role !== 'admin' && session.user.role !== 'moderator')
    ) {
        redirect('/');
    }

    await dbConnect();

    const tutorials = await Tutorial.find({}).sort({ createdAt: -1 }).lean();

    const tags = await Tag.find({}).lean();

    const serializedTutorials = JSON.parse(JSON.stringify(tutorials));
    const serializedTags = JSON.parse(JSON.stringify(tags));

    return (
        <section className='flex flex-col items-center py-20 px-6 space-y-10 min-h-screen'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    Manage <span className='text-primary'>Tutorials</span>
                </h1>
                <div className='h-1 md:h-2 w-24 bg-primary mx-auto rounded-full' />
                <Button variant='outline' asChild>
                    <Link href={'/tutorials'}>
                        <ArrowLeft />
                        Back to tutorials
                    </Link>
                </Button>
            </div>

            <SubmissionManager
                tutorials={serializedTutorials}
                tags={serializedTags}
            />
        </section>
    );
}
