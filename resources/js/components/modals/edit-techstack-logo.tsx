import { router } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { History, ImageIcon } from 'lucide-react';
import { Switch } from '../ui/switch';
import Image from '../personalized/image';

type AddTechStackForm = {
  logoUpload: File | null;
  logoUrl: string;
};

type TechStackProps = {
  techstack: any,
}

export default function EditTechStackLogo({ techstack }: TechStackProps) {
  const [open, setOpen] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const [localError, setLocalError] = useState('');

  const [logoUpload, setLogoUpload] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState<string>('');

  const addTechStack: FormEventHandler = (e) => {
    e.preventDefault();

    const isLogoEmpty = !logoUpload;
    const isLogoUrlEmpty = !logoUrl.trim();

    if (isLogoEmpty && isLogoUrlEmpty) {
      setLocalError('Please upload a logo or URL.');
      return;
    }

    router.post(route('admin.techstack.update-logo', techstack.id), {
      _method: 'PATCH',
      logoUpload,
      logoUrl,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        closeModal()
      }
    });
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            Change Logo
          </Button>
        </DialogTrigger>
        <DialogContent className='lg:!max-w-xl !w-full'>
          <DialogTitle>Edit Logo</DialogTitle>

          <form className="flex flex-col gap-6" onSubmit={addTechStack}>
            <div className="flex gap-2 items-center">
              <Switch
                checked={isUrlMode}
                onCheckedChange={(checked) => {
                  setIsUrlMode(checked);
                  if (checked) {
                    setLogoUrl(''); // Reset URL when switching to upload
                  } else {
                    setLogoUpload(null); // Reset file when switching to URL
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
                      disabled={!logoUpload}
                      onClick={() => setLogoUpload(null)}
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
                    setLogoUpload(file);
                  }}
                />
                <InputError message={localError} />

                {logoUpload && (
                  <div className="flex justify-center">
                    <Image src={URL.createObjectURL(logoUpload)} className="rounded-sm lg:!max-w-xs" />
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
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
                <InputError message={localError} />
              </section>
            )}

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>

              <Button type='submit' variant="default">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
