import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { Skill } from '@/types';
import { Edit3 } from 'lucide-react';

type AddSkillCategoryForm = {
  description: string;
};

type EditSkillProps = {
  skill: Skill
}

const placeholder = [
  'Build a...',
  'Design some...',
  'Manage a...',
  'Use a...',
  'Work with...',
]

const getRandomPlaceholder = () => {
  return placeholder[Math.floor(Math.random() * placeholder.length)];
};

export default function EditSkills({ skill }: EditSkillProps) {

  const [open, setOpen] = useState(false);
  const [randomPlaceholder, setRandomPlaceholder] = useState(getRandomPlaceholder());

  const { data, setData, patch, processing, reset, errors, clearErrors } = useForm<AddSkillCategoryForm>({
    description: skill.description ?? '',
  });

  const editCategory: FormEventHandler = (e) => {
    e.preventDefault();

    patch(route('admin.skills.update', skill.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setOpen(false);
    clearErrors();
    reset();
  };

  useEffect(() => {
    setRandomPlaceholder(getRandomPlaceholder());
  }, []);

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <Edit3 className="size-4 " />
          </Button>
        </DialogTrigger>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className='!max-w-xl w-full'>
          <DialogTitle>Add Skill</DialogTitle>

          <form className="space-y-6" onSubmit={editCategory}>

            <div className="grid gap-2">
              <Label htmlFor="skill_description">
                Skill Description
              </Label>

              <Textarea
                id="skill_description"
                required
                placeholder={randomPlaceholder}
                className="!bg-transparent h-10"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)} />
              <InputError message={errors.description} />
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
