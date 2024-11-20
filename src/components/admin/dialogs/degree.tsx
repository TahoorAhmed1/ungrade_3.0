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
import DegreeFrom from "../form/degree-form";
import { addDegree, updateDegree } from "../../../module/features/degree";
import { useSelector } from "react-redux";
import { getDepartment } from "@/module/features/department";


const formSchema = z.object({
  name: z.string().min(1, "Degree is required"),
  department_id: z.number().min(1, "Department is required"),

});

export function DegreeDialog({ isOpen, type, setOpen, editData }: any) {
  const router = useRouter()
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getDepartment())
  }, [])

  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      department_id: ""
    },
  });

  const department = useSelector(
    (state: any) => state?.departmentSlice.department
  )?.map((a: any, i: any) => {
    return {
      ...a,
      value: a.id,
      label: a.name,
    };
  })


  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: data, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(addDegree(re));
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
    dispatch(updateDegree(re));

    setOpen(false);
  };

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("name", editData?.name);
      formMethods.setValue("department_id", editData?.department?.id);
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
            {type == "edit" ? "Edit Degree" : "Add Degree"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <DegreeFrom form={formMethods} department={department} />
            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Degree" : "Add Degree"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
