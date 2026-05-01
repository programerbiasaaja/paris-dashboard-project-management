import { Suspense } from "react";
import ProjectDetailClient from "../client";

export default function ProjectPaymentPage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Memuat data pembayaran...</div>}>
            <ProjectDetailClient defaultTab="payment" />
        </Suspense>
    );
}

