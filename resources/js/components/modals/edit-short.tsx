import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HeadingSmall from '@/components/heading-small';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Textarea } from '../ui/textarea';
import { ShortAbout } from '@/types';

type EditShortForm = {
  id: number;
  body: string;
  highlight: string; // optional
};

type EditShortProps = {
  short: ShortAbout;
};

export default function EditShort({ short }: EditShortProps) {
  const [open, setOpen] = useState(false);
  const bodyInput = useRef<HTMLTextAreaElement>(null);

  const { data, setData, put, processing, reset, errors, clearErrors } = useForm<EditShortForm>({
    id: short.id,
    body: short.body ?? '',
    highlight: short.highlight ?? '',
  });

  const editShort: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('admin.about-me.update-short', short.id), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setOpen(false);
      },
      onError: () => {
        bodyInput.current?.focus();
      },
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
        id: short.id,
        body: short.body ?? '',
        highlight: short.highlight ?? '',
      });
      clearErrors();
    }
  }, [open, short, setData, clearErrors]);

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">Edit Short</Button>
        </DialogTrigger>
        <DialogContent className="!max-w-xl w-full overflow-auto max-h-screen scrollbar-hide">
          <DialogTitle>Edit Short</DialogTitle>
          <DialogDescription>
            This will be a short introduction about me and what I do.
          </DialogDescription>

          <form className="space-y-6" onSubmit={editShort}>
            <div className="grid gap-2">
              <Label htmlFor="body">Body</Label>
              <Textarea
                required
                id="body"
                ref={bodyInput}
                placeholder="I am..."
                className="bg-transparent dark:!bg-[#0a0a0a] h-20"
                value={data.body}
                onChange={(e) => setData("body", e.target.value)}
              />
              <InputError message={errors.body} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="highlight">Highlight a word</Label>
              <Input
                id="highlight"
                type="text"
                name="highlight"
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

              <Button type="submit" variant="default" disabled={processing}>
                Submit Short
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
