import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Edit3 } from 'lucide-react';

type AddTechStackForm = {
  name: string;
};

type TechStackProps = {
  techstack: any,
  tech_type: string,
}

export default function EditTechStack({ techstack, tech_type }: TechStackProps) {
  const [open, setOpen] = useState(false);

  const {
    data,
    setData,
    patch,
    processing,
    errors,
    clearErrors,
  } = useForm<AddTechStackForm>({
    name: techstack.name ?? '',
  });

  const addTechStack: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('admin.techstack.update', techstack.id), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal()
      }
    });
  };

  const closeModal = () => {
    setOpen(false);
    clearErrors();
  };

  useEffect(() => {
    setData('name', techstack.name ?? '');
  }, [techstack.name]);

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size='icon'>
            <Edit3 className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='lg:!max-w-xl !w-full'>
          <DialogTitle>Edit <span className='capitalize'>{tech_type}</span></DialogTitle>

          <form className="flex flex-col gap-6" onSubmit={addTechStack}>
            <div className="grid gap-6">
              <section className="w-full flex flex-col gap-3">
                <Label htmlFor="name">Name</Label>
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
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default"
                disabled={processing}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
