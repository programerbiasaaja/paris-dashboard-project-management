"use client";

import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const ErrorPage = ({ error }: { error: any }) => {
    const router = useRouter();

    return (
        <div className="flex h-[calc(100vh-140px)] w-full flex-col items-center justify-center gap-3 bg-white px-4 md:px-24">
            <Image priority src="/assets/server-error.svg" alt="Technical Issue" width={200} height={200} />
            <p className="max-w-lg text-center text-xs font-light text-gray-800 lg:text-sm">
                Sorry, there where some technical issues while processing your request
            </p>
            <p className="max-w-xl text-center text-xs font-light text-gray-800 lg:text-sm">[{error?.error_message || error?.message}]</p>
            <div className="flex items-center gap-2">
                <Button variant="link" onClick={() => router.back()}>
                    <ArrowLeftIcon className="mr-2 h-4 w-4 underline" /> Kembali
                </Button>
            </div>
        </div>
    );
};

export default ErrorPage;
