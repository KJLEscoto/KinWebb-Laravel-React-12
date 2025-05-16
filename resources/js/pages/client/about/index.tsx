
import Badge from '@/components/personalized/badge';
import Image from '@/components/personalized/image';
import MainLayer from '@/components/personalized/main-layer';
import Shell from '@/components/personalized/shell';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClientLayout from '@/layouts/client-layout';
import { filterByType, getJobStatusColor, highlightText } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ArrowUpRight, Check, CircleSmall } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useEffect, useState } from 'react';

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

export default function Index() {

  const { auth, techstack, about_me } = usePage<SharedData>().props;

  const tools = filterByType(techstack, 'tool');
  const frameworks = filterByType(techstack, 'framework');

  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    const colorClass = getJobStatusColor(auth?.user?.job_status ?? '');
    setTextColor(colorClass);
  }, [auth?.user?.job_status]);

  const mainContent = about_me?.main_text ? highlightText(about_me.main_text, about_me.main_text_highlight ?? '') : null;

  const secondaryContent = about_me?.secondary_text ? highlightText(about_me.secondary_text, about_me.secondary_text_highlight ?? '') : null;

  return (
    <ClientLayout>
      <Head title="About Me" />
      <MainLayer paddingTop paddingBottom>
        <Shell>
          <main className='flex flex-col gap-20'>

            {/* about me header */}
            <div className='grid grid-cols-2 gap-10'>
              <section className='flex flex-col items-center gap-5'>
                <Image className='!max-w-sm rounded-4xl' src='/images/about-model.png' />

                <div className={`flex items-center gap-1 select-none px-5 py-1.5 rounded-full bg-white/10 text-[${textColor}]`}>
                  {/* <CircleSmall className='size-3 animate-pulse cursor-pointer' /> */}
                  <p className='text-xs font-semibold tracking-wide'>
                    {auth?.user?.job_message}
                  </p>
                </div>
              </section>

              <section className='space-y-7'>
                <h3 className="text-sm font-bold">Yup, that's me!</h3>
                {mainContent ? (
                  <p className="text-3xl font-light text-white/50" dangerouslySetInnerHTML={{ __html: mainContent }} />
                ) : (
                  <></>
                )}

                {secondaryContent ? (
                  <p className='font-light tracking-wider text-white/70' dangerouslySetInnerHTML={{ __html: secondaryContent }} />
                ) : (
                  <></>
                )}

                {about_me?.resume_link && about_me.resume_status ? (
                  <a target="_blank" href={about_me.resume_link} className="w-fit flex">
                    <Button className="rounded-full flex items-center gap-2 font-bold text-xs" size="default">
                      Get My Resumé
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </a>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button
                          disabled
                          className="rounded-full flex items-center gap-2 font-bold text-xs cursor-not-allowed"
                          size="default"
                        >
                          Get My Resumé
                          <ArrowUpRight className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>To be update.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}

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


// BTW, I'm Kent Joemar Escoto, a Computer Science graduate. With a strong eagerness to learn and grow. I'm passionate about applying my skills and knowledge in real-world projects.


// A pixel - and - code perfectionist who crafts with intention, keeps things clean, and makes the web a little more delightful.