import { formatDateRange } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  name: string;
  link: string;
  started: string;
  ended: string | null;
  content: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, started, ended, name, link, content, isOpen, onToggle }) => {
  return (
    <div className="border-b overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center justify-between w-full py-3 gap-5 text-left text-lg font-medium cursor-pointer hover:opacity-60 transition-opacity"
      >
        <div className='flex items-center justify-between w-full gap-5'>
          <section className='flex items-center gap-2 w-full truncate'>
            <h1 className='uppercase font-light'>{title}</h1>
            <a href={link} target='_blank' className='text-blue-500 hover:underline truncate' rel="noopener noreferrer">
              @{name}
            </a>
          </section>
          <section className='font-light text-sm uppercase w-fit text-nowrap text-right'>
            {formatDateRange(started, ended)}
          </section>
        </div>
        <div>
          <ChevronDown
            className={`size-4 transition-transform duration-300 text-nowrap block ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </button>

      <div
        className={`grid transition-[grid-template-rows] pb-5 duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
      >
        <div className="overflow-hidden text-sm text-gray-700 prose max-w-none">
          {content}
        </div>
      </div>
    </div>
  );
};
