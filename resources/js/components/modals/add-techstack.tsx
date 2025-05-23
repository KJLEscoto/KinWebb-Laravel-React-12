import { useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { History, ImageIcon, Plus } from 'lucide-react';
import { Switch } from '../ui/switch';
import Image from '../personalized/image';

type AddTechStackForm = {
  name: string;
  logoUpload: File | null;
  logoUrl: string;
  type: string;
};

export default function AddTechStack({ tech_type }: { tech_type: string }) {
  const [open, setOpen] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [localError, setLocalError] = useState('');


  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddTechStackForm>({
    name: '',
    logoUpload: null,
    logoUrl: '',
    type: tech_type,
  });

  const addTechStack: FormEventHandler = (e) => {
    e.preventDefault();

    const isLogoEmpty = !data.logoUpload;
    const isLogoUrlEmpty = !data.logoUrl.trim();

    if (isLogoEmpty && isLogoUrlEmpty) {
      setLocalError('Please upload a logo or URL.');
      return;
    }

    post(route('admin.techstack.store'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };


  const closeModal = () => {
    setOpen(false);
    clearErrors();
    setLocalError('');
    reset();
  };

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size='icon'>
            <Plus className='size-4' />
          </Button>
        </DialogTrigger>
        <DialogContent className='lg:!max-w-xl !w-full'>
          <DialogTitle>Add <span className='capitalize'>{tech_type}</span></DialogTitle>

          <form className="flex flex-col gap-6" onSubmit={addTechStack}>
            <div className="grid gap-6">
              <div className="flex gap-5 w-full">
                <section className="w-full flex flex-col gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    placeholder="Untitled"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} />
                </section>
              </div>

              <div className="flex gap-2 items-center">
                <Switch
                  checked={isUrlMode}
                  onCheckedChange={(checked) => {
                    setIsUrlMode(checked);
                    if (checked) {
                      setData('logoUrl', ''); // Reset URL when switching to upload
                    } else {
                      setData('logoUpload', null); // Reset file when switching to URL
                    }
                  }}
                />
                <p>{isUrlMode ? 'Switch to URL' : 'Switch to upload'}</p>
              </div>

              {isUrlMode ? (
                <section className="w-full flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <Label>Logo (Upload)</Label>
                    <div className="flex items-center gap-3">
                      <Label htmlFor="thumbnail" className="cursor-pointer flex items-center gap-2 px-4 border transition hover:border-white p-3 rounded-lg">
                        <ImageIcon className="size-4" />
                        Select
                      </Label>
                      <Button
                        variant="destructive"
                        type="button"
                        size='icon'
                        disabled={processing || !data.logoUpload}
                        onClick={() => setData('logoUpload', null)}
                      >
                        <History className='size-4' />
                      </Button>
                    </div>
                  </div>

                  <Input
                    hidden
                    id="thumbnail"
                    name="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setData('logoUpload', file);
                    }}
                  />
                  <InputError message={localError} />

                  {data.logoUpload && (
                    <div className="flex justify-center">
                      <Image src={URL.createObjectURL(data.logoUpload)} className="rounded-sm lg:!max-w-xs" />
                    </div>
                  )}
                </section>
              ) : (
                <section className="w-full flex flex-col gap-3">
                  <Label>Logo (URL)</Label>
                  <Input
                    id="logoUrl"
                    type="text"
                    placeholder="https://"
                    value={data.logoUrl}
                    onChange={(e) => setData('logoUrl', e.target.value)}
                  />
                  <InputError message={localError} />
                </section>
              )}

            </div>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default"
                disabled={processing}>
                Confirm
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
