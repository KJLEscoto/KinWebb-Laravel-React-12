import React from 'react';

type HyperLogoProps = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
};

function HyperLogo({ Icon, url }: HyperLogoProps) {
  return (
    <div className="flex items-center justify-between w-full transition-all duration-500">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-full border border-white/30 hover:border-white cursor-pointer transition-all duration-300 hover:bg-white group"
      >
        <Icon className="size-3 text-white group-hover:text-black transition-all duration-300" />
      </a>
    </div>
  );
}

export default HyperLogo;
