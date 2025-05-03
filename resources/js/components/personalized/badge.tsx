import React from "react";
import Image from "./image";

interface BadgeItem {
  id: number | string;
  name: string;
  logo: string;
}

interface BadgeProps {
  items: BadgeItem[];
}

function Badge({ items }: BadgeProps) {
  return (
    <>
      {
        items.map((item: any) => (
          <div key={item.id} className='flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit'>
            <Image src={item.logo} className="!w-4 !h-4 object-cover rounded-xs" />
            <p className='text-sm text-white/80 tracking-wide'>
              {item.name}
            </p>
          </div>
        ))
      }
    </>
  );
}

export default Badge;
