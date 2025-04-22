
import ProjectList from '@/components/personalized/project-list';
import ClientLayout from '@/layouts/client-layout';
import { Head, } from '@inertiajs/react';

const projects = [
  {
    id: 1,
    title: "Project 1",
    description: "Description of project 1",
    imageUrl: "https://placehold.co/600x550",
  },
  {
    id: 2,
    title: "Project 2",
    description: "Description of project 2",
    imageUrl: "https://placehold.co/600x550",
  },
  {
    id: 3,
    title: "Project 3",
    description: "Description of project 3",
    imageUrl: "https://placehold.co/600x550",
  },
  {
    id: 4,
    title: "Project 4",
    description: "Description of project 4",
    imageUrl: "https://placehold.co/600x550",
  },
  {
    id: 5,
    title: "Project 5",
    description: "Description of project 5",
    imageUrl: "https://placehold.co/600x550",
  },
  {
    id: 6,
    title: "Project 6",
    description: "Description of project 6",
    imageUrl: "https://placehold.co/600x550",
  },
];

export default function Index() {
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