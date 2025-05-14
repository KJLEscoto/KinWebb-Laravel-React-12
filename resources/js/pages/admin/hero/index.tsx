import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Hero, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Info, Plus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Hero',
    href: '/admin/hero',
  },
];

type HeroProps = {
  hero_entries: Hero[]
}


const selectMainHero = (id: number) => {
  router.patch(route('admin.projects.toggle-main-hero', id), {}, {
    preserveScroll: true,
    onError: () => {
      toast.error('Something went wrong updating main hero.');
    }
  });
}

export default function Index({ hero_entries }: HeroProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Tech Stack" />
      <div className="flex h-full flex-1 flex-col items-center gap-5 rounded-xl p-4">

        <div className='flex justify-between w-full items-center'>
          <h1>HERO</h1>
          <div className='flex items-center gap-3'>
            <Link href={route('admin.hero.create')}>
              <Button variant='default'>
                <Plus className="size-4" />
                Add Entry
              </Button>
            </Link>
            <Dialog>
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
              <div className='flex relative flex-col items-center w-full border rounded-lg gap-5 py-20 px-10 max-w-7xl'>

                <div className='absolute w-full gap-5 flex justify-between p-5 top-0'>
                  <h1 className='text-lg'>
                    Entry {entry.id}
                  </h1>

                  <section className='flex items-center gap-5'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Switch
                            checked={entry.is_active}
                            onCheckedChange={() => selectMainHero(entry.id)} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Select as main hero</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <Link href={route('admin.hero.edit', entry.id)}>
                      <Button size='sm' variant='outline'>
                        Edit
                      </Button>
                    </Link>
                  </section>
                </div>

                <header className="relative h-full w-full flex items-center justify-center">
                  <Image src={`/storage/${entry.model_image}`} alt="model image" />
                  <span className='absolute md:-top-10 bottom-5 transition-all duration-500'>
                    <Image src={`/storage/${entry.logo_image}`} alt="logo image" className="lg:max-w-3xl" />
                  </span>
                </header>

                <p className='text-[#A0A0A0] text-sm tracking-wide'>
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
