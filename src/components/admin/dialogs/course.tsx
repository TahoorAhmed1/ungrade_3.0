"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CourseForm from "../form/course-form";
import { FormProvider, useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAppDispatch } from "@/module/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCompetencies } from "@/module/features/competency";
import { getConcentration } from "@/module/features/concentration";
import { addCourse, editCourse } from "@/module/features/courses";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  course: z.string().min(1, "Course name is required"),
  degree: z.string().min(1, "Course level is required"),
  competency: z
    .array(z.number().min(1))
    .min(1)
    .nonempty("Please select at least one framework."),
  course_code: z.string().min(1, "Course code is required"),
  compulsory: z.boolean().default(false),
  concentration_id: z.number().min(1),
  description: z.string().optional(),
  display: z.boolean().default(true),

});





export function CourseDialog({ isOpen, type, setOpen, editData }: any) {
  const dispatch = useAppDispatch()


  const router = useRouter()

  useEffect(() => {
    dispatch(getCompetencies())
    dispatch(getConcentration())


  }, [])

  const competencies = useSelector(
    (state: any) => state?.competencySlice.competencies
  )?.map((a: any, i: any) => {
    return {
      ...a,
      value: a.id,
      label: a.name,
    };
  })

  const concentration = useSelector(
    (state: any) => state?.ConcentrationSlice.concentration
  )?.map((a: any, i: any) => {
    return {
      ...a,
      value: a.id,
      label: a.name,
    };
  })



  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      course: "",
      degree: "",
      competency: [],
      course_code: "",
      compulsory: false,
      concentration_id: 0,
      description: "",
      display: true,

    },
  });

  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("course_code", editData?.course_code);
      formMethods.setValue("course", editData?.course);
      formMethods.setValue("description", editData?.description);
      formMethods.setValue("degree", editData?.degree);
      formMethods.setValue("concentration_id", editData?.concentration_id);
      formMethods.setValue("competency", editData?.course_competencies?.map((a: any) => a.competencies?.id));
      formMethods.setValue("compulsory", editData?.compulsory ?? false);
      formMethods.setValue("display", editData?.display ?? true);
    } else {
      formMethods.setValue("course_code", "");
      formMethods.setValue("course", "");
      formMethods.setValue("description", "");
      formMethods.setValue("degree", "");
      formMethods.setValue("concentration_id", 0);
      formMethods.setValue("competency", []);
      formMethods.setValue("compulsory", false);
      formMethods.setValue("display", true);
    }
  }, [editData, isOpen])



  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: { ...data, competency: data.competency }, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(addCourse(re));
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
    dispatch(editCourse(re));

    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      formMethods.reset()
      setOpen()
    }}>
      <DialogContent className="sm:max-w-[560px] bg-[#f6f5fd]">
        <DialogHeader>
          <DialogTitle>
            {type === "edit" ? "Edit Course" : "Add Course"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <CourseForm form={formMethods} competencies={competencies} concentration={concentration} />

            <DialogFooter>
              <Button
                type="submit"
                className="bg-blueDark text-white border-1 font-medium px-6"
              >
                {type === "edit" ? "Edit Course" : "Add Course"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
