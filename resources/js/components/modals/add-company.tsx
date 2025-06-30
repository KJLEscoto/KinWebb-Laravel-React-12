import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '../ui/input';

import { Checkbox } from '../ui/checkbox';

type AddCompanyForm = {
  name: string;
  position: string;
  job_type: string;
  link: string;
  month_start: string;
  month_end: string | null;
}

const jobTypes = [
  { value: 'Full-time', label: 'Full-Time' },
  { value: 'Part-time', label: 'Part-Time' },
  { value: 'Gig', label: 'Gig' },
  { value: 'Intern', label: 'Intern' },
];

export default function AddCompany() {
  const [open, setOpen] = useState(false);

  const [isPresent, setIsPresent] = useState(false);

  const monthStartRef = useRef<HTMLInputElement>(null);
  const monthEndRef = useRef<HTMLInputElement>(null);

  const { data, setData, post, processing, reset, errors, clearErrors } = useForm<AddCompanyForm>({
    name: '',
    position: '',
    job_type: '',
    link: '',
    month_start: '',
    month_end: '',
  });

  const addCategory: FormEventHandler = (e) => {
    e.preventDefault();

    post(route('admin.experiences.store-company'), {
      preserveScroll: true,
      onSuccess: () => closeModal(),
    });
  };

  const closeModal = () => {
    setOpen(false);
    clearErrors();
    reset();
  };


  return (
    <div className="space-y-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default">Add Company</Button>
        </DialogTrigger>
        <DialogContent className='!max-w-xl w-full'>
          <DialogTitle>Add Company</DialogTitle>

          <form className="space-y-6" onSubmit={addCategory}>
            <div className="grid gap-2">
              <Label htmlFor="name">
                Company Name
              </Label>

              <Input
                required id="name"
                placeholder="-"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              <InputError message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="position">
                Job Position
              </Label>

              <Input
                required id="position"
                placeholder="Web Developer, Designer, etc."
                value={data.position}
                onChange={(e) => setData("position", e.target.value)}
              />
              <InputError message={errors.position} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="job_type">
                Job Type
              </Label>

              <Select
                value={data.job_type}
                onValueChange={(value) => setData("job_type", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a job type</SelectLabel>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <InputError message={errors.job_type} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="link">
                Company Link
              </Label>

              <Input
                required id="link"
                placeholder="https://"
                value={data.link}
                onChange={(e) => setData("link", e.target.value)}
              />
              <InputError message={errors.link} />
            </div>

            {/* <div className="grid gap-2">
              <Label htmlFor="month_start">
                Month Started
              </Label>
              <Input
                required
                id="month_start"
                type='month'
                value={data.month_start}
                onChange={(e) => setData("month_start", e.target.value)}
              />
              <InputError message={errors.month_start} />
            </div> */}

            <div className="grid gap-2 relative">
              <Label htmlFor="month_start">Month Started</Label>

              <div className="relative">
                {/* Hidden but positioned input */}
                <Input
                  id="month_start"
                  type="month"
                  ref={monthStartRef}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={data.month_start || ''}
                  onChange={(e) => setData('month_start', e.target.value)}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full relative z-10"
                  onClick={() => monthStartRef.current?.showPicker()}
                >
                  <span className="text-sm">
                    {data.month_start
                      ? new Date(data.month_start + '-01').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })
                      : 'Select Month'}
                  </span>
                </Button>
              </div>
            </div>

            <div className="grid gap-2 relative">
              <Label htmlFor="month_end">Month Ended</Label>

              <div className="relative">
                {/* Hidden but positioned input */}
                <Input
                  id="month_end"
                  ref={monthEndRef}
                  type="month"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={data.month_end || ''}
                  onChange={(e) => setData('month_end', e.target.value)}
                  disabled={isPresent}
                />

                <Button
                  type="button"
                  variant="outline"
                  className="w-full relative z-10"
                  disabled={isPresent}
                  onClick={() => monthEndRef.current?.showPicker()}
                >
                  <span className="text-sm">
                    {data.month_end
                      ? new Date(data.month_end + '-01').toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                      })
                      : 'Select Month'}
                  </span>
                </Button>
              </div>

              {!isPresent && <InputError message={errors.month_end} />}
            </div>




            <div className="flex items-center gap-2">
              <Checkbox
                id="present"
                checked={isPresent}
                onCheckedChange={(checked) => {
                  const isNowPresent = !!checked;
                  setIsPresent(isNowPresent);
                  setData("month_end", isNowPresent ? null : '');
                }}
              />
              <Label htmlFor="present" className="text-sm font-normal">
                Check if 'Present' date
              </Label>
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
