import AppLayout from '@/layouts/app-layout';
import { socialsLogo } from '@/lib/utils';
import { Social, type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import AddSocial from '@/components/modals/add-socials';
import Image from '@/components/personalized/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import EditTechStackLogo from '@/components/modals/edit-techstack-logo';
import { useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Socials',
    href: '/admin/socials',
  },
];

type SocialProps = {
  socials: Social[]
}

export default function Index({ socials }: SocialProps) {

  const [openViewId, setOpenViewId] = useState<number | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const openDeleteModal = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setDeleteId(id);
    setOpenDelete(true);
  };

  const deleteCategory = () => {
    if (deleteId === null) return;

    router.delete(route('admin.socials.destroy', deleteId), {
      preserveScroll: true,
      onSuccess: () => {
        setOpenDelete(false);
        setDeleteId(null);
      },
      onError: () => {
        toast.error('Something went wrong deleting the social link.');
        setOpenDelete(false);
        setDeleteId(null);
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Socials" />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">

        <div className='flex justify-between items-center'>
          <h1>SOCIALS</h1>
          <AddSocial />
        </div>

        <div className='flex items-center flex-wrap gap-5 flex-row'>
          {
            socials.length > 0 ? socials.map((item: Social) => (
              <Dialog
                key={item.id}
                open={openViewId === item.id}
                onOpenChange={(open) => setOpenViewId(open ? item.id : null)}
              >
                <DialogTrigger asChild>
                  <button
                    className='space-y-3 h-full place-items-center w-fit p-5 border rounded-md hover:bg-white/5 cursor-pointer'>
                    <Image
                      src={socialsLogo('admin', item)}
                      alt={item.logo}
                      className="!w-10 object-cover rounded-xs"
                    />
                    <h1>{item.name}</h1>
                  </button>
                </DialogTrigger>

                <DialogContent className="lg:!min-w-md">
                  <DialogTitle className="flex items-center justify-between">
                    <div className="truncate w-1/2">{item.name}</div>
                    <section className="flex items-center">
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={(e) => openDeleteModal(e, item.id)}>
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </section>
                  </DialogTitle>

                  <Image
                    src={socialsLogo('admin', item)}
                    alt={item.logo}
                    className='!w-full'
                  />

                  <div className='flex items-start justify-center flex-wrap gap-2'>
                    <p>Active Link:</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline break-all'>
                      {item.link}
                    </a>
                  </div>

                </DialogContent>
              </Dialog>
            )) : (
              <div className='text-white/70 text-center w-full'>No Socials yet.</div>
            )
          }

          <Dialog open={openDelete} onOpenChange={setOpenDelete}>
            <DialogContent className="!max-w-xl w-full">
              <DialogHeader>
                <DialogTitle>Delete Social</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this social link? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="gap-2">
                <DialogClose asChild>
                  <Button variant="secondary" onClick={() => setOpenDelete(false)}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button onClick={deleteCategory} type="submit" variant="destructive">
                  Delete Permanently
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </AppLayout>
  );
}
