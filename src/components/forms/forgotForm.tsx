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
import { ForgetPasswordApi } from "@/module/features/authentication";
import { ForgetSchema } from "@/validations/indx";
import { message } from "antd";
import { Loader } from "lucide-react";
import ForgetPass from "../common/ForgetPass";

function ForgotForm({ token }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [notMatch, setNotMatch] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof ForgetSchema>>({
    resolver: zodResolver(ForgetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const clearState = () => {
    form.reset();
    router.push("/login");
  };
  const ForgetPasswordUser = (data: any) => {
    if (data.password === data.confirmPassword) {
      let obj = {
        new_password: data.password,
      };
      let payload: any = {
        token,
        data: obj,

        clearState: clearState,
        setLoader: setIsLoading,
      };
      dispatch(ForgetPasswordApi(payload));
    } else {
      message.error("Password not matched");
      setNotMatch(true);
      setIsLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof ForgetSchema>) => {
    setIsLoading(true);
    try {
      console.log(values);
      let obj = {
        password: values.password,
        confirmPassword: values.confirmPassword,
      };
      ForgetPasswordUser(obj);
    } finally {
    }
  };

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between items-center w-full min-h-[60vh] overflow-hidden "
        >
          <div className="flex flex-col gap-y-8 w-full">
            <div className="w-full">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute -top-2 font-normal left-6 py-0.5 text-[10px] w-[80px] text-center bg-[#ECF2F3] rounded-lg">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Password"
                        className="border-[#D3D5DA] bg-[#ECF2F3] placeholder:text-black md:text-xl py-[30px] px-[30px] text-lg  w-full rounded-[25px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] w-[95px] text-center bg-[#ECF2F3] rounded-lg">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Confirm Password"
                        className="border-[#D3D5DA] bg-[#ECF2F3] placeholder:text-black md:text-xl py-[30px] px-[30px] text-lg  w-full rounded-[25px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-[230px] mx-auto">
              <button
                type="submit"
                className="bg-blueDark disabled:bg-blueDark/70 text-sm uppercase w-full rounded-lg hover:bg-blueDark/80 text-white font-semibold py-4 px-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin text-center w-5 h-5 m-auto" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ForgotForm;
