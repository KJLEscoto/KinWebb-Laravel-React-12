import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/admin/projects',
  },
];

export default function Index({ projects }: { projects: any }) {
  console.log(projects);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex justify-between items-center'>
          <h1>ALL PROJECTS</h1>
          <Link href={route('admin.projects.create')}
            className="text-blue-500 hover:underline">
            Add Project
          </Link>
        </div>

        <div className='space-y-5'>
          {projects.map((project: any) => (
            <div key={project.id} className="border rounded-sm p-4">
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-gray-600">{project.description}</p>
              <p className="text-sm text-gray-500">Year: {project.year}</p>
              {
                project.roles.map((role: any, index: number) => (
                  <div
                    key={`role-${project.id}-${index}`}
                    className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {role.type}
                  </div>
                ))
              }

              {
                project.tags.map((tag: any, index: number) => (
                  <div
                    key={`tag-${project.id}-${index}`}
                    className="inline-block bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                  >
                    {tag.title}
                  </div>
                ))
              }
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
