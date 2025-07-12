import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Header() {
    return (
        <header className='flex justify-between p-3'>
            <div className='flex gap-2'>
                <h1 className='text-2xl font-bold'>
                    <Image
                        src='/sigmodz.svg'
                        width={40}
                        height={40}
                        alt='Logo'
                        className='rounded-lg'
                    />
                </h1>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>
                                Get started
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
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
                            <NavigationMenuLink
                                href='https://one.sigmally.com/'
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
