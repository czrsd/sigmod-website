import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import TutorialForm from '@/components/pages/tutorials/TutorialForm';

export default async function UploadPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    await dbConnect();
    const tags = await Tag.find({}).lean();

    return (
        <section className='flex flex-col items-center py-20 px-6 space-y-10'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    Upload <span className='text-primary'>Content</span>
                </h1>
                <div className='h-1 md:h-2 w-24 bg-primary mx-auto rounded-full' />
            </div>

            <TutorialForm tags={JSON.parse(JSON.stringify(tags))} />

            <p className='text-neutral-600 text-[10px] font-black uppercase italic'>
                Your submission will be reviewed by the moderation team.
            </p>
        </section>
    );
}
