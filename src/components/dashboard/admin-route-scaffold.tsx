import { Badge } from "@/components/ui/badge";

type AdminRouteScaffoldProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export function AdminRouteScaffold({ eyebrow, title, description }: AdminRouteScaffoldProps) {
    return (
        <div className="flex flex-1 flex-col">
            <section className="border-border/70 rounded-xl border bg-[linear-gradient(135deg,var(--color-primary-50),var(--background)_48%,var(--color-secondary-50))] p-5 shadow-sm dark:bg-[linear-gradient(135deg,var(--card),var(--background)_52%,var(--card))]">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="relative w-full space-y-3">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/10 absolute top-0 right-0 z-20">{eyebrow}</Badge>
                        <div className="space-y-1">
                            <h1 className="text-xl font-semibold tracking-tight text-balance">{title}</h1>
                            <p className="text-muted-foreground text-sm leading-3">{description}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
