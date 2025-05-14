import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';

type AddShortForm = {
  body: string;
  highlight?: string | null;
}

export default function AddShort() {
  const bodyInput = useRef<HTMLInputElement>(null);
  const highlightInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddShortForm>({
    body: '',
    highlight: ''
  });

  const addShort: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.about-me.store-short'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        bodyInput.current?.focus()
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
          <Button size='sm' variant="default">Add Short</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Add Short</DialogTitle>
          <DialogDescription>
            This will be a short introduction about me and what I do.
          </DialogDescription>
          <form className="space-y-6" onSubmit={addShort}>
            <div className="grid gap-2">
              <Label htmlFor="body">
                Body
              </Label>

              <Textarea
                required id="body"
                placeholder="I am..."
                className="bg-transparent dark:!bg-[#0a0a0a] h-20"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
              />
              <InputError message={errors.body} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="highlight">
                Highlight a word
              </Label>

              <Input
                id="highlight"
                type="text"
                name="highlight"
                ref={highlightInput}
                value={data.highlight ?? ''}
                onChange={(e) => setData('highlight', e.target.value)}
                placeholder="from the body"
              />
              <InputError message={errors.highlight} />
            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default" disabled={processing}>
                Submit Short
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
