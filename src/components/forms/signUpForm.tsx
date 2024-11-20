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
import Link from "next/link";
import { SignUpSchema } from "@/validations/indx";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { register } from "@/module/features/authentication";
import { useRouter } from "next/navigation";

type Props = {};

function SignUpForm({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  const clearState = () => {
    if (typeof window !== "undefined") {
      // @ts-ignore
      const url = new URL(window.location);
      const redirect = url.searchParams.get("redirect");
      if (redirect) {
        router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
      } else {
        router.push(`/account-verify`);
      }
    }
  };

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    try {
      let obj = {
        username: values.firstName || "",
        password: values.password || "",
        email: values.email || "",
        type: "admin",
      };
      console.log(values);
      let payload: any = {
        data: obj,
        clearState: clearState,
        setLoader: setIsLoading,
      };
      dispatch(register(payload));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full min-h-[65vh] overflow-hidden "
      >
        <div className="flex flex-col gap-y-8 w-full">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] px-4 text-center bg-[#ECF2F3] rounded-lg">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your name here"
                      className="border-[#D3D5DA] bg-[#ECF2F3]  placeholder:text-[#B9BDC4] text-xl py-[30px] px-[30px]  w-full rounded-[25px] focus-visible:ring-0"
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
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] px-4 text-center bg-[#ECF2F3] rounded-lg">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your email here"
                      className="border-[#D3D5DA] bg-[#ECF2F3]  placeholder:text-[#B9BDC4] text-xl py-[30px] px-[30px] w-full rounded-[25px] focus-visible:ring-0"
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
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] px-4 text-center bg-[#ECF2F3] rounded-lg">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="type your password"
                      className="border-[#D3D5DA] bg-[#ECF2F3]  placeholder:text-[#B9BDC4] text-xl py-[30px] px-[30px]  w-full rounded-[25px] focus-visible:ring-0"
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
              name="cpassword"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] px-4 text-center bg-[#ECF2F3] rounded-lg">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="type your password again"
                      className="border-[#D3D5DA] bg-[#ECF2F3]  placeholder:text-[#B9BDC4] text-xl py-[30px] px-[30px] w-full rounded-[25px] focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-4 w-[230px] mx-auto">
          <button
            type="submit"
            className="bg-blueDark text-sm uppercase w-full py-4   rounded-lg  hover:bg-blueDark/80 text-white font-semibold px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center w-5 h-5 m-auto" />
            ) : (
              "Create Account"
            )}
          </button>
          <div className="mt-3 text-sm text-black w-full text-center">
            Already have an account?
            <Link href={"/login"} className="text-[#0038FF] ml-1">
              Log in
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
