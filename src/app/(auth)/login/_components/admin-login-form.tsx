"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { ArrowRightIcon, LockKeyholeIcon, SmartphoneIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { UpdateSessionAction } from "@/actions/auth";
import { auth } from "@/config/firebase";
import { APIProvider } from "@/lib/api";
import { createSessionPayload } from "@/lib/session-payload";
import { ErrorMessage } from "@/lib/utils";
import type { ILoginResponse } from "@/types";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function GoogleIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
            <path
                d="M21.805 12.23c0-.79-.067-1.545-.209-2.273H12.24v4.303h5.35a4.58 4.58 0 0 1-1.983 3.004v2.493h3.212c1.88-1.73 2.986-4.278 2.986-7.527Z"
                fill="#4285F4"
            />
            <path
                d="M12.24 22c2.684 0 4.936-.889 6.58-2.413l-3.212-2.493c-.889.597-2.026.95-3.368.95-2.58 0-4.765-1.742-5.547-4.084H3.376v2.572A9.932 9.932 0 0 0 12.24 22Z"
                fill="#34A853"
            />
            <path d="M6.693 13.96a5.955 5.955 0 0 1 0-3.918V7.47H3.376a9.95 9.95 0 0 0 0 9.061l3.317-2.572Z" fill="#FBBC04" />
            <path
                d="M12.24 5.956c1.46 0 2.77.502 3.804 1.486l2.853-2.853C17.172 2.985 14.924 2 12.24 2a9.932 9.932 0 0 0-8.864 5.47l3.317 2.572c.782-2.342 2.967-4.086 5.547-4.086Z"
                fill="#EA4335"
            />
        </svg>
    );
}

const adminLoginSchema = z.object({
    phone: z
        .string()
        .min(1, "Nomor telepon wajib diisi.")
        .regex(/^(\+62|62|0)8[0-9]{8,13}$/, "Masukkan nomor telepon Indonesia yang valid."),
    password: z.string().min(1, "Password wajib diisi.").min(8, "Password minimal 8 karakter."),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

const AUTH_ROLE = "admin";

export function AdminLoginForm() {
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const form = useForm<AdminLoginFormValues>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            phone: "",
            password: "",
        },
        mode: "onSubmit",
    });

    const persistSession = async (result: { data: ILoginResponse }) => {
        await UpdateSessionAction(createSessionPayload(result.data));
    };

    const handlePhoneLogin = async (values: AdminLoginFormValues) => {
        try {
            const payload = {
                role: AUTH_ROLE,
                method: "password",
                phone: values.phone,
                password: values.password,
            };

            const result = await APIProvider(null).Endpoint("POST", "user", "/dashboard/auth/login").Data(payload).Result();
            if (result?.status === "error") {
                throw result;
            }

            await persistSession(result);

            toast.success("Berhasil", {
                description: "Berhasil login ke dashboard admin.",
            });

            router.push("/");
            router.refresh();
        } catch (error: unknown) {
            toast.error("Perhatian", {
                description: ErrorMessage(error),
            });
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setIsGoogleLoading(true);

            const provider = new GoogleAuthProvider();
            const googleSSO: { user: any } = await signInWithPopup(auth, provider);

            const payload = {
                role: AUTH_ROLE,
                method: "google",
                google_token: googleSSO?.user?.accessToken,
            };

            const result = await APIProvider(null).Endpoint("POST", "user", "/dashboard/auth/login").Data(payload).Result();

            if (result?.status === "error") {
                if (result?.error_message?.toLowerCase?.() === "account not found.") {
                    toast.error("Perhatian", {
                        description: "Akun Google ini belum terdaftar sebagai admin.",
                    });
                    return;
                }

                throw result;
            }

            await persistSession(result);

            toast.success("Berhasil", {
                description: "Berhasil login dengan Google.",
            });

            router.push("/");
            router.refresh();
        } catch (error: unknown) {
            console.error(error);
            toast.error("Perhatian", {
                description: ErrorMessage(error),
            });
        } finally {
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(handlePhoneLogin)}>
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground font-medium">Nomor Telepon</FormLabel>
                                <div className="relative">
                                    <SmartphoneIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                                    <FormControl>
                                        <Input
                                            type="tel"
                                            autoComplete="tel"
                                            placeholder="+62 812 3456 789"
                                            className="bg-muted/55 pl-9 shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between gap-3">
                                    <FormLabel className="text-foreground font-medium">Password</FormLabel>
                                </div>
                                <div className="relative">
                                    <LockKeyholeIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                                    <FormControl>
                                        <Input
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Masukkan password"
                                            className="bg-muted/55 pl-9 shadow-none"
                                            {...field}
                                        />
                                    </FormControl>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting || isGoogleLoading}>
                        Login
                        <ArrowRightIcon className="size-4" />
                    </Button>
                </form>
            </Form>

            <div className="relative py-1">
                <div className="bg-primary-100 absolute inset-x-0 top-1/2 h-px -translate-y-1/2" />
                <p className="text-muted-foreground relative mx-auto w-fit bg-white px-3 text-xs">atau</p>
            </div>

            <Button
                type="button"
                variant="outline"
                className="border-secondary-200 bg-secondary-50 text-tertiary-500 hover:bg-secondary-100 w-full font-medium"
                size="lg"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading || form.formState.isSubmitting}
            >
                <GoogleIcon />
                {isGoogleLoading ? "Memproses Google..." : "Masuk dengan Google"}
            </Button>
        </div>
    );
}
