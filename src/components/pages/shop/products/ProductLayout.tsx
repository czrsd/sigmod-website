import React from 'react';

export default function ProductLayout({
    left,
    right,
}: {
    left: React.ReactNode;
    right: React.ReactNode;
}) {
    return (
        <div className='flex flex-col mb-10'>
            <div className='flex flex-col px-8 py-20 lg:px-24 text-left bg-secondary dark:bg-neutral-900 rounded-2xl border'>
                <div className='flex flex-col lg:flex-row justify-between items-center gap-16 max-w-6xl mx-auto w-full'>
                    {left}
                    {right}
                </div>
            </div>
        </div>
    );
}
