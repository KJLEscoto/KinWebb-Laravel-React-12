import dayjs from 'dayjs';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getFormattedTime(timeZone: string = "Asia/Manila"): string {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone,
    };
    const formatter = new Intl.DateTimeFormat("en-PH", options);
    return formatter.format(date);
}

export function getFormattedDate(timeZone: string = "Asia/Manila"): string {
    const date = new Date();

    const weekdayFormatter = new Intl.DateTimeFormat("en-PH", {
        weekday: "short",
        timeZone,
    });

    const dateFormatter = new Intl.DateTimeFormat("en-PH", {
        month: "short",
        day: "2-digit",
        timeZone,
    });

    const weekday = weekdayFormatter.format(date).toUpperCase();
    const formattedDate = dateFormatter.format(date);

    return `${formattedDate} [${weekday}]`;
}

export function formatDateRange(started: string, ended: string | null): string {
    const startFormatted = dayjs(started).format('MMM YYYY');
    const endFormatted = ended ? dayjs(ended).format('MMM YYYY') : 'Present';
    return `${startFormatted} – ${endFormatted}`;
}

export function slugify(text: string): string {
    return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-'); // replaces spaces and non-word characters with hyphens
}

export function techLogo(name: any): any {
    return name.logo.startsWith('techstack') ? `/storage/${name.logo}` : name.logo;
}

export function socialsLogo(role: string, logo: any): any {
    if (role === 'admin') {
        return logo.logo.startsWith('socials') ? `/storage/${logo.logo}` : logo.logo;
    } else {
        return logo.startsWith('socials') ? `/storage/${logo}` : logo;
    }
}

export function filterByType(items: any[], type: string): any[] {
    return items.filter(item => item.type === type);
}

// export function getJobStatusColor(status: string): string {
//     if (status == 'Available') {
//         return '#22C55E';
//     } else if (status == 'On Duty') {
//         return '#3B82F6';
//     } else if (status == 'On Leave') {
//         return '#EF4444';
//     } else {
//         return '#FFFFFF';
//     }
// }

export function highlightText(text: string, highlight: string | null): string {
    if (!text || !highlight) return text;
    const regex = new RegExp(`\\b${highlight}\\b`, 'gi');
    return text.replace(regex, `<span class="text-white italic mx-1">${highlight}</span>`);
}