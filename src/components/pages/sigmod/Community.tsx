import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export function Community() {
    return (
        <section className='max-w-3xl mx-auto text-center space-y-6'>
            <h2 className='text-3xl font-semibold'>Join the Community</h2>
            <p className='text-muted-foreground max-w-prose mx-auto'>
                Need help, found a bug, or want to share your custom macros?
                Join the Discord and connect with other SigMod users.
            </p>
            <Button variant='outline' asChild>
                <Link href='https://discord.gg/QyUhvUC8AD' target='_blank'>
                    <MessageSquare className='inline mr-2' /> Join Discord
                </Link>
            </Button>
            <p className='text-muted-foreground text-sm'>
                Or explore the code on{' '}
                <Link
                    href='https://github.com/czrsd/sigmod'
                    target='_blank'
                    className='underline flex items-center justify-center gap-1'
                >
                    GitHub
                </Link>
            </p>
        </section>
    );
}
