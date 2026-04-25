"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { AdminRouteScaffold } from "@/components/dashboard/admin-route-scaffold";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "@/components/table/data-table";
import { DetailButton } from "@/components/button-action";
import { ColumnDef } from "@tanstack/react-table";
import { EProjectStatus, EProjectVisibility, ProjectStatusLabels, ProjectVisibilityLabels } from "@/types/enums";
import type { IProjectWithRelations } from "@/types/project";

// =====================================
// DUMMY DATA
// =====================================

const picList = [
    {
        id: "u1",
        name: "Akbar Anugrah",
        email: "akbar@paris.co.id",
        phone: 0,
        google_token: "",
        roleId: "r1",
        password: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
    },
    {
        id: "u2",
        name: "Syuhada Asdini",
        email: "syuhada@paris.co.id",
        phone: 0,
        google_token: "",
        roleId: "r1",
        password: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
    },
    {
        id: "u3",
        name: "Iska Gushilman",
        email: "iska@paris.co.id",
        phone: 0,
        google_token: "",
        roleId: "r1",
        password: "",
        createdAt: "",
        updatedAt: "",
        deleted: false,
    },
];

const dummyProjects: (IProjectWithRelations & { year: number; province: string; city: string })[] = [
    {
        id: "1",
        clientId: "c1",
        picId: "u1",
        name: "Survey Investigasi dan Desain Percetakan Sawah Sumatera Selatan",
        totalContractValue: 1_850_000_000,
        totalBudget: 1_600_000_000,
        totalCost: 820_000_000,
        startDate: "2025-01-15",
        endDate: "2025-12-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PUBLIC,
        access_code: "UNPAD-01",
        files: [],
        createdAt: "2025-01-15",
        updatedAt: "2025-04-10",
        deleted: false,
        year: 2025,
        province: "Sumatera Selatan",
        city: "Palembang",
        client: { id: "c1", name: "Universitas Padjadjaran", phone: 0, address: "Bandung", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[0],
    },
    {
        id: "2",
        clientId: "c2",
        picId: "u2",
        name: "Penyusunan Dokumen Feasibility Study Tambang Nikel Lingkup Lingkungan dan Sosial",
        totalContractValue: 3_200_000_000,
        totalBudget: 2_900_000_000,
        totalCost: 1_450_000_000,
        startDate: "2025-02-01",
        endDate: "2025-11-30",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "CSM-63",
        files: [],
        createdAt: "2025-02-01",
        updatedAt: "2025-04-15",
        deleted: false,
        year: 2025,
        province: "Sulawesi Tengah",
        city: "Morowali",
        client: { id: "c2", name: "PT Citra Silika Mallawa", phone: 0, address: "Jakarta", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[1],
    },
    {
        id: "3",
        clientId: "c3",
        picId: "u3",
        name: "Penyusunan UKL-UPL SPBU di Kabupaten Banyuasin",
        totalContractValue: 480_000_000,
        totalBudget: 420_000_000,
        totalCost: 310_000_000,
        startDate: "2025-03-10",
        endDate: "2025-09-30",
        status: EProjectStatus.DONE,
        visibility: EProjectVisibility.PUBLIC,
        access_code: "MAJ-64",
        files: [],
        createdAt: "2025-03-10",
        updatedAt: "2025-04-20",
        deleted: false,
        year: 2025,
        province: "Sumatera Selatan",
        city: "Banyuasin",
        client: { id: "c3", name: "PT Mulia Andhika Jaya", phone: 0, address: "Palembang", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[2],
    },
    {
        id: "4",
        clientId: "c4",
        picId: "u4",
        name: "Penyusunan Dokumen Feasibility Study Tambang Nikel Lingkup Lingkungan dan Sosial",
        totalContractValue: 3_400_000_000,
        totalBudget: 3_000_000_000,
        totalCost: 0,
        startDate: "2025-04-01",
        endDate: "2025-12-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "PUL-65",
        files: [],
        createdAt: "2025-04-01",
        updatedAt: "2025-04-21",
        deleted: false,
        year: 2025,
        province: "Sulawesi Tenggara",
        city: "Konawe",
        client: { id: "c4", name: "PT Prima Utama Lestari", phone: 0, address: "Makassar", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[0],
    },
    {
        id: "5",
        clientId: "c5",
        picId: "u5",
        name: "Penyusunan Dokumen Rencana Pascatambang",
        totalContractValue: 920_000_000,
        totalBudget: 800_000_000,
        totalCost: 750_000_000,
        startDate: "2025-01-20",
        endDate: "2025-08-31",
        status: EProjectStatus.DONE,
        visibility: EProjectVisibility.PUBLIC,
        access_code: "TJ-66",
        files: [],
        createdAt: "2025-01-20",
        updatedAt: "2025-04-18",
        deleted: false,
        year: 2025,
        province: "Kalimantan Timur",
        city: "Balikpapan",
        client: { id: "c5", name: "PT Tanur Jaya", phone: 0, address: "Balikpapan", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[1],
    },
    {
        id: "6",
        clientId: "c6",
        picId: "u6",
        name: "Survey dan Kajian Rencana Pelaksanaan Area Reklamasi Tambang Nikel",
        totalContractValue: 1_750_000_000,
        totalBudget: 1_500_000_000,
        totalCost: 400_000_000,
        startDate: "2025-05-01",
        endDate: "2025-12-31",
        status: EProjectStatus.HOLD,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "ASP-67",
        files: [],
        createdAt: "2025-05-01",
        updatedAt: "2025-04-22",
        deleted: false,
        year: 2025,
        province: "Sulawesi Tengah",
        city: "Morowali Utara",
        client: { id: "c6", name: "PT Anugerah Surya Pratama", phone: 0, address: "Sulawesi Tengah", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[2],
    },
    {
        id: "7",
        clientId: "c7",
        picId: "u7",
        name: "Kajian Alih Fungsi Lahan Pertanian Pangan Berkelanjutan (LP2B) Jalan Tol Sigli – Banda Aceh",
        totalContractValue: 4_200_000_000,
        totalBudget: 3_800_000_000,
        totalCost: 1_900_000_000,
        startDate: "2025-03-01",
        endDate: "2025-12-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "HK-68",
        files: [],
        createdAt: "2025-03-01",
        updatedAt: "2025-04-20",
        deleted: false,
        year: 2025,
        province: "Aceh",
        city: "Pidie",
        client: { id: "c7", name: "PT Hutama Karya (Persero)", phone: 0, address: "Jakarta", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[0],
    },
    {
        id: "8",
        clientId: "c8",
        picId: "u8",
        name: "Penyusunan Dokumen Rencana Reklamasi",
        totalContractValue: 1_100_000_000,
        totalBudget: 950_000_000,
        totalCost: 0,
        startDate: "2026-01-10",
        endDate: "2026-10-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "EPN-69",
        files: [],
        createdAt: "2026-01-10",
        updatedAt: "2026-04-01",
        deleted: false,
        year: 2026,
        province: "Kalimantan Tengah",
        city: "Kotawaringin Timur",
        client: { id: "c8", name: "PT Energy Persada Nusantara", phone: 0, address: "Jakarta", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[1],
    },
    {
        id: "9",
        clientId: "c1",
        picId: "u3",
        name: "Survey Investigasi dan Desain Percetakan Sawah Jambi dan Sumatera Selatan",
        totalContractValue: 2_100_000_000,
        totalBudget: 1_850_000_000,
        totalCost: 0,
        startDate: "2026-02-01",
        endDate: "2026-12-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PUBLIC,
        access_code: "UNPAD-70",
        files: [],
        createdAt: "2026-02-01",
        updatedAt: "2026-04-10",
        deleted: false,
        year: 2026,
        province: "Jambi",
        city: "Muaro Jambi",
        client: { id: "c1", name: "Universitas Padjadjaran", phone: 0, address: "Bandung", createdAt: "", updatedAt: "", deleted: false },
        pic: picList[2],
    },
    {
        id: "10",
        clientId: "c9",
        picId: "u2",
        name: "Penyusunan Feasibility Study dan Masterplan Kawasan Industri Nikel",
        totalContractValue: 6_500_000_000,
        totalBudget: 5_800_000_000,
        totalCost: 0,
        startDate: "2026-03-01",
        endDate: "2026-12-31",
        status: EProjectStatus.PROCESS,
        visibility: EProjectVisibility.PRIVATE,
        access_code: "BTIIG-71",
        files: [],
        createdAt: "2026-03-01",
        updatedAt: "2026-04-15",
        deleted: false,
        year: 2026,
        province: "Sulawesi Tengah",
        city: "Palu",
        client: {
            id: "c9",
            name: "Baoshuo Taman Industri Investment Grup (BTIIG)",
            phone: 0,
            address: "Jakarta",
            createdAt: "",
            updatedAt: "",
            deleted: false,
        },
        pic: picList[0],
    },
];

// =====================================
// HELPERS & COLUMNS
// =====================================

type TProjectRow = IProjectWithRelations & { year: number; province: string; city: string };

const statusVariantMap: Record<EProjectStatus, string> = {
    [EProjectStatus.PROCESS]: "bg-blue-100 text-blue-700",
    [EProjectStatus.HOLD]: "bg-amber-100 text-amber-700",
    [EProjectStatus.DONE]: "bg-green-100 text-green-700",
};

const visibilityVariantMap: Record<EProjectVisibility, string> = {
    [EProjectVisibility.PUBLIC]: "bg-emerald-100 text-emerald-700",
    [EProjectVisibility.PRIVATE]: "bg-slate-100 text-slate-600",
};

const columns: ColumnDef<TProjectRow>[] = [
    {
        accessorKey: "name",
        header: "Nama Proyek",
        cell: ({ getValue }) => <span className="line-clamp-2 max-w-xs font-medium">{getValue<string>()}</span>,
    },
    {
        id: "client",
        header: "Klien",
        cell: ({ row }) => <span className="text-muted-foreground line-clamp-2 max-w-xs">{row.original.client.name}</span>,
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
        cell: ({ row }) => <DetailButton href={`/projects/${row.original.id}`} tooltip="Lihat Detail" className="rounded-md" />,
    },
];

// =====================================
// FILTER DIALOG
// =====================================

type TFilterState = {
    status: string;
    visibility: string;
    year: string;
    pic: string;
};

const emptyFilter: TFilterState = { status: "", visibility: "", year: "", pic: "" };

function FilterDialog({
    open,
    onOpenChange,
    filter,
    onApply,
    picOptions,
    yearOptions,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    filter: TFilterState;
    onApply: (f: TFilterState) => void;
    picOptions: string[];
    yearOptions: number[];
}) {
    const [local, setLocal] = useState<TFilterState>(filter);

    function handleApply() {
        onApply(local);
        onOpenChange(false);
    }

    function handleReset() {
        setLocal(emptyFilter);
        onApply(emptyFilter);
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Filter Proyek</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Status</label>
                        <Select value={local.status} onValueChange={(v) => setLocal((p) => ({ ...p, status: v ?? "" }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(EProjectStatus).map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {ProjectStatusLabels[s]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Visibilitas</label>
                        <Select value={local.visibility} onValueChange={(v) => setLocal((p) => ({ ...p, visibility: v ?? "" }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semua Visibilitas" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(EProjectVisibility).map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {ProjectVisibilityLabels[v]}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Tahun</label>
                        <Select value={local.year} onValueChange={(v) => setLocal((p) => ({ ...p, year: v ?? "" }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semua Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {yearOptions.map((y) => (
                                    <SelectItem key={y} value={String(y)}>
                                        {y}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">PIC</label>
                        <Select value={local.pic} onValueChange={(v) => setLocal((p) => ({ ...p, pic: v ?? "" }))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Semua PIC" />
                            </SelectTrigger>
                            <SelectContent>
                                {picOptions.map((p) => (
                                    <SelectItem key={p} value={p}>
                                        {p}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button variant="ghost" size="sm" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button size="sm" onClick={handleApply}>
                        Terapkan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// =====================================
// MAIN CLIENT
// =====================================

export default function ProjectsClient() {
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

    return (
        <div className="flex flex-1 flex-col gap-6">
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
                        className="bg-white pl-9 text-sm"
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
                <Button onClick={() => setFilterOpen(true)} className="shrink-0 gap-1.5 rounded-md">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter
                    {activeFilterCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground ml-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </div>

            <DataTable
                columns={columns}
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
