'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons';
import { discordLink } from '@/utils/getLink';

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className='w-full bg-secondary/80 dark:bg-[#050505] px-6 md:px-16 py-12 border-t border-black/5 dark:border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-8'>
                    <div className='space-y-2'>
                        <div className='flex items-center gap-2'>
                            <span className='font-bold tracking-tight text-lg'>
                                SigModz
                            </span>
                            <span className='text-xs px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium'>
                                for Sigmally
                            </span>
                        </div>
                        <p className='text-xs text-neutral-500 max-w-sm leading-relaxed'>
                            Free and open-source tools made for players. {t('disclaimer')}
                        </p>
                    </div>

                    <div className='flex flex-wrap items-center gap-x-6 gap-y-3 text-sm'>
                        <Link
                            href='/guide'
                            className='text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors'
                        >
                            Setup Guide
                        </Link>
                        <Link
                            href='/tutorials'
                            className='text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors'
                        >
                            Tutorials
                        </Link>
                        <Link
                            href='/shop'
                            className='text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors'
                        >
                            Shop
                        </Link>
                        <FooterLink
                            href={discordLink}
                            label='Discord'
                        />
                        <FooterLink
                            href='https://github.com/czrsd/sigmod'
                            icon={<Github size={15} />}
                            label='SigMod'
                        />
                        <FooterLink
                            href='https://github.com/8y8x/sigmally-fixes'
                            icon={<Github size={15} />}
                            label='SigFixes'
                        />
                        <FooterLink
                            href='https://one.sigmally.com/'
                            icon={<ExternalLink size={14} />}
                            label='Play Sigmally'
                        />
                    </div>
                </div>

                <div className='mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500'>
                    <p>© {currentYear} SigModz. Developed for the Sigmally community.</p>
                    <div className='flex items-center gap-4'>
                        <Link href='/shop/privacy' className='hover:underline'>Privacy</Link>
                        <Link href='/shop/terms' className='hover:underline'>Terms</Link>
                        <Link href='/shop/refund' className='hover:underline'>Refunds</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon?: React.ReactNode;
    label: string;
}) {
    return (
        <a
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors'
        >
            {icon}
            <span>{label}</span>
        </a>
    );
}

