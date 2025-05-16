import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Project, ProjectProps, Tag, type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { slugify } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/admin/projects',
  },
];

const changeFeatured = (name: string) => {
  router.patch(route('admin.projects.toggle-featured', name), {}, {
    preserveScroll: true,
    onError: () => {
      toast.error('Something went wrong updating featured status.');
    }
  });
}

export default function Index() {
  const MAX_TAG = import.meta.env.VITE_MAX_TAGS;

  const { projects } = usePage<ProjectProps>().props;
  console.log(projects)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Projects" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className='flex justify-between items-center'>
          <h1>ALL PROJECTS</h1>
          <Link href={route('admin.projects.create')}>
            <Button variant='default'>
              <Plus className="size-4" />
              Add Project
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7'>
          {projects.map((project: Project) => (
            <div className='flex flex-col gap-2' key={project.id}>
              <Link href={route('admin.projects.show', slugify(project.name))}>
                <div className='relative group'>
                  <Image src={`/storage/${project.thumbnail}`} className="w-full h-32 object-cover rounded" />
                  <h2 className="text-lg font-medium transition opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 px-3 py-2 truncate bg-black/70 w-full">{project.name}</h2>
                </div>
              </Link>
              <section className='w-full flex items-start justify-between'>
                <div className="flex flex-wrap gap-y-2">
                  {project.tags.slice(0, MAX_TAG).map((tag: Tag, index: number) => (
                    <Link
                      href={route('admin.projects.show', project.id)}
                      key={`tag-${project.id}-${index}`}
                      className="bg-[#1c1c1c] text-white/80 text-xs tracking-wide mr-2 px-3 py-1 rounded-full inline-block"
                    >
                      {tag.title}
                    </Link>
                  ))}
                  {project.tags.length > MAX_TAG && (
                    <span className="text-white/80 text-xs flex items-center">
                      <Plus className='size-3' />
                      {project.tags.length - MAX_TAG} more
                    </span>
                  )}
                </div>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Switch
                        checked={project.is_featured}
                        onCheckedChange={() => changeFeatured(project.name)}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Featured: <span className='font-bold'>{project.is_featured ? 'yes' : 'no'}</span></p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </section>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
