import Image from '@/components/personalized/image';
import AppLayout from '@/layouts/app-layout';
import { AboutMe, type BreadcrumbItem, ShortAbout } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddShort from '@/components/modals/add-short';
import EditShort from '@/components/modals/edit-short';
import AddMain from '@/components/modals/add-main';
import { highlightText } from '@/lib/utils';
import EditMain from '@/components/modals/edit-main';
import AddSecondary from '@/components/modals/add-secondary';
import EditSecondary from '@/components/modals/edit-secondary';
import { Switch } from '@/components/ui/switch';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'sonner';
import EditResume from '@/components/modals/edit-resume';
import AddResume from '@/components/modals/add-resume';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'About Me',
    href: '/admin/about-me',
  },
];

function ShortSection({ short }: { short: ShortAbout | null }) {
  const content = short?.body ? highlightText(short.body, short.highlight ?? '') : null;

  return (
    <section className="flex relative flex-col w-full border rounded-lg gap-3 p-5 max-w-7xl group">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Welcome | Short</h1>
        <section className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          {short ? <EditShort /> : <AddShort />}
          <Dialog>
            <DialogTrigger asChild className="cursor-pointer">
              <Button size='icon' variant='ghost'>
                <Info className="size-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className='!max-w-5xl w-full'>
              <DialogHeader>
                <DialogTitle>Short Preview</DialogTitle>
              </DialogHeader>
              <Image src='/images/short-preview.png' alt='short preview' />
            </DialogContent>
          </Dialog>
        </section>
      </div>

      {content ? (
        <p className="text-3xl font-light text-white/50" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="text-white/50">No Short Yet.</p>
      )}
    </section>
  );
}

function MainSection({ about_me }: { about_me: AboutMe | null }) {
  const content = about_me?.main_text ? highlightText(about_me.main_text, about_me.main_text_highlight ?? '') : null;

  return (
    <section className="flex relative flex-col w-full border rounded-lg gap-3 p-5 max-w-7xl group">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Main</h1>
        <section className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          {about_me?.main_text ? <EditMain /> : <AddMain />}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Info className='size-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='!max-w-5xl w-full'>
              <DialogHeader>
                <DialogTitle>Main Preview</DialogTitle>
              </DialogHeader>
              <Image src='/images/short-preview.png' alt='short preview' />
            </DialogContent>
          </Dialog>
        </section>
      </div>

      {content ? (
        <p className="text-3xl font-light text-white/50" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="text-white/50">No Main Yet.</p>
      )}
    </section>
  );
}

function SecondarySection({ about_me }: { about_me: AboutMe | null }) {
  const content = about_me?.secondary_text ? highlightText(about_me.secondary_text, about_me.secondary_text_highlight ?? '') : null;

  return (
    <section className="flex relative flex-col w-full border rounded-lg gap-3 p-5 max-w-7xl group">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Secondary</h1>
        <section className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          {about_me?.secondary_text ? <EditSecondary /> : <AddSecondary />}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Info className='size-4' />
              </Button>
            </DialogTrigger>
            <DialogContent className='!max-w-5xl w-full'>
              <DialogHeader>
                <DialogTitle>Secondary Preview</DialogTitle>
              </DialogHeader>
              <Image src='/images/short-preview.png' alt='short preview' />
            </DialogContent>
          </Dialog>
        </section>
      </div>

      {content ? (
        <p className="text-3xl font-light text-white/50" dangerouslySetInnerHTML={{ __html: content }} />
      ) : (
        <p className="text-white/50">No Secondary Yet.</p>
      )}
    </section>
  );
}

function ResumeSection({ about_me }: { about_me: AboutMe }) {
  const content = about_me?.resume_link ? (about_me.resume_link ?? '') : null;

  const isDisabled = !about_me?.resume_link && !about_me?.resume_status;
  const isChecked = about_me?.resume_status;

  const setResumeStatus = (id: number) => {
    router.patch(route('admin.about-me.update-resume-status', id), {}, {
      preserveScroll: true,
      onError: () => {
        toast.error('Something went wrong updating resume.');
      }
    });
  }

  return (
    <section className="flex relative flex-col w-full border rounded-lg gap-3 p-5 max-w-7xl group">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Resumé</h1>
        <section className="flex items-center group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Switch
                  className='mr-2'
                  disabled={isDisabled}
                  checked={isChecked}
                  onCheckedChange={() => setResumeStatus(about_me.id)} />
              </TooltipTrigger>
              <TooltipContent>
                {about_me?.resume_status ? (
                  <p>Set as inactive</p>
                ) : (
                  <p>Set as active</p>
                )}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {about_me?.resume_link ? <EditResume /> : <AddResume />}
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <Info className='size-4' />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Valid Resumé</DialogTitle>
                <DialogDescription>
                  Copy the given url and change the random link.
                </DialogDescription>
              </DialogHeader>
              <p>https://drive.google.com/file/d/<span className='text-blue-500 underline'>[change random link here]</span>/view</p>
            </DialogContent>
          </Dialog>
        </section>
      </div>

      {content ? (
        <p className="font-light text-white/80 break-all">{content}</p>
      ) : (
        <p className="text-white/50">No Active Resume Yet.</p>
      )}
    </section>
  );
}

export default function Index() {
  type AboutMeProps = {
    short: ShortAbout | null;
    about_me: AboutMe;
  };

  const { short, about_me } = usePage<AboutMeProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About Me" />
      <div className="flex h-full flex-1 flex-col items-center gap-5 rounded-xl p-4">
        <section className='grid lg:grid-cols-2 gap-5 w-full h-auto'>
          <ShortSection short={short} />
          <ResumeSection about_me={about_me} />
          <MainSection about_me={about_me} />
          <SecondarySection about_me={about_me} />
        </section>
      </div>
    </AppLayout>
  );
}
