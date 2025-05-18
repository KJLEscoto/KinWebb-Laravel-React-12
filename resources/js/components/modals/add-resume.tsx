import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';

type AddResumeForm = {
  resume: string;
}

export default function AddResume() {
  const resumeInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddResumeForm>({
    resume: '',
  });

  const addResume: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.about-me.store-resume'), {
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
  };

  return (
    <div className="space-y-6">
      {/* <HeadingSmall title="Delete account" description="Delete your account and all of its resources" /> */}

      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant="default">Add Resumé</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Add Resumé</DialogTitle>
          <DialogDescription>
            This will be the active resumé.
          </DialogDescription>
          <form className="space-y-6" onSubmit={addResume}>
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
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
