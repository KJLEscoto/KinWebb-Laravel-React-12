import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Hero, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Info, Plus, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Hero',
    href: '/admin/hero',
  },
];

type HeroProps = {
  hero_entries: Hero[]
}

export default function Index({ hero_entries }: HeroProps) {
  const [open, setOpen] = useState(false);

  const setMainHero = (id: number) => {
    router.patch(route('admin.hero.update', id), {}, {
      preserveScroll: true,
      onError: () => {
        toast.error('Something went wrong updating main hero.');
      }
    });
  }

  const deleteEntry = (id: number) => {
    router.delete(route('admin.hero.destroy', id), {
      preserveScroll: true,
      onError: () => {
        setOpen(false);
        toast.error('Something went wrong deleting main hero.');
      },
      onSuccess: () => {
        setOpen(false);
      }
    });
  }

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tech Stack" />
      <div className="flex h-full flex-1 flex-col items-center gap-5 rounded-xl p-4">

        <div className='flex z-20 justify-between w-full items-center'>
          <h1>HERO</h1>
          <div className='flex items-center gap-3'>
            <Link href={route('admin.hero.create')}>
              <Button variant='default'>
                <Plus className="size-4" />
                Add Entry
              </Button>
            </Link>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger className="cursor-pointer">
                <Info className="size-4" />
              </DialogTrigger>
              <DialogContent className='!max-w-5xl w-full overflow-auto max-h-screen scrollbar-hide'>
                <DialogHeader>
                  <DialogTitle>Hero Preview</DialogTitle>
                </DialogHeader>
                Replace the Coming Soon...
                <Image className='!w-full' src='/images/hero-preview.png' alt='hero preview' />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {
          hero_entries.length > 0 ? (
            hero_entries.map((entry: Hero) => (
              <div className='flex relative flex-col items-center w-full border rounded-lg overflow-hidden gap-5 py-20 px-10 max-w-7xl'>

                <div className='absolute z-10 w-full gap-5 flex justify-between p-5 top-0'>
                  <h1 className='text-lg'>
                    Entry {entry.id}
                  </h1>

                  <section className='flex items-center gap-5'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Switch
                            checked={entry.is_active}
                            onCheckedChange={() => setMainHero(entry.id)} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Set as main hero</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size='sm' variant='destructive'>
                          Delete
                          <Trash2 className="size-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide">
                        <DialogTitle>Delete Confirmation</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete this entry? This action cannot be undone.
                        </DialogDescription>

                        <DialogFooter className="gap-2">
                          <DialogClose asChild>
                            <Button variant="secondary" onClick={closeModal}>
                              Cancel
                            </Button>
                          </DialogClose>

                          <Button onClick={() => deleteEntry(entry.id)} type="submit" variant="destructive">
                            Delete Permanently
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </section>
                </div>

                <header className="relative h-full w-full flex items-center justify-center">
                  <Image src={`/storage/${entry.model_image}`} alt="model image" />
                  <span className='absolute md:-top-5 bottom-5 transition-all duration-500 overflow-hidden !h-40'>
                    <Image src={`/storage/${entry.logo_image}`} alt="logo image" className="lg:!max-w-2xl !object-cover !w-full border-red-500" />
                  </span>
                </header>

                <p className='text-[#A0A0A0] text-center text-sm tracking-wide'>
                  {entry.body}
                </p>
              </div>
            ))
          ) : (
            <div>
              0 Entries Found
            </div>
          )
        }

      </div>
    </AppLayout>
  );
}
