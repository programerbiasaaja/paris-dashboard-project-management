"use client";

import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";

export default function ClientsClient() {
    return (
        <AdminRouteScaffold
            eyebrow="Administrasi"
            title="Klien"
            description="Kelola profil perusahaan klien, kontrak kerja, kontak pengambil keputusan, dan histori proyek konsultasi."
        />
    );
}
