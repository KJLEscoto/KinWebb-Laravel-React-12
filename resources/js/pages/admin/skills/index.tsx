import AddSkills from '@/components/modals/add-skills';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { SharedData, Skill, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Dot, Edit3, Trash2, X } from 'lucide-react';
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
import EditSkills from '@/components/modals/edit-skills';
import AddSkillCategory from '@/components/modals/add-category';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Skills',
    href: '/admin/skills',
  },
];

export default function Index() {
  const { categories } = usePage<SharedData>().props;

  const [openDelete, setOpenDelete] = useState(false);
  const [openRemove, setOpenRemove] = useState(false);

  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const deleteCategory = () => {
    if (selectedCategoryId === null) return;

    router.delete(route('admin.skill-category.destroy', selectedCategoryId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        toast.error('Something went wrong deleting the skill.');
        closeModal();
      }
    });
  };

  const removeSkill = () => {
    if (selectedSkillId === null) return;

    router.delete(route('admin.skills.destroy', selectedSkillId), {
      preserveScroll: true,
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        toast.error('Something went wrong deleting the skill.');
        closeModal();
      }
    });
  };

  const openDeleteModal = (id: number) => {
    setSelectedCategoryId(id);
    setOpenDelete(true);
  };

  const openRemoveModal = (id: number) => {
    setSelectedSkillId(id);
    setOpenRemove(true);
  };

  const closeModal = () => {
    setOpenDelete(false);
    setSelectedSkillId(null);
    setSelectedCategoryId(null);
    setOpenRemove(false);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Skills" />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">SKILLS</h1>
          <AddSkillCategory />
        </div>

        {categories.map((category: any) => (
          <div key={category.id} className="rounded-lg border p-4 shadow-sm space-y-2">
            <section className='w-full flex items-center justify-between'>
              <h2 className="text-lg font-semibold">{category.name}</h2>
              <div className='flex items-center'>
                <AddSkills id={category.id} />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openDeleteModal(category.id)}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            </section>

            {category.skills.length > 0 ? (
              <ul className="text-sm">
                {category.skills.map((skill: Skill) => (
                  <li
                    key={skill.id}
                    className="hover:bg-white/5 px-3 py-1 flex items-center justify-between group"
                  >
                    <span>
                      <Dot className='size-5 inline-block' />
                      {skill.description}
                    </span>
                    <div className='flex items-center group-hover:opacity-100 transition-opacity duration-300 opacity-0'>
                      <EditSkills skill={skill} />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openRemoveModal(skill.id)}
                      >
                        <X className="size-4 text-red-500" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-white/70 px-3 py-1">No skills yet.</p>
            )}
          </div>
        ))}

        {/* Remove Skill Dialog (outside the loop) */}
        <Dialog open={openRemove} onOpenChange={setOpenRemove}>
          <DialogContent className="!max-w-xl w-full">
            <DialogHeader>
              <DialogTitle>Remove Skill</DialogTitle>
              <DialogDescription>
                Are you sure you want to remove this skill?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={removeSkill} type="submit" variant="destructive">
                Remove Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Category Dialog (outside the loop) */}
        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogContent className="!max-w-xl w-full">
            <DialogHeader>
              <DialogTitle>Delete Category</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this category?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={deleteCategory} type="submit" variant="destructive">
                Delete Permanently
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
