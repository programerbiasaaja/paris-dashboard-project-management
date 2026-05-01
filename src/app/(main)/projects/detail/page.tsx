import { Suspense } from "react";
import ProjectDetailClient from "./client";

export default function ProjectDetailPage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Memuat detail proyek...</div>}>
            <ProjectDetailClient defaultTab="payment" />
        </Suspense>
    );
}

