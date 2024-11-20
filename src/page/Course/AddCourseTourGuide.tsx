"use client"
import React from "react";
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getProfile, updateProfile } from "@/module/features/completeProfile";
import { useAppDispatch, useAppSelector } from "@/module/store";

interface State {
  run: boolean;
  stepIndex: number;
  steps: Step[];
}

interface TourGuideProps {
  start: boolean;
  setStartTour: (value: boolean) => void;
  onTourEnd: () => void;
}

const TourGuide = ({ start, setStartTour, onTourEnd }: TourGuideProps) => {
  const tutorial = useAppSelector((state) => state.completeProfileSlice.tutorial);
  const dispatch = useAppDispatch()
  const [progress, setProgress] = useState<number>(1);
  const totalSteps: number = 4;
  const router = useRouter(); // Using next/router for navigation
  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div className="p-3">
          <p className="text-4xl">You are one step closer!
          </p>
          <div className="mt-6 w-full flex items-center justify-center">
            <p className="mt-12 text-2xl font-bold">
              Add you first course.

            </p>
          </div>
          <p className="mt-12 text-2xl font-bold">
            Let's begin by adding your first course to track your learning progress.
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
          <p className="mr-4 text-base font-bold">Declare Your Major
          </p>
          <p className="mr-2 text-sm">
            Select your major and concentration to customize your course plan for the semester.
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
      target: "#declaredMajor",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Select Your Concentration
          </p>
          <p className="mr-2 text-sm">Choose your concentration to focus on a specific area within your major.</p>
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
      target: "#Concentration",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Add Course Code
          </p>
          <p className="mr-2 text-sm">Add the course code to identify and organize your classes easily.</p>
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
      target: "#courseCode",
      title: "",
    },

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Select Professor
          </p>
          <p className="mr-2 text-sm">Select professor for the course.</p>
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
      target: "#professorName",

      title: "",
    },

    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Select course
          </p>
          <p className="mr-2 text-sm">Select the course name from the list.</p>
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
      target: "#nameCourse",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Add Another Course.
          </p>
          <p className="mr-2 text-sm">Click to add another course, and details for the same.</p>
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
      target: "#addCourse",
      disableBeacon: true,
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Add Professor.
          </p>
          <p className="mr-2 text-sm">Click to add Professor.</p>
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
      target: "#addProfessor",
      disableBeacon: true,
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Go back to dashboard.
          </p>
          <p className="mr-2 text-sm">Once confirmed, hit the "Submit" button to save your course.</p>
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
            tutorial: [...tutorial, 'addCourseTour']
          };
          let payload: any = {
            data: { ...obj },
            callback: () => { dispatch(getProfile()) }
          };
          // console.log(payload,'payloadpayload')
          dispatch(updateProfile(payload));
        },
      },
      target: "#submitCourse",
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

  const [{ run, steps }, setState] = useState<State>({
    run: start,
    stepIndex: 0,
    steps: generateSteps(progress),
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      steps: generateSteps(progress),
    }));
  }, [progress]);

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
