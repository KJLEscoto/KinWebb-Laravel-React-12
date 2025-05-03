import InputError from '@/components/input-error';
import Image from '@/components/personalized/image';
import Title from '@/components/personalized/title';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Framework, Tool, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, FullscreenIcon, ImageIcon, LoaderCircle, Plus, Save } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Projects',
    href: '/admin/projects',
  },
  {
    title: 'Add Project',
    href: '/admin/projects/create',
  },
];

type AddProjectForm = {
  name: string;
  tags: string;
  description: string;
  thumbnail: File | null;
  year: string;
  roles: string;
  tools: Array<string>;
  frameworks: Array<string>;
  is_featured: boolean;
  screenshots: Array<{ name: string; image: File | null }>;
};

type CreateProjectsProps = {
  tools: Tool[],
  frameworks: Framework[]
}

export default function Create({ tools, frameworks }: CreateProjectsProps) {
  const addScreenshot = () => {
    setData('screenshots', [...data.screenshots, { name: '', image: null }]);
  };

  const resetScreenshot = (index: number) => {
    const newScreenshots = [...data.screenshots];
    newScreenshots[index] = { name: '', image: null };
    setData('screenshots', newScreenshots);
  };

  const deleteScreenshot = (index: number) => {
    const newScreenshots = data.screenshots.filter((_, i) => i !== index);
    setData('screenshots', newScreenshots);
  };

  const { data, setData, post, processing, errors, reset } = useForm<Required<AddProjectForm>>({
    name: '',
    tags: '',
    description: '',
    thumbnail: null,
    year: '',
    roles: '',
    tools: [],
    frameworks: [],
    is_featured: false,
    screenshots: [],
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // Thumbnail check
    if (!data.thumbnail) {
      toast.warning('Please select a project thumbnail.');
      return;
    }

    // Screenshot image check
    const hasEmptyScreenshot = data.screenshots.some((screenshot) => !screenshot.image);
    if (hasEmptyScreenshot) {
      toast.warning('Please select an image for screenshots.');
      return;
    }

    post(route('admin.projects.store'), {
      onSuccess: () => {
        reset();
        setData('screenshots', [{ name: '', image: null }]);
      },
    });
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Project | Projects" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <div className="grid gap-6">

            {/* project information section */}
            <div className='flex justify-between items-center'>
              <Link href={route('admin.projects.index')} className='flex items-center gap-2'>
                <Button variant='outline'>
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              </Link>
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Save Project
                <Save className="h-4 w-4" />
              </Button>
            </div>

            <Title title='Project Information' />
            <div className='flex gap-5 w-full'>
              <section className="w-full flex flex-col gap-3">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  placeholder='Untitled Project'
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} />
              </section>

              <section className="w-full flex flex-col gap-3">
                <Label htmlFor="tags">Tags <span className='opacity-50'>(comma separated)</span></Label>
                <Input
                  id="tags"
                  type="text"
                  required
                  autoComplete="tags"
                  placeholder='Web Development, Design, etc.'
                  value={data.tags}
                  onChange={(e) => setData('tags', e.target.value)}
                />
                <InputError message={errors.tags} />
              </section>
            </div>

            <section className="w-full flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                placeholder='This project is...'
                className="!bg-[#0a0a0a] h-40"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)} />
              <InputError message={errors.description} />
            </section>

            <div className='flex gap-5 w-full'>
              <section className="w-full flex flex-col gap-3">
                <Label htmlFor="roles">Roles <span className='opacity-50'>(comma separated)</span></Label>
                <Input
                  id="roles"
                  type="text"
                  required
                  autoComplete="roles"
                  placeholder='Developer, Designer, etc.'
                  value={data.roles}
                  onChange={(e) => setData('roles', e.target.value)}
                />
                <InputError message={errors.roles} />
              </section>

              <div className="w-full flex flex-col gap-3">
                <Label htmlFor="year">Year Created</Label>
                <Input
                  id="year"
                  type="text"
                  required
                  autoComplete="year"
                  placeholder='2023'
                  value={data.year}
                  onChange={(e) => setData('year', e.target.value)}
                />
                <InputError message={errors.year} />
              </div>
            </div>

            <div className="flex gap-5 w-full">
              {/* Tools Section */}
              <section className="w-full flex flex-col gap-3">
                <Label>Tools <span className='opacity-50'>(can be more than 1)</span></Label>
                <div className="w-fit ml-2 space-y-3">
                  {tools.map((tool: Tool) => {
                    const id = `tool-${tool.id}`;
                    return (
                      <div key={tool.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={id}
                          checked={data.tools.includes(tool.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setData('tools', [...data.tools, tool.name]);
                            } else {
                              setData('tools', data.tools.filter((t) => t !== tool.name));
                            }
                          }}
                        />
                        <Label htmlFor={id} className="font-normal cursor-pointer flex items-center gap-2">
                          <Image src={tool.logo} className='!w-4 !h-4 rounded' />
                          <p>{tool.name}</p>
                        </Label>
                      </div>
                    );
                  })}
                </div>
                <InputError message={errors.tools} />
              </section>

              {/* Frameworks Section */}
              <section className="w-full flex flex-col gap-3">
                <Label>Frameworks <span className='opacity-50'>(can be more than 1)</span></Label>
                <div className="w-fit ml-2 space-y-3">
                  {frameworks.map((framework: Framework) => {
                    const id = `framework-${framework.id}`;
                    return (
                      <div key={framework.id} className="flex items-start space-x-3">
                        <Checkbox
                          id={id}
                          checked={data.frameworks.includes(framework.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setData('frameworks', [...data.frameworks, framework.name]);
                            } else {
                              setData('frameworks', data.frameworks.filter((f) => f !== framework.name));
                            }
                          }}
                        />
                        <Label htmlFor={id} className="font-normal cursor-pointer flex items-center gap-2">
                          <Image src={framework.logo} className='!w-4 !h-4 rounded' />
                          <p>{framework.name}</p>
                        </Label>
                      </div>
                    );
                  })}
                </div>
                <InputError message={errors.frameworks} />
              </section>
            </div>

            <Separator />

            {/* project thumbnail section */}
            <section className="w-full flex flex-col gap-3">
              <div className='flex items-center justify-between'>
                <Title title='Project Thumbnail' />
                <div className="flex items-center gap-3">
                  <Label
                    className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg"
                    htmlFor="thumbnail"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    Select Thumbnail
                  </Label>
                  <Button variant="destructive" type="button" disabled={processing || !data.thumbnail}
                    onClick={() => setData('thumbnail', null)}
                  >
                    Reset
                  </Button>
                </div>
              </div>

              <Input
                hidden
                id="thumbnail"
                name="thumbnail"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setData('thumbnail', file);
                }}
              />
              <InputError message={errors.thumbnail} />

              {/* Preview */}
              {data.thumbnail && (
                <span className='flex justify-center'>
                  <Image
                    src={URL.createObjectURL(data.thumbnail)}
                    className="object-cover rounded-sm lg:!max-w-2xl"
                  />
                </span>
              )}
            </section>

            <Separator />

            {/* screenshot section */}
            <section className="w-full flex flex-col gap-3">
              <div className='flex items-center justify-between'>
                <Title title='Screenshots' />
                <Button variant='outline' type='button' onClick={addScreenshot}>
                  <Plus className="w-3.5 h-3.5" />
                  Add Entry
                </Button>
              </div>

              {data.screenshots.map((screenshot, index) => (
                <div key={index} className='mt-2'>
                  <section className='flex gap-5 w-full'>
                    <div className="w-full flex flex-col gap-3">
                      <Label htmlFor={`screenshot_name_${index}`}>Screenshot Name</Label>
                      <Input
                        id={`screenshot_name_${index}`}
                        type="text"
                        required
                        autoFocus
                        placeholder='Untitled Screenshot'
                        value={screenshot.name}
                        onChange={(e) => {
                          const newScreenshots = [...data.screenshots];
                          newScreenshots[index].name = e.target.value;
                          setData('screenshots', newScreenshots);
                        }}
                      />
                    </div>

                    <div className="w-full flex flex-col gap-3">
                      <Label>Screenshot Image</Label>
                      <Label
                        className="w-full cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-md"
                        htmlFor={`screenshot_image_${index}`}
                      >
                        Select Image
                        {screenshot.image && <Check className="w-3.5 h-3.5" />}
                      </Label>
                      <Input
                        hidden
                        id={`screenshot_image_${index}`}
                        name={`screenshot_image_${index}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          const newScreenshots = [...data.screenshots];
                          newScreenshots[index].image = file;
                          setData('screenshots', newScreenshots);
                        }}
                      />
                    </div>

                    <div className='flex items-end gap-2'>
                      <Button
                        variant='default'
                        type='button'
                        disabled={!screenshot.image}
                        onClick={() => window.open(URL.createObjectURL(screenshot.image!), '_blank')}
                      >
                        View Image
                      </Button>
                      <Button
                        variant='secondary'
                        type='button'
                        disabled={!screenshot.image}
                        onClick={() => resetScreenshot(index)}
                      >
                        Reset
                      </Button>
                      <Button
                        variant='destructive'
                        type='button'
                        onClick={() => deleteScreenshot(index)}
                      >
                        Delete
                      </Button>
                    </div>
                  </section>
                </div>
              ))}

            </section>

          </div>

        </form>
      </div>
    </AppLayout>
  );
}
