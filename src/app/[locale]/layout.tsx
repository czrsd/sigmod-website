import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Preload from '@/components/Preload';

export const metadata: Metadata = {
    title: 'SigModz',
    description: 'Download mods for Sigmally',
};

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
        <html lang={locale}>
            <head>
                <Preload />
            </head>
            <body className='dark overflow-x-hidden'>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Header />
                    <PageWrapper>{children}</PageWrapper>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
