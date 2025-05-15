
import Badge from '@/components/personalized/badge';
import Image from '@/components/personalized/image';
import MainLayer from '@/components/personalized/main-layer';
import Shell from '@/components/personalized/shell';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClientLayout from '@/layouts/client-layout';
import { filterByType, getJobStatusColor } from '@/lib/utils';
import { SharedData, TechStack } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ArrowUpRight, Check, CircleSmall } from 'lucide-react';

const webdev = [
  'Build dynamic & responsive websites application',
  'Work with modern frameworks and libraries',
  'Use Git & GitHub for version control and collaboration',
  'Manage and update websites with CMS'
]

const webdesign = [
  'Design wireframes, prototypes, and mockups',
  'Redesign outdated interfaces',
  'Apply design principles and best practices',
  'Design with attention to color, typography, layout, and hierarchy',
]

type AboutMeProps = {
  techstack: TechStack[];
}

export default function Index({ techstack }: AboutMeProps) {

  const { auth } = usePage<SharedData>().props;

  const tools = filterByType(techstack, 'tool');
  const frameworks = filterByType(techstack, 'framework');

  const get_color = getJobStatusColor(auth.user.job_status ?? '');
  const text_color = `text-${get_color}`;

  return (
    <ClientLayout>
      <Head title="About Me" />
      <MainLayer paddingTop paddingBottom>
        <Shell>
          <main className='flex flex-col gap-20'>

            {/* about me header */}
            <div className='grid grid-cols-2 gap-10'>
              <section className='flex flex-col items-center gap-4'>
                <Image className='!max-w-sm rounded-4xl' src='/images/about-model.png' />

                <div className='flex items-center gap-1 select-none'>
                  <CircleSmall className={`size-3 animate-pulse cursor-pointer ${text_color}`} />
                  <p className={`text-xs font-bold ${text_color}`}>
                    {auth.user.job_message}
                  </p>
                </div>
              </section>

              <section className='space-y-7'>
                <h3 className="text-sm font-bold">Yup, that's me!</h3>

                <div className="text-3xl font-light text-white/50">
                  <p> A pixel-and-code
                    <span className="text-white italic mx-1.5">perfectionist
                    </span>
                    who crafts with intention, keeps things clean, and makes the web a little more delightful.
                  </p>
                </div>

                <p className='font-light tracking-wider text-white/80'>
                  BTW, I'm <strong className='text-lg'>Kent Joemar Escoto</strong>, a Computer Science graduate. With a strong eagerness to learn and grow. I'm passionate about applying my skills and knowledge in real-world projects.
                </p>

                <a target='_blank' href='https://drive.google.com/file/d/1Kxu04RPwJtZs4KQujC2Y_36wKl5eaR6E/view' className='w-fit block'>
                  <Button className="rounded-full flex items-center gap-2 font-bold text-xs" size="default">
                    Get My Resumé
                    <ArrowUpRight className="size-4" />
                  </Button>
                </a>
              </section>
            </div>

            <Separator />

            {/* what i do */}
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

            <Separator />

            {/* what i use */}
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

            <Separator />

            {/* experiences */}
            <div className='grid grid-cols-2 gap-10'>
              <h1 className="italic font-light text-3xl text-white/60">Experiences</h1>

              <div className='space-y-10'>
                <section className='space-y-3'>
                  <h3 className='text-lg'>INTERN @
                    <a target='_blank' href='https://rwebsolutions.com.ph/' className='underline mx-1 cursor-pointer underline-offset-5 hover:text-blue-500 transition'>R Web Solutions, Corp.</a>
                  </h3>
                  <ul className='list-disc list-inside'>
                    <li className='ml-3 font-light text-white/70 tracking-wide'>Build dynamic & responsive websites application</li>
                  </ul>
                </section>
              </div>
            </div>

            <Separator />


          </main>

        </Shell>
      </MainLayer>
    </ClientLayout>
  );
}