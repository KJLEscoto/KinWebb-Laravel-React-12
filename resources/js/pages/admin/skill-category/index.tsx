import AddSkillCategory from '@/components/modals/add-category';
import AppLayout from '@/layouts/app-layout';
import { Category, SharedData, type BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Copy, Edit3, EllipsisVertical, MoreHorizontal, Trash2 } from 'lucide-react';
import EditSkillCategory from '@/components/modals/edit-category';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Tech Stack',
    href: '/admin/tech-stack',
  },
];

export default function Index() {

  const { categories } = usePage<SharedData>().props;

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      router.delete(route('admin.skill-category.destroy', id));
    }
  };

  const [openEdit, setOpenEdit] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  console.log(openEdit, editingCategory)

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Skill Category" />
      <div className="flex h-full flex-1 flex-col gap-5 rounded-xl p-4">

        <div className='flex justify-between items-center'>
          <h1>SKILL CATEGORY</h1>
          <AddSkillCategory />
        </div>

        {
          categories.length > 0 && (
            <div className='grid lg:grid-cols-2 gap-4'>
              {
                categories.map((category: Category) => (
                  <section key={category.id} className='p-5 border gap-5 rounded-md w-full flex items-start justify-between break-all'>
                    {category.name}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='ghost'>
                          <EllipsisVertical className='size-4 cursor-pointer' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingCategory(category);
                            setOpenEdit(true);
                          }}
                        >
                          <Edit3 className='size-4' />
                          <span>Edit</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem onClick={() => handleDelete(category.id)}>
                          <Trash2 className='text-red-500' />
                          <span className='text-red-500'>Delete</span>
                        </DropdownMenuItem>

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </section>
                ))
              }
            </div>
          )
        }

        {(editingCategory && openEdit) &&
          <EditSkillCategory
            category={editingCategory}
            open={openEdit}
            setOpen={setOpenEdit}
            onClose={() => {
              setEditingCategory(null)
              setOpenEdit(false)
            }} />
        }

      </div>
    </AppLayout>
  );
}
