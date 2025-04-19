import { MoveDown } from "lucide-react";
import Image from "./image";

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center lg:p-0 p-5'>

      <div className="relative h-full w-full flex items-center justify-center">
        <Image src="/gif/orb.gif" />

        <span className='absolute md:-top-10 bottom-5 transition-all duration-500'>
          <Image src="/images/big-logo.png" className="lg:max-w-5xl" />
        </span>
      </div>

      <p className='text-[#A0A0A0] text-sm tracking-wide'>
        Hey, I'm <strong>Kin</strong> — I build sleek, scalable, and user-focused web solutions.
      </p>

      <div className='flex items-center gap-1 md:mt-10 mt-52 transition-all duration-500 cursor-pointer'>
        Scroll To Explore
        <MoveDown className='w-5 h-auto' />
      </div>
    </div>
  )
}

export default Hero;