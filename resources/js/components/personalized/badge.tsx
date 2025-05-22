import React from "react";
import Image from "./image";
import { Link } from "@inertiajs/react";
import { slugify, techLogo } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from "../ui/button";
import { Edit3, Trash2 } from "lucide-react";

interface BadgeItem {
  id: number | string;
  name: string;
  logo: string;
}

type BadgeProps = {
  items: BadgeItem[];
  asLink?: boolean;
  asModal?: boolean;
}

function Badge({ items, asLink, asModal }: BadgeProps) {
  return (
    <>
      {items.map((item) => {

        const content = (
          <div
            className={`flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit ${(asLink || asModal) && 'hover:!bg-white/10 transition cursor-pointer'
              }`}
          >
            <Image
              src={techLogo(item)}
              alt={item.logo}
              className="!w-4 !h-4 object-cover rounded-xs"
            />
            <p className="text-sm text-white/80 tracking-wide">{item.name}</p>
          </div>
        );

        if (asModal) {
          return (
            <div key={item.id}>
              <Dialog>
                <DialogTrigger asChild>
                  {content}
                </DialogTrigger>
                <DialogContent className="lg:!min-w-md">
                  <DialogTitle className="flex items-center justify-between">
                    <div className="truncate w-1/2">{item.name}</div>

                    <section className="flex items-center">
                      <Button size='icon' variant='ghost'>
                        <Edit3 className="size-4" />
                      </Button>
                      <Button size='icon' variant='ghost'>
                        <Trash2 className="size-4 text-red-500" />
                      </Button>
                    </section>
                  </DialogTitle>
                  <Image
                    src={techLogo(item)}
                    alt={item.logo}
                    className='!w-full'
                  />
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
    </>
  );
}


export default Badge;
