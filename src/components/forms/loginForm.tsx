import { useState } from "react";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/validations/indx";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/module/features/authentication";
import { z } from "zod";

type Props = {};

function LoginForm({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const clearState = (user: any) => {};

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLoading(true);
      const obj = {
        email: values.email,
        password: values.password,
      };
      const payload: any = {
        data: obj,
        clearState: clearState,
        router,
      };
      dispatch(login(payload));
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full min-h-[60vh] overflow-hidden "
      >
        <div className="flex flex-col gap-y-8 w-full">
          <div>
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
          <div>
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
                      type="password"
                      placeholder="Password"
                      className="border-[#D3D5DA] bg-[#ECF2F3] placeholder:text-black md:text-xl py-[30px] px-[30px] text-lg  w-full rounded-[25px] focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between text-[10px] items-center mt-5">
            <div className="flex items-center gap-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#83A8AE]"
              ></input>
              <p>STAY LOGGED IN</p>
            </div>
            <Link href={"/confirm-email"} className="text-black ml-1">
              FORGET YOUR PASSWORD?
            </Link>
          </div>
        </div>

        <div className="mt-4 w-[230px] mx-auto">
          <button
            type="submit"
            className="bg-blueDark disabled:bg-blueDark/70 text-sm uppercase w-full rounded-lg hover:bg-blueDark/80 text-white font-semibold py-4 px-4"
            disabled={isLoading} // Disable while loading
          >
            {isLoading ? (
              <Loader className="animate-spin text-center w-5 h-5 m-auto" />
            ) : (
              "Login"
            )}
          </button>
          <div className="mt-3 text-sm text-black w-full text-center">
            Don&apos;t have an account?
            <Link href={"/signup"} className="text-[#0038FF] ml-1">
              Register
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
