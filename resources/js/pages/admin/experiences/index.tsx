import AddSkills from '@/components/modals/add-skills';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Experience, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Dot, Trash2, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from 'react';
import { toast } from 'sonner';
import AddCompany from '@/components/modals/add-company';

import * as React from "react"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Work Experiences',
    href: '/admin/experiences',
  },
];

export default function Index() {
  const { companies } = usePage<SharedData>().props;

  const [openDelete, setOpenDelete] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [selectedExperienceId, setSelectedExperienceId] = useState<number | null>(null);

  const deleteCompany = () => {
    if (selectedCompanyId === null) return;

    router.delete(route('admin.experiences.destroy-company', selectedCompanyId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        toast.error('Something went wrong deleting the company.');
        closeModal();
      }
    });
  };

  const removeExperience = () => {
    if (selectedExperienceId === null) return;

    router.delete(route('admin.experiences.destroy', selectedExperienceId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        toast.error('Something went wrong removing the experience.');
        closeModal();
      }
    });
  };

  const openDeleteModal = (id: number) => {
    setSelectedCompanyId(id);
    setOpenDelete(true);
  };

  const openRemoveModal = (id: number) => {
    setSelectedExperienceId(id);
    setOpenRemove(true);
  };

  const closeModal = () => {
    setOpenDelete(false);
    setSelectedCompanyId(null);
    setSelectedExperienceId(null);
    setOpenRemove(false);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Work Experiences" />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">WORK EXPERIENCES</h1>
          <AddCompany />
        </div>

        {companies.map((company: any) => (
          <div key={company.id} className="rounded-lg border p-4 shadow-sm space-y-2">
            <section className='w-full flex items-center justify-between'>
              <h2 className="text-lg font-semibold">{company.name}</h2>
              <div className='flex items-center'>
                <AddSkills id={company.id} />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openDeleteModal(company.id)}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            </section>

            {company.experiences.length > 0 ? (
              <ul className="text-sm">
                {company.experiences.map((experience: Experience) => (
                  <li
                    key={experience.id}
                    className="hover:bg-white/5 rounded-sm px-3 py-1 flex items-center justify-between group"
                  >
                    <span>
                      <Dot className='size-5 inline-block' />
                      {experience.description}
                    </span>
                    <div className='flex items-center group-hover:opacity-100 transition-opacity duration-300 opacity-0'>
                      {/* <EditSkills skill={skill} /> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openRemoveModal(experience.id)}
                      >
                        <X className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/70 px-3 py-1">No experience yet.</p>
            )}
          </div>
        ))}

        {/* Remove Skill Dialog (outside the loop) */}
        <Dialog open={openRemove} onOpenChange={setOpenRemove}>
          <DialogContent className="!max-w-xl w-full">
            <DialogHeader>
              <DialogTitle>Remove Experience</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this experience?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={removeExperience} type="submit" variant="destructive">
                Remove Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Dialog (outside the loop) */}
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent className="!max-w-xl w-full">
            <DialogHeader>
              <DialogTitle>Delete Company</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this company?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={deleteCompany} type="submit" variant="destructive">
                Delete Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
