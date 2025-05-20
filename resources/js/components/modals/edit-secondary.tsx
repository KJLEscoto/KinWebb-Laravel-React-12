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

type EditSecondaryForm = {
  secondary: string;
  secondary_highlight?: string | null;
}

type AboutMeProps = {
  about_me: AboutMe
}

export default function EditSecondary() {
  const [open, setOpen] = useState(false);

  const secondaryInput = useRef<HTMLInputElement>(null);
  const secondaryHighlightInput = useRef<HTMLInputElement>(null);

  const { about_me } = usePage<AboutMeProps>().props;

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditSecondaryForm>({
    secondary: about_me?.secondary_text ?? '',
    secondary_highlight: about_me?.secondary_text_highlight ?? '',
  });

  const editSecondary: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('admin.about-me.update-secondary-text', about_me.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: () => {
        secondaryInput.current?.focus()
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
        secondary: about_me.secondary_text ?? '',
        secondary_highlight: about_me.secondary_text_highlight ?? '',
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
          <DialogTitle>Edit Secondary</DialogTitle>
          <DialogDescription>
            This will be the second paragraph in about me page.
          </DialogDescription>
          <form className="space-y-6" onSubmit={editSecondary}>
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
              <InputError message={errors.secondary} />
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
