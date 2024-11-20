// opt verify page with tailwind css
"use client";

import Heading from "@/components/common/Heading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAppDispatch } from "@/module/store";
import { useRouter } from "next/navigation";
import { verify_otp } from "@/module/features/authentication";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OTPFormSchema } from "@/validations/indx";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";

function page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      pin: "",
    },
  });
  async function onSubmit(data: z.infer<typeof OTPFormSchema>) {
    try {
      let obj = {
        otp: data.pin,
      };
      let payload: any = {
        data: obj,
        router,
      };
      dispatch(verify_otp(payload));
    } finally {
    }
  }
  return (
    <div className="w-full p-6 flex flex-col justify-center items-center">
      <Heading text="OTP ForAccount Verification" className="mb-10" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP Verifcation</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the OTP sent to your email <b>check spam aslso</b>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-[356px] mx-auto flex justify-center py-4 rounded-lg text-white text-[24px] mb-[24px] font-medium bg-blueDark disabled:bg-[#EAEBED]   text-center">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
export default page;
