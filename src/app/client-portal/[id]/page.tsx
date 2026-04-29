import { dummyProjects } from "@/app/(main)/projects/(list)/_components/_data";
import { dummyProjectDetail } from "@/app/(main)/projects/detail/_components/_data";
import ClientPortalClient from "@/app/client/projects/[id]/client";
import { notFound } from "next/navigation";

export default async function ClientPortalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const project = dummyProjects.find((p) => p.id === id);
    if (!project) notFound();

    // For demo purposes, all projects share the same phase/progress dataset.
    // In real usage this would be fetched per-project.
    const progress = dummyProjectDetail;

    return (
        <ClientPortalClient
            project={{
                id: project.id,
                name: project.name,
                clientName: project.client.name,
                picName: project.pic.name,
                province: project.province,
                city: project.city,
                startDate: project.startDate,
                endDate: project.endDate,
                status: project.status,
                accessCode: project.access_code,
                files: project.files,
            }}
            phases={progress.phases}
        />
    );
}
