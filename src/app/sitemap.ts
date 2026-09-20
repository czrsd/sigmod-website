import type { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Tutorial from '@/models/Tutorial';
import { absoluteUrl, seoLocales } from '@/lib/seo';

const publicPaths = [
    '',
    '/sigmod',
    '/sigfixes',
    '/guide',
    '/guide/userscript-manager',
    '/guide/developer-mode',
    '/guide/sigmod',
    '/guide/sigfixes',
    '/quick-guide',
    '/tutorials',
    '/faq',
    '/about',
    '/shop',
    '/shop/products/coins',
    '/shop/products/bundles',
    '/shop/products/subscriptions',
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of seoLocales) {
        for (const pathname of publicPaths) {
            const url = absoluteUrl(`/${locale}${pathname}`);
            entries.push({
                url,
                alternates: {
                    languages: Object.fromEntries(
                        seoLocales.map((language) => [
                            language,
                            absoluteUrl(`/${language}${pathname}`),
                        ])
                    ),
                },
            });
        }
    }

    try {
        await dbConnect();
        const tutorials = await Tutorial.find({ status: 'approved' })
            .select('slug updatedAt')
            .lean();

        for (const tutorial of tutorials) {
            const pathname = `/tutorials/${tutorial.slug}`;
            entries.push({
                url: absoluteUrl(`/en${pathname}`),
                lastModified: tutorial.updatedAt,
                alternates: {
                    languages: {
                        en: absoluteUrl(`/en${pathname}`),
                    },
                },
            });
        }
    } catch {
        // A sitemap must remain available even while the optional tutorial DB is offline.
    }

    return entries;
}
