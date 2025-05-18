import Badge from '@/components/personalized/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { filterByType } from '@/lib/utils';
import { TechStack, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tech Stack',
    href: '/admin/tech-stack',
  },
];

type TechStackProps = {
  techstack: TechStack[]
}

export default function Index({ techstack }: TechStackProps) {
  const tools = filterByType(techstack, 'tool');
  const frameworks = filterByType(techstack, 'framework');

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tech Stack" />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">

        <div className='flex justify-between items-center'>
          <h1>TECH STACK</h1>
          <Link href={route('admin.techstack.create')}>
            <Button variant='default'>
              <Plus className="size-4" />
              Add Tech Stack
            </Button>
          </Link>
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <section className='space-y-3 w-full p-5 border rounded-md'>
            <h1>Tools</h1>
            <div className='flex items-center flex-wrap gap-2'>
              {
                tools.length > 0 ?
                  <Badge asLink items={tools} />
                  :
                  <div className='text-white/70 text-center w-full'>No Tools Available.</div>
              }
            </div>
          </section>

          <section className='space-y-3 w-full p-5 border rounded-md'>
            <h1>Frameworks</h1>
            <div className='flex items-center flex-wrap gap-2'>
              {
                frameworks.length > 0 ?
                  <Badge asLink items={frameworks} />
                  :
                  <div className='text-white/70 text-center w-full'>No Frameworks Available.</div>
              }
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
