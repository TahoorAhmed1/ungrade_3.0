import React from "react";
import { useEffect, useState } from "react";
import type { CallBackProps, Step } from "react-joyride";
import Joyride, { EVENTS, STATUS } from "react-joyride";
import Image from "next/image";

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
  
  const generateSteps = (val: number): Step[] => [
    {
      content: (
        <div className="p-3">
          <p className="text-4xl">You're almost there!
          </p>
          <div className="mt-6 w-full  flex items-center justify-center">
            <p className="mt-12 text-2xl font-bold">Let's set up your profile!
            </p>
          </div>
          <p className="mt-12 text-2xl font-bold">
          Let us walk you through the process to get started!

          </p>
          <p className="mt-6 mb-8 text-md">
          This tutorial will walk you through each step, making it easy to understand and use Ungrade.
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
          <p className="mr-4 text-base font-bold">Start setting up your college student profile. 
          </p>
          <p className="mr-2 text-sm">
          Click "Get Started" to kick-off the process.
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
      target: ".collegeStudent",
      title: "",
    },
    {
      content: (
        <div className="mb-4 flex flex-col gap-4 px-2 text-left">
          <p className="mr-4 text-base font-bold">One step closer!.
          </p>
          <p className="mr-2 text-sm">Click "Next" to proceed further.</p>
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
      target: "#nextBtn",
      title: "",
    }
  ];
  const totalSteps: number = generateSteps.length;

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
    const { status, type, index } = data;

    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ steps, run: false, stepIndex: 0 });
      setStartTour(false);
      onTourEnd();
    } else if (([EVENTS.STEP_BEFORE] as string[]).includes(type)) {
      setProgress(index + 1);
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
