import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { hasLocale } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Footer from '@/components/Footer';
import Preload from '@/components/Preload';
import { Providers } from './providers';

const SITE = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://sigmally.xyz'
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
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/favicon-16x16.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='48x48'
                    href='/favicon-48x48.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='96x96'
                    href='/favicon-96x96.png'
                />
                <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
                <link rel='mask-icon' href='/favicon.svg' color='#000000' />
                <link rel='manifest' href='/site.webmanifest' />
                <meta name='theme-color' content='#000000' />
                <link rel='icon' href='/favicon.ico' sizes='any' />

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
            <body className='overflow-x-hidden bg-bg dark:bg-[#050505] transition-colors duration-500'>
                <Providers locale={locale} messages={messages}>
                    <Header />

                    <div className='fixed inset-0 -z-10 overflow-hidden pointer-events-none'>
                        <div
                            className='absolute top-[5%] left-[5%] w-[20%] h-[20%] rounded-full 
                bg-blue-400/10 dark:bg-blue-600/20 blur-[180px] animate-drift'
                        />
                        <div
                            className='absolute bottom-[5%] right-[-5%] w-[35%] h-[35%] rounded-full 
                bg-purple-400/10 dark:bg-purple-600/20 blur-[160px] animate-drift [animation-delay:3s]'
                        />
                        <div
                            className='absolute top-[25%] right-[10%] w-[25%] h-[25%] rounded-full 
                bg-emerald-400/5 dark:bg-emerald-600/10 blur-[140px] animate-drift [animation-delay:6s]'
                        />

                        <div className='bg-grid absolute inset-0 opacity-30 dark:opacity-40' />

                        <div
                            className='absolute inset-0 
                bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.7)_100%)] 
                dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,0.6)_100%)]'
                        />
                    </div>

                    <div className='relative z-0'>{children}</div>

                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
