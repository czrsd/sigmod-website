import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
    try {
        const ids = ['454648', '483587'];
        let totalInstalls = 0;
        let dailyInstalls = 0;

        for (const id of ids) {
            const res = await fetch(
                `https://greasyfork.org/scripts/${id}.json`,
                {
                    next: { revalidate: 600 },
                }
            );
            if (res.ok) {
                const data = await res.json();
                totalInstalls += data.total_installs || 0;
                dailyInstalls += data.daily_installs || 0;
            }
        }

        const onlineUsersRes = await fetch(
            'https://mod.czrsd.com/onlineusers',
            {
                next: { revalidate: 60 },
            }
        );

        let onlineCount = 70;
        if (onlineUsersRes.ok) {
            const data = await onlineUsersRes.json();
            onlineCount = data.onlineUsers;
        }

        return NextResponse.json(
            {
                total: totalInstalls.toLocaleString() + '+',
                daily: dailyInstalls.toLocaleString() + '+',
                online: onlineCount + '+',
            },
            {
                headers: {
                    'Cache-Control':
                        'public, s-maxage=60, stale-while-revalidate=30',
                },
            }
        );
    } catch (e) {
        return NextResponse.json(
            { total: '30,000+', daily: '50+', online: '70+' },
            { status: 500 }
        );
    }
}
