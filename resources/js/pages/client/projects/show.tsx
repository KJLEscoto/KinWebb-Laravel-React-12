import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClientLayout from '@/layouts/client-layout';
import { Head, useForm, } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, FilePen, Info } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import InputError from '@/components/input-error';

type RequestForm = {
  email: string;
  project: number | null;
}

export default function Show({ project }: { project: any }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const prevButton = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0))
  }

  const nextButton = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1))
  }

  const totalPages = project.screenshots.length;
  const [pageInput, setPageInput] = useState<string>(String(currentPage + 1));

  useEffect(() => {
    setPageInput((currentPage + 1).toString());
  }, [currentPage]);

  const handlePageInput = () => {
    const parsed = parseInt(pageInput.toString());
    if (!isNaN(parsed) && parsed >= 1 && parsed <= totalPages) {
      setCurrentPage(parsed - 1);
    } else {
      setPageInput((currentPage + 1).toString());
    }
  };

  const { data, setData, post, processing, errors, reset } = useForm<Required<RequestForm>>({
    email: '',
    project: project.id
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
    <ClientLayout>
      <Head title="Projects" />
      <main className='min-h-screen !pt-35 !pb-20 shadow-lg w-full flex flex-col items-start justify-start bg-[#040204] h-auto lg:p-0 p-5 gap-10'>
        <div className='mx-auto w-full max-w-5xl space-y-20'>

          <header className='flex flex-row gap-5 items-start h-auto'>
            <aside className='flex flex-col gap-10 justify-between w-full h-70'>
              <section className='space-y-2'>
                <p className="font-light text-white/60">
                  {
                    project.tags.map((tag: any, index: number) => (
                      <span key={tag.id} className="capitalize text-nowrap">
                        {tag.title}{index < project.tags.length - 1 ? ',' : ''}
                      </span>
                    ))
                  }
                </p>
                <h1 className="font-medium text-5xl">{project.name}</h1>
                <p className='tracking-wide font-light'>{project.description}</p>
              </section>

              <section className='space-y-2'>
                <div className='border-b pb-2 grid grid-cols-2 w-full'>
                  <h3 className='text-sm flex items-end'>Year</h3>
                  <p className='text-white/70 font-light'>{project.year}</p>
                </div>

                <div className='border-b pb-2 grid grid-cols-2 w-full'>
                  <h3 className='text-sm flex items-end'>Role</h3>
                  <p className='text-white/70 font-light'>
                    {
                      project.roles.map((role: any, index: number) => (
                        <span key={role.id} className="capitalize text-nowrap">
                          {role.type}{index < project.roles.length - 1 ? ',' : ''}
                        </span>
                      ))
                    }
                  </p>
                </div>
              </section>
            </aside>

            <aside className='w-full'>
              <Image src={`/storage/${project.thumbnail}`} className="w-full h-full object-cover" />
            </aside>
          </header>

          <section className='grid grid-cols-2 gap-5 w-full'>
            {project.tools.length > 0 &&
              <>
                <h3 className='text-sm flex items-end'>Tools</h3>
                <div className='text-white/70 font-light'>
                  {
                    project.tools.map((tool: any, index: number) => (
                      <span key={tool.id} className="capitalize text-nowrap mr-2">
                        {tool.name}{index < project.tools.length - 1 ? ',' : ''}
                      </span>
                    ))
                  }
                </div>
              </>
            }

            {project.frameworks.length > 0 &&
              <>
                <h3 className='text-sm flex items-end'>Frameworks</h3>
                <div className='text-white/70 font-light'>
                  {
                    project.frameworks.map((framework: any, index: number) => (
                      <span key={framework.id} className="capitalize text-nowrap mr-2">
                        {framework.name}{index < project.frameworks.length - 1 ? ',' : ''}
                      </span>
                    ))
                  }
                </div>
              </>
            }
          </section>

          {project.screenshots.length > 0 &&
            <div className='space-y-5'>
              <section className='flex items-end justify-between gap-5'>
                <h1 className='text-lg font-bold flex items-end'>Screenshots</h1>
                <div className='flex items-center gap-2'>
                  <Button
                    onClick={prevButton}
                    variant='ghost'
                    size='sm'
                    className='!text-xs'
                    disabled={currentPage === 0}
                  >
                    <ChevronLeftIcon className='w-4 h-4' />
                    Prev
                  </Button>

                  <section className='flex items-center gap-2'>
                    <Input
                      id="currentPage"
                      type="text"
                      className='!w-10 !px-2 text-center'
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      onBlur={handlePageInput}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handlePageInput();
                      }}
                    />
                    <span>of {totalPages}</span>
                  </section>

                  <Button
                    onClick={nextButton}
                    variant='ghost'
                    size='sm'
                    className='!text-xs'
                    disabled={currentPage >= totalPages - 1}
                  >
                    Next
                    <ChevronRightIcon className='w-4 h-4' />
                  </Button>
                </div>
              </section>

              <section className='flex flex-col items-center justify-center w-full'>
                <Image
                  src={`/storage/${project.screenshots[currentPage].image}`}
                  alt={project.screenshots[currentPage].name}
                />
                <p className='text-center border w-full py-2'>
                  {project.screenshots[currentPage].name}
                </p>
              </section>
            </div>
          }

          <section className='flex items-center justify-between w-full'>
            <div>
              Want a copy of this project?
              <span className='ml-2 text-white/70'>Request now for free.</span>
            </div>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger>
                <Button className='rounded-full !px-5'>
                  Request Now
                  <FilePen className='w-3 h-3' />
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

                    <InputError message={errors.email} />
                  </form>

                  <section className='flex flex-col gap-2 items-center tracking-wider text-white/50 font-light px-24'>
                    <Image src='/images/gcash.png' className='!w-30' alt='gcash' />
                    <p className='text-xs'>If you’d like to show some support, feel free to scan my <span className='text-blue-500 font-bold'>GCash</span> QR code. Every little bit is appreciated!</p>
                    <Info className='w-3 h-3' />
                  </section>
                </div>
              </DrawerContent>
            </Drawer>

          </section>

        </div>
      </main>
    </ClientLayout>
  );
}