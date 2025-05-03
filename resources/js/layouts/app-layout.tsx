import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Flash, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast, Toaster } from 'sonner';
import { useFlashToast } from '@/hooks/use-flash-toast';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    useFlashToast();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster className='!z-50' position={'top-right'} richColors />
        </AppLayoutTemplate>
    )
};
