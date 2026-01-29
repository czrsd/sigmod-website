'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/ui/navigation-menu';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './theme-toggler';

const languageMap: Record<string, string> = {
    en: 'English',
    de: 'Deutsch',
    tr: 'Türkçe',
    es: 'Español',
    ru: 'Русский',
};

const mods = [
    {
        href: '/sigmod',
        titleKey: 'mods.sigmod.title',
        descKey: 'mods.sigmod.desc',
        imgSrc: '/preview/sigmod_menu.png',
        imgAlt: 'SigMod Menu',
        imgSize: 92,
    },
    {
        href: '/sigfixes',
        titleKey: 'mods.sigfixes.title',
        descKey: 'mods.sigfixes.desc',
        imgSrc: '/SigFixes_icon.png',
        imgAlt: 'SigFixes',
        imgSize: 42,
    },
];

const navLinks = [
    { href: '/guide', labelKey: 'guide' },
    { href: '/faq', labelKey: 'faq' },
    { href: '/about', labelKey: 'about' },
    { href: '/shop', labelKey: 'shop' },
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const t = useTranslations('Header');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const changeLanguage = (newLocale: string) => {
        const segments = pathname.split('/');
        segments[1] = newLocale;
        router.replace(segments.join('/') || '/');
    };

    return (
        <header className='sticky top-0 z-50 bg-background/70 backdrop-blur-sm border-b'>
            <div className='max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                    <Link
                        href='/'
                        className='flex items-center gap-2 hover:scale-106 transition-all duration-200'
                    >
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
                                    {mods.map(
                                        ({
                                            href,
                                            titleKey,
                                            descKey,
                                            imgSrc,
                                            imgAlt,
                                            imgSize,
                                        }) => (
                                            <NavigationMenuLink
                                                asChild
                                                key={href}
                                                className='flex flex-row'
                                            >
                                                <Link
                                                    href={href}
                                                    className='flex items-center gap-4 w-[260px]'
                                                >
                                                    <div className='flex-1'>
                                                        <span className='font-medium text-sm'>
                                                            {t(titleKey)}
                                                        </span>
                                                        <p className='text-muted-foreground text-xs'>
                                                            {t(descKey)}
                                                        </p>
                                                    </div>
                                                    <Image
                                                        src={imgSrc}
                                                        alt={imgAlt}
                                                        width={imgSize}
                                                        height={imgSize}
                                                        className='rounded object-cover'
                                                    />
                                                </Link>
                                            </NavigationMenuLink>
                                        )
                                    )}
                                </NavigationMenuContent>
                            </NavigationMenuItem>

                            {navLinks.map(({ href, labelKey }) => (
                                <NavigationMenuItem key={href}>
                                    <NavigationMenuLink asChild>
                                        <Link href={href}>{t(labelKey)}</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className='flex items-center gap-4'>
                    <DropdownMenu open={langOpen} onOpenChange={setLangOpen}>
                        <DropdownMenuTrigger
                            className='flex items-center gap-1'
                            aria-label={`Current language: ${
                                languageMap[locale] ?? locale.toUpperCase()
                            }`}
                            title={languageMap[locale] ?? locale.toUpperCase()}
                        >
                            <Image
                                src={`/flags/${locale}.svg`}
                                alt={locale}
                                width={18}
                                height={18}
                                className='mt-px'
                            />
                            {languageMap[locale] ?? locale.toUpperCase()}
                            {langOpen ? (
                                <ChevronUp
                                    className='text-muted-foreground mt-px'
                                    size={18}
                                />
                            ) : (
                                <ChevronDown
                                    className='text-muted-foreground mt-px'
                                    size={18}
                                />
                            )}
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            {[
                                locale,
                                ...routing.locales.filter((l) => l !== locale),
                            ].map((lng) => (
                                <DropdownMenuItem
                                    key={lng}
                                    onClick={() => changeLanguage(lng)}
                                    className={`flex items-center gap-2 ${
                                        lng === locale
                                            ? 'opacity-50 pointer-events-none'
                                            : ''
                                    }`}
                                >
                                    <Image
                                        src={`/flags/${lng}.svg`}
                                        alt={lng}
                                        width={18}
                                        height={18}
                                        className='rounded-sm'
                                    />
                                    {languageMap[lng] ?? lng.toUpperCase()}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <ModeToggle />

                    <Button
                        variant='ghost'
                        size='icon'
                        className='md:hidden'
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label='Toggle menu'
                    >
                        <Menu className='w-5 h-5' />
                    </Button>
                </div>
            </div>

            {menuOpen && (
                <nav className='md:hidden border-t px-4 py-4 space-y-3'>
                    <Link href='/' className='block'>
                        {t('home')}
                    </Link>
                    {mods.map(({ href, titleKey }) => (
                        <Link key={href} href={href} className='block'>
                            {t(titleKey)}
                        </Link>
                    ))}
                    {navLinks.map(({ href, labelKey }) => (
                        <Link key={href} href={href} className='block'>
                            {t(labelKey)}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
