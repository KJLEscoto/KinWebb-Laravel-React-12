import { Flash, SharedData } from "@/types";
import { usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";


export function useFlashToast() {
  const { flash } = usePage<SharedData>().props;

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.update) {
      toast.info(flash.update);
    }
    if (flash.warning) {
      toast.warning(flash.warning);
    }
    if (flash.info) {
      toast.info(flash.info);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
  }, [flash]);
}
