'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function Providers({
    children,
    locale,
    messages,
}: {
    children: React.ReactNode;
    locale: string;
    messages?: Record<string, string | Record<string, string>>;
}) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
            >
                <NextIntlClientProvider
                    locale={locale}
                    messages={messages}
                    timeZone={Intl.DateTimeFormat().resolvedOptions().timeZone}
                    now={new Date()}
                >
                    {children}
                </NextIntlClientProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
