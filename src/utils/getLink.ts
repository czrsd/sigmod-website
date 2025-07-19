export const tampermonkeyLinks = {
    chrome: 'https://chromewebstore.google.com/detail/dhdgffkkebhmkfjojejmpbldmpobfkfo',
    firefox: 'https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/',
    edge: 'https://microsoftedge.microsoft.com/addons/detail/iikmkjmpaadaobahmlepeloendndfphd',
    safari: 'https://apps.apple.com/app/tampermonkey/id6738342400',
    opera: 'https://addons.opera.com/en/extensions/details/tampermonkey-beta/',
    default: 'https://tampermonkey.net',
};

export const sigmallyLink = 'https://one.sigmally.com/';
export const sigmodLink =
    'https://update.greasyfork.org/scripts/454648/SigMod%20Client%20%28Macros%29.user.js';
export const sigfixLink =
    'https://update.greasyfork.org/scripts/483587/Sigmally%20Fixes%20V2.user.js';
export const discordLink = 'https://discord.gg/QyUhvUC8AD';

export function detectBrowser(): keyof typeof tampermonkeyLinks {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    if (/Edg\//.test(ua)) return 'edge';
    else if (/OPR\//.test(ua)) return 'opera';
    else if (/Chrome\//.test(ua)) return 'chrome';
    else if (/Firefox\//.test(ua)) return 'firefox';
    else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'safari';
    else return 'default';
}

export function getTampermonkeyLink() {
    const browser = detectBrowser();
    return tampermonkeyLinks[browser] || tampermonkeyLinks.default;
}
