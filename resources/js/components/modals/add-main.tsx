import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';

type AddMainForm = {
  main: string;
  main_highlight?: string | null;
}

export default function AddMain() {
  const mainInput = useRef<HTMLInputElement>(null);
  const mainHighlightInput = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddMainForm>({
    main: '',
    main_highlight: ''
  });

  const addMain: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.about-me.store-main-text'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
      onError: () => {
        mainInput.current?.focus()
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
          <Button size='sm' variant="default">Add Main</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide'>
          <DialogTitle>Add Main</DialogTitle>
          <DialogDescription>
            This will be the first paragraph in about me page.
          </DialogDescription>
          <form className="space-y-6" onSubmit={addMain}>
            <div className="grid gap-2">
              <Label htmlFor="main">
                Main
              </Label>

              <Textarea
                required id="main"
                placeholder="I am..."
                className="bg-transparent dark:!bg-[#0a0a0a] h-20"
                value={data.main}
                onChange={(e) => setData("main", e.target.value)}
              />
              <InputError message={errors.main} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="main_highlight">
                Highlight (1 word)
              </Label>
              <Input
                id="main_highlight"
                type="text"
                name="main_highlight"
                ref={mainHighlightInput}
                value={data.main_highlight ?? ''}
                onChange={(e) => setData('main_highlight', e.target.value)}
                placeholder="from the main"
              />
              <p className='text-sm font-light text-white/70'>minimalist, design, etc.</p>
              <InputError message={errors.main_highlight} />
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
