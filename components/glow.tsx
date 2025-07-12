'use client';

import React from 'react';
import clsx from 'clsx';

type GlowProps = {
    glowColorVar?: string;
    blur?: string;
    width?: string;
    opacity?: number;
    height?: string;
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
    className?: string;
};

export function Glow({
    glowColorVar = '--glow',
    blur = '100px',
    width = '400px',
    height = '400px',
    opacity = 0.4,
    top,
    left,
    right,
    bottom,
    className,
}: GlowProps) {
    return (
        <div
            aria-hidden
            className={clsx(
                'pointer-events-none fixed z-[-1] rounded-full opacity-70',
                className
            )}
            style={{
                backgroundColor: `var(${glowColorVar})`,
                filter: `blur(${blur})`,
                opacity,
                width,
                height,
                top,
                left,
                right,
                bottom,
            }}
        />
    );
}
