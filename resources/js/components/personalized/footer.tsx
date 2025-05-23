import { SharedData } from "@/types";
import { Button } from "../ui/button";
import { usePage } from "@inertiajs/react";

function Footer() {
  const { user } = usePage<SharedData>().props;

  const email = user?.email ?? 'kin.webb.1024@gmail.com';

  return (
    <footer className='flex flex-col justify-center items-center min-h-96 gap-8 xl:p-0 p-5 bg-white text-black w-full select-none'>
      <h3 className="text-sm capitalize font-bold">HAVE AN IDEA IN MIND?</h3>

      <p className="text-2xl font-light text-center">
        Let's work
        <span className="italic font-medium mx-1.5">together</span>
        on your project.
      </p>

      <a href={`mailto:${email}`} >
        <Button size='lg' variant='outline' className="rounded-full !py-6 !px-7 flex items-center gap-2 !bg-white hover:!bg-black !text-black hover:!text-white transition-all duration-300 text-base">
          {email}
        </Button>
      </a>
    </footer>
  )
}

export default Footer;