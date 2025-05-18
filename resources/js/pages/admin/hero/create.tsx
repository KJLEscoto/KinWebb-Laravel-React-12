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
  { title: 'Hero', href: '/admin/hero' },
  { title: 'Add Entry', href: '/admin/hero/create' },
];

type AddEntryForm = {
  logoImage: File | null;
  modelImage: File | null;
  body: string;
  isActive: boolean;
};

export default function Create() {

  const { data, setData, post, processing, errors, reset } = useForm<AddEntryForm>({
    logoImage: null,
    modelImage: null,
    body: '',
    isActive: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    // Check if both are empty
    const isLogoEmpty = !data.logoImage;
    const isModelEmpty = !data.modelImage;

    if (isLogoEmpty) {
      toast.warning('Please upload a logo image.');
      return;
    }

    if (isModelEmpty) {
      toast.warning('Please upload a model image.');
      return;
    }

    post(route('admin.hero.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Entry | Hero" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <form className="flex flex-col gap-6" onSubmit={submit}>
          <div className="grid gap-6">
            <div className="flex justify-between items-center">
              <Link href={route('admin.hero.index')} className="flex items-center gap-2">
                <Button variant="outline">
                  <ArrowLeft className="size-4" />
                  Back
                </Button>
              </Link>
              <Button type="submit" disabled={processing}>
                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                Save Entry
                <Save className="h-4 w-4" />
              </Button>
            </div>

            <div className='grid grid-cols-2 gap-5'>
              <section className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <Title title='Logo Image' />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="logoImage" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Select Logo
                    </Label>
                    <Button
                      variant="destructive"
                      type="button"
                      disabled={processing || !data.logoImage}
                      onClick={() => setData('logoImage', null)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <Input
                  hidden
                  id="logoImage"
                  name="logoImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setData('logoImage', file);
                  }}
                />
                <InputError message={errors.logoImage} />

                {data.logoImage && (
                  <div className="flex justify-center">
                    <Image src={URL.createObjectURL(data.logoImage)} className="object-cover" />
                  </div>
                )}
              </section>

              <section className="w-full flex flex-col gap-3">
                <div className="flex items-center gap-5">
                  <Title title='Model Image' />
                  <div className="flex items-center gap-3">
                    <Label htmlFor="modelImage" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
                      <ImageIcon className="w-3.5 h-3.5" />
                      Select Model
                    </Label>
                    <Button
                      variant="destructive"
                      type="button"
                      disabled={processing || !data.modelImage}
                      onClick={() => setData('modelImage', null)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                <Input
                  hidden
                  id="modelImage"
                  name="modelImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setData('modelImage', file);
                  }}
                />
                <InputError message={errors.modelImage} />

                {data.modelImage && (
                  <div className="flex justify-center">
                    <Image src={URL.createObjectURL(data.modelImage)} className="object-cover" />
                  </div>
                )}
              </section>
            </div>


            <section className="w-full flex flex-col gap-3">
              <Title title="Body" />
              <Input
                id="body"
                type="text"
                required
                autoFocus
                placeholder="I am..."
                value={data.body}
                onChange={(e) => setData('body', e.target.value)}
              />
              <InputError message={errors.body} />
            </section>

          </div>
        </form>
      </div>
    </AppLayout>
  );
}
