"use client";
import { useEffect } from "react";

import { LogoutAction } from "@/actions/auth";
import useSearchParamsEntries from "@/hooks/use-search-params";
import { useRouter as useNavigation } from "next/navigation";

const LogoutClient = () => {
    const navigation = useNavigation();
    const { session_invalid } = useSearchParamsEntries();

    useEffect(() => {
        async function fea() {
            await LogoutAction();
            if (session_invalid) {
                navigation.push("/login?session_invalid=true");
            } else {
                navigation.push("/login");
            }
        }

        fea();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div></div>;
};

export default LogoutClient;
