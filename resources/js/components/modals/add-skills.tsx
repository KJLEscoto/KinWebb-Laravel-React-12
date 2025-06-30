import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

type AddSkillCategoryForm = {
  id: number;
  description: string;
};

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

export default function AddSkills({ id }: { id: number }) {

  const [open, setOpen] = useState(false);
  const [randomPlaceholder, setRandomPlaceholder] = useState(getRandomPlaceholder());

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddSkillCategoryForm>({
    id: id,
    description: '',
  });

  const addSkill: FormEventHandler = (e) => {
    e.preventDefault();

    if (route().current()?.endsWith('skills.index')) {
      post(route('admin.skills.store'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
      });
    } else if (route().current()?.endsWith('experiences.index')) {
      post(route('admin.experiences.store'), {
        preserveScroll: true,
        onSuccess: () => closeModal(),
      });
    } else {
      return toast.warning('Something went wrong!');
    }
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
      <Dialog open={open} onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (isOpen) setRandomPlaceholder(getRandomPlaceholder());
      }} >
        <DialogTrigger asChild>
          <Button variant="ghost" size='icon' aria-label="Add Skill">
            <Plus className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full'>
          <DialogTitle>Add Skill</DialogTitle>

          <form className="space-y-6" onSubmit={addSkill}>
            <div className="grid gap-2">
              <Label htmlFor="skill_description">
                Skill Description
              </Label>

              <Textarea
                id="skill_description"
                required
                disabled={processing}
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
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
