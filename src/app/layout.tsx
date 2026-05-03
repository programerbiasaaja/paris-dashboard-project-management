import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LoaderProvider, LoadingProvider } from "@/provider/loader-provider";
import { ModalProvider } from "@/provider/modal-provider";
import NextProgressProviders from "@/provider/nprogress";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "PARIS Dashboard",
    description: "A project management web application for PARIS (PT Padu Riset Nusantara), a management consulting company.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
            <body className="flex min-h-full flex-col">
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
                    <NextProgressProviders>
                        <LoadingProvider>
                            <LoaderProvider>
                                <TooltipProvider>
                                    {children}
                                    <Toaster
                                        closeButton
                                        position="bottom-right"
                                        duration={10000}
                                        toastOptions={{
                                            classNames: {
                                                success: "!bg-green-700 text-white! !border-0",
                                                warning: "!bg-orange-500 text-white! !border-0",
                                                error: "!bg-red-700 text-white! !border-0",
                                                closeButton: "!bg-gray-200 text-black! !border-0",
                                            },
                                        }}
                                    />
                                    <ModalProvider />
                                    {process.env.NEXT_PUBLIC_APP_VERSION && (
                                        <div className="text-muted-foreground pointer-events-none fixed right-4 bottom-2 z-50 text-[10px]">
                                            {process.env.NEXT_PUBLIC_APP_VERSION}
                                        </div>
                                    )}
                                </TooltipProvider>
                            </LoaderProvider>
                        </LoadingProvider>
                    </NextProgressProviders>
                </ThemeProvider>
            </body>
        </html>
    );
}
