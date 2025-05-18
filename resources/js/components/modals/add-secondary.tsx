import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';

type AddSecondaryForm = {
  secondary: string;
  secondary_highlight?: string | null;
}

export default function AddSecondary() {
  const secondaryInput = useRef<HTMLInputElement>(null);
  const secondaryHighlightInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddSecondaryForm>({
    secondary: '',
    secondary_highlight: ''
  });

  const addSecondary: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.about-me.store-secondary-text'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        secondaryInput.current?.focus()
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
      <Dialog>
        <DialogTrigger asChild>
          <Button size='sm' variant="default">Add Secondary</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Add Secondary</DialogTitle>
          <DialogDescription>
            This will be the second paragraph in about me page.
          </DialogDescription>
          <form className="space-y-6" onSubmit={addSecondary}>
            <div className="grid gap-2">
              <Label htmlFor="secondary">
                Secondary
              </Label>

              <Textarea
                required id="secondary"
                placeholder="I am..."
                className="bg-transparent dark:!bg-[#0a0a0a] h-20"
                value={data.secondary}
                onChange={(e) => setData("secondary", e.target.value)}
              />
              <InputError message={errors.secondary} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="secondary_highlight">
                Highlight (1 word)
              </Label>
              <Input
                id="secondary_highlight"
                type="text"
                name="secondary_highlight"
                ref={secondaryHighlightInput}
                value={data.secondary_highlight ?? ''}
                onChange={(e) => setData('secondary_highlight', e.target.value)}
                placeholder="from the secondary"
              />
              <p className='text-sm font-light text-white/70'>minimalist, design, etc.</p>
              <InputError message={errors.secondary_highlight} />
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
