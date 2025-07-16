import '../globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import { PageWrapper } from '@/components/PageWrapper';

export const metadata: Metadata = {
    title: 'SigModz',
    description: 'Download mods for Sigmally',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='dark overflow-x-hidden'>
                <Header />
                <PageWrapper>{children}</PageWrapper>
            </body>
        </html>
    );
}
