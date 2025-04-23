import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Flash, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';
import { toast, Toaster } from 'sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { flash } = usePage<{ flash: Flash }>().props;

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.update) {
            toast.info(flash.update);
        }
        if (flash.warning) {
            toast.warning(flash.warning);
        }
        if (flash.info) {
            toast.info(flash.info);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            {children}
            <Toaster position={'top-right'} richColors />
        </AppLayoutTemplate>
    )
};
