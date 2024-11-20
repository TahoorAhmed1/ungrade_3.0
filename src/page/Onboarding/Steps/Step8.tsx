import { LeftArrow } from "@/Assets/Icons";
import WelcomeForm from "@/components/forms/welcomeForm";
import { Form } from "@/components/ui/form";
import { getUser } from "@/module/features/authentication";
import { completeProfile } from "@/module/features/completeProfile";
import { useAppDispatch } from "@/module/store";
import { welcomeSchema } from "@/validations/indx";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TourGuide from "./Step8TourGuide";
type Props = {
  api: any;
  data: any;
  setData: any;
};

function Step8({ api, data, setData }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const form = useForm<z.infer<typeof welcomeSchema>>({
    resolver: zodResolver(welcomeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "Not Specified",
      department_id: 0,
      university: "",
      enrollDate: "",
      graduationDate: "",
    },
  });
  const [selectedUniversityName, setSelectedUniversityName] = useState("");
  const callback = (login: any) => {
    if (login) {
      router.push("/login");
    } else {
      dispatch(getUser(false));
      router.push("/dashboard");
    }
    // changeTab('Courses')
  };
  async function onSubmit(values: z.infer<typeof welcomeSchema>) {
    setIsLoading(true);
    try {
      console?.log(values);
      let obj = {
        department_id: Number(values?.department_id),
        nameOfCollege: selectedUniversityName,
        university_id: Number(values?.university),
        entryYear: Number(values?.enrollDate),
        graduationYear: Number(values?.graduationDate),
        fullname: values?.firstName + " " + values?.lastName,
        gender: values?.gender,
        tutorial: ['onbordingStepOne', 'onbordingStepTwo']
      };
      let payload: any = {
        data: { ...obj, tier: 1 },
        callback,
        setLoader: setIsLoading,
      };
      dispatch(completeProfile(payload));
    } finally {
      setIsLoading(false);
    }
  }
  const [startTour, setStartTour] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleStartTour = () => {
    setStartTour(true);
  };

  const handleTourEnd = () => {
    setStartTour(false);
  };

  if (!loaded) {
    return null;
  }
  return (
    <Form {...form}>
      {startTour && (
        <TourGuide
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
      )}
      <form className="w-full " onSubmit={form.handleSubmit(onSubmit)}>
        <div className="Step8 flex justify-between items-center md:flex-nowrap flex-wrap md:my-16 my-5 gap-10 mx-auto">
          <div className="md:w-1/2 w-full">
            <div className="flex justify-center">
              <div className="">
                <h5 className="text-blue md:text-[36px] text-[28px] font-bold leading-10 mb-4">
                  Ready for Your First Year?
                </h5>
                <p className="mb-4 text-[#5E636C] md:text-[24px] text-[18px] font-normal">
                  Let’s start by setting up your profile. For now,
                  <br className="lg:block hidden" />
                  we just need a few details— the name of{" "}
                  <br className="lg:block hidden" /> your university and when
                  you’ll be attending.
                </p>
                <p className=" text-[#5E636C] md:text-[24px] text-[18px] font-normal">
                  You can add or update any of your profile
                  <br className="lg:block hidden" /> information from the
                  profile icon at the top <br className="lg:block hidden" />{" "}
                  right corner of the screen.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="flex max-w-[570px] items-center justify-center">
              <WelcomeForm
                form={form}
                selectedUniversityName={selectedUniversityName}
                setSelectedUniversityName={setSelectedUniversityName}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="md:w-[356px] w-full mt-[48px] mx-auto  bg-blueDark flex justify-center py-4 rounded-lg text-[24px] mb-[24px] font-medium disabled:bg-[#EAEBED] text-[#fff]  text-center"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}

export default Step8;
