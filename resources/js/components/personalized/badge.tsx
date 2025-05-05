import React from "react";
import Image from "./image";
import { Link } from "@inertiajs/react";
import { slugify } from "@/lib/utils";

interface BadgeItem {
  id: number | string;
  name: string;
  logo: string;
}

type BadgeProps = {
  items: BadgeItem[];
  asLink?: boolean;
}

function Badge({ items, asLink }: BadgeProps) {
  return (
    <>
      {items.map((item) => {
        const content = (
          <div className={`flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit ${asLink && 'hover:!bg-white/10 transition'}`}>
            <Image src={item.logo} className="!w-4 !h-4 object-cover rounded-xs" />
            <p className="text-sm text-white/80 tracking-wide">{item.name}</p>
          </div>
        );

        return asLink ? (
          <Link
            href={route("admin.techstack.show", slugify(item.name))}
            key={item.id}
          >
            {content}
          </Link>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </>
  );
}

export default Badge;
