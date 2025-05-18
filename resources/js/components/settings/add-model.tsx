import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { ImageIcon } from 'lucide-react';
import Image from '../personalized/image';
import { toast } from 'sonner';

type AddModelForm = {
  modelImage: File | null;
}

export default function AddModel() {
  const { data, setData, post, processing, errors, reset } = useForm<AddModelForm>({
    modelImage: null,
  });

  const addModel: FormEventHandler = (e) => {
    e.preventDefault();
    const isModelEmpty = !data.modelImage;

    if (isModelEmpty) {
      toast.warning('Please upload a model image.');
      return;
    }

    post(route('model.store'), {
      onSuccess: () => reset(),
    });
  };

  return (
    <form onSubmit={addModel}>
      <section className="w-full flex flex-col gap-6">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3">
            <Label htmlFor="modelImage" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
              <ImageIcon className="size-4" />
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
            <Button disabled={processing || !data.modelImage} type='submit' variant='default'>
              Set
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
          <Image src={URL.createObjectURL(data.modelImage)} className="!max-w-sm rounded-4xl" />
        )}
      </section>
    </form>
  );
}
