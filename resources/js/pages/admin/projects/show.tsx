import Section from '@/components/personalized/admin-show-project';
import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, PencilLine } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



export default function Show({ project }: { project: any }) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Projects',
      href: '/admin/projects',
    },
    {
      title: project.name,
      href: `/admin/projects/${project.id}`,
    },
  ];

  console.log(project);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={` ${project.name} | Projects`} />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <section className='w-full flex items-center justify-between'>
          <Link href={route('admin.projects.index')} className='flex items-center gap-2'>
            <Button variant='outline'>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <Link href={route('admin.projects.edit', project.id)} className='flex items-center gap-2'>
            <Button variant='default'>
              <PencilLine className="w-4 h-4" />
              Edit Project
            </Button>
          </Link>
        </section>

        <Section header='Project Name'>
          <h1 className='text-3xl'>{project.name}</h1>
        </Section>

        <Section header='Project Description'>
          <p>{project.description}</p>
        </Section>

        <Section header='Year'>
          <p>{project.year}</p>
        </Section>

        <div className='flex items-start justify-between'>
          <Section header='Tags'>
            <ul className='ml-3 list list-disc list-inside'>
              {project.tags.map((tag: any) => (
                <li key={tag.id} className='text-sm capitalize'>{tag.title}</li>
              ))}
            </ul>
          </Section>

          <Section header='Roles'>
            <ul className='ml-3 list list-disc list-inside'>
              {project.roles.map((role: any) => (
                <li key={role.id} className='text-sm capitalize'>{role.type}</li>
              ))}
            </ul>
          </Section>
        </div>

        <div className='flex items-start justify-between'>
          {project.tools.length > 0 &&
            <Section header='Tools'>
              <div className='flex items-center gap-2 flex-wrap'>
                {project.tools.map((tool: any) => (
                  <div key={tool.id} className='flex items-center gap-2 rounded-sm bg-[#1c1c1c] px-3 py-2 select-none w-fit'>
                    <Image src={tool.logo} className="!w-4 !h-4 object-cover" />
                    <p className='text-sm text-white/80 tracking-wide'>
                      {tool.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          }

          {project.frameworks.length > 0 &&
            <Section header='Frameworks'>
              <div className='flex items-center gap-2 flex-wrap'>
                {project.frameworks.map((framework: any) => (
                  <div key={framework.id} className='flex items-center gap-2 rounded-sm bg-[#1c1c1c] px-3 py-2 select-none w-fit'>
                    <Image src={framework.logo} className="!w-4 !h-4 object-cover" />
                    <p className='text-sm text-white/80 tracking-wide'>
                      {framework.name}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          }
        </div>


        <Section header='Thumbnail'>
          <div className='w-full flex items-center justify-center'>
            <Image src={`/storage/${project.thumbnail}`} className="!w-1/2 object-cover rounded" />
          </div>
        </Section>

        {project.screenshots.length > 0 &&
          <Section header='Screenshots'>
            <div className='flex items-center justify-center'>
              <Carousel className="w-full max-w-sm"> {/* Limit the carousel width */}
                <CarouselContent>
                  {project.screenshots.map((screenshot: any, index: number) => (
                    <CarouselItem key={index} className="flex flex-col justify-center">
                      <div className="rounded-lg border bg-muted text-muted-foreground flex items-center justify-center">
                        <Image src={`/storage/${screenshot.image}`} className="h-full w-full object-cover rounded" />
                      </div>
                      <p className='text-center'>{screenshot.name}</p>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </Section>
        }

      </div>
    </AppLayout>
  );
}
