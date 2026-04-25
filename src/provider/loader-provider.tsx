"use client";

import Loader from "@/components/loader";
import { createContext, useContext, useState } from "react";

interface LoadingContextType {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
};

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setIsLoading] = useState(false);

    return <LoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</LoadingContext.Provider>;
};

export const LoaderProvider = ({ children }: { children: React.ReactNode }) => {
    const { isLoading } = useLoading();

    return (
        <>
            {isLoading && <Loader />}
            {children}
        </>
    );
};
