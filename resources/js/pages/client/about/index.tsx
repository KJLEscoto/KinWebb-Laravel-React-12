import Image from '@/components/personalized/image';
import MainLayer from '@/components/personalized/main-layer';
import Shell from '@/components/personalized/shell';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ClientLayout from '@/layouts/client-layout';
import { highlightText } from '@/lib/utils';
import { SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Skills from '@/components/personalized/skills-about-me';
import TechStack from '@/components/personalized/techstack-about-me';
import Experiences from '@/components/personalized/experiences-about-me';

export default function Index() {

  const { user, about_me } = usePage<SharedData>().props;

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
                <Image className='!max-w-sm rounded-4xl' src={`/storage/${about_me.picture}`} alt='model image' />

                <div className={`flex items-center gap-1 select-none px-5 py-1.5 rounded-full bg-white/10`}>
                  {/* <CircleSmall className='size-3 animate-pulse cursor-pointer' /> */}
                  <p className='text-xs font-normal tracking-wider text-white/80'>
                    {user?.job_message}
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

            {/* skills */}
            <Skills />


            <Separator />

            {/* tech stack */}
            <TechStack />

            <Separator />

            {/* experiences */}
            <Experiences />

            <Separator />

          </main>

        </Shell>
      </MainLayer>
    </ClientLayout>
  );
}


// BTW, I'm Kent Joemar Escoto, a Computer Science graduate. With a strong eagerness to learn and grow. I'm passionate about applying my skills and knowledge in real-world projects.


// A pixel - and - code perfectionist who crafts with intention, keeps things clean, and makes the web a little more delightful.