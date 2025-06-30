import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { AccordionItem } from "./accordion";
import { useState } from "react";
import { NotebookPen } from "lucide-react";

export default function Experiences() {
  const { companies } = usePage<SharedData>().props;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className='grid lg:grid-cols-2 gap-10'>
      <h1 className="italic font-light text-3xl text-white/60">Experiences</h1>

      <div className='space-y-5'>
        {
          companies.length > 0 ? (
            companies.map((company: any, index: number) => (
              <div key={company.id} className="w-full">
                <AccordionItem
                  title={company.job_type}
                  link={company.link}
                  name={company.name}
                  started={company.month_started}
                  ended={company.month_ended}
                  content={
                    <ul className='list-disc list-inside'>
                      {
                        company.experiences.length > 0 ? (
                          company.experiences.map((experience: any) => (
                            <li key={experience.id} className='ml-3 py-1 font-light text-white/80 tracking-wide'>
                              {experience.description}
                            </li>
                          ))
                        ) : (
                          <span className='ml-3 font-light text-white/80 tracking-wide flex items-center gap-2'>
                            <NotebookPen className="size-3.5" /> To be update...
                          </span>
                        )

                      }
                    </ul>
                  }
                  isOpen={activeIndex === index}
                  onToggle={() => setActiveIndex(activeIndex === index ? null : index)}
                />
              </div>
            ))
          ) : (
            <p className='text-white/70'>No work experience yet.</p>
          )
        }
      </div>
    </div>
  );
}
