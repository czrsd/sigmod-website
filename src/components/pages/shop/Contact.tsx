import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function ContactPage() {
    const t = useTranslations('Shop.MainPage.Contact');

    return (
        <div className='flex flex-col items-center space-y-10'>
            <h2 className='text-4xl font-bold'>{t('title')}</h2>
            <div className='flex flex-col items-center space-y-6'>
                <div className='flex flex-col gap-2 bg-neutral-900 py-8 px-12 rounded-xl'>
                    <span className='text-lg font-semibold'>
                        {t('supportEmail')}
                    </span>
                    <hr />
                    <span>sigmallymod@proton.me</span>
                </div>
                <div className='flex flex-col gap-6'>
                    <span>{t('or')}</span>
                    <Button variant='outline' asChild>
                        <Link
                            href='https://discord.gg/QyUhvUC8AD'
                            target='_blank'
                        >
                            <MessageSquare className='inline mr-2' />
                            <span>{t('createTicket')}</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
