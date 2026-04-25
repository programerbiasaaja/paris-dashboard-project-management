import { LoaderIcon } from "lucide-react";
import { Suspense } from "react";
import LogoutClient from "./_client";

export default function Index() {
    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Suspense
                fallback={
                    <div className="flex flex-col items-center justify-center gap-1">
                        <LoaderIcon className="h-7 w-7 animate-spin" />
                        <h1>Mohon Tunggu</h1>
                    </div>
                }
            >
                <LogoutClient />
            </Suspense>
        </div>
    );
}
