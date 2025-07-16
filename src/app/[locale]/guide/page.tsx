import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function GuideOverview() {
    return (
        <section className='max-w-3xl px-4'>
            <h1 className='text-4xl font-extrabold mb-4'>Getting Started</h1>
            <p className='text-md mb-4'>
                Welcome to SigMod. This guide will help you install everything
                needed for the best Sigmally experience — fast, smooth, and
                fully customized.
            </p>
            <p className='text-md mb-8'>
                You'll get access to features like macros, themes, FPS boosts,
                and more. All in just a few simple steps.
            </p>

            <div className='space-x-3 mt-10'>
                <Button asChild>
                    <Link href='/guide/userscript-manager'>
                        Start Installation
                        <ArrowRight />
                    </Link>
                </Button>

                <Button variant={'outline'} asChild>
                    <Link href='/quick-guide'>Quick guide</Link>
                </Button>
            </div>
        </section>
    );
}
