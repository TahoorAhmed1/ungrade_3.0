"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { settingSchema } from "@/validations/indx";
import { z } from "zod";
import Heading from "../common/Heading";
import { getProfile, updateProfile } from "@/module/features/completeProfile";
import { useAppDispatch, useAppSelector } from "@/module/store";

type Props = {};

function SettingForm({ }: Props) {
  const userProfile: any = useAppSelector(
    (state) => state?.completeProfileSlice?.userProfile
  );
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch()
  const form = useForm<z.infer<typeof settingSchema>>({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      fullname: "",
      email: "",
      phone: "",
      emailNotification: false,
      phoneNotification: false,
    },
  });

  function onSubmit(values: z.infer<typeof settingSchema>) {
    setIsLoading(true);
    try {
      let obj = {
        fullname: values?.fullname,
        phone: values?.phone,
        emailNotification: values?.emailNotification,
        phoneNotification: values?.phoneNotification,
      }
      updateProfilee(obj)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    dispatch(getProfile());
  }, [])

  useEffect(() => {
    if (userProfile) {
      console.log(userProfile, userProfile.emailNotification, 'weqeqwqweqwdas')
      form.setValue('fullname', userProfile.fullname);
      form.setValue('phone', userProfile.phone);
      form.setValue('emailNotification', userProfile.emailNotification);
      form.setValue('phoneNotification', userProfile.phoneNotification);
      form.setValue('email', userProfile?.user?.email);
    }
  }, [userProfile])

  const clearState = () => {

  }

  const updateProfilee = (data: any) => {
    try {
      setIsLoading(true);
      let payload: any = {
        data: data,
        clearState: clearState,
        setLoader: setIsLoading,
      };
      dispatch(updateProfile(payload));
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    console.log(form.getValues('emailNotification'), 'wqeqweqwe')
  }, [form])
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between  w-full  overflow-hidden "
      >
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-[80px] gap-y-[30px] w-full mb-[55px]">
          <div>
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[24px] font-medium">
                    Full Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your name"
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[24px] font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your number"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[24px] font-medium">
                    Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      placeholder="type your email"
                      className="border-[#0C0E0D]   placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>

        </div>

        <div className="mb-[55px]">
          <Heading
            text="Notification"
            className="text-[32px] font-medium mb-5"
          ></Heading>
          <div className="grid md:grid-cols-2 grid-cols-1  md:gap-[80px] gap-[40px]">

            <FormField
              control={form.control}
              name="emailNotification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-2xl text-black leading-7 text-left">Email Notification</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="emailNotification"
                      render={({ field }) => (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNotification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium text-2xl text-black leading-7 text-left">Phone Notification</FormLabel>
                  <FormControl>
                    <Controller
                      control={form.control}
                      name="phoneNotification"
                      render={({ field }) => (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <span className="slider"></span>
                        </label>
                      )}
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
            {/* <div className="flex items-center gap-x-5">
              <Heading text="Phone Notification" className="" />
              <label className="switch">
                <input checked={form.getValues('phoneNotification')} type="checkbox" id="toggleSwitch" onChange={(ev)=>{
                 console.log(ev?.target?.checked,'dsadasdasa')
                 form.setValue('phoneNotification', ev?.target?.checked);
                }}/>
                <span className="slider"></span>
              </label>
            </div>

            <div className="flex items-center gap-x-5">
              <Heading text="Email Notification" className="" />
              <label className="switch">
                <input checked={form.getValues('emailNotification')} type="checkbox" id="toggleSwitch" onChange={(ev)=>{
                 console.log(ev?.target?.checked,'dsadasdasa')
                 form.setValue('emailNotification', ev?.target?.checked);
                }}/>
                <span className="slider"></span>
              </label>
            </div> */}
          </div>
        </div>

        <div>
          <Heading
            text="Help and Support"
            className="text-[32px] font-medium mb-5"
          ></Heading>
          <div className="grid md:grid-cols-2 grid-cols-1  md:gap-[80px] gap-[40px]">
            <div className="flex items-center gap-x-5">
              <Heading text="FAQ" className="underline text-blueDark" />
            </div>
            <div className="flex items-center gap-x-5">
              <Heading text="Contact Support / Feedback" className="" />
              <svg
                width="25"
                height="26"
                viewBox="0 0 25 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_359_3478)">
                  <path
                    d="M12.5 23.4766C9.59919 23.4766 6.8172 22.3242 4.76602 20.273C2.71484 18.2219 1.5625 15.4399 1.5625 12.5391C1.5625 9.63826 2.71484 6.85626 4.76602 4.80508C6.8172 2.7539 9.59919 1.60156 12.5 1.60156C15.4008 1.60156 18.1828 2.7539 20.234 4.80508C22.2852 6.85626 23.4375 9.63826 23.4375 12.5391C23.4375 15.4399 22.2852 18.2219 20.234 20.273C18.1828 22.3242 15.4008 23.4766 12.5 23.4766ZM12.5 25.0391C15.8152 25.0391 18.9946 23.7221 21.3388 21.3779C23.683 19.0337 25 15.8543 25 12.5391C25 9.22386 23.683 6.04443 21.3388 3.70023C18.9946 1.35602 15.8152 0.0390625 12.5 0.0390625C9.18479 0.0390625 6.00537 1.35602 3.66117 3.70023C1.31696 6.04443 0 9.22386 0 12.5391C0 15.8543 1.31696 19.0337 3.66117 21.3779C6.00537 23.7221 9.18479 25.0391 12.5 25.0391Z"
                    fill="black"
                  />
                  <path
                    d="M13.9531 10.3328L10.3749 10.7813L10.2468 11.375L10.9499 11.5047C11.4093 11.6141 11.4999 11.7797 11.3999 12.2375L10.2468 17.6562C9.94368 19.0578 10.4109 19.7172 11.5093 19.7172C12.3609 19.7172 13.3499 19.3234 13.7984 18.7828L13.9359 18.1328C13.6234 18.4078 13.1671 18.5172 12.864 18.5172C12.4343 18.5172 12.278 18.2156 12.389 17.6844L13.9531 10.3328ZM14.0624 7.07031C14.0624 7.48471 13.8978 7.88214 13.6048 8.17517C13.3118 8.46819 12.9143 8.63281 12.4999 8.63281C12.0855 8.63281 11.6881 8.46819 11.3951 8.17517C11.102 7.88214 10.9374 7.48471 10.9374 7.07031C10.9374 6.65591 11.102 6.25848 11.3951 5.96546C11.6881 5.67243 12.0855 5.50781 12.4999 5.50781C12.9143 5.50781 13.3118 5.67243 13.6048 5.96546C13.8978 6.25848 14.0624 6.65591 14.0624 7.07031Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_359_3478">
                    <rect
                      width="25"
                      height="25"
                      fill="white"
                      transform="translate(0 0.0390625)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-16    w-[230px] mr-auto">
          <button
            type="submit"
            className="bg-blueDark capitalize w-full py-1 text-[26px]    rounded-lg  hover:bg-blueDark/80 text-white font-mediums px-4"
            disabled={isLoading}
          // onClick={() => console.log("dsajdskj")}
          // onClick={()=>form.handleSubmit(onSubmit)}
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

export default SettingForm;
