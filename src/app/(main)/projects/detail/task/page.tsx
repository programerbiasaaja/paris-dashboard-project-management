import { Suspense } from "react";
import ProjectDetailClient from "../client";

export default function ProjectTaskPage() {
    return (
        <Suspense fallback={<div className="flex h-[50vh] items-center justify-center">Memuat data tugas...</div>}>
            <ProjectDetailClient defaultTab="task" />
        </Suspense>
    );
}

