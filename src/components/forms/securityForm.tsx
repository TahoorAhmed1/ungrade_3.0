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
import { Loader } from "lucide-react";
import { ResetPassSchema } from "@/validations/indx";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { reset_password } from "@/module/features/authentication";

type Props = {};

function SecurityForm({ }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  const form = useForm<z.infer<typeof ResetPassSchema>>({
    resolver: zodResolver(ResetPassSchema),
    defaultValues: {
      currentpass: "",
      newpass: "",
      retypepass: "",
    },
  });

  const [notMatched, setNotMatched] = useState(false);
  const clearState = () => {
    form.reset();
  };
  const resetPassword = (data: any) => {
    if (data?.new_password === data?.confirm_new_password) {
      setIsLoading(true);
      let obj = {
        previous_password: data?.previous_password,
        new_password: data?.new_password,
      };
      let payload: any = {
        data: obj,
        clearState: clearState,
        setLoader: setIsLoading,
      };
      dispatch(reset_password(payload));
    } else {
      setNotMatched(true);
    }
  };

  async function onSubmit(values: z.infer<typeof ResetPassSchema>) {
    setIsLoading(true);
    try {
      let obj = {
        previous_password: values.currentpass,
        new_password: values.newpass,
        confirm_new_password: values.retypepass,
      };
      console.log(values);

      resetPassword(obj);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full  overflow-hidden "
      >
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-[80px] gap-y-[30px] w-full">
          <div>
            <FormField
              control={form.control}
              name="currentpass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your current pass here"
                      className="border-[#0C0E0D]   placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="newpass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="New Pass here"
                      className="border-[#0C0E0D]   placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="retypepass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    Retype New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your password"
                      className="border-[#0C0E0D]   placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-16    w-[230px] mr-auto">
          <button
            type="submit"
            className="bg-blueDark capitalize w-full py-1 text-[26px]    rounded-lg  hover:bg-blueDark/80 text-white font-mediums px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center w-5 h-5 m-auto" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}

export default SecurityForm;
