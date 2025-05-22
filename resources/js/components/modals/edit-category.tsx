import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Category } from '@/types';
import { Edit3 } from 'lucide-react';
import { Input } from '../ui/input';

type EditSkillCategoryForm = {
  name: string;
}

type CategoryProps = {
  category: Category
}

export default function EditSkillCategory({ category }: CategoryProps) {
  const [open, setOpen] = useState(false);

  const categoryInput = useRef<HTMLInputElement>(null);

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditSkillCategoryForm>({
    name: category.name ?? '',
  });

  const editCategory: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('admin.skill-category.update', category.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        categoryInput.current?.focus()
      },
      onFinish: () => reset(),
    });
  };

  const closeModal = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setData({
        name: category.name ?? '',
      });
      clearErrors();
    }
  }, [open, category, setData, clearErrors]);

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Edit3 className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className='!max-w-xl w-full'>
          <DialogTitle>Edit Category</DialogTitle>
          <form className="space-y-6" onSubmit={editCategory}>
            <div className="grid gap-2">
              <Label htmlFor="name">
                Category Name
              </Label>

              <Input
                required id="category"
                ref={categoryInput}
                placeholder="Web Development, Web Design, etc."
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} />
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default" disabled={processing}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
