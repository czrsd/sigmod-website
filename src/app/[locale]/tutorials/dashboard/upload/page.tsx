import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dbConnect from '@/lib/db';
import Tag from '@/models/Tag';
import TutorialForm from '@/components/pages/tutorials/TutorialForm';
import { getTranslations } from 'next-intl/server';

export default async function UploadPage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect('/');

    const t = await getTranslations('TutorialPage.dashboard.upload');

    await dbConnect();
    const tags = await Tag.find({}).lean();

    return (
        <section className='flex flex-col items-center py-20 px-6 space-y-10'>
            <div className='text-center space-y-2'>
                <h1 className='text-3xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('upload')}{' '}
                    <span className='text-primary'>{t('content')}</span>
                </h1>
                <div className='h-1 md:h-2 w-24 bg-primary mx-auto rounded-full' />
            </div>

            <TutorialForm tags={JSON.parse(JSON.stringify(tags))} />

            <p className='text-neutral-600 text-[10px] font-black uppercase italic'>
                {t('hint')}
            </p>
        </section>
    );
}
