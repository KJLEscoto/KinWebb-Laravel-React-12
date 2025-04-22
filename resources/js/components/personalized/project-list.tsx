import { Link } from '@inertiajs/react';
import { MoveRight } from 'lucide-react';

type Project = {
  id: number,
  title: string;
  description: string;
  imageUrl: string;
};

type ProjectListProps = {
  projects: Project[];
};

export default function ProjectList({ projects }: ProjectListProps) {
  return (
    <section className='mt-20 divide-y'>
      {projects.map((project) => (
        <Link
          href={route('projects.show', project.id)}
          key={project.title}
          className="cursor-pointer grid grid-cols-4 py-4 font-light text-white/50 hover:text-white group relative transition-all duration-300"
        >
          <h3>{project.title}</h3>
          <h3>{project.description}</h3>
          <div className='absolute z-10 right-30 -top-20 w-80 h-auto'>
            <img
              src={project.imageUrl}
              alt={project.title}
              className='group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 ease-out'
            />
          </div>
          <div className='col-span-2 flex items-center justify-end'>
            <MoveRight className='h-4 w-4' />
          </div>
        </Link>
      ))}
    </section>
  );
}
