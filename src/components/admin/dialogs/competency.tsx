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
import CompetencyForm from "../form/competency-form";
import { addCompetency, editCompetency } from "@/module/features/competency";



const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  level: z.number().min(1, "Level is required"),
  average: z.string(),
  hidden: z.number().default(0),
  tier: z.number().default(1)


});

export function CompetencyDialog({ isOpen, type, setOpen, editData }: any) {

  const router = useRouter()
  const dispatch = useAppDispatch()

  const formMethods = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      level: 0,
      average: 0,

    },
  });


  const onSubmit: SubmitHandler<any> = (data) => {
    let re: any = {
      data: { ...data, average: Number(data.average) }, callback: () => {
        router.refresh()
        formMethods.reset()
      }
    }
    dispatch(addCompetency(re));
    setOpen(false);
  };

  const onSubmitEdit: SubmitHandler<any> = (data) => {
    let re: any = {
      id: editData.id,
      data: { ...data, average: Number(data.average) },
      callback: () => {
        router.refresh()
      }
    }
    dispatch(editCompetency(re));

    setOpen(false);
  };

  useEffect(() => {
    if (editData?.name) {
      formMethods.setValue("name", editData?.name);
      formMethods.setValue("level", editData?.level);
      formMethods.setValue("average", editData?.average);
    }
  }, [editData?.name])


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
            <CompetencyForm form={formMethods} />
            <DialogFooter>
              <Button className="bg-blueDark text-white border-1 font-medium px-6">
                {type == "edit" ? "Edit Competency" : "Add Competencys"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
