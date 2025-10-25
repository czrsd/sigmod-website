import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
    const t = useTranslations('Footer');
    return (
        <footer className='w-full bg-secondary dark:bg-black/60 px-6 md:px-16 py-10 border-t'>
            <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground'>
                <div className='text-center md:text-left'>{t('text')}</div>
                <div className='flex gap-4'>
                    <Link
                        href='https://github.com/czrsd/sigmod'
                        target='_blank'
                        className='hover:underline'
                        rel='noopener noreferrer'
                    >
                        SigMod GitHub
                    </Link>
                    <Link
                        href='https://github.com/8y8x/sigmally-fixes'
                        target='_blank'
                        className='hover:underline'
                        rel='noopener noreferrer'
                    >
                        SigFixes GitHub
                    </Link>
                </div>
            </div>
        </footer>
    );
}
