'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function Providers({
    children,
    locale,
    messages,
    now,
}: {
    children: React.ReactNode;
    locale: string;
    messages?: Record<string, string | Record<string, string>>;
    now: Date;
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
                    now={now}
                >
                    {children}
                </NextIntlClientProvider>
            </ThemeProvider>
        </SessionProvider>
    );
}
