'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { sigfixLink } from '@/utils/getLink';

export default function SigFixesPage() {
    return (
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>Install SigFixes</h1>
                <p className='text-muted-foreground'>
                    Sigmally Fixes rewrites a large portion of Sigmally's
                    client, making it much faster and smoother. Made by yx.
                </p>
                <p className='mt-4'>Click below to install SigFixes</p>
                <Button variant='outline' className='my-5' asChild>
                    <Link href={sigfixLink} target='_blank'>
                        Install SigFixes
                    </Link>
                </Button>
                <p>
                    SigFixes includes plenty of settings for advanced players
                    like one-tab multiboxing, outlining unsplittable cells,
                    custom draw delay, text size, skins, and opacity.
                </p>
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/sigmod'>
                        <ArrowLeft className='mr-1' />
                        Back
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/end'>
                        End
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
