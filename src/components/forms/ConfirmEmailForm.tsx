"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { confirmEmailForget } from "@/module/features/authentication";
import { EmailConfirmSchema } from "@/validations/indx";
import { Loader } from "lucide-react";

function ConfirmEmailForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof EmailConfirmSchema>>({
    resolver: zodResolver(EmailConfirmSchema),
    defaultValues: {
      email: "",
    },
  });
  const clearState = () => {
    form.reset();
  };
  const ForgetPasswordUser = (data: any) => {
    let payload: any = {
      data: data,
      setEmailSent: setEmailSent,
      clearState: clearState,
      setLoader: setIsLoading,
    };

    dispatch(confirmEmailForget(payload));
  };

  const onSubmit = async (values: z.infer<typeof EmailConfirmSchema>) => {
    setIsLoading(true);
    try {
      let obj = {
        email: values.email,
      };
      ForgetPasswordUser(obj);
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full min-h-[60vh] overflow-hidden "
      >
        <div className="flex flex-col gap-y-8 w-full">
          <div className="w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2 font-normal left-6 py-0.5 text-[10px] w-[80px] text-center bg-[#ECF2F3] rounded-lg">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      className="border-[#D3D5DA] bg-[#ECF2F3] placeholder:text-black md:text-xl py-[30px] px-[30px] text-lg  w-full rounded-[25px] focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            className="bg-blueDark disabled:bg-blueDark/70 text-sm uppercase w-full rounded-lg hover:bg-blueDark/80 text-white font-semibold py-4 px-4"
            disabled={isLoading || isEmailSent}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center w-5 h-5 m-auto" />
            ) : isEmailSent ? (
              "Email sent"
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}

export default ConfirmEmailForm;
