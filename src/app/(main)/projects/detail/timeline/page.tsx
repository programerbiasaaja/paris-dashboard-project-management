import { Suspense } from "react";
import ProjectDetailClient from "../client";

export default function ProjectTimelinePage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Memuat data timeline...</div>}>
            <ProjectDetailClient defaultTab="timeline" />
        </Suspense>
    );
}

