import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { AboutMe } from '@/types';
import { Edit3 } from 'lucide-react';

type EditSecondaryForm = {
  resume: string;
}

type AboutMeProps = {
  about_me: AboutMe
}

export default function EditResume() {
  const [open, setOpen] = useState(false);

  const resumeInput = useRef<HTMLInputElement>(null);

  const { about_me } = usePage<AboutMeProps>().props;

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditSecondaryForm>({
    resume: about_me?.resume_link ?? '',
  });

  const editResume: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('admin.about-me.update-resume', about_me.id), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        resumeInput.current?.focus()
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
        resume: about_me?.resume_link ?? '',
      });
      clearErrors();
    }
  }, [open, about_me, setData, clearErrors]);

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" variant="ghost">
            <Edit3 className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Edit Resumé</DialogTitle>
          <DialogDescription>
            This will be the active resumé.
          </DialogDescription>
          <form className="space-y-6" onSubmit={editResume}>
            <div className="grid gap-2">
              <Label htmlFor="resume">
                Link of the resumé
              </Label>

              <Textarea
                required id="resume"
                placeholder="https://"
                className="bg-transparent dark:!bg-[#0a0a0a] h-20"
                value={data.resume}
                onChange={(e) => setData("resume", e.target.value)}
              />
              <InputError message={errors.resume} />
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
