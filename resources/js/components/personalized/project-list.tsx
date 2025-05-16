import { Link, usePage } from '@inertiajs/react';
import { MoveRight } from 'lucide-react';
import Image from './image';
import { slugify } from '@/lib/utils';
import { Project, ProjectProps, Role } from '@/types';
import Comma from './comma-separated';


export default function ProjectList() {
  const { projects } = usePage<ProjectProps>().props;

  return (
    <section className='divide-y'>
      {projects.map((project: Project) => (
        <Link
          href={route('projects.show', slugify(project.name))}
          key={project.id}
          className="cursor-pointer grid grid-cols-4 gap-5 py-4 font-light text-white/50 hover:text-white group relative transition-all duration-300"
        >
          <h3 className='w-full truncate'>{project.name}</h3>
          <div className='flex items-center justify-start gap-2 w-full overflow-auto scrollbar-hide'>
            <Comma
              items={project.roles.map((role: Role) => (
                <span key={role.id} className="capitalize text-nowrap text-sm">
                  {role.type}
                </span>
              ))}
            />
          </div>
          <div className='absolute z-10 right-20 -top-20 w-80 h-auto'>
            <Image src={`/storage/${project.thumbnail}`} alt={project.name}
              className='group-hover:opacity-100 opacity-0 w-full h-full transition-all duration-300 ease-out'
            />
          </div>
          <div className='col-span-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300'>
            <MoveRight className='h-4 w-4' />
          </div>
        </Link>
      ))}
    </section>
  );
}
