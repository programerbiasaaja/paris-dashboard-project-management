"use client";

import { useState, useMemo } from "react";
import { PlusIcon, Search, SlidersHorizontal, X } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/table/data-table";
import { ClientButton, DetailButton } from "@/components/button-action";
import { EProjectStatus, EProjectVisibility, ProjectStatusLabels, ProjectVisibilityLabels } from "@/types/enums";
import { dummyProjects } from "./_components/_data";
import type { TProjectRow } from "./_components/_data";
import { FilterDialog } from "./_components/_filter-dialog";
import { useRouter } from "next/navigation";

export type TFilterState = {
    status: string;
    visibility: string;
    year: string;
    pic: string;
};

export const emptyFilter: TFilterState = { status: "", visibility: "", year: "", pic: "" };

const statusVariantMap: Record<EProjectStatus, string> = {
    [EProjectStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [EProjectStatus.HOLD]: "bg-amber-100 text-amber-700",
    [EProjectStatus.DONE]: "bg-green-100 text-green-700",
};

const visibilityVariantMap: Record<EProjectVisibility, string> = {
    [EProjectVisibility.PUBLIC]: "bg-emerald-100 text-emerald-700",
    [EProjectVisibility.PRIVATE]: "bg-slate-100 text-slate-600",
};

export default function ProjectsClient() {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [filterOpen, setFilterOpen] = useState(false);
    const [filter, setFilter] = useState<TFilterState>(emptyFilter);
    const picOptions = useMemo(() => [...new Set(dummyProjects.map((p) => p.pic.name))].sort(), []);
    const yearOptions = useMemo(() => [...new Set(dummyProjects.map((p) => p.year))].sort(), []);
    const activeFilterCount = Object.values(filter).filter(Boolean).length;

    const filtered = useMemo(() => {
        return dummyProjects.filter((p) => {
            const q = search.toLowerCase();
            const matchSearch =
                !q || p.name.toLowerCase().includes(q) || p.client.name.toLowerCase().includes(q) || p.pic.name.toLowerCase().includes(q);
            const matchStatus = !filter.status || p.status === filter.status;
            const matchVisibility = !filter.visibility || p.visibility === filter.visibility;
            const matchYear = !filter.year || p.year === Number(filter.year);
            const matchPic = !filter.pic || p.pic.name === filter.pic;
            return matchSearch && matchStatus && matchVisibility && matchYear && matchPic;
        });
    }, [search, filter]);

    const attribute = {
        page: 0,
        size: filtered.length,
        total_pages: 1,
        total_items: filtered.length,
    };

    const projectColumns: ColumnDef<TProjectRow>[] = [
        {
            accessorKey: "name",
            header: "Nama Proyek",
            cell: ({ getValue }) => <span className="line-clamp-2 max-w-xs font-medium">{getValue<string>()}</span>,
        },
        {
            id: "client",
            header: "Klien",
            cell: ({ row }) => <span className="text-muted-foreground line-clamp-2 max-w-[200px]">{row.original.client.name}</span>,
        },
        {
            id: "pic",
            header: "PIC",
            cell: ({ row }) => <span className="whitespace-nowrap">{row.original.pic.name}</span>,
        },
        {
            accessorKey: "year",
            header: "Tahun",
            cell: ({ getValue }) => <span className="whitespace-nowrap">{getValue<number>()}</span>,
        },
        {
            id: "location",
            header: "Lokasi",
            cell: ({ row }) => (
                <div className="whitespace-nowrap">
                    <div className="text-sm">{row.original.city}</div>
                    <div className="text-muted-foreground text-xs">{row.original.province}</div>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ getValue }) => {
                const status = getValue<EProjectStatus>();
                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariantMap[status]}`}>
                        {ProjectStatusLabels[status]}
                    </span>
                );
            },
        },
        {
            accessorKey: "visibility",
            header: "Visibilitas",
            cell: ({ getValue }) => {
                const vis = getValue<EProjectVisibility>();
                return (
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${visibilityVariantMap[vis]}`}>
                        {ProjectVisibilityLabels[vis]}
                    </span>
                );
            },
        },
        {
            id: "aksi",
            header: "Aksi",
            cell: ({ row }) => (
                <div className="flex items-center gap-1.5">
                    <DetailButton href={`/projects/detail?id=${row.original.id}`} tooltip="Lihat Detail" className="rounded-md" />
                    <ClientButton href={`/client-portal/${row.original.id}`} tooltip="Portal Klien" className="rounded-md" />
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-4">
            <AdminRouteScaffold
                eyebrow="Manajemen Proyek"
                title="Proyek"
                description="Kelola daftar proyek, nilai kontrak, anggaran, status, PIC, dan dokumen pendukung."
            />

            {/* Toolbar — outside the table card */}
            <div className="flex items-center justify-between gap-3">
                <div className="relative w-full max-w-xs">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input
                        placeholder="Cari proyek, klien, atau PIC…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-primary-300 bg-white pl-9 text-sm"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                            aria-label="Hapus pencarian"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => setFilterOpen(true)}>
                        <SlidersHorizontal className="h-4 w-4" />
                        Filter
                        {activeFilterCount > 0 && (
                            <Badge className="bg-primary text-primary-foreground ml-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]">
                                {activeFilterCount}
                            </Badge>
                        )}
                    </Button>
                    <Button onClick={() => router.push("/projects/management")}>
                        <PlusIcon /> Tambah Proyek
                    </Button>
                </div>
            </div>

            <DataTable
                columns={projectColumns}
                data={filtered}
                attribute={attribute}
                customPagination={true}
                customEmptyMessage="Tidak ada proyek yang sesuai dengan pencarian atau filter."
            />

            <FilterDialog
                open={filterOpen}
                onOpenChange={setFilterOpen}
                filter={filter}
                onApply={setFilter}
                picOptions={picOptions}
                yearOptions={yearOptions}
            />
        </div>
    );
}
