import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "./image";
import { Link, usePage } from "@inertiajs/react";
import { slugify } from "@/lib/utils";
import { Project, SharedData } from "@/types";
import Shell from "./shell";

function FeaturedProjects() {

  const { featured_projects } = usePage<SharedData>().props;

  return (
    <Shell>
      <section className="lg:mt-0 !mt-20">
        <span className="italic font-light text-3xl text-white/60">Featured</span>
        <h1 className="font-medium text-5xl">Projects</h1>
      </section>

      {featured_projects?.length > 0 ?
        <article className="grid grid-cols-5 gap-x-5 gap-y-10">
          {featured_projects.map((project: Project, index: number) => {
            // Determine layout based on index
            const isLarge = [0, 3, 4].includes(index); // projects 1, 4, 5 (0-based index)
            const span = isLarge ? "lg:col-span-3" : "lg:col-span-2";
            const height = isLarge ? "lg:h-[500px]" : "lg:h-[350px]";

            return (
              <Link
                href={route('projects.show', slugify(project.name))}
                key={index}
                className={`col-span-5 ${span} flex lg:flex-col flex-col-reverse gap-3 cursor-pointer h-fit group`}
              >
                <section className={`${height} h-96 overflow-hidden`}>
                  <Image
                    src={`/storage/${project.thumbnail}`}
                    className="!w-full !h-full object-cover group-hover:scale-105 transition"
                  />
                </section>

                <section className="flex items-center justify-between w-full group">
                  <h2 className="truncate w-4/5 text-nowrap text-lg font-semibold text-white">{project.name} </h2>
                  <MoveRight className="size-7 text-white transition-all duration-300 opacity-0 group-hover:opacity-100" />
                </section>
              </Link>
            )
          })}
        </article>
        :
        <div className="font-light tracking-wide">Coming Soon...</div>
      }

      <Link href={route('projects.index')} className="w-fit block">
        <Button className="rounded-full flex font-bold items-center gap-2" size="lg">
          View All Projects
          <MoveRight className="size-4" />
        </Button>
      </Link>
    </Shell>
  );
}

export default FeaturedProjects;
