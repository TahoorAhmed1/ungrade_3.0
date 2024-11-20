import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppDispatch } from "@/module/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import AssessmentFrom from "../form/assessments-from";
import { addAssessments, editAssessments } from "@/module/features/assesments";



const formSchema = z.object({
  competency_id: z.number(),
  question: z.string().min(1, "Question is required"),
  name: z.string().min(1, "Name is required"),
  key: z.string().min(1, "Key is required"),
  status: z.string().min(1, "Status is required")
});

export function AssessmentsDialog({ isOpen, type, setOpen, editData, searchParams, status }: any) {

  const router = useRouter()
  const dispatch = useAppDispatch()

  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      competency_id: Number(searchParams?.id),
      question: "",
      name: "",
      key: "",
      status: ""
    },
  });


  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: data, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }

    dispatch(addAssessments(re));
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
    dispatch(editAssessments(re));

    setOpen(false);
  };

  useEffect(() => {
    if (status !== "") {
      formMethods.setValue("status", status);

    }
  }, [status]

  )

  console.log(status);




  useEffect(() => {
    if (editData?.id) {
      formMethods.setValue("competency_id", editData?.competency_id);
      formMethods.setValue("question", editData?.question);
      formMethods.setValue("name", editData?.name);
      formMethods.setValue("key", editData?.key);
      formMethods.setValue("status", editData?.status);
    }
  }, [editData]

  )

  return (
    <Dialog open={isOpen} onOpenChange={() => {
      formMethods.reset()
      setOpen()
    }}>
      <DialogContent className="sm:max-w-[525px] bg-[#f6f5fd]">
        <DialogHeader>
          <DialogTitle>
            {type == "edit" ? "Edit Competency" : "Add Competency"}
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(type === "edit" ? onSubmitEdit : onSubmit)} className="w-full">
            <AssessmentFrom form={formMethods} searchParams={searchParams} />
            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Competency" : "Add Competency"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
