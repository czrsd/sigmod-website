'use client';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Header() {
    return (
        <header className='sticky top-0 z-50 bg-background/70 backdrop-blur-sm flex justify-between p-3 shadow-sm'>
            <div className='flex gap-2'>
                <Button
                    className='text-2xl font-bold p-0 cursor-pointer'
                    variant={'ghost'}
                >
                    <Link href='/'>
                        <Image
                            src='/sigmodz.svg'
                            width={40}
                            height={40}
                            alt='Logo'
                            className='rounded-lg'
                        />
                    </Link>
                </Button>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Get started
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className=''>
                                <NavigationMenuLink href='/guide'>
                                    Full Guide
                                </NavigationMenuLink>
                                <NavigationMenuLink href='/guide'>
                                    SigMod
                                </NavigationMenuLink>
                                <NavigationMenuLink href='/guide'>
                                    SigFixes
                                </NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href='/faq'>
                                FAQ
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem asChild>
                            <NavigationMenuLink
                                href='https://one.sigmally.com/'
                                rel='noopener noreferrer'
                                target='_blank'
                            >
                                Play Sigmally
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div>
                <div className='flex'>
                    <Input placeholder='Search' />
                    <Button variant={'ghost'}>
                        <Search />
                    </Button>
                </div>
            </div>
        </header>
    );
}
