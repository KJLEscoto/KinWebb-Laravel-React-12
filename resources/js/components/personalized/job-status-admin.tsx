import { type BreadcrumbItem, type SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import InputError from '../input-error';

type JobStatus = {
  job_status: string;
  job_message: string;
}

export default function JobStatus() {
  const { auth } = usePage<SharedData>().props;

  const jobStatus = [
    {
      id: 1,
      label: 'Available',
      message: 'Available for work!'
    },
    {
      id: 2,
      label: 'On Duty',
      message: 'This person is currently working.'
    },
    {
      id: 3,
      label: 'On Leave',
      message: 'On vacation... need some break.'
    },
  ];

  // Default to first status
  const { data, setData, patch, errors, processing } = useForm<Required<JobStatus>>({
    job_status: auth.user.job_status ?? jobStatus[1].label,
    job_message: auth.user.job_message ?? jobStatus[1].label,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    patch(route('profile.job-status'), { preserveScroll: true });
  };

  return (
    <div className="space-y-6">
      <HeadingSmall title="Job status" description="Update your job status" />

      <form onSubmit={submit} className='space-y-6'>

        <RadioGroup
          name="status"
          value={data.job_status}
          onValueChange={(value) => {
            const selected = jobStatus.find((status) => status.label === value);
            if (selected) {
              setData({
                job_status: selected.label,
                job_message: selected.message,
              });
            }
          }}
          className="grid gap-2"
        >
          {jobStatus.map((status) => (
            <div key={status.id} className="flex items-center gap-2">
              <RadioGroupItem
                className='cursor-pointer'
                value={status.label}
                id={`status-${status.id}`}
              />
              <Label htmlFor={`status-${status.id}`} className="text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
                {status.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <InputError message={errors.job_status} className="mt-1" />

        <div>
          <Button type='submit' disabled={processing || data.job_status === auth.user.job_status} >
            Set
          </Button>
        </div>
      </form>
    </div>
  );
}

