import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';

import { type ReactNode } from 'react';
import { Toaster } from 'sonner';
import { useFlashToast } from '@/hooks/use-flash-toast';


interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    useFlashToast();

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <Toaster className='!z-[9999]' position={'top-right'} richColors />
            {children}
        </AppLayoutTemplate>
    )
};
