"use client";

import { ProgressProvider } from "@bprogress/next/app";

const NextProgressProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ProgressProvider height="4px" color="#2563eb" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressProvider>
    );
};

export default NextProgressProviders;
