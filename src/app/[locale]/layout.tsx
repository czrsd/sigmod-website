import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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

    return (
        <html lang={locale}>
            <body className='dark overflow-x-hidden'>
                <NextIntlClientProvider>
                    <Header />
                    <PageWrapper>{children}</PageWrapper>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
