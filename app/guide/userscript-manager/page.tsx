'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getTampermonkeyLink, detectBrowser } from '@/utils/getLink';
import { useEffect, useState } from 'react';

export default function UserscriptManagerPage() {
    const [browser, setBrowser] = useState<string | null>(null);
    const [link, setLink] = useState<string | null>(null);

    useEffect(() => {
        setLink(getTampermonkeyLink());
        setBrowser(detectBrowser());
    }, []);

    return (
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>
                    Install a userscript manager
                </h1>
                <p className='text-muted-foreground'>
                    To install and use scripts on websites, you need a
                    userscript manager.
                </p>
                <p>We recommend:</p>
                <ul className='list-disc pl-5'>
                    <li>Tampermonkey</li>
                    <li>Violentmonkey</li>
                    <li>Greasemonkey</li>
                </ul>
                <p>
                    In this guide, we'll use Tampermonkey. Click below to go to
                    the download page for your browser.
                </p>
                <Button className='my-4' variant='outline' asChild>
                    <Link href={link ?? '#'} target='_blank'>
                        Install Tampermonkey
                    </Link>
                </Button>
                <p>
                    Once installed, you’ll be ready to add userscripts like{' '}
                    <strong>SigMod</strong> and <strong>SigFixes</strong> in the
                    next step.
                </p>
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide'>
                        <ArrowLeft className='mr-1' />
                        Back
                    </Link>
                </Button>
                <Button asChild>
                    <Link
                        href={
                            browser === 'firefox'
                                ? '/guide/sigmod'
                                : '/guide/developer-mode'
                        }
                    >
                        Next
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
