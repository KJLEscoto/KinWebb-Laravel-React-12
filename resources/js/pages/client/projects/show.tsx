import Image from '@/components/personalized/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ClientLayout from '@/layouts/client-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ChevronLeftIcon, ChevronRightIcon, MoveRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { filterByType, slugify } from '@/lib/utils';
import { Project, Role, Tag } from '@/types';
import Shell from '@/components/personalized/shell';
import MainLayer from '@/components/personalized/main-layer';
import Comma from '@/components/personalized/comma-separated';
import Badge from '@/components/personalized/badge';
import ProjectRequestForm from '@/components/personalized/drawer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from '@/components/ui/separator';

type ShowProjectProps = {
  project: Project;
  random_projects: Project[]
  project_names: string[];
}

export default function Show() {

  const { project, project_names, random_projects } = usePage<ShowProjectProps>().props;

  const tools = filterByType(project.techstack, 'tool');
  const frameworks = filterByType(project.techstack, 'framework');

  const [currentPage, setCurrentPage] = useState(0);

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

  const page_title = project.name + ' | Projects';

  return (
    <ClientLayout>
      <Head title={page_title} />
      <MainLayer paddingTop paddingBottom>

        <section className='w-full flex items-start gap-5'>
          {(() => {
            const currentIndex = project_names.findIndex(name => name === project.name);
            const getFirstWord = (name: string) => name ? name.split(' ')[0] : null;
            const prev = currentIndex > 0 ? project_names[currentIndex - 1] : null;
            const prevFirst = currentIndex > 0 ? getFirstWord(project_names[currentIndex - 1]) : null;
            const next = currentIndex < project_names.length - 1 ? project_names[currentIndex + 1] : null;
            const nextFirst = currentIndex < project_names.length - 1 ? getFirstWord(project_names[currentIndex + 1]) : null;

            return (
              <>
                {prev ? (
                  <Link href={route('projects.show', slugify(prev))} className='lg:flex hidden -mt-30 -mb-40 h-screen sticky top-10 justify-center left-0 w-1/4 items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white transition hover:bg-white/5'>
                    <ChevronLeftIcon className='size-10' />
                  </Link>
                )
                  : <div className='w-1/4 lg:block hidden'></div>
                }

                <Shell>
                  <div className='space-y-20'>
                    <header className='flex lg:flex-row flex-col-reverse gap-5 items-end h-full'>
                      <aside className='flex flex-col gap-10 justify-between min-h-70 w-full'>
                        <section className='space-y-2'>
                          <p className="font-light text-white/60 text-sm">
                            <Comma
                              items={project.tags.map((tag: Tag) => (
                                <span key={tag.id} className="capitalize text-nowrap text-sm">
                                  {tag.title}
                                </span>
                              ))}
                            />
                          </p>
                          <h1 className="font-medium text-5xl">{project.name}</h1>
                          <p className='tracking-wide font-light'>{project.description}</p>
                        </section>

                        <section className='space-y-3'>
                          <div className='border-b pb-2 grid grid-cols-2 w-full'>
                            <h3 className='text-sm flex items-end'>Year</h3>
                            <p className='text-white/70 font-light'>{project.year}</p>
                          </div>
                          <div className='border-b pb-2 grid grid-cols-2 w-full'>
                            <h3 className='text-sm flex items-end'>Role</h3>
                            <p className='text-white/70 font-light'>
                              <Comma
                                items={project.roles.map((role: Role) => (
                                  <span key={role.id} className="capitalize text-nowrap">
                                    {role.type}
                                  </span>
                                ))}
                              />
                            </p>
                          </div>
                        </section>
                      </aside>

                      <aside className='w-full'>
                        <Dialog>
                          <DialogTrigger className="cursor-pointer !w-full">
                            <Image src={`/storage/${project.thumbnail}`} className="cursor-zoom-in !w-full" />
                          </DialogTrigger>
                          <DialogContent className='lg:!min-w-5xl !max-w-5xl w-full'>
                            <DialogHeader>
                              <DialogTitle>Thumbnail</DialogTitle>
                            </DialogHeader>
                            <Image className='!w-full' src={`/storage/${project.thumbnail}`} alt={project.name} />
                          </DialogContent>
                        </Dialog>
                      </aside>
                    </header>

                    {
                      (tools.length > 0 || frameworks.length > 0) &&
                      <section className='grid lg:grid-cols-2 gap-x-5 lg:gap-y-10 gap-y-5 w-full'>
                        {
                          tools.length > 0 &&
                          <div className='w-full space-y-3'>
                            <h3 className='text-sm flex items-start'>Tools</h3>
                            <div className='flex items-center flex-wrap gap-2'>
                              <Badge items={tools} />
                            </div>
                          </div>
                        }

                        {
                          frameworks.length > 0 &&
                          <div className='w-full space-y-3'>
                            <h3 className='text-sm flex items-start'>Frameworks</h3>
                            <div className='flex items-center flex-wrap gap-2'>
                              <Badge items={frameworks} />
                            </div>
                          </div>
                        }
                      </section>
                    }

                    {project.screenshots.length > 0 &&
                      <div className='space-y-5'>
                        <section className='flex items-end justify-between gap-5'>
                          <h1 className='text-lg font-bold flex items-end'>Screenshots</h1>
                          <div className='flex items-center gap-2'>
                            <Button
                              onClick={prevButton}
                              variant='ghost'
                              size='icon'
                              disabled={currentPage === 0}
                            >
                              <ChevronLeftIcon className='size-4' />
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
                              size='icon'
                              disabled={currentPage >= totalPages - 1}
                            >
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

                    <section className='w-full lg:hidden flex items-center justify-between'>
                      {
                        <>
                          {prev ? (
                            <Link href={route('projects.show', slugify(prev))} className='flex items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white'>
                              <ChevronLeftIcon className='size-10' />
                              {prevFirst}
                            </Link>
                          )
                            : <div></div>
                          }
                          {next ? (
                            <Link href={route('projects.show', slugify(next))} className='flex items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white'>
                              {nextFirst}
                              <ChevronRightIcon className='size-10' />
                            </Link>
                          )
                            : <div></div>
                          }
                        </>
                      }
                    </section>
                  </div>

                  <Separator />

                  {/* project request drawer */}
                  <ProjectRequestForm request={project} />

                  <Separator />

                  <div className='space-y-5'>
                    <h1 className='text-xl font-bold'>More of my works</h1>

                    <section className='grid md:grid-cols-3 gap-5'>
                      {
                        random_projects.map((rand: Project) => (
                          <Link
                            href={route('projects.show', slugify(rand.name))}
                            className='group w-fit h-fit relative'
                          >
                            <Image src={`/storage/${rand.thumbnail}`} alt={project.name} />
                            <div className='group-hover:opacity-100 transition opacity-0 bg-black/80 absolute bottom-0 w-full p-3 truncate'>
                              {rand.name}
                            </div>
                          </Link>
                        ))
                      }
                    </section>

                    <Link href={route('projects.index')} className='group flex items-center gap-2 transition !w-fit font-light text-white/70 hover:text-white'>
                      See all projects
                      <MoveRight className='size-4 group-hover:translate-x-2 transition' />
                    </Link>
                  </div>
                </Shell>

                {next ? (
                  <Link href={route('projects.show', slugify(next))} className='lg:flex hidden h-screen -mt-30 -mb-40 sticky top-10 justify-center right-0 w-1/4 items-center gap-2 tracking-wide text-lg text-white/60 hover:text-white transition hover:bg-white/5'>
                    <ChevronRightIcon className='size-10' />
                  </Link>
                )
                  : <div className='w-1/4 lg:block hidden'></div>
                }
              </>
            );
          })()}
        </section>

      </MainLayer>
    </ClientLayout>
  );
}