import React, { useState } from "react";
import Image from "./image";
import { Link, router } from "@inertiajs/react";
import { slugify, techLogo } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import EditTechStack from "../modals/edit-techstack";
import { toast } from "sonner";
import EditTechStackLogo from "../modals/edit-techstack-logo";

interface BadgeItem {
  id: number | string;
  name: string;
  logo: string;
  type: string;
}

type BadgeProps = {
  items: BadgeItem[];
  asLink?: boolean;
  asModal?: boolean;
}

function Badge({ items, asLink, asModal }: BadgeProps) {

  const [openDelete, setOpenDelete] = useState(false);
  const [openViewId, setOpenViewId] = useState<number | null>(null);
  const [selectedTechStackId, setSelectedTechStackId] = useState<number | null>(null);

  const deleteCategory = () => {
    if (selectedTechStackId === null) return;

    router.delete(route('admin.techstack.destroy', selectedTechStackId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        toast.error('Something went wrong deleting the skill.');
        closeModal();
      }
    });
  };

  const openDeleteModal = (e: React.MouseEvent, id: string | number) => {
    e.stopPropagation();
    setSelectedTechStackId(Number(id));
    setOpenDelete(true);
  };

  const closeModal = () => {
    setOpenDelete(false);
    setOpenViewId(null);
    setSelectedTechStackId(null);
  };

  return (
    <>
      {items.map((item) => {

        const content = (
          <div
            key={item.id}
            onClick={() => setOpenViewId(item.id as number)}
            className={`flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit ${(asLink || asModal) && 'hover:!bg-white/10 transition cursor-pointer'
              }`}
          >
            <Image
              src={techLogo(item)}
              // alt={item.logo}
              className="!w-4 aspect-square object-cover rounded-xs"
            />
            <p className="text-sm text-white/80 tracking-wide">{item.name}</p>
          </div>
        );

        if (asModal) {
          return (
            <div key={item.id}>
              <Dialog open={openViewId === item.id} onOpenChange={(open) => setOpenViewId(open ? item.id as number : null)}>
                <DialogTrigger asChild>
                  {content}
                </DialogTrigger>
                <DialogContent className="lg:!min-w-md">
                  <DialogTitle className="flex items-center justify-between">
                    <div className="truncate w-1/2">{item.name}</div>

                    <section className="flex items-center">
                      <EditTechStack
                        techstack={item}
                        tech_type={item.type} />
                      <Button
                        size='icon'
                        variant='ghost'
                        onClick={(e) => openDeleteModal(e, item.id)}>
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </section>
                  </DialogTitle>
                  <Image
                    src={techLogo(item)}
                    alt={item.logo}
                    className='!w-full'
                  />
                  <div className="grid place-items-center">
                    <EditTechStackLogo
                      techstack={item} />
                  </div>
                </DialogContent>
              </Dialog >
            </div >
          );
        }

        if (asLink) {
          return (
            <Link
              key={item.id}
              href={route('admin.techstack.show', slugify(item.name))}
            >
              {content}
            </Link>
          );
        }

        return <div key={item.id}>{content}</div>;
      })}

      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent className="!max-w-xl w-full">
          <DialogHeader>
            <DialogTitle>Delete Tech Stack</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tech stack?
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
    </>
  );
}


export default Badge;
