"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useEncryptQuery } from "@/hooks/use-encrypt-query";
import { EncryptQuery } from "@/lib/encryption";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter as useNavigation } from "next/navigation";
import React, { ComponentProps, useEffect, useState } from "react";

interface InputSearchProps extends ComponentProps<"input"> {
    keyName?: string;
}

const InputSearch = ({ keyName = "search", placeholder = "Cari", ...props }: InputSearchProps) => {
    const navigation = useNavigation();
    const query = useEncryptQuery();
    const defaultValue = query?.search;

    // debounce search
    const [value, setValue] = useState<string>("");
    const debouncedValue = useDebounce<string>(value, 500);
    const [startDebounce, setStartDebounce] = React.useState(false);

    useEffect(() => {
        if (startDebounce) {
            navigation.push("?path=" + EncryptQuery({ ...query, ...(query?.page && { page: "0" }), [keyName]: value }), { scroll: false });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue]);

    return (
        <div className="relative w-full">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 bg-white" />
            <Input
                {...props}
                name={keyName}
                type="text"
                placeholder={placeholder}
                onChange={(event) => {
                    setStartDebounce(true);
                    setValue(event.target.value || "");
                }}
                className={cn("bg-white pl-9 font-normal text-gray-700", props.className)}
                defaultValue={defaultValue || props.defaultValue}
            />
        </div>
    );
};

export default InputSearch;
