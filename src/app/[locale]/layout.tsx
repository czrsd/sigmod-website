import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Preload from '@/components/Preload';
import { LayoutTransition } from '@/components/layout-transition';

const SITE = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://dev.czrsd.com'
).replace(/\/$/, '');

async function getMetadata(locale: string): Promise<Metadata> {
    const messages = await getMessages({ locale });
    const description =
        messages?.Metadata?.desc ?? 'Download mods for Sigmally';
    const title = 'Sigmally Modz';
    const image = `${SITE}/SigModzBanner.png`;
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [image],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
        },
    };
}

function toArray<T>(v: T | T[] | undefined): T[] {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
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
    const metadata = await getMetadata(locale);

    const titleStr = metadata?.title ? String(metadata.title) : 'Sigmally Modz';
    const descStr = metadata?.description
        ? String(metadata.description)
        : 'Download mods for Sigmally';

    const ogImages = toArray(
        metadata?.openGraph?.images as unknown as string[]
    );
    const ogUrl = ogImages[0] ?? '';

    const twImages = toArray(metadata?.twitter?.images as unknown as string[]);
    const twUrl = twImages[0] ?? ogUrl;

    return (
        <html lang={locale}>
            <head>
                <meta name='apple-mobile-web-app-title' content='SigModz' />
                <Preload />
                <title>{titleStr}</title>
                <meta name='description' content={descStr} />

                <meta property='og:title' content={titleStr} />
                <meta property='og:description' content={descStr} />
                <meta property='og:image' content={ogUrl} />

                <meta name='twitter:card' content='summary_large_image' />
                <meta name='twitter:title' content={titleStr} />
                <meta name='twitter:description' content={descStr} />
                <meta name='twitter:image' content={twUrl} />
            </head>
            <body className='dark overflow-x-hidden'>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <LayoutTransition
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: -10 }}
                        exit={{ opacity: 0, y: 0 }}
                    >
                        {children}
                    </LayoutTransition>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
