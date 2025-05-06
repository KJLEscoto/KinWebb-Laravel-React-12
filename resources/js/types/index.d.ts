import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
    projects?: Project[];
}

export interface Flash {
    success?: string;
    update?: string;
    warning?: string;
    error?: string;
    info?: string;
}

export interface Role {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
}

export interface Tag {
    id: number;
    title: string;
    created_at: string;
    updated_at: string;
}

export interface Tool {
    id: number;
    name: string;
    logo: string;
    created_at: string;
    updated_at: string;
}

export interface Framework {
    id: number;
    name: string;
    logo: string;
    created_at: string;
    updated_at: string;
}

export interface Screenshot {
    id: number;
    name: string;
    image?: File | null;
    created_at: string;
    updated_at: string;
}

export interface Project {
    id: number;
    name: string;
    description?: string;
    thumbnail?: File;
    year?: string;
    is_featured?: boolean;
    roles: Role[];
    tags: Tag[];
    tools: Tool[];
    frameworks: Framework[];
    screenshots: Screenshot[];
    created_at: string;
    updated_at: string;
}

export type ProjectProps = {
    projects: Project[];
}

export interface Hero {
    id: number;
    logo_image?: File | null;
    model_image?: File | null;
    body: string;
    is_active: boolean;
}

