"use client"
import React from "react";
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { checkTour } from "@/lib/utils";
import { getProfile, updateProfile } from "@/module/features/completeProfile";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

interface TourGuideProps {
  start: boolean;
  setStartTour: (value: boolean) => void;
  onTourEnd: () => void;
  startFrom?: any;
}

const TourGuide = ({ start, setStartTour, onTourEnd, startFrom }: TourGuideProps) => {
  const userProfile: any = useAppSelector(
    (state) => state?.completeProfileSlice?.userProfile
  );
  const tutorial = useAppSelector((state) => state.completeProfileSlice.tutorial);
  const dispatch = useAppDispatch()
  const [progress, setProgress] = useState<number>(1);
  const totalSteps: number = 4;
  const router = useRouter(); // Using next/router for navigation
  const generateStepsStart = (val: number): Step[] => [
    {
      content: (
        <div className="p-3">
          <p className="text-4xl">Welcome to your Ungrade dashboard
          </p>
          <div className="mt-6 w-full flex items-center justify-center">
            <p className="mt-12 text-2xl font-bold">
              You've completed your profile!
            </p>
          </div>
          <p className="mt-12 text-2xl font-bold">
            You can access courses, assess your skills, and explore career paths here.
          </p>
          <p className="mt-6 mb-8 text-md">
            This tutorial guides you step-by-step, making Ungrade easy to use.
          </p>
          <div className="mt-4 border-b border-sessionbutton-foreground" />
          <div className="absolute bottom-[34px] left-[47%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      locale: { skip: <strong aria-label="skip">Skip</strong> },
      styles: {
        options: {
          width: 700,
        },
      },
      placement: "center",
      target: "body",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Weekly stay-on-track!
          </p>
          <p className="mr-2 text-sm">
            Use weekly assessments to review your progress and refine your study plan.
          </p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#weeklyCheckIn",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Your Progress Checklist
          </p>
          <p className="mr-2 text-sm">This checklist shows your progress so far and highlights what you've completed. Keep going to stay on track and finish all the tasks.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#checklist",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Semester Progress Overview.
          </p>
          <p className="mr-2 text-sm">This section shows your overall progress of this semester.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#creditCourse",
      title: "",
    },

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">What are Tiers?
          </p>
          <p className="mr-2 text-sm">Tier assessments evaluate your skills to guide you toward your next dream job based on your abilities.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#TierAssesment",

      title: "",
    },

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Take Tier 1 assessment
          </p>
          <p className="mr-2 text-sm">Start with the Tier 1 assessment to evaluate your personal skills.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: ".tier1",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Take tier 1 assesment
          </p>
          <p className="mr-2 text-sm">Start with the Tier 1 assessment to evaluate your personal skills.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: ".tier1Btn",

      data: {
        callback: () => {
          console.log('asdasdasd')
          let obj = {
            tutorial: ['onbordingStepOne', 'onbordingStepTwo', 'homeTourStart']
          };
          let payload: any = {
            data: { ...obj },
            callback: () => { dispatch(getProfile()) }

          };
          dispatch(updateProfile(payload));
        },
        // next: "/dashboard/assesment/tier/1?assesmentType=pre"
      },
      disableBeacon: true,
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Vercel Logodd</p>
          <p className="mr-2 text-sm">Next.js is built by vercel</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#skillPage",
      title: "",
    }
    // {
    //   content: (
    //     <div className="mb-4 flex flex-col gap-4 px-2 text-left">
    //       <p className="mr-4 text-base font-bold">Vercel Logo</p>
    //       <p className="mr-2 text-sm">Next.js is built by vercel</p>
    //       <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
    //         {val} of {totalSteps}
    //       </div>
    //     </div>
    //   ),
    //   styles: {
    //     options: {
    //       width: 380,
    //     },
    //   },
    //   placement: "bottom",
    //   target: "#addCourseButton",
    //   title: "",
    // }
  ];
  const generateStepsAddCourse = (val: number): Step[] => [
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Add Your First Course
          </p>
          <p className="mr-2 text-sm">Get started by adding your first course.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#addCourseButton",
      data: {
        callback: () => {
          console.log('asdasdasd')
          let obj = {
            tutorial: [...tutorial, 'addCourse']
          };
          let payload: any = {
            data: { ...obj },
            callback: () => { dispatch(getProfile()) }

          };
          // console.log(payload,'payloadpayload')
          dispatch(updateProfile(payload));
        },
        next: '/dashboard/course/add-course'
      },
      title: "",
    }
  ];
  const generateStepsCourseAdded = (val: number): Step[] => [

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">View Your Courses
          </p>
          <p className="mr-2 text-sm">Here, you can see all your enrolled courses, their details, and your progress.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      target: "#CurrentCourses",
      title: "",
    },

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Navigate through Courses
          </p>
          <p className="mr-2 text-sm">This is where you can explore everything related to courses.</p>
          <div className="absolute bottom-[30px] left-[38%] text-sm text-neutral-400">
            {val} of {totalSteps}
          </div>
        </div>
      ),
      styles: {
        options: {
          width: 380,
        },
      },
      placement: "bottom",
      data: {
        callback: () => {
          console.log('asdasdasd')
          let obj = {
            tutorial: [...tutorial, 'courseEdit']
          };
          let payload: any = {
            data: { ...obj },
            callback: () => { dispatch(getProfile()) }

          };
          // console.log(payload,'payloadpayload')
          dispatch(updateProfile(payload));
        },
        next: '/dashboard/course'
      },
      target: "#courses",
      title: "",
    },


  ];



  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: [],
  });

  useEffect(() => {
    if (userProfile) {

      setState((prevState) => ({
        ...prevState,
        steps: checkTour(userProfile, 'homeTourStart') ? generateStepsStart(progress) : checkTour(userProfile, 'addCourse') ? generateStepsAddCourse(progress) : checkTour(userProfile, 'courseEdit') ? generateStepsCourseAdded(progress) : [],
      }));
    }
  }, [progress, startFrom, userProfile]);

  useEffect(() => {
    if (start) {
      setState((prevState) => ({
        ...prevState,
        run: true,
        stepIndex: 0,
      }));
    }
  }, [start]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, step } = data;
    console.log(data, 'datadata')
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      onTourEnd();
    } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
      setProgress(index + 1);
    }
    if (step?.data?.callback && type === EVENTS.STEP_AFTER) {

      step?.data?.callback()
    }
    if (step?.data?.next && type === EVENTS.STEP_AFTER) {
      router.push(step?.data?.next);
    }

  };

  return (
    <Joyride
      continuous
      callback={handleJoyrideCallback}
      run={run}
      steps={steps}
      scrollToFirstStep
      hideCloseButton={false}
      disableCloseOnEsc
      disableOverlayClose
      spotlightPadding={10}
      showProgress
      showSkipButton
      debug
      styles={{
        overlay: {
          border: "6px solid lightblue",
        },
        spotlight: {
          border: "2px solid lightblue",
        },
        buttonClose: {
          marginTop: "5px",
          marginRight: "5px",
          width: "12px",
        },
        buttonNext: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
          backgroundColor: "#1c7bd4",
          borderRadius: "5px",
          color: "#FFFFFF",
        },
        buttonSkip: {
          color: "A3A3A3",
        },
        tooltipFooter: {
          margin: "0px 16px 10px 10px",
        },
        buttonBack: {
          outline: "2px solid transparent",
          outlineOffset: "2px",
        },
        options: {
          zIndex: 100,
          arrowColor: "#1F1F1F",
          backgroundColor: "#1F1F1F",
          textColor: "#FFFFFF",
          overlayColor: "rgba(0, 0, 0, 0.9)",
          primaryColor: "#1c7bd4",
        },
      }}
      locale={{
        back: (
          <p className="font-bold focus:ring-transparent focus-visible:outline-none">
            {`<-`}
          </p>
        ),
      }}
    />
  );
};

export default TourGuide;
