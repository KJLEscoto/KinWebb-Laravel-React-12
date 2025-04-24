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
