import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClientLayout from '@/layouts/client-layout';
import { Head, Link, useForm, } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, FilePen, Info } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import InputError from '@/components/input-error';
import { slugify } from '@/lib/utils';
import { Framework, Project, Role, Tag, Tool } from '@/types';

type RequestForm = {
  email: string;
  project?: number | null;
}

type ShowProjectProps = {
  project: Project;
  project_names: string[];
}

export default function Show({ project, project_names }: ShowProjectProps) {
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

  const page_title = project.name + ' | Projects';

  return (
    <ClientLayout>
      <Head title={page_title} />
      <main className='min-h-screen !pt-35 !pb-20 shadow-lg w-full flex flex-col items-start justify-start bg-[#040204] h-auto lg:p-0 p-5 gap-10'>
        <div className='mx-auto w-full max-w-5xl space-y-20'>

          <header className='flex flex-row gap-5 items-start h-auto'>
            <aside className='flex flex-col gap-10 justify-between w-full h-70'>
              <section className='space-y-2'>
                <p className="font-light text-white/60">
                  {
                    project.tags.map((tag: Tag, index: number) => (
                      <span key={tag.id} className="capitalize text-nowrap mr-2">
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
                      project.roles.map((role: Role, index: number) => (
                        <span key={role.id} className="capitalize text-nowrap mr-2">
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
                <h3 className='text-sm flex items-start'>Tools</h3>
                <div className='flex items-center flex-wrap gap-2'>
                  {
                    project.tools.map((tool: Tool) => (
                      <div key={tool.id} className='flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit'>
                        <Image src={tool.logo} className="!w-4 !h-4 object-cover" />
                        <p className='text-sm text-white/80 tracking-wide'>
                          {tool.name}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </>
            }

            {project.frameworks.length > 0 &&
              <>
                <h3 className='text-sm flex items-start'>Frameworks</h3>
                <div className='flex items-center flex-wrap gap-2'>
                  {
                    project.frameworks.map((framework: Framework) => (
                      <div key={framework.id} className='flex items-center gap-2 rounded-sm bg-[#131313] px-3 py-2 select-none w-fit'>
                        <Image src={framework.logo} className="!w-4 !h-4 object-cover" />
                        <p className='text-sm text-white/80 tracking-wide'>
                          {framework.name}
                        </p>
                      </div>
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
                    <ChevronLeftIcon className='size-4' />
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
                    <ChevronRightIcon className='size-4' />
                  </Button>
                </div>
              </section>

              <section className='flex flex-col items-center justify-center w-full'>
                <div className='w-fit'>
                  <Image
                    src={`/storage/${project.screenshots[currentPage].image}`}
                    alt={project.screenshots[currentPage].name}
                  />
                  <p className='text-center border py-2'>
                    {project.screenshots[currentPage].name}
                  </p>
                </div>
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

                  <section className='flex flex-col gap-2 items-center tracking-wider text-white/50 font-light px-24'>
                    <Image src='/images/gcash.png' className='!w-30' alt='gcash' />
                    <p className='text-xs'>If you’d like to show some support, feel free to scan my <span className='text-blue-500 font-bold'>GCash</span> QR code. Every little bit is appreciated!</p>
                    <Info className='size-4' />
                  </section>
                </div>
              </DrawerContent>
            </Drawer>

          </section>

          <section className='w-full flex items-center justify-between'>
            {(() => {
              const currentIndex = project_names.findIndex(name => name === project.name);
              const prev = currentIndex > 0 ? project_names[currentIndex - 1] : null;
              const next = currentIndex < project_names.length - 1 ? project_names[currentIndex + 1] : null;

              return (
                <>
                  {prev ? (
                    <Link href={route('projects.show', slugify(prev))} className='flex items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white'>
                      <ChevronLeftIcon className='size-11' />
                      {prev}
                    </Link>
                  ) : <div></div>}

                  {next ? (
                    <Link href={route('projects.show', slugify(next))} className='flex items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white'>
                      {next}
                      <ChevronRightIcon className='size-11' />
                    </Link>
                  ) : <div></div>}
                </>
              );
            })()}
          </section>

        </div>
      </main>
    </ClientLayout>
  );
}