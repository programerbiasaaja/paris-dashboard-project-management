"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EProjectVisibility, ProjectStatusOptions, ProjectVisibilityOptions } from "@/types/enums";
import { clientOptions, userOptions, type TProjectForm } from "./_schema";

export function StepDetail() {
    const form = useFormContext<TProjectForm>();
    const visibility = form.watch("detail.visibility");

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
                control={form.control}
                name="detail.name"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel aria-required>Nama Proyek</FormLabel>
                        <FormControl>
                            <Input placeholder="Misal: Rehab DAS Borneo Prima" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.clientId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel aria-required>Klien</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih klien">
                                        {clientOptions.find((c) => c.id === field.value)?.name}
                                    </SelectValue>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {clientOptions.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.picId"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel aria-required>PIC Proyek</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih PIC">
                                        {userOptions.find((u) => u.id === field.value)?.name}
                                    </SelectValue>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {userOptions.map((u) => (
                                    <SelectItem key={u.id} value={u.id}>
                                        {u.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.totalContractValue"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nilai Kontrak (Rp)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="0"
                                min={0}
                                value={field.value === 0 ? "" : field.value}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/^0+(?=\d)/, "");
                                    field.onChange(raw === "" ? 0 : Number(raw));
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.totalBudget"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Total Anggaran (Rp)</FormLabel>
                        <FormControl>
                            <Input
                                type="number"
                                placeholder="0"
                                min={0}
                                value={field.value === 0 ? "" : field.value}
                                onChange={(e) => {
                                    const raw = e.target.value.replace(/^0+(?=\d)/, "");
                                    field.onChange(raw === "" ? 0 : Number(raw));
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.startDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel aria-required>Tanggal Mulai</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="detail.endDate"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel aria-required>Tanggal Selesai</FormLabel>
                        <FormControl>
                            <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-3">
                <FormField
                    control={form.control}
                    name="detail.status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih status">
                                            {ProjectStatusOptions.find((o) => o.value === field.value)?.label}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {ProjectStatusOptions.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>
                                            {o.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="detail.visibility"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Visibilitas</FormLabel>
                            <Select value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih visibilitas">
                                            {ProjectVisibilityOptions.find((o) => o.value === field.value)?.label}
                                        </SelectValue>
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {ProjectVisibilityOptions.map((o) => (
                                        <SelectItem key={o.value} value={o.value}>
                                            {o.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="detail.access_code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel aria-required={visibility === EProjectVisibility.PRIVATE || undefined}>Kode Akses</FormLabel>
                            <FormControl>
                                <Input placeholder="Misal: UNPAD-01" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="detail.description"
                render={({ field }) => (
                    <FormItem className="md:col-span-2">
                        <FormLabel>Deskripsi</FormLabel>
                        <FormControl>
                            <Textarea rows={3} placeholder="Catatan singkat tentang proyek..." {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}
