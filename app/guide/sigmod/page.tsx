'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { sigmodLink } from '@/utils/getLink';

export default function SigModPage() {
    return (
        <div className='max-w-3xl px-4 space-y-6'>
            <div className='space-y-2'>
                <h1 className='text-2xl font-semibold'>Install SigMod</h1>
                <p className='text-muted-foreground'>
                    Now that you have installed a userscript manager, it's time
                    to install SigMod. SigMod adds core features to your game:
                    macros, custom themes, advanced settings and more.
                </p>
                <p className='mt-3'>
                    Click below to install SigMod. In the popup you have to
                    click the <i>Install</i> button
                </p>
                <Button variant={'outline'} className='my-5' asChild>
                    <Link href={sigmodLink} target='_blank'>
                        Install SigMod
                    </Link>
                </Button>
                <p>
                    After installing, SigMod will automatically run on Sigmally.
                    You can customize it anytime in the in-game settings. If you
                    want to find out more about SigMod, you can check it out{' '}
                    <Link className='text-highlight' href={'/download/sigmod'}>
                        Here
                    </Link>
                    .
                </p>
            </div>
            <div className='flex justify-between'>
                <Button asChild>
                    <Link href='/guide/userscript-manager'>
                        <ArrowLeft className='mr-1' />
                        Back
                    </Link>
                </Button>
                <Button asChild>
                    <Link href='/guide/sigfixes'>
                        Next
                        <ArrowRight className='ml-1' />
                    </Link>
                </Button>
            </div>
        </div>
    );
}
