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
import { EmailSchema, loginSchema } from "@/validations/indx";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { confirmEmailForget, login } from "@/module/features/authentication";
import { Checked, MailIcon } from "@/Assets/Icons";

type Props = {};

function ForgetPass({}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [sended, setSended] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const clearState = () => {
    form.reset();
    setSended(true);
  };
  const ConfirmEmailUser = (data: any) => {
    let obj = {
      ...data,
    };
    // setSended(true)
    let payload: any = {
      data: obj,
      clearState: clearState,
      setLoader: setIsLoading,
    };
    dispatch(confirmEmailForget(payload));
    // dispatch(confirmEmailForget({ data: obj, clearState: clearState, setLoader }))
  };

  async function onSubmit(values: z.infer<typeof EmailSchema>) {
    setIsLoading(true);
    try {
      console.log(values);
      let obj = {
        email: values.email,
      };
      ConfirmEmailUser(obj);
    } finally {
      setIsLoading(false);
    }
  }

  const [data, setData] = useState({
    email: "",
  });

  return (
    <>
      {true ? 
        <>
         

         <div className=" formDIv">
             
                <h3 className='wevesentmail'>We've sent you an e-mail</h3>
              
              <div className='innerForm mailIconContainer'>
                <div className='mailIcon'>
                  <div className='mailIconDiv'>
                    <MailIcon />
                  </div>
                  <div className='checkIconDiv'>
                    <Checked />
                  </div>
                </div>
              </div>
              {/* <SocialLogin type="student" /> */}
            </div>
        </>

    
       : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-between items-center w-full min-h-[60vh] overflow-hidden "
          >
            <h3>Change Your Password</h3>

            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="absolute -top-2 font-normal left-6  py-0.5 text-[10px] w-[80px] text-center bg-[#ECF2F3] rounded-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Email"
                        className="border-[#D3D5DA] bg-[#ECF2F3]  placeholder:text-black text-xl py-[30px] px-[24px] w-full rounded-[25px] focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="loginButtons">
              <button className="hoverEffect" onClick={ConfirmEmailUser}>
                Next
              </button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}

export default ForgetPass;
