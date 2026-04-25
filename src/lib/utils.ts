import { clsx, type ClassValue } from "clsx";
import moment from "moment-timezone";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function qs(query: Record<string, string>) {
    const newQuery = new URLSearchParams(query).toString();
    return newQuery;
}

/**
 * @function ErrorMessage
 * Mengekstrak pesan error dari objek error yang diberikan
 * @param error objek error (any)
 */
export const ErrorMessage = (error: any): string => {
    return error?.error_message || error?.message || "Terjadi Kesalahan tidak dapat memproses data. Mohon ulangi beberapa saat lagi.";
};

/**
 * @function convertToNumber
 * Mengubah string (dengan format ribuan/desimal) menjadi number.
 * Mendukung format desimal titik (.) atau koma (,) secara otomatis.
 * @param val nilai input yang akan dikonversi
 */
export const convertToNumber = (val: string | number | undefined | null): number => {
    if (val === null || val === undefined) return 0;
    if (typeof val === "number") return val;

    // Remove any characters that are not digits, decimal points, or minus signs
    // This handles cases like "1.000,00" (Indonesian) or "1,000.00" (US)
    // by stripping separators and keeping the last separator if it looks like a decimal
    const sanitized = val.toString().replace(/[^0-9.,-]/g, "");

    // If there are both dots and commas, assume the last one is the decimal separator
    // and the others are thousand separators.
    const lastDot = sanitized.lastIndexOf(".");
    const lastComma = sanitized.lastIndexOf(",");

    let normalized = sanitized;
    if (lastDot !== -1 && lastComma !== -1) {
        if (lastDot > lastComma) {
            // Dot is decimal, remove commas
            normalized = sanitized.replace(/,/g, "");
        } else {
            // Comma is decimal, remove dots, then replace comma with dot
            normalized = sanitized.replace(/\./g, "").replace(/,/g, ".");
        }
    } else if (lastComma !== -1) {
        // Only comma exists. If it's near the end (1-3 digits), it might be a decimal.
        // But in many contexts (like ID money), it's a decimal.
        // Let's assume comma is decimal if it's the only separator.
        normalized = sanitized.replace(/,/g, ".");
    }

    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : num;
};

/**
 * @function formatMomentTimeZone
 * Generate / format tanggal dengan opsi timezone browser
 * @param date tanggal input (Date atau string), default sekarang
 * @param useBrowserTimezone apakah menyesuaikan timezone browser
 * @param format string format output Moment.js, default ISO-like
 */
export const formatMomentTimeZone = (date: Date | string = new Date(), useBrowserTimezone = true, format = "DD-MMM-YYYY HH:mm:ss") => {
    let m = moment(date);

    if (useBrowserTimezone) {
        try {
            const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (moment.tz.zone(tz)) {
                m = m.tz(tz);
            }
        } catch {}
    }

    return m.format(format);
};

/**
 * @function makeid
 * Generate random string sepanjang 5 karakter
 */
export function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function createSelectFromType(type: Record<string, string>) {
    return Object.entries(type).map(([key, value]) => ({
        value: key,
        label: value,
    }));
}

export const getNameFile = (url: string) => {
    const arr = url?.split("/");
    const lastArr = arr[arr.length - 1];

    return lastArr;
};

function formatRupiah(value: number) {
    if (value === 0) return "-";
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}
