"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export type TPlantingZone = {
    id: string;
    name: string;
    progress: number;
    plantedTrees: number;
    targetTrees: number;
    polygon: [number, number][];
    centroid: [number, number];
};

const zoneColor = (progress: number) => {
    if (progress >= 80) return "#16a34a";
    if (progress >= 50) return "#65a30d";
    if (progress >= 20) return "#ca8a04";
    return "#dc2626";
};

export default function PlantingAreaMap({
    zones,
    center,
}: {
    zones: TPlantingZone[];
    center: [number, number];
}) {
    useEffect(() => {
        // Default leaflet marker icons rely on file-relative URLs that break under bundlers.
        // Re-point them to the CDN so markers render without manual asset wiring.
        const proto = L.Icon.Default.prototype as unknown as { _getIconUrl?: () => string };
        delete proto._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        });
    }, []);

    return (
        <div className="border-border/70 relative h-[420px] w-full overflow-hidden rounded-lg border">
            <MapContainer center={center} zoom={14} scrollWheelZoom={false} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {zones.map((zone) => {
                    const color = zoneColor(zone.progress);
                    return (
                        <Polygon
                            key={zone.id}
                            positions={zone.polygon}
                            pathOptions={{ color, fillColor: color, fillOpacity: 0.35, weight: 2 }}
                        >
                            <Tooltip sticky>
                                <div className="text-xs font-medium">{zone.name}</div>
                                <div className="text-xs">Progres: {zone.progress}%</div>
                            </Tooltip>
                        </Polygon>
                    );
                })}
                {zones.map((zone) => (
                    <Marker key={`m-${zone.id}`} position={zone.centroid}>
                        <Popup>
                            <div className="space-y-1 text-xs">
                                <div className="font-semibold">{zone.name}</div>
                                <div>
                                    Progres: <span className="font-medium">{zone.progress}%</span>
                                </div>
                                <div>
                                    Bibit ditanam:{" "}
                                    <span className="font-medium">
                                        {zone.plantedTrees.toLocaleString("id-ID")} / {zone.targetTrees.toLocaleString("id-ID")}
                                    </span>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}
