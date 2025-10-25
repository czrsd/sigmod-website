'use client';
import { ThemeProvider } from 'next-themes';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

export function Providers({
    children,
    locale,
    messages,
}: {
    children: React.ReactNode;
    locale: string;
    messages?: Record<string, any>;
}) {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
            <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
            </NextIntlClientProvider>
        </ThemeProvider>
    );
}
