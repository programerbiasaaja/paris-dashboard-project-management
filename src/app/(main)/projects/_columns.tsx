import { ColumnDef } from "@tanstack/react-table";
import { EProjectStatus, EProjectVisibility, ProjectStatusLabels, ProjectVisibilityLabels } from "@/types/enums";
import { DetailButton } from "@/components/button-action";
import type { TProjectRow } from "./_data";

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

export const projectColumns: ColumnDef<TProjectRow>[] = [
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
        cell: ({ row }) => <DetailButton href={`/projects/detail?id=${row.original.id}`} tooltip="Lihat Detail" className="rounded-md" />,
    },
];
