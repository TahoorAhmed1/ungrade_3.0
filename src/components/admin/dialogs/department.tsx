import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useAppDispatch } from "@/module/store";
import { useEffect } from "react";
import { addDepartment, getDepartment, updateDepartment } from "@/module/features/department";
import DepartmentForm from "../form/department-form";
import { useSelector } from "react-redux";


const formSchema = z.object({
  name: z.string().min(1, "Department is required"),


});

export function DepartmentDialog({ isOpen, type, setOpen, editData }: any) {
  const router = useRouter()
  const dispatch = useAppDispatch()



  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  });




  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: data, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(addDepartment(re));
    setOpen(false);
  };

  const onSubmitEdit: SubmitHandler<any> = (data) => {
    let re: any = {
      id: editData.id,
      data: data,
      callback: () => {
        router.refresh()
      }
    }
    dispatch(updateDepartment(re));

    setOpen(false);
  };

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("name", editData?.name);
    }
  }, [editData])

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      formMethods.reset()
      setOpen()
    }}>
      <DialogContent className="sm:max-w-[525px] bg-[#f6f5fd]">
        <DialogHeader>
          <DialogTitle>
            {type == "edit" ? "Edit Department" : "Add Department"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <DepartmentForm form={formMethods} />
            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Department" : "Add Department"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
