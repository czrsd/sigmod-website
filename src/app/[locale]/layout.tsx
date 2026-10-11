import '../globals.css';
import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import { hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { LayoutTransition } from '@/components/layout-transition';
import { siteUrl } from '@/lib/seo';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    adjustFontFallback: true,
    preload: true,
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
    ],
};

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    const title = 'Sigmally Mods – SigMod & SigFixes';
    const description =
        messages?.Metadata?.desc ?? 'Download mods for Sigmally';
    const image = `${siteUrl}/SigModzBanner.png`;

    return {
        title: {
            default: title,
            template: '%s | SigModz',
        },
        description,
        metadataBase: new URL(siteUrl),
        openGraph: {
            title,
            description,
            images: [{ url: image }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
        icons: {
            icon: [
                {
                    url: '/favicon-16x16.png',
                    sizes: '16x16',
                    type: 'image/png',
                },
                {
                    url: '/favicon-32x32.png',
                    sizes: '32x32',
                    type: 'image/png',
                },
                { url: '/favicon.svg', type: 'image/svg+xml' },
            ],
            apple: '/apple-touch-icon.png',
        },
        manifest: '/site.webmanifest',
    };
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) notFound();
    setRequestLocale(locale);

    const messages = await getMessages({ locale });

    const now = new Date();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel='preconnect' href='https://api.greasyfork.org' />
                <link rel='preconnect' href='https://mod.czrsd.com' />
            </head>
            <body
                className={`${inter.className} overflow-x-hidden bg-bg dark:bg-[#050505]`}
            >
                <Providers locale={locale} messages={messages} now={now}>
                    <Header />

                    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
                        <div className='bg-grid absolute inset-0 opacity-20 dark:opacity-30 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_30%,#000_40%,transparent_100%)]' />
                    </div>

                    <LayoutTransition
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <div className='relative z-0'>{children}</div>
                    </LayoutTransition>

                    <Footer />

                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
