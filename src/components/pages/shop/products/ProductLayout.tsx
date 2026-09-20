import React from 'react';

export default function ProductLayout({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}) {
    return (
        <div className='flex flex-col px-8 py-20 lg:px-24 text-left bg-secondary dark:bg-black/30 backdrop-blur-none lg:backdrop-blur-[4px] md:shadow-2xl shadow-blue-900/20 rounded-4xl inset-shadow-sm inset-shadow-white/10 border z-10'>
            <div className='absolute -inset-2 rounded-lg blur-none md:blur-lg bg-blue-500/2 pointer-events-none z-0' />

            <div className='flex flex-col mb-10 relative z-10'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-16 max-w-6xl mx-auto w-full'>
                    {left}
                    {right}
                </div>
            </div>
        </div>
    );
}
