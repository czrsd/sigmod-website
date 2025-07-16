import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EndPage() {
    return (
        <div className='max-w-3xl px-4'>
            <h1 className='text-4xl font-extrabold mb-4'>Congrats! 🎉</h1>
            <p className='text-md mb-4'>
                You now have SigMod and SigFixes installed and are ready to play
                Sigmally. Feel free to explore all features of each mod to get
                the most out of your experience.
            </p>
            <div className='flex flex-col sm:flex-row gap-2'>
                <Button variant={'outline'} asChild>
                    <Link href={'https://one.sigmally.com/'} target='_blank'>
                        Play Sigmally
                    </Link>
                </Button>
                <Button variant={'outline'}>Explore features</Button>
            </div>
        </div>
    );
}
