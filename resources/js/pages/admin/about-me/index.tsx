import Image from '@/components/personalized/image';
import AppLayout from '@/layouts/app-layout';
import { AboutMe, type BreadcrumbItem, ShortAbout } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddShort from '@/components/modals/add-short';
import EditShort from '@/components/modals/edit-short';
import AddMain from '@/components/modals/add-main';
import { Separator } from '@/components/ui/separator';
import { highlightText } from '@/lib/utils';
import EditMain from '@/components/modals/edit-main';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'About Me',
    href: '/admin/about-me',
  },
];

function ShortSection({ short }: { short: ShortAbout | null }) {
  const content = short?.body ? highlightText(short.body, short.highlight ?? '') : null;

  return (
    <section className="flex relative flex-col items-center w-full border rounded-lg gap-5 p-5 max-w-7xl">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Welcome | Short</h1>
        <section className="flex items-center gap-3">
          {short ? <EditShort /> : <AddShort />}
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              <Info className="size-4" />
            </DialogTrigger>
            <DialogContent className='!max-w-5xl w-full overflow-auto max-h-screen scrollbar-hide'>
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
        <p className="text-center text-white/50">No Short Yet.</p>
      )}
    </section>
  );
}

function MainSection({ about_me }: { about_me: AboutMe | null }) {
  const content = about_me?.main_text ? highlightText(about_me.main_text, about_me.main_text_highlight ?? '') : null;

  return (
    <section className="flex relative flex-col items-center w-full border rounded-lg gap-5 p-5 max-w-7xl">
      <div className="w-full gap-5 items-center flex justify-between">
        <h1 className="text-lg">Main</h1>
        <section className="flex items-center gap-3">
          {about_me?.main_text ? <EditMain /> : <AddMain />}
          <Dialog>
            <DialogTrigger className="cursor-pointer">
              <Info className="size-4" />
            </DialogTrigger>
            <DialogContent className='!max-w-5xl w-full overflow-auto max-h-screen scrollbar-hide'>
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
        <p className="text-center text-white/50">No Main Yet.</p>
      )}
    </section>
  );
}

export default function Index() {
  type AboutMeProps = {
    short: ShortAbout | null;
    about_me: AboutMe | null;
  };

  const { short, about_me } = usePage<AboutMeProps>().props;

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About Me" />
      <div className="flex h-full flex-1 flex-col items-center gap-5 rounded-xl p-4">
        <ShortSection short={short} />
        <MainSection about_me={about_me} />
      </div>
    </AppLayout>
  );
}
