
import ProjectList from '@/components/personalized/project-list';
import ClientLayout from '@/layouts/client-layout';
import { ProjectProps } from '@/types';
import { Head, } from '@inertiajs/react';

export default function Index({ projects }: ProjectProps) {
  return (
    <ClientLayout>
      <Head title="Projects" />
      <main className='min-h-screen !pt-35 !pb-20 shadow-lg w-full flex flex-col items-start justify-start bg-[#040204] h-auto lg:p-0 p-5 gap-10'>
        <div className='mx-auto w-full max-w-5xl'>
          <section>
            <span className="italic font-light text-2xl  text-white/60">All</span>
            <h1 className="font-medium text-5xl">Projects</h1>
          </section>

          <section className='mt-20 divide-y'>
            <ProjectList projects={projects} />
          </section>
        </div>
      </main>
    </ClientLayout>
  );
}