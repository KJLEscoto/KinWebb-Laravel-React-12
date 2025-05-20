import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import HeadingSmall from '@/components/heading-small';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { AboutMe } from '@/types';
import { Edit3 } from 'lucide-react';

type EditMainForm = {
  main: string;
  main_highlight?: string | null;
}

type AboutMeProps = {
  about_me: AboutMe
}

export default function EditMain() {
  const [open, setOpen] = useState(false);

  const mainInput = useRef<HTMLInputElement>(null);
  const mainHighlightInput = useRef<HTMLInputElement>(null);

  const { about_me } = usePage<AboutMeProps>().props;

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditMainForm>({
    main: about_me?.main_text ?? '',
    main_highlight: about_me?.main_text_highlight ?? '',
  });

  const editMain: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('admin.about-me.update-main-text', about_me.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: () => {
        mainInput.current?.focus()
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
        main: about_me.main_text ?? '',
        main_highlight: about_me.main_text_highlight ?? '',
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
          <DialogTitle>Edit Main</DialogTitle>
          <DialogDescription>
            This will be the first paragraph in about me page.
          </DialogDescription>
          <form className="space-y-6" onSubmit={editMain}>
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
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
