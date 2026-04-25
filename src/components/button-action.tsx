import { Button } from "@/components/ui/button";
import { CheckCircle2Icon, EditIcon, EyeIcon, LucideIcon, Trash2Icon, XCircleIcon } from "lucide-react";
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
    return (
        <Button variant={variant} size={size} tooltip={tooltip} render={href ? <Link href={href} /> : undefined} {...props}>
            <Icon />
        </Button>
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

export const ApproveButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={CheckCircle2Icon} variant="default" tooltip={props.tooltip ?? "Setujui"} />
);
export const RejectButton = (props: Omit<CommonProps, "icon" | "variant">) => (
    <IconActionButton {...props} icon={XCircleIcon} variant="destructive" tooltip={props.tooltip ?? "Tolak"} />
);
