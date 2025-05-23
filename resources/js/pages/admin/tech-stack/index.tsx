import Badge from '@/components/personalized/badge';
import AppLayout from '@/layouts/app-layout';
import { filterByType } from '@/lib/utils';
import { TechStack, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AddTechStack from '@/components/modals/add-techstack';

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
          {/* <Link href={route('admin.techstack.create')}>
            <Button variant='default'>
              Add Tech Stack
            </Button>
          </Link> */}
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <section className='space-y-3 w-full p-5 border rounded-md'>
            <div className='flex items-center justify-between w-full'>
              <h1>Tools</h1>
              <AddTechStack tech_type='tool' />
            </div>
            <div className='flex items-center flex-wrap gap-2'>
              {
                tools.length > 0 ?
                  <Badge asModal items={tools} />
                  :
                  <div className='text-white/70 text-center w-full'>No Tools yet.</div>
              }
            </div>
          </section>

          <section className='space-y-3 w-full p-5 border rounded-md'>
            <div className='flex items-center justify-between w-full'>
              <h1>Frameworks</h1>
              <AddTechStack tech_type='framework' />
            </div>
            <div className='flex items-center flex-wrap gap-2'>
              {
                frameworks.length > 0 ?
                  <Badge asModal items={frameworks} />
                  :
                  <div className='text-white/70 text-center w-full'>No Frameworks yet.</div>
              }
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}
