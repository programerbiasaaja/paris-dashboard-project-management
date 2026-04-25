"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface ActionTooltipProps {
    label: string;
    children: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    className?: string;
}

export const ActionTooltip = ({ label, children, side, align, className }: ActionTooltipProps) => {
    return (
        <TooltipProvider delay={50}>
            <Tooltip>
                <TooltipTrigger>{children}</TooltipTrigger>
                <TooltipContent side={side} align={align} className={className}>
                    <p className="text-[0.675rem] font-normal text-gray-800">{label}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
