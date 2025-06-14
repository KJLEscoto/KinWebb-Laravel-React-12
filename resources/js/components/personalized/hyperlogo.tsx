import { socialsLogo } from '@/lib/utils';
import Image from './image';

type HyperLogoProps = {
  logo: string;
  link: string;
};

function HyperLogo({ logo, link }: HyperLogoProps) {
  return (
    <div className="flex items-center justify-between w-full transition-all duration-500">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 rounded-full border border-white/30 hover:border-white cursor-pointer transition-all duration-300 hover:bg-white group"
      >
        {/* <Icon className="size-3 text-white group-hover:text-black transition-all duration-300" /> */}
        <Image
          src={socialsLogo('client', logo)}
          // alt={logo}
          className="!w-5 text-white group-hover:text-black transition-all duration-300 rounded-full aspect-square"
        />
      </a>
    </div>
  );
}

export default HyperLogo;
