'use client';

import { Toaster } from 'sonner';
import { useEffect } from 'react';

export function ToasterConfig() {
    useEffect(() => {
        // Force correct positioning after component mounts
        const fixToasterPosition = () => {
            const toaster = document.querySelector('[data-sonner-toaster]') as HTMLElement;
            if (toaster) {
                toaster.style.position = 'fixed';
                toaster.style.bottom = '12px';
                toaster.style.right = '12px';
                toaster.style.left = 'auto';
                toaster.style.top = 'auto';
                toaster.style.transform = 'none';
                toaster.style.zIndex = '9999';
            }
        };

        // Run immediately
        fixToasterPosition();

        // Also run after a short delay to ensure it's applied
        const timer = setTimeout(fixToasterPosition, 100);

        // Set up a MutationObserver to fix position whenever toast appears
        const observer = new MutationObserver(fixToasterPosition);
        const body = document.body;
        if (body) {
            observer.observe(body, { childList: true, subtree: true });
        }

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    return (
        <Toaster
            theme="dark"
            position="bottom-right"
            offset={0}
            toastOptions={{
                style: {
                    background: 'rgba(20, 20, 20, 0.9)',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
                className: "!w-auto !min-w-[150px] !max-w-[250px] !p-3 !text-xs",
            }}
        />
    );
}
