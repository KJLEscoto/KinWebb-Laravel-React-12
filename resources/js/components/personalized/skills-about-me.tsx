import { SharedData, Skill } from "@/types";
import { usePage } from "@inertiajs/react";
import { Check } from "lucide-react";

const webdesign = [
  'Design wireframes, prototypes, and mockups',
  'Redesign outdated interfaces',
  'Apply design principles and best practices',
  'Design with attention to color, typography, layout, and hierarchy',
]

const webdev = [
  'Build dynamic & responsive websites application',
  'Work with modern frameworks and libraries',
  'Use Git & GitHub for version control and collaboration',
  'Manage and update websites with CMS'
]

export default function Skills() {

  const { categories } = usePage<SharedData>().props;

  return (
    <div className='grid lg:grid-cols-2 gap-10'>
      <h1 className="italic font-light text-3xl text-white/60">Skills</h1>

      <div className='space-y-10'>
        {categories.map((category: any) => (
          category.skills.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg">{category.name}</h2>
              <ul className='space-y-1 ml-3'>
                {category.skills.map((skill: Skill, index: number) => (
                  <li key={index} className='font-light text-white/70 tracking-wide flex items-start gap-2'>
                    <div className="mt-1.5">
                      <Check className='size-4 text-white' />
                    </div>
                    <span>{skill.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        ))}
      </div>
    </div>
  )
}