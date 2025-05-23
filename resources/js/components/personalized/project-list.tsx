import { Link, usePage } from '@inertiajs/react';
import { MoveRight } from 'lucide-react';
import Image from './image';
import { slugify } from '@/lib/utils';
import { Project, ProjectProps, Role } from '@/types';
import Comma from './comma-separated';


export default function ProjectList() {
  const { projects } = usePage<ProjectProps>().props;

  return (
    <>
      <section className='divide-y'>
        {projects.map((project: Project) => (
          <Link
            href={route('projects.show', slugify(project.name))}
            key={project.id}
            className="cursor-pointer lg:grid hidden grid-cols-4 gap-5 py-4 font-light text-white/50 hover:text-white group relative transition-all duration-300 hover:bg-white/5 px-2"
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
            <div className='absolute z-10 right-20 -top-20 xl:w-[500px] w-[400px] h-auto opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500'>
              <Image className='group-hover:block hidden' src={`/storage/${project.thumbnail}`} alt={project.name}
              />
            </div>
            <div className='col-span-2 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-300'>
              <MoveRight className='h-4 w-4' />
            </div>
          </Link>
        ))}
      </section>

      <article className="grid gap-y-10 lg:hidden">
        {projects.map((project: Project, index: number) => {
          return (
            <Link
              href={route('projects.show', slugify(project.name))}
              key={index}
              className={`space-y-2 cursor-pointer h-fit group`}
            >
              <section className="flex items-center justify-between w-full group">
                <h2 className="truncate w-4/5 text-nowrap text-lg font-semibold text-white">{project.name} </h2>
                <MoveRight className="size-7 text-white transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </section>

              <section className={`h-96 overflow-hidden`}>
                <Image
                  src={`/storage/${project.thumbnail}`}
                  className="!w-full !h-full object-cover group-hover:scale-105 transition"
                />
              </section>
            </Link>
          )
        })}
      </article>
    </>
  );
}
