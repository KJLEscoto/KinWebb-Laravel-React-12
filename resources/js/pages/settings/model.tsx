import { Head } from '@inertiajs/react';

import HeadingSmall from '@/components/heading-small';
import { AboutMe, type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import AddModel from '@/components/settings/add-model';
import EditModel from '@/components/settings/edit-model';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Model - About Me settings',
        href: '/settings/model',
    },
];

export default function Model({ about_me }: { about_me: AboutMe }) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Model - About Me settings" />

            <SettingsLayout>
                <div className="space-y-6 !h-full">
                    <HeadingSmall title="Model - About Me" description="Update the model image in about me page" />

                    {
                        about_me.picture ? (
                            <EditModel />
                        ) : (
                            <AddModel />
                        )
                    }

                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
