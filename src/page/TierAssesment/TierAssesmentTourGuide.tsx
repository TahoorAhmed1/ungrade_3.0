"use client"
import React from "react";
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/module/store";
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
}

const TourGuide = ({ start, setStartTour, onTourEnd }: TourGuideProps) => {
  const [progress, setProgress] = useState<number>(1);
  const tutorial = useAppSelector((state) => state.completeProfileSlice.tutorial);
  const dispatch = useAppDispatch()
  const totalSteps: number = 4;
  const router = useRouter(); // Using next/router for navigation
  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div className="p-3">
          <p className="text-4xl">Get started with Tier 1 Assessment.
          </p>
          <div className="mt-6 w-full flex items-center justify-center">
            <p className="mt-12 text-2xl font-bold">
              Take your personal skill evaluation first.

            </p>
          </div>
          <p className="mt-12 text-2xl font-bold">
            Let’s begin by taking your Personal-Effectiveness assessment to evaluate your personal skills.
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
          <p className="mr-4 text-base font-bold">Personal Assessment.

          </p>
          <p className="mr-2 text-sm">
            This tier includes couple of questions based on these skills aforementioned.
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
      target: "#skillPage",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">Start now!
          </p>
          <p className="mr-2 text-sm">Click "Next" to begin the assessment.</p>
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
      data: {
        callback: () => {
          console.log('asdasdasd')
          let obj = {
            tutorial: [...tutorial, 'assessmentTour']
          };
          let payload: any = {
            data: { ...obj },
            callback: () => { dispatch(getProfile()) }

          };
          // console.log(payload,'payloadpayload')
          dispatch(updateProfile(payload));
        },
      },
      placement: "bottom",
      target: "#nextButton",
      title: "",
    },

  ];

  useEffect(() => {
    if (tutorial) {
      console.log(tutorial, 'tutorialtutorial')

    }
  }, [tutorial])
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
