import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/sonner';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

export async function generateMetadata({
    params,
}: {
    params: { locale: string };
}): Promise<Metadata> {
    const { locale } = await params;
    const messages = await getMessages({ locale });
    const SITE = (
        process.env.NEXT_PUBLIC_SITE_URL || 'https://sigmally.xyz'
    ).replace(/\/$/, '');

    const title = 'Sigmally Modz';
    const description =
        messages?.Metadata?.desc ?? 'Download mods for Sigmally';
    const image = `${SITE}/SigModzBanner.png`;

    return {
        title: {
            default: title,
            template: `%s | ${title}`,
        },
        description,
        metadataBase: new URL(SITE),
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
        alternates: {
            canonical: `${SITE}/${locale}`,
            languages: {
                en: `${SITE}/en`,
                de: `${SITE}/de`,
                ru: `${SITE}/ru`,
                es: `${SITE}/es`,
                tr: `${SITE}/tr`,
            },
        },
    };
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

    const messages = await getMessages({ locale });

    return (
        <html lang={locale} suppressHydrationWarning>
            <body
                className={`${inter.className} overflow-x-hidden bg-bg dark:bg-[#050505] transition-colors duration-500`}
            >
                <Providers locale={locale} messages={messages}>
                    <Header />

                    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
                        <div className='hidden lg:block absolute top-[5%] left-[5%] w-[20%] h-[20%] rounded-full bg-blue-400/10 dark:bg-blue-600/20 blur-[120px] animate-drift will-change-transform' />
                        <div className='hidden lg:block absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] rounded-full bg-purple-400/10 dark:bg-purple-600/20 blur-[100px] animate-drift [animation-delay:3s] will-change-transform' />

                        <div className='bg-grid absolute inset-0 opacity-30 dark:opacity-40' />
                    </div>

                    <main className='relative z-0'>{children}</main>

                    <Footer />

                    <Toaster />
                </Providers>
            </body>
        </html>
    );
}
