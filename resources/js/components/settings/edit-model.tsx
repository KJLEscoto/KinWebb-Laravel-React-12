import { usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ImageIcon } from 'lucide-react';
import Image from '../personalized/image';
import { toast } from 'sonner';
import { SharedData } from '@/types';

export default function EditModel() {
  const { about_me } = usePage<SharedData>().props;

  const [modelImage, setModelImage] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<{ modelImage?: string }>({});

  const EditModel: FormEventHandler = (e) => {
    e.preventDefault();

    if (!modelImage) {
      toast.warning('Please upload a model image.');
      return;
    }

    const formData = new FormData();
    formData.append('modelImage', modelImage);
    formData.append('_method', 'PATCH');

    setProcessing(true);

    Inertia.post(route('model.update', about_me.id), formData, {
      onSuccess: () => {
        toast.success('Model image updated!');
        setModelImage(null);
        setErrors({});
      },
      onError: (err: any) => {
        setErrors(err);
      },
      onFinish: () => setProcessing(false),
    });
  };

  return (
    <form onSubmit={EditModel} className='space-y-6'>
      <section className="w-full flex flex-col gap-3">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Label htmlFor="modelImage" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
              <ImageIcon className="size-4" />
              Change Model
            </Label>
            <Button
              variant="destructive"
              type="button"
              disabled={processing || !modelImage}
              onClick={() => setModelImage(null)}
            >
              Reset
            </Button>
            <Button disabled={processing || !modelImage} type='submit' variant='default'>
              Update
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
            setModelImage(file);
          }}
        />
        <InputError message={errors.modelImage} />
      </section>

      <div className='relative w-full'>
        <Image
          className={`relative !max-w-sm rounded-4xl ${modelImage ? 'opacity-50' : ''}`}
          src={`/storage/${about_me.picture}`} alt='model image' />
        {modelImage && (
          <div className="absolute z-10 ml-10 top-0 w-full h-full">
            <Image className='!max-w-sm rounded-4xl' src={URL.createObjectURL(modelImage)} />
          </div>
        )}
      </div>
    </form>
  );
}
