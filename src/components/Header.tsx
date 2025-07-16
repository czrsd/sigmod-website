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

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

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
                                    Mods
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className='p-4'>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href='/sigmod'
                                            className='flex flex-row items-center gap-4 w-[260px]'
                                        >
                                            <div className='flex-1'>
                                                <span className='font-medium text-sm'>
                                                    SigMod Client
                                                </span>
                                                <p className='text-muted-foreground text-xs'>
                                                    Custom mod menu, automation,
                                                    UI tweaks
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
                                                    SigFixes
                                                </span>
                                                <p className='text-muted-foreground text-xs'>
                                                    Enable Multiboxing, Boost
                                                    FPS
                                                </p>
                                            </div>
                                            <Image
                                                src='/SigFixes_icon.png'
                                                alt='SigMod Menu'
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
                                    <Link href='/guide'>Guide</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href='/faq'>FAQ</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href='/about'>About</Link>
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
                            Play Sigmally
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
                        Home
                    </Link>
                    <Link href='/guide/sigmod' className='block'>
                        SigMod
                    </Link>
                    <Link href='/guide/sigfixes' className='block'>
                        SigFixes
                    </Link>
                    <Link href='/guide' className='block'>
                        Guide
                    </Link>
                    <Link href='/faq' className='block'>
                        FAQ
                    </Link>
                    <Link href='/about' className='block'>
                        About
                    </Link>
                    <Link
                        href={sigmallyLink}
                        className='block'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Play Sigmally
                    </Link>
                </div>
            )}
        </header>
    );
}
