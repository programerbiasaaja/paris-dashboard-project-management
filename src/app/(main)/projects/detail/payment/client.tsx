"use client";

import { useMemo } from "react";
import { CheckCircle2, Clock, AlertTriangle, CircleDashed, Wallet, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { dummyProjectDetail, PaymentStatusLabels, PaymentTermTypeLabels, type IProjectPayment, type TPaymentStatus } from "../_components/_data";

const statusVariantMap: Record<TPaymentStatus, string> = {
    PAID: "bg-green-100 text-green-700",
    PARTIAL: "bg-blue-100 text-blue-700",
    UNPAID: "bg-slate-100 text-slate-600",
    OVERDUE: "bg-red-100 text-red-700",
};

const statusIconMap: Record<TPaymentStatus, React.ReactNode> = {
    PAID: <CheckCircle2 className="h-3.5 w-3.5" />,
    PARTIAL: <Clock className="h-3.5 w-3.5" />,
    UNPAID: <CircleDashed className="h-3.5 w-3.5" />,
    OVERDUE: <AlertTriangle className="h-3.5 w-3.5" />,
};

function formatIDR(value: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(value);
}

function formatDate(value: string | null) {
    if (!value) return "—";
    return new Date(value).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function ProjectPaymentClient() {
    const { totalContractValue, payments } = dummyProjectDetail;

    const summary = useMemo(() => {
        const billed = payments.reduce((sum, p) => sum + p.amount, 0);
        const paid = payments.reduce((sum, p) => sum + p.paidAmount, 0);
        const outstanding = billed - paid;
        const paidPct = billed > 0 ? Math.round((paid / billed) * 100) : 0;
        return { billed, paid, outstanding, paidPct };
    }, [payments]);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryCard
                    icon={<FileText className="h-4 w-4" />}
                    label="Nilai Kontrak"
                    value={formatIDR(totalContractValue)}
                    accent="text-slate-700"
                />
                <SummaryCard icon={<Wallet className="h-4 w-4" />} label="Total Tertagih" value={formatIDR(summary.billed)} accent="text-blue-700" />
                <SummaryCard
                    icon={<CheckCircle2 className="h-4 w-4" />}
                    label="Telah Diterima"
                    value={formatIDR(summary.paid)}
                    accent="text-green-700"
                    sub={`${summary.paidPct}% dari tagihan`}
                />
                <SummaryCard
                    icon={<AlertTriangle className="h-4 w-4" />}
                    label="Outstanding"
                    value={formatIDR(summary.outstanding)}
                    accent="text-amber-700"
                />
            </div>

            <Card className="p-0">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-muted-foreground border-b bg-gray-50 text-left text-xs font-medium">
                                    <th className="px-4 py-3">Termin</th>
                                    <th className="px-4 py-3">Deskripsi</th>
                                    <th className="px-4 py-3 text-right">Persen</th>
                                    <th className="px-4 py-3 text-right">Jumlah</th>
                                    <th className="px-4 py-3 text-right">Diterima</th>
                                    <th className="px-4 py-3">No. Invoice</th>
                                    <th className="px-4 py-3">Jatuh Tempo</th>
                                    <th className="px-4 py-3">Tgl Bayar</th>
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((p, i) => (
                                    <PaymentRow key={p.id} payment={p} alt={i % 2 === 0} />
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t bg-gray-50 text-sm font-semibold">
                                    <td className="px-4 py-3" colSpan={3}>
                                        Total
                                    </td>
                                    <td className="px-4 py-3 text-right">{formatIDR(summary.billed)}</td>
                                    <td className="px-4 py-3 text-right text-green-700">{formatIDR(summary.paid)}</td>
                                    <td className="px-4 py-3" colSpan={4} />
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SummaryCard({ icon, label, value, sub, accent }: { icon: React.ReactNode; label: string; value: string; sub?: string; accent: string }) {
    return (
        <Card className="p-0">
            <CardContent className="p-4">
                <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    {icon}
                    <span>{label}</span>
                </div>
                <div className={`mt-2 text-lg font-semibold ${accent}`}>{value}</div>
                {sub && <div className="text-muted-foreground mt-1 text-xs">{sub}</div>}
            </CardContent>
        </Card>
    );
}

function PaymentRow({ payment, alt }: { payment: IProjectPayment; alt: boolean }) {
    return (
        <tr className={alt ? "bg-gray-50/50" : "bg-white"}>
            <td className="px-4 py-3 align-top">
                <div className="font-medium">Termin {payment.termNo}</div>
                <div className="text-muted-foreground text-xs">{PaymentTermTypeLabels[payment.termType]}</div>
            </td>
            <td className="px-4 py-3 align-top">
                <div className="max-w-sm text-sm">{payment.description}</div>
                {payment.notes && <div className="text-muted-foreground mt-1 text-xs italic">{payment.notes}</div>}
            </td>
            <td className="px-4 py-3 text-right align-top whitespace-nowrap">{payment.percentage}%</td>
            <td className="px-4 py-3 text-right align-top whitespace-nowrap">{formatIDR(payment.amount)}</td>
            <td className="px-4 py-3 text-right align-top whitespace-nowrap text-green-700">{formatIDR(payment.paidAmount)}</td>
            <td className="px-4 py-3 align-top text-xs whitespace-nowrap">{payment.invoiceNo}</td>
            <td className="px-4 py-3 align-top whitespace-nowrap">{formatDate(payment.dueDate)}</td>
            <td className="px-4 py-3 align-top whitespace-nowrap">{formatDate(payment.paidDate)}</td>
            <td className="px-4 py-3 align-top">
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusVariantMap[payment.status]}`}>
                    {statusIconMap[payment.status]}
                    {PaymentStatusLabels[payment.status]}
                </span>
            </td>
        </tr>
    );
}
