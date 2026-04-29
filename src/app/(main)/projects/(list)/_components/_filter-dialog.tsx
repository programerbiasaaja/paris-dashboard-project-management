"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EProjectStatus, EProjectVisibility, ProjectStatusLabels, ProjectVisibilityLabels } from "@/types/enums";
import { emptyFilter, TFilterState } from "../client";

export function FilterDialog({
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
