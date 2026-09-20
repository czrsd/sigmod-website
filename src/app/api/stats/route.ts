import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const GREASYFORK_SCRIPT_IDS = ['454648', '483587'];
const GREASYFORK_API = 'https://api.greasyfork.org/scripts';
const ONLINE_USERS_API = 'https://mod.czrsd.com/onlineusers';

type GreasyForkStats = {
    total_installs?: unknown;
    daily_installs?: unknown;
};

function nonNegativeNumber(value: unknown): number | null {
    return typeof value === 'number' && Number.isFinite(value) && value >= 0
        ? value
        : null;
}

async function fetchJson(url: string): Promise<unknown> {
    const response = await fetch(url, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
        throw new Error(`Stats request failed with ${response.status}`);
    }

    return response.json();
}

export async function GET() {
    const [scriptResults, onlineResults] = await Promise.all([
        Promise.allSettled(
            GREASYFORK_SCRIPT_IDS.map((id) =>
                fetchJson(`${GREASYFORK_API}/${id}.json`),
            ),
        ),
        Promise.allSettled([fetchJson(ONLINE_USERS_API)]),
    ]);
    const onlineResult = onlineResults[0];

    const scripts = scriptResults.map((result) =>
        result.status === 'fulfilled'
            ? (result.value as GreasyForkStats)
            : null,
    );

    const hasAllScriptStats = scripts.every(Boolean);
    const total = hasAllScriptStats
        ? scripts.reduce<number | null>((sum, script) => {
              const installs = nonNegativeNumber(script?.total_installs);
              return sum === null || installs === null ? null : sum + installs;
          }, 0)
        : null;
    const daily = hasAllScriptStats
        ? scripts.reduce<number | null>((sum, script) => {
              const installs = nonNegativeNumber(script?.daily_installs);
              return sum === null || installs === null ? null : sum + installs;
          }, 0)
        : null;

    const online =
        onlineResult.status === 'fulfilled'
            ? nonNegativeNumber(
                  (onlineResult.value as { onlineUsers?: unknown })
                      ?.onlineUsers,
              )
            : null;

    return NextResponse.json(
        { total, daily, online },
        {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        },
    );
}
