import { useTranslations } from 'next-intl';
import { discordLink } from '@/utils/getLink';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';

export function CommunitySection() {
    const t = useTranslations('HomePage.community');
    return (
        <section className='relative px-6 md:px-16 py-32 max-w-5xl mx-auto overflow-hidden'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10' />

            <div className='flex flex-col items-center text-center space-y-6 bg-neutral-200/90 dark:bg-neutral-900/40 backdrop-blur-md border border-white/5 p-10 md:p-16 rounded-[2.5rem] shadow-2xl'>
                <div className='w-14 h-14 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center text-[#5865F2] mb-2'>
                    <MessageSquare size={32} />
                </div>

                <h4 className='text-4xl md:text-5xl font-black uppercase italic tracking-tighter'>
                    {t('title')}
                </h4>

                <p className='text-lg text-neutral-600 dark:text-neutral-300 max-w-lg leading-relaxed'>
                    {t('desc')}
                </p>

                <Button
                    size='lg'
                    className='bg-[#5865F2] hover:bg-[#4752C4] text-white px-10 h-14 rounded-full font-bold uppercase italic tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(88,101,242,0.3)] border-t border-white/20'
                    asChild
                >
                    <Link href={discordLink} target='_blank'>
                        {t('join')}
                    </Link>
                </Button>
            </div>
        </section>
    );
}
