import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, ShortAbout } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Info, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddShort from '@/components/modals/add-short';
import EditShort from '@/components/modals/edit-short';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'About Me',
    href: '/admin/about-me',
  },
];

type AboutMeProps = {
  short: ShortAbout | null;
};

export default function Index({ short }: AboutMeProps) {
  let text = "";

  if (short) {
    const body = short.body;
    const highlight = short?.highlight;
    const regex = new RegExp(`\\b${highlight}\\b`, "gi");

    text = body
      ? body.replace(
        regex,
        `<span class="text-white italic mx-1.5">${highlight}</span>`
      )
      : "";
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="About Me" />
      <div className="flex h-full flex-1 flex-col items-center gap-5 rounded-xl p-4">

        <section
          className="flex relative flex-col items-center w-full border rounded-lg gap-5 p-5 max-w-7xl"
        >
          <div className="w-full gap-5 flex justify-between">
            <h1 className="text-lg">Short</h1>
            <section className="flex items-center gap-3">
              {short ? (
                <EditShort short={short} />
              ) : (
                <AddShort />
              )}

              <Dialog>
                <DialogTrigger className="cursor-pointer">
                  <Info className="size-4" />
                </DialogTrigger>
                <DialogContent className='!max-w-5xl w-full overflow-auto max-h-screen scrollbar-hide'>
                  <DialogHeader>
                    <DialogTitle>Short Preview</DialogTitle>
                  </DialogHeader>
                  Replace the Coming Soon...
                  <Image src='/images/short-preview.png' alt='short preview' />
                </DialogContent>
              </Dialog>
            </section>
          </div>

          <p className="text-3xl font-light text-white/50">
            {short ? (
              <span dangerouslySetInnerHTML={{ __html: text }} />
            ) : (
              <p className='text-center'>No Short Yet.</p>
            )}
          </p>
        </section>


      </div>
    </AppLayout>
  );
}
