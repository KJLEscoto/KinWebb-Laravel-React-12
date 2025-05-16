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
    about_me: AboutMe;
    short: ShortAbout;
    techstack: TechStack[];
    main_hero: Hero;
    featured_projects: Project[];
    flash: Flash;
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
    job_status?: string;
    job_message?: string;
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

interface TechStack {
    id: number | string;
    name: string;
    logo: string;
    type: string;
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
    techstack: TechStack[];
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
    created_at: string;
    updated_at: string;
}

export interface ShortAbout {
    id: number;
    body?: string | null;
    highlight?: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface AboutMe {
    id: number;
    main_text: string;
    main_text_highlight?: string;
    secondary_text: string;
    secondary_text_highlight?: string;
    picture: File | null;
    resume_link: string;
    resume_status: boolean;
    created_at: string;
    updated_at: string;
}

export type ResumeLink = {
    resume: AboutMe;
}