import type { TPlantingZone } from "./PlantingAreaMap";

export type TPlantingPhoto = {
    id: string;
    url: string;
    caption: string;
    takenAt: string;
};

// Dummy planting zones around former coal mining area in Kutai Kartanegara, Kalimantan Timur.
export const plantingZones: TPlantingZone[] = [
    {
        id: "z1",
        name: "Zona A - Pit Utara",
        progress: 85,
        plantedTrees: 4250,
        targetTrees: 5000,
        centroid: [-0.4585, 117.1421],
        polygon: [
            [-0.4565, 117.1395],
            [-0.4560, 117.1450],
            [-0.4605, 117.1455],
            [-0.4610, 117.1400],
        ],
    },
    {
        id: "z2",
        name: "Zona B - Pit Selatan",
        progress: 55,
        plantedTrees: 2750,
        targetTrees: 5000,
        centroid: [-0.4655, 117.1480],
        polygon: [
            [-0.4630, 117.1455],
            [-0.4625, 117.1515],
            [-0.4680, 117.1520],
            [-0.4685, 117.1460],
        ],
    },
    {
        id: "z3",
        name: "Zona C - Buffer Timur",
        progress: 30,
        plantedTrees: 900,
        targetTrees: 3000,
        centroid: [-0.4585, 117.1525],
        polygon: [
            [-0.4565, 117.1495],
            [-0.4560, 117.1555],
            [-0.4605, 117.1560],
            [-0.4610, 117.1500],
        ],
    },
    {
        id: "z4",
        name: "Zona D - Riparian Sungai",
        progress: 15,
        plantedTrees: 360,
        targetTrees: 2400,
        centroid: [-0.4520, 117.1450],
        polygon: [
            [-0.4500, 117.1420],
            [-0.4495, 117.1485],
            [-0.4540, 117.1490],
            [-0.4545, 117.1425],
        ],
    },
];

export const plantingMapCenter: [number, number] = [-0.458, 117.146];

export const plantingPhotos: TPlantingPhoto[] = [
    {
        id: "p1",
        url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
        caption: "Penanaman bibit sengon di Zona A bersama tim lapangan.",
        takenAt: "2026-02-12",
    },
    {
        id: "p2",
        url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80",
        caption: "Persiapan lubang tanam dan pemberian pupuk dasar di Zona B.",
        takenAt: "2026-02-20",
    },
    {
        id: "p3",
        url: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=800&q=80",
        caption: "Distribusi bibit lokal (mahoni, trembesi) ke titik tanam.",
        takenAt: "2026-03-04",
    },
    {
        id: "p4",
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
        caption: "Monitoring tinggi tanaman umur 60 hari di Zona A.",
        takenAt: "2026-03-18",
    },
    {
        id: "p5",
        url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
        caption: "Seremonial penanaman perdana bersama Pemda Kutai Kartanegara.",
        takenAt: "2026-03-25",
    },
    {
        id: "p6",
        url: "https://images.unsplash.com/photo-1597673030062-0a0f6a541e6f?w=800&q=80",
        caption: "Supervisi manajemen dan koordinasi mingguan di basecamp lapangan.",
        takenAt: "2026-04-08",
    },
];
