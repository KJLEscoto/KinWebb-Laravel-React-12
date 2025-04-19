import { MoveRight } from "lucide-react";
import { Button } from "../ui/button";
import Image from "./image";

const projects = [
  {
    title: "Project 1",
    description: "Description of project 1",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-3",
    height: "lg:h-80"
  },
  {
    title: "Project 2",
    description: "Description of project 2",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-2",
    height: "lg:h-60"
  },
  {
    title: "Project 3",
    description: "Description of project 3",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-2",
    height: "lg:h-60"
  },
  {
    title: "Project 4",
    description: "Description of project 4",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-3",
    height: "lg:h-80"
  },
  {
    title: "Project 5",
    description: "Description of project 5",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-3",
    height: "lg:h-80"
  },
  {
    title: "Project 6",
    description: "Description of project 6",
    imageUrl: "https://placehold.co/600x550",
    span: "lg:col-span-2",
    height: "lg:h-60"
  },
];

function FeaturedProjects() {
  return (
    <div className="flex flex-col min-h-screen lg:p-0 p-5 gap-10 !pb-40">
      <section>
        <span className="italic font-extralight text-2xl  text-white/50">Featured</span>
        <h1 className="font-bold text-5xl">Projects</h1>
      </section>

      <article className="grid grid-cols-5 gap-x-5 gap-y-10">
        {projects.map((project, index) => (
          <div key={index} className={`col-span-5 ${project.span} space-y-3 cursor-pointer h-fit group`}>
            <section className={`${project.height} h-96 overflow-hidden`}>
              <Image src={project.imageUrl} className={`w-full h-full object-cover group-hover:scale-110 transition`} />
            </section>

            <section className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="text-white/80 text-sm">{project.description}</p>
            </section>
          </div>
        ))}
      </article>

      <section>
        <Button className="rounded-full flex items-center gap-2" size="lg">
          View All Projects
          <MoveRight className="w-4 h-4" />
        </Button>
      </section>
    </div>
  );
}

export default FeaturedProjects;
