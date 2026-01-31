'use client';

import { useEffect } from 'react';

export default function AuthSuccessPage() {
    useEffect(() => {
        if (window.opener) {
            window.opener.postMessage('auth-success', window.location.origin);
            window.close();
        } else {
            window.location.href = '/';
        }
    }, []);

    return (
        <div className='flex items-center justify-center min-h-screen bg-black text-white'>
            <div className='text-center space-y-4'>
                <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500 mx-auto'></div>
                <h2 className='text-xl font-black uppercase italic tracking-tighter'>
                    Authenticating...
                </h2>
                <p className='text-neutral-500 text-sm'>
                    This window will close automatically.
                </p>
            </div>
        </div>
    );
}
