import { useTranslations } from 'next-intl';
import { discordLink } from '@/utils/getLink';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { MessageSquare } from 'lucide-react';

export function CommunitySection() {
    const t = useTranslations('HomePage.community');

    return (
        <section className='px-6 md:px-16 py-16 md:py-24 max-w-4xl mx-auto'>
            <div className='flex flex-col items-center text-center space-y-5 bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/10 p-8 md:p-12 rounded-2xl'>
                <div className='w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center text-[#5865F2]'>
                    <MessageSquare size={24} />
                </div>

                <div className='space-y-2 max-w-md'>
                    <h2 className='text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
                        {t('title')}
                    </h2>

                    <p className='text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed'>
                        {t('desc')}
                    </p>
                </div>

                <Button
                    size='lg'
                    className='bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 h-12 rounded-full font-semibold transition-colors shadow-md mt-2'
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
