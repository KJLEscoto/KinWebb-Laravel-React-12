import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';

type AddSkillCategoryForm = {
  name: string;
}

export default function AddSkillCategory() {
  const [open, setOpen] = useState(false);

  const categoryInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddSkillCategoryForm>({
    name: '',
  });

  const addCategory: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.skill-category.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        categoryInput.current?.focus()
      }
    });
  };

  const closeModal = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Category</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Add Category</DialogTitle>

          <form className="space-y-6" onSubmit={addCategory}>
            <div className="grid gap-2">
              <Label htmlFor="category">
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
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
