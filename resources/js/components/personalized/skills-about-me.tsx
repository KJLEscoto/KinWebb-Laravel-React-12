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
  return (
    <div className='grid grid-cols-2 gap-10'>
      <h1 className="italic font-light text-3xl text-white/60">Skills</h1>

      <div className='space-y-10'>
        <section className='space-y-2'>
          <h3 className='text-lg'>Web Development</h3>
          <ul className='space-y-1 ml-3'>
            {
              webdev.map((item, index) => (
                <li key={index} className='font-light text-white/70 tracking-wide flex items-center gap-2'>
                  <Check className='size-4 text-white' />
                  {item}
                </li>
              ))
            }
          </ul>
        </section>

        <section className='space-y-3'>
          <h3 className='text-lg'>Web Design & UI/UX</h3>
          <ul className='space-y-1 ml-3'>
            {
              webdesign.map((item, index) => (
                <li key={index} className='font-light text-white/70 tracking-wide flex items-center gap-2'>
                  <Check className='size-4 text-white' />
                  {item}
                </li>
              ))
            }
          </ul>
        </section>
      </div>
    </div>
  )
}