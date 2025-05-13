import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import InputError from '@/components/input-error';
import { FormEventHandler, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button } from "../ui/button";
import { FilePen, Info } from "lucide-react";
import { Input } from "../ui/input";
import Image from "./image";
import { Project } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type RequestForm = {
  email: string;
  project?: number | null;
}

type ProjectRequestProps = {
  request: Project
}

function ProjectRequestForm({ request }: ProjectRequestProps) {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm<Required<RequestForm>>({
    email: '',
    project: request.id
  });

  const submitRequest: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('projects.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('email')
        setIsDrawerOpen(false);
      }
    });
  };

  return (
    <div className='flex items-center w-full justify-between gap-10'>
      <h3 className="tracking-wide">
        Want a copy of {request.name}?
        <span className='ml-2 text-white/70'>Request now for free.</span>
      </h3>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger>
          <Button size='sm' className='rounded-full !px-5'>
            Request Now
            <FilePen className='size-4' />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='max-w-lg w-full mx-auto my-10 text-center space-y-8'>
            <section className='space-y-2'>
              <h1 className='text-xl font-medium'>Request a Free Copy of This Project</h1>
              <p className='text-sm font-light px-5 tracking-wide text-white/70'>
                Like what you see? Fill out the form with your email, and I'll send
                over a free copy of this project straight to your inbox.
              </p>
            </section>

            <form onSubmit={submitRequest} className='flex flex-row items-center'>
              <Input
                id="email"
                type="email"
                required
                className='rounded-none'
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Email address"
              />
              <Button size='sm' disabled={processing} className='rounded-none' variant='default' type='submit'>
                Submit
              </Button>

              <InputError className='text-center' message={errors.email} />
            </form>

            {/* <section className='flex flex-col gap-2 items-center tracking-wider text-white/50 font-light px-24'>
              <Dialog>
                <DialogTrigger>
                  <Image src='/images/gcash.jpg' className='!w-30 cursor-zoom-in' alt='gcash' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Gcash QR Code</DialogTitle>
                  </DialogHeader>
                  <Image src='/images/gcash.jpg' alt='gcash zoom in' />
                </DialogContent>
              </Dialog>

              <p className='text-xs'>If you’d like to show some support, feel free to scan my <span className='text-blue-500 font-bold'>GCash</span> QR code. Every little bit is appreciated!</p>

              <Dialog>
                <DialogTrigger className="cursor-pointer">
                  <Info className='size-4 hover:text-white transition' />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Appreciation</DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </section> */}
          </div>
        </DrawerContent>
      </Drawer>

    </div>
  )
}

export default ProjectRequestForm;