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
import { getTranslations } from 'next-intl/server';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export default async function AdminSubmissionsPage() {
    const session = await getServerSession(authOptions);

    if (
        !session ||
        (session.user.role !== 'admin' && session.user.role !== 'moderator')
    ) {
        redirect('/');
    }

    const t = await getTranslations('TutorialPage.adminSubmissions');

    await dbConnect();

    const tutorials = await Tutorial.find({})
        .populate('tags')
        .populate({
            path: 'authorId',
            select: 'name image',
            model: User,
        })
        .sort({ createdAt: -1 })
        .lean();
    const tags = await Tag.find({}).lean();

    const serializedTutorials = JSON.parse(JSON.stringify(tutorials));
    const serializedTags = JSON.parse(JSON.stringify(tags));

    return (
        <section className='flex flex-col items-center py-20 px-6 space-y-10 min-h-screen'>
            <div className='text-center space-y-2 relative '>
                <h1 className='text-3xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('manage')}{' '}
                    <span className='text-primary'>{t('tutorials')}</span>
                </h1>
                <div className='h-1 md:h-2 w-24 bg-primary mx-auto rounded-full' />
                <Button
                    className='absolute top-2 -left-70'
                    variant='outline'
                    asChild
                >
                    <Link href={'/tutorials'}>
                        <ArrowLeft />
                        {t('back')}
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
