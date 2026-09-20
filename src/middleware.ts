import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Next 15 discovers middleware.ts. Keeping locale negotiation here ensures
// the site root and locale-less URLs are redirected before App Router pages.
export default createMiddleware(routing);

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
