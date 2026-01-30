'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Github, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Footer() {
    const t = useTranslations('Footer');
    const currentYear = new Date().getFullYear();

    return (
        <footer className='w-full bg-[#050505] px-6 md:px-16 py-12 border-t border-white/5'>
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col md:flex-row justify-between items-center gap-8'>
                    <div className='flex flex-col items-center md:items-start gap-2'>
                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.6)]' />
                            <span className='font-black tracking-tighter italic text-white text-lg'>
                                SIGMODZ
                            </span>
                        </div>
                        <p className='text-xs text-neutral-500 max-w-[250px] text-center md:text-left leading-relaxed'>
                            © {currentYear} SigModz. {t('disclaimer')}
                        </p>
                    </div>

                    <div className='flex flex-wrap justify-center gap-x-8 gap-y-4'>
                        <FooterLink
                            href='https://github.com/czrsd/sigmod'
                            icon={<Github size={16} />}
                            label='SigMod Source'
                        />
                        <FooterLink
                            href='https://github.com/8y8x/sigmally-fixes'
                            icon={<Github size={16} />}
                            label='SigFixes Source'
                        />
                        <FooterLink
                            href='/game'
                            icon={<ExternalLink size={16} />}
                            label='Sigmally'
                        />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className='mt-10 pt-6 border-t border-white/[0.03] flex justify-center'>
                    <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-neutral-600 font-bold'>
                        <ShieldCheck size={12} className='text-blue-500/50' />
                        Community Driven Project
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
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <Link
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-200 group'
        >
            <span className='text-neutral-600 group-hover:text-blue-500 transition-colors'>
                {icon}
            </span>
            {label}
        </Link>
    );
}
