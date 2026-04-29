import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { CheckCircle2Icon, EditIcon, EyeIcon, LucideIcon, Trash2Icon, Users2Icon, XCircleIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

type CommonProps = {
    tooltip?: string;
    href?: string;
    icon: LucideIcon;
    variant: ComponentProps<typeof Button>["variant"];
    size?: ComponentProps<typeof Button>["size"];
    className?: string;
} & Omit<ComponentProps<"button">, "size">;

function IconActionButton({ icon: Icon, tooltip, href, variant, size = "icon", ...props }: CommonProps) {
    const button = (
        <Button variant={variant} size={size} render={href ? <Link href={href} /> : undefined} nativeButton={!href} {...props}>
            <Icon />
        </Button>
    );

    if (!tooltip) return button;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger render={button} />
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}

export const EditButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={EditIcon} variant="outline" className="[&_svg]:text-primary" tooltip={props.tooltip ?? "Ubah"} />
);

export const DeleteButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={Trash2Icon} variant="destructive" tooltip={props.tooltip ?? "Hapus"} />
);

export const DetailButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={EyeIcon} variant="default" tooltip={props.tooltip ?? "Detail"} />
);

export const ClientButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton
        {...props}
        icon={Users2Icon}
        variant="outline"
        className="[&_svg]:text-secondary border-secondary"
        tooltip={props.tooltip ?? "Portal Klien"}
    />
);

export const ApproveButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={CheckCircle2Icon} variant="default" tooltip={props.tooltip ?? "Setujui"} />
);
export const RejectButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={XCircleIcon} variant="destructive" tooltip={props.tooltip ?? "Tolak"} />
);
