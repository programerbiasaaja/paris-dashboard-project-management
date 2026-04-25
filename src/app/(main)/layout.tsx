import type { ReactNode } from "react";

import { getSession } from "@/actions/auth";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function MainLayout({ children }: { children: ReactNode }) {
    const session = await getSession();

    return (
        <SidebarProvider defaultOpen>
            <AppSidebar session={session} />
            <SidebarInset className="min-w-0 overflow-x-hidden pt-18 md:pt-24">
                <AppTopbar session={session} />
                <div className="px-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
