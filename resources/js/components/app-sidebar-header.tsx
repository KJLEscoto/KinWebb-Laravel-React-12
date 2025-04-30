import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { getFormattedTime, getFormattedDate } from '@/lib/utils';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { CalendarFold, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const [time, setTime] = useState("");
    const [dateToday, setDateToday] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(getFormattedTime());
            setDateToday(getFormattedDate());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <header className="border-sidebar-border/50 flex h-16 shrink-0 items-center gap-2 border-b px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className='w-full flex items-center justify-between gap-5'>
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className='text-sm tracking-wider flex items-center gap-2.5 opacity-70'>
                    <section className='flex items-center gap-1'>
                        <CalendarFold className='size-4' />
                        <p> {dateToday}</p>
                    </section>
                    |
                    <section className='flex items-center gap-1'>
                        <Timer className='size-4' />
                        <p> {time}</p>
                    </section>
                </div>
            </div>
        </header>
    );
}
