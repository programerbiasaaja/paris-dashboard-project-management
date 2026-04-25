import type { Metadata } from "next";

import { BrandIconTextHorizontal } from "@/components/brand";
import { Card, CardContent } from "@/components/ui/card";
import { AdminLoginForm } from "./_components/admin-login-form";

export const metadata: Metadata = {
    title: "Admin Login",
    description: "Login admin UmrohQU.",
};

export default function AdminLoginPage() {
    return (
        <main className="from-primary-50 via-background to-secondary-50 flex min-h-screen items-center justify-center bg-linear-to-br px-4 py-10">
            <div className="w-full max-w-md space-y-8">
                <div className="space-y-4 text-center">
                    <div className="mx-auto w-fit">
                        <BrandIconTextHorizontal width={220} height={56} />
                    </div>
                </div>

                <Card className="border-primary-100 border bg-white py-0 shadow-[0_20px_50px_-30px_rgba(13,34,55,0.22)]">
                    <CardContent className="p-6 md:p-8">
                        <AdminLoginForm />
                    </CardContent>
                </Card>

                <div className="space-y-3 text-center">
                    <p className="text-muted-foreground text-sm">
                        Butuh Bantuan ?{" "}
                        <a
                            href="https://wa.me/6282127168854"
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary font-medium transition-colors hover:text-primary/80"
                        >
                            Hubungi System Administrator
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
