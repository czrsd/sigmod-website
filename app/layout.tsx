import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
    title: 'SigMod',
    description: 'Official SigMod client website',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className='dark font-sans antialiased'>
                <Header />
                {children}
            </body>
        </html>
    );
}
