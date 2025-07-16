'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

const instructions = {
    chrome: {
        title: 'For Chrome, Edge & Opera',
        steps: [
            'Click the puzzle icon in your browser’s toolbar.',
            'Select Manage extensions.',
            'Toggle Developer Mode on (top-right).',
            'Or open directly: chrome://extensions / edge://extensions / opera://extensions',
        ],
    },
    firefox: {
        title: 'For Firefox',
        steps: [
            'Open about:addons or mozilla://extensions.',
            'Enable Developer Mode in the settings or options menu.',
        ],
    },
    safari: {
        title: 'For Safari',
        steps: [
            'Please refer to your browser’s documentation to enable Developer Mode for extensions.',
        ],
    },
    default: {
        title: 'Browser Instructions',
        steps: [
            'Please refer to your browser’s documentation to enable Developer Mode for extensions.',
        ],
    },
};

function detectBrowser() {
    if (typeof navigator === 'undefined') return 'default';
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'firefox';
    if (ua.includes('Chrome') && !ua.includes('Edg') && !ua.includes('OPR'))
        return 'chrome';
    if (ua.includes('Edg')) return 'chrome';
    if (ua.includes('OPR') || ua.includes('Opera')) return 'chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
    return 'default';
}

const WarningBox = ({ children }: { children: React.ReactNode }) => (
    <div className='border border-yellow-400 p-4 text-yellow-400 rounded-md'>
        {children}
    </div>
);

export default function DeveloperModePage() {
    const [browser, setBrowser] =
        useState<keyof typeof instructions>('default');

    useEffect(() => {
        setBrowser(detectBrowser());
    }, []);

    const info = instructions[browser];

    return (
        <div className='max-w-3xl px-4 space-y-8'>
            <div className='space-y-4'>
                <h1 className='text-3xl font-bold'>Enable Developer Mode</h1>
                <p className='text-muted-foreground text-lg'>
                    Tampermonkey requires Developer Mode enabled to function
                    properly and allow installation of userscripts like SigMod
                    and SigFixes.
                </p>

                <div>
                    <h2 className='font-semibold text-xl mb-2'>{info.title}</h2>
                    <ol className='list-decimal list-inside space-y-2 text-base'>
                        {info.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>
                </div>

                <WarningBox>
                    <strong>Note:</strong> After enabling Developer Mode,
                    restart your browser to ensure Tampermonkey works correctly.
                </WarningBox>
            </div>

            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/tampermonkey'>
                        <ArrowLeft className='mr-1' />
                        Back
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/sigmod'>
                        Next
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
