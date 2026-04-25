"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectPage = ({ to = "/logout?session_invalid=true" }: { to?: string }) => {
    const router = useRouter();
    useEffect(() => {
        router.replace(to);
    }, [router, to]);

    return null;
};

export default RedirectPage;
