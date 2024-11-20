import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useAppDispatch } from "@/module/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import UniversityForm from "../form/university-form";
import { addUniversity, editUniversity } from "@/module/features/university";
import { getDepartment } from "@/module/features/department";
import { useSelector } from "react-redux";

const formSchema = z.object({
  department: z
    .array(z.number().min(1))
    .min(1)
    .nonempty("Please select at least one department."),
  NAME: z.string().min(1, "Name is required"),
  ADDRESS: z.string().min(1, "Address is required"),
  CITY: z.string().min(1, "City is required"),
  COUNTRY: z.string().min(1, "Country is required"),
  WEBSITE: z.string().min(1, "Website is required"),
  TELEPHONE: z.string().min(1, "Telephone is required")
});

export function UniversityDialog({ isOpen, type, setOpen, editData }: any) {

  const router = useRouter()
  const dispatch = useAppDispatch()

  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      NAME: "",
      ADDRESS: "",
      CITY: "",
      COUNTRY: "",
      WEBSITE: "",
      TELEPHONE: ""
    },
  });

  useEffect(() => {
    dispatch(getDepartment())
  }, [])


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
      data: { ...data }, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(addUniversity(re));
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
    dispatch(editUniversity(re));

    setOpen(false);
  };

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("department", editData?.university_department?.map((a: any) => a.department?.id));
      formMethods.setValue("NAME", editData?.NAME);
      formMethods.setValue("CITY", editData?.CITY);
      formMethods.setValue("COUNTRY", editData?.COUNTRY);
      formMethods.setValue("WEBSITE", editData?.WEBSITE);
      formMethods.setValue("TELEPHONE", editData?.TELEPHONE);
      formMethods.setValue("ADDRESS", editData?.ADDRESS);
    }
  }, [editData])

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      formMethods.reset()
      setOpen()
    }}>
      <DialogContent className="sm:max-w-[550px] bg-[#f6f5fd]">
        <DialogHeader>
          <DialogTitle>
            {type == "edit" ? "Edit University" : "Add University"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <UniversityForm form={formMethods} department={department} />

            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit University" : "Add University"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
