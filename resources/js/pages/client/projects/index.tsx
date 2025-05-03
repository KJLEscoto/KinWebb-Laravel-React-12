
import MainLayer from '@/components/personalized/main-layer';
import ProjectList from '@/components/personalized/project-list';
import Shell from '@/components/personalized/shell';
import ClientLayout from '@/layouts/client-layout';
import { ProjectProps } from '@/types';
import { Head, } from '@inertiajs/react';

export default function Index({ projects }: ProjectProps) {
  return (
    <ClientLayout>
      <Head title="Projects" />
      <MainLayer paddingTop paddingBottom>
        <Shell>
          <section>
            <span className="italic font-light text-2xl  text-white/60">All</span>
            <h1 className="font-medium text-5xl">Projects</h1>
          </section>

          <ProjectList projects={projects} />
        </Shell>
      </MainLayer>
    </ClientLayout>
  );
}