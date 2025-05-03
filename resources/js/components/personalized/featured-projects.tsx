import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "./image";
import { Link } from "@inertiajs/react";
import { slugify } from "@/lib/utils";
import { Project, ProjectProps, Role } from "@/types";
import Shell from "./shell";
import Comma from "./comma-separated";

function FeaturedProjects({ projects }: ProjectProps) {

  return (
    <Shell>
      <section className="lg:mt-0 !mt-20">
        <span className="italic font-light text-2xl text-white/60">Featured</span>
        <h1 className="font-medium text-5xl">Projects</h1>
      </section>

      {projects.length > 0 ?
        <article className="grid grid-cols-5 gap-x-5 gap-y-10">
          {projects.map((project: Project, index: number) => {
            // Determine layout based on index
            const isLarge = [0, 3, 4].includes(index); // projects 1, 4, 5 (0-based index)
            const span = isLarge ? "lg:col-span-3" : "lg:col-span-2";
            const height = isLarge ? "lg:h-80" : "lg:h-60";

            return (
              <Link
                href={route('projects.show', slugify(project.name))}
                key={index}
                className={`col-span-5 ${span} space-y-2 cursor-pointer h-fit group`}
              >
                <section className={`${height} h-96 overflow-hidden`}>
                  <Image
                    src={`/storage/${project.thumbnail}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </section>

                <section className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-white">{project.name}</h2>
                  <div className="flex items-center justify-end gap-2 w-1/2 truncate">
                    <Comma
                      items={project.roles.map((role: Role) => (
                        <span key={role.id} className="capitalize text-nowrap text-white/80 text-sm">
                          {role.type}
                        </span>
                      ))}
                    />
                  </div>
                </section>
              </Link>
            )
          })}
        </article>
        :
        <div className="font-light tracking-wide">Coming Soon...</div>
      }

      <div className="w-fit">
        <Link href={route('projects.index')}>
          <Button className="rounded-full flex items-center gap-2" size="lg">
            View All Projects
            <MoveRight className="size-4" />
          </Button>
        </Link>
      </div>
    </Shell>
  );
}

export default FeaturedProjects;
