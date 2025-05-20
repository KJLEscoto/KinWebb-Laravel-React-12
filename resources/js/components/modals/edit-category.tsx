import { useForm, usePage } from '@inertiajs/react';
import { Dispatch, FormEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { Edit3 } from 'lucide-react';
import { Category } from '@/types';
type EditSkillCategoryForm = {
  name: string;
}

type EditProps = {
  category: Category;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

export default function EditSkillCategory({ category, open, setOpen, onClose }: EditProps) {

  const categoryInput = useRef<HTMLInputElement>(null);

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditSkillCategoryForm>({
    name: category.name,
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
    onClose();
  };

  useEffect(() => {
    if (category) {
      setData('name', category.name);
    }
  }, [category]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="space-y-6">
          <DialogTitle>Edit</DialogTitle>
          <form className="space-y-6" onSubmit={editCategory}>
            <div className="grid gap-2">
              <Label htmlFor="name">
                Category Name
              </Label>

              <Input
                required id="name"
                placeholder="Web Development, Web Design, etc."
                value={data.name}
                ref={categoryInput}
                autoFocus
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} />
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={() => closeModal()}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default" disabled={processing || !data.name}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>

  )
}
