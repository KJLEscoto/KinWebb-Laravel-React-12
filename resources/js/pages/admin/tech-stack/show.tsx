import Section from '@/components/personalized/admin-show-project';
import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { techLogo } from '@/lib/utils';
import { Framework, Tool, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Pencil } from 'lucide-react';

type ShowTechStackProps = {
  techstack: Tool | Framework,
  techtype: string;
}

export default function Show({ techstack, techtype }: ShowTechStackProps) {

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Tech Stack',
      href: '/admin/tech-stack',
    },
    {
      title: techstack.name,
      href: `/admin/tech-stack/${techstack.id}`,
    },
  ];

  return (


    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={` ${techstack.name} | Tech Stack`} />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">
        <section className='w-full flex items-center justify-between'>
          <Link href={route('admin.techstack.index')} className='flex items-center gap-2'>
            <Button variant='outline'>
              <ArrowLeft className="size-4" />
              Back
            </Button>
          </Link>
          <Link href={route('admin.techstack.edit', techstack.id)} className='flex items-center gap-2'>
            <Button variant='default'>
              <Pencil className="size-4" />
              Edit
            </Button>
          </Link>
        </section>

        <Section header={techtype == 'tool' ? 'Tool Name' : 'Framework Name'}>
          <h1 className='text-3xl'>{techstack.name}</h1>
        </Section>

        <Section header='Logo'>
          <Image className='!max-w-xs' src={techLogo(techstack)} alt={techstack.name} />
        </Section>

      </div>
    </AppLayout>
  );
}
