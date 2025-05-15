import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveDown } from 'lucide-react';
import Image from './image';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const { main_hero } = usePage<SharedData>().props;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!buttonRef.current || !heroRef.current) return;

    gsap.set(buttonRef.current, { autoAlpha: 0 }); // hide initially

    const showButton = () => {
      gsap.to(buttonRef.current, { autoAlpha: 1, duration: 1 });
    };

    const hideButton = () => {
      gsap.to(buttonRef.current, { autoAlpha: 0, duration: 0.5 });
    };

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => {
        // Wait 3 seconds before showing the button
        timeoutRef.current = setTimeout(showButton, 1000);
      },
      onLeave: () => {
        hideButton();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
      onEnterBack: () => {
        timeoutRef.current = setTimeout(showButton, 1000);
      },
      onLeaveBack: () => {
        hideButton();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      },
    });

    // Cleanup on unmount
    return () => {
      trigger.kill();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleScroll = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={heroRef}
      className='flex flex-col items-center justify-center min-h-screen h-auto text-center lg:p-0 p-5'
    >
      {main_hero ? (
        <>
          <header className="relative h-full w-full flex items-center justify-center">
            <Image className="lg:!max-w-xl" src={`/storage/${main_hero.model_image}`} alt="model image" />
            <span className='absolute md:-top-10 bottom-5 transition-all duration-500'>
              <Image src={`/storage/${main_hero.logo_image}`} alt="logo image" className="lg:!max-w-5xl" />
            </span>
          </header>

          <p className='text-[#A0A0A0] text-sm tracking-wide mt-3'>
            {main_hero.body}
          </p>
        </>
      ) : (
        <div className='text-5xl text-center'>Coming Soon...</div>
      )}

      <button
        ref={buttonRef}
        onClick={handleScroll}
        className='flex items-center gap-1 md:mt-10 mt-52 transition-all opacity-0 font-light duration-500 cursor-pointer hover:translate-y-2'
      >
        Scroll To Explore
        <MoveDown className='w-5 h-auto' />
      </button>
    </div>
  );
}

export default Hero;
