import { Link } from '@inertiajs/react';
import { MoveRight } from 'lucide-react';
import Image from './image';
import { slugify } from '@/lib/utils';


export default function ProjectList({ projects }: { projects: any }) {
  console.log(projects);

  return (
    <section className='mt-20 divide-y'>
      {projects.map((project: any) => (
        <Link
          href={route('projects.show', slugify(project.name))}
          key={project.id}
          className="cursor-pointer grid grid-cols-4 gap-5 py-4 font-light text-white/50 hover:text-white group relative transition-all duration-300"
        >
          <h3 className='w-full truncate'>{project.name}</h3>
          <div className='flex items-center justify-start gap-2 w-full overflow-auto scrollbar-hide'>
            {
              project.roles.map((role: any, index: number) => (
                <p key={role.id} className="capitalize text-nowrap">
                  {role.type}{index < project.roles.length - 1 ? ',' : ''}
                </p>
              ))
            }
          </div>
          <div className='absolute z-10 right-20 -top-20 w-80 h-auto'>
            <Image src={`/storage/${project.thumbnail}`} alt={project.name}
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
