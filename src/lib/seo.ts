import type { Metadata } from 'next';

export const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'development'
        ? 'https://dev.czrsd.com'
        : 'https://sigmally.xyz')
).replace(/\/$/, '');

export const seoLocales = ['en', 'de', 'es', 'tr', 'ru'] as const;

function normalizePath(pathname: string) {
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    return path === '/' ? '' : path.replace(/\/$/, '');
}

export function localizedAlternates(locale: string, pathname: string) {
    const path = normalizePath(pathname);
    const languages = Object.fromEntries(
        seoLocales.map((language) => [language, `/${language}${path}`])
    );

    return {
        canonical: `/${locale}${path}`,
        languages: {
            ...languages,
            'x-default': `/en${path}`,
        },
    } satisfies NonNullable<Metadata['alternates']>;
}

export function pageMetadata({
    locale,
    pathname,
    title,
    description,
    image = '/SigModzBanner.png',
    noIndex = false,
}: {
    locale: string;
    pathname: string;
    title: string;
    description: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const path = normalizePath(pathname);
    const url = `${siteUrl}/${locale}${path}`;
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

    return {
        title,
        description,
        alternates: localizedAlternates(locale, pathname),
        robots: noIndex
            ? { index: false, follow: true }
            : { index: true, follow: true },
        openGraph: {
            title,
            description,
            url,
            siteName: 'SigModz',
            type: 'website',
            locale,
            images: [{ url: imageUrl, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export function absoluteUrl(pathname: string) {
    return `${siteUrl}${normalizePath(pathname) || '/'}`;
}
