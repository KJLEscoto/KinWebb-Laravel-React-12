import InputError from '@/components/input-error';
import Image from '@/components/personalized/image';
import Title from '@/components/personalized/title';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, Save, ImageIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs = [
  { title: 'Tech Stack', href: '/admin/projects' },
  { title: 'Add Tech Stack', href: '/admin/tech-stack/create' },
];

type AddTechStackForm = {
  name: string;
  logoUpload: File | null;
  logoUrl: string;
  type: string;
};

export default function Create() {
  const techtype = [
    { id: 'tool', title: 'Tool' },
    { id: 'framework', title: 'Framework' },
  ];

  const [isUrlMode, setIsUrlMode] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm<AddTechStackForm>({
    name: '',
    logoUpload: null,
    logoUrl: '',
    type: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // Check if both are empty
    const isLogoEmpty = !data.logoUpload;
    const isLogoUrlEmpty = !data.logoUrl.trim();

    if (isLogoEmpty && isLogoUrlEmpty) {
      toast.warning('Please upload a logo or URL.');
      return;
    }

    if (!data.type) {
      toast.warning('Please select a tech type.');
      return;
    }

    post(route('admin.techstack.store'), {
      onSuccess: () => reset(),
    });
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Tech Stack | Tech Stack" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <Link href={route('admin.techstack.index')} className="flex items-center gap-2">
                <Button variant="outline">
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              </Link>
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Save Tech Stack
                <Save className="h-4 w-4" />
              </Button>
            </div>

            <Title title="Tech Stack" />
            <div className="flex gap-5 w-full">
              <section className="w-full flex flex-col gap-3">
                <Label htmlFor="name">Tech Stack Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  autoFocus
                  placeholder="Untitled"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name} />
              </section>

              <section className="w-full flex flex-col gap-3">
                <Label>Tech Type</Label>
                <div className="space-y-3 ml-2">
                  {techtype.map((type) => (
                    <div key={type.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={type.id}
                        checked={data.type === type.id}
                        onCheckedChange={(checked) => setData('type', checked ? type.id : '')}
                      />
                      <Label htmlFor={type.id} className="font-normal cursor-pointer">
                        {type.title}
                      </Label>
                    </div>
                  ))}
                </div>
                <InputError message={errors.type} />
              </section>
            </div>

            <div className="flex gap-2 items-center">
              <Switch
                checked={isUrlMode}
                onCheckedChange={(checked) => {
                  setIsUrlMode(checked);
                  if (checked) {
                    setData('logoUrl', ''); // Reset URL when switching to upload
                  } else {
                    setData('logoUpload', null); // Reset file when switching to URL
                  }
                }}
              />
              <p>{isUrlMode ? 'Switch to URL' : 'Switch to upload'}</p>
            </div>

            {isUrlMode ? (
              <section className="w-full flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <Title title="Tech Stack Logo (Upload)" />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="thumbnail" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Select Logo
                    </Label>
                    <Button
                      variant="destructive"
                      type="button"
                      disabled={processing || !data.logoUpload}
                      onClick={() => setData('logoUpload', null)}
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
                    setData('logoUpload', file);
                  }}
                />
                <InputError message={errors.logoUpload} />

                {data.logoUpload && (
                  <div className="flex justify-center">
                    <Image src={URL.createObjectURL(data.logoUpload)} className="object-cover rounded-sm lg:!max-w-2xl" />
                  </div>
                )}
              </section>
            ) : (
              <section className="w-full flex flex-col gap-3">
                <Title title="Tech Stack Logo (URL)" />
                <Input
                  id="logoUrl"
                  type="text"
                  placeholder="https://"
                  value={data.logoUrl}
                  onChange={(e) => setData('logoUrl', e.target.value)}
                />
                <InputError message={errors.logoUrl} />
              </section>
            )}

          </div>
        </form>
      </div>
    </AppLayout>
  );
}
