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
import { useEffect, useState } from "react";
import { addDegree, updateDegree } from "@/module/features/degree";
import { useSelector } from "react-redux";
import { getDepartment } from "@/module/features/department";
import ProfessorFrom from "../form/professor-form";
import { adminAddProfessor, adminEditProfessor } from "@/module/features/professor";


const formSchema = z.object({
  professor_name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  department: z
    .array(z.number().min(1))
    .min(1)
    .nonempty("Please select at least one department."),
  university_id: z.number({ message: "University is required" }).min(1, "University is required"),
});

export function ProfessorDialog({ isOpen, type, setOpen, editData }: any) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [department, setDepartment] = useState([])

  useEffect(() => {
    dispatch(getDepartment())
  }, [])

  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      professor_name: "",
      university_id: "",
      department: [],
      description: "",
    },
  });


  const onSubmit: SubmitHandler<any> = (data) => {

    let re: any = {
      data: data, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(adminAddProfessor(re));
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
    dispatch(adminEditProfessor(re));

    setOpen(false);
  };

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("professor_name", editData?.professor_name);
      formMethods.setValue("description", editData?.description);
      formMethods.setValue("university_id", editData?.university_id);
      formMethods.setValue("department", editData?.professor_department?.map((a: any) => Number(a.department?.id)));
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
            {type == "edit" ? "Edit Professor" : "Add Professor"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <ProfessorFrom form={formMethods} department={department} setDepartment={setDepartment} editData={editData} />
            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Professor" : "Add Professor"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
