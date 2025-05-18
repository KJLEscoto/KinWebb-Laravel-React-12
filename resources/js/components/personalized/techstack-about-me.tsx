import Badge from "./badge";
import { filterByType } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import { SharedData } from "@/types";

export default function TechStack() {

  const { techstack } = usePage<SharedData>().props;

  const tools = filterByType(techstack, 'tool');
  const frameworks = filterByType(techstack, 'framework');

  return (
    <div className='grid grid-cols-2 gap-10'>
      <h1 className="italic font-light text-3xl text-white/60">Tech Stack</h1>

      <div className='space-y-10'>
        <section className='space-y-3'>
          <h3 className='text-lg'>Frameworks</h3>
          {
            frameworks.length > 0 ? (
              <Badge items={frameworks} />
            ) : (
              <p className='text-white/50'>Coming Soon...</p>
            )
          }
        </section>

        <section className='space-y-3'>
          <h3 className='text-lg'>Tools</h3>
          {
            tools.length > 0 ? (
              <Badge items={tools} />
            ) : (
              <p className='text-white/50'>Coming Soon...</p>
            )
          }
        </section>
      </div>
    </div>
  )
}