import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ConcentrationForm from "../form/concentraion-form";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { addCourse, editCourse } from "@/module/features/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/module/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getDegree } from "@/module/features/degree";
import { z } from "zod";
import { addConcentration, updateConcentration } from "@/module/features/concentration";


const formSchema = z.object({
  name: z.string().min(1, "Competency name is required"),
  degree: z
    .array(z.number().min(1))
    .min(1)
    .nonempty("Please select at least one degree."),


});

export function ConcentrationDialog({ isOpen, type, setOpen, editData }: any) {
  const dispatch = useAppDispatch()


  const router = useRouter()

  useEffect(() => {
    dispatch(getDegree())


  }, [])

  const degree = useSelector(
    (state: any) => state?.degreeSlice.degrees
  )?.map((a: any, i: any) => {
    return {
      ...a,
      value: a.id,
      label: a.name
    }
  })

  console.log(degree, "degree");




  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      degree: []
    },
  });

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("name", editData?.name);
      formMethods.setValue("degree", editData?.degree_Concentration?.map((a: any) => a.degree?.id));

    }
  }, [editData])



  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: { ...data, competency: data.competency }, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    console.log(re, 'sadasdasdasda')
    dispatch(addConcentration(re));
    setOpen(false);
  };

  const onSubmitEdit: SubmitHandler<any> = (data) => {
    let re: any = {
      id: editData.id,
      data: { ...data, competency: data.competency },
      callback: () => {
        router.refresh()
      }
    }
    console.log(re)
    dispatch(updateConcentration(re));

    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      formMethods.reset()
      setOpen()
    }}>
      <DialogContent className="sm:max-w-[525px] bg-[#f6f5fd]">
        <DialogHeader>
          <DialogTitle>
            {type == "edit" ? "Edit Concentration" : "Add Concentration"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <ConcentrationForm form={formMethods} degree={degree} />

            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Concentration" : "Add Concentration"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}