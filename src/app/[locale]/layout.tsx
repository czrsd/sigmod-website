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

async function getMetadata(locale: string): Promise<Metadata> {
    const messages = await getMessages({ locale });
    const description =
        messages?.Metadata?.desc ?? 'Download mods for Sigmally';
    const title = 'Sigmally Modz';
    const image = '/sigmodz.png';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                    width: 512,
                    height: 512,
                    alt: 'Sigmally Modz',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [image],
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
    const metadata = await getMetadata(locale);

    return (
        <html lang={locale}>
            <head>
                <meta name='apple-mobile-web-app-title' content='SigModz' />
                <Preload />
                <title>
                    {metadata.title ? String(metadata.title) : 'Sigmally Modz'}
                </title>
                <meta
                    name='description'
                    content={
                        metadata.description
                            ? String(metadata.description)
                            : 'Download mods for Sigmally'
                    }
                />
                <meta
                    property='og:title'
                    content={
                        metadata.openGraph?.title
                            ? String(metadata.openGraph.title)
                            : 'Sigmally Modz'
                    }
                />
                <meta
                    property='og:description'
                    content={
                        metadata.openGraph?.description
                            ? String(metadata.openGraph.description)
                            : ''
                    }
                />
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
