'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import { sigmallyLink } from '@/utils/getLink';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Header');

    return (
        <header className='sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Link href='/' className='flex items-center gap-2'>
                        <Image
                            src='/sigmodz.svg'
                            alt='Logo'
                            width={40}
                            height={40}
                            className='rounded-md'
                        />
                    </Link>

                    <NavigationMenu className='hidden md:flex'>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    {t('mods.title')}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='p-4'>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href='/sigmod'
                                            className='flex flex-row items-center gap-4 w-[260px]'
                                        >
                                            <div className='flex-1'>
                                                <span className='font-medium text-sm'>
                                                    {t('mods.sigmod.title')}
                                                </span>
                                                <p className='text-muted-foreground text-xs'>
                                                    {t('mods.sigmod.desc')}
                                                </p>
                                            </div>
                                            <Image
                                                src='/screenshots/sigmod_menu.png'
                                                alt='SigMod Menu'
                                                width={92}
                                                height={92}
                                                className='rounded object-cover'
                                            />
                                        </Link>
                                    </NavigationMenuLink>

                                    <NavigationMenuLink asChild>
                                        <Link
                                            href='/sigfixes'
                                            className='flex flex-row items-center gap-4 w-[260px]'
                                        >
                                            <div className='flex-1'>
                                                <span className='font-medium text-sm'>
                                                    {t('mods.sigfixes.title')}
                                                </span>
                                                <p className='text-muted-foreground text-xs'>
                                                    {t('mods.sigfixes.desc')}
                                                </p>
                                            </div>
                                            <Image
                                                src='/SigFixes_icon.png'
                                                alt='SigFixes'
                                                width={42}
                                                height={42}
                                                className='rounded object-cover'
                                            />
                                        </Link>
                                    </NavigationMenuLink>
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href='/guide'>{t('guide')}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href='/faq'>{t('faq')}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href='/about'>{t('about')}</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='flex items-center gap-4'>
                    <Button
                        variant='ghost'
                        asChild
                        className='hidden sm:inline-flex'
                    >
                        <Link
                            href={sigmallyLink}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            {t('play')}
                        </Link>
                    </Button>

                    <Button
                        variant='ghost'
                        size='icon'
                        className='md:hidden'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <Menu className='w-5 h-5' />
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className='md:hidden border-t px-4 py-4 space-y-3'>
                    <Link href='/' className='block'>
                        {t('home')}
                    </Link>
                    <Link href='/guide/sigmod' className='block'>
                        {t('mods.sigmod.title')}
                    </Link>
                    <Link href='/guide/sigfixes' className='block'>
                        {t('mods.sigfixes.title')}
                    </Link>
                    <Link href='/guide' className='block'>
                        {t('guide')}
                    </Link>
                    <Link href='/faq' className='block'>
                        {t('faq')}
                    </Link>
                    <Link href='/about' className='block'>
                        {t('about')}
                    </Link>
                    <Link
                        href={sigmallyLink}
                        className='block'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        {t('play')}
                    </Link>
                </div>
            )}
        </header>
    );
}
