"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function SurveyReviewsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Survei"
            title="Review Survei"
            description="Review dan verifikasi hasil survei lapangan, approve atau reject pengisian, dan pantau kelengkapan data."
        />
    );
}
