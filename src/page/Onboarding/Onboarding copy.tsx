"use client";
import { LeftArrow } from "@/Assets/Icons";
import {
  Carousel,
  CarouselContent,
  CarouselItem, type CarouselApi
} from "@/components/ui/carousel";
import { cn, logGroup } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import Step4 from "./Steps/Step4";
import Step5 from "./Steps/Step5";
import Step6 from "./Steps/Step6";
import Step7 from "./Steps/Step7";
import Step8 from "./Steps/Step8";
type Props = {};

function Onboarding({}: Props) {
  const [userType, setUserType] = useState("");
  const [nextActive, setNextActive] = useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [data, setData] = useState({
    nameOfCollege: "",
    university_id: 566,
    location: "",
    gender: "",
    entryYear: 0,
    graduationYear: 0,
    fullname: "",
    age: "",
    religion: "",
    ethnicity: "",
    bio: "",
  });
  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList()?.length);
    setCurrent(api.selectedScrollSnap() + 1);
    console?.log(api.selectedScrollSnap());

    api.on("select", () => {
      console?.log(api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    if (userType) {
      localStorage.setItem("userType", userType);
    }
  }, [userType]);

  useEffect(() => {
    if (api) {
      let usertype = localStorage.getItem("userType");
      if (usertype) {
        setUserType(usertype);
        // setCurrent(1)
      }
    }
  }, [api]);

  useEffect(() => {
    console.log(current, "currentcurrentcurrent");
  }, [current]);
  useEffect(() => {
    const handleDragStart = (e: any) => e.preventDefault();

    const carouselElement = document?.querySelector(".carousel");
    if (carouselElement) {
      carouselElement.addEventListener("dragstart", handleDragStart);
    }

    // Clean up on unmount
    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener("dragstart", handleDragStart);
      }
    };
  }, []);
  useEffect(() => {
    console.log(current, 'moveCursormoveCursormoveCursormoveCursor')
  }, [current])
 

  return (
    <>
      {/* //  <div  className={current==2 || current==3 || current==4 || current==5 || current==6 || current==7 || current==8?`Onboarding w-full lg:p-8 p-6 flex justify-between flex-row`: `Onboarding w-full lg:p-8 p-6`}> */}
      <div className="Onboarding w-full lg:p-8 p-6 overflow-hidden">
        <div className="boardingProgressouter w-full h-[6px] bg-[#EAEBED] rounded-[20px]">
          <div
            className={cn(
              `borderProgress w-[${12.5 * current
              }%] h-full bg-blue rounded-[20px]`
            )}
          ></div>
        </div>
        <div className="boardingScreens ">
          <Carousel setApi={setApi} draggable={false}>
            <CarouselContent>

              <CarouselItem>
                {current == 1 ? (
                  <Step1

                    userType={userType}
                    setUserType={setUserType}
                    setNextActive={setNextActive}
                    // handleClickStart={handleClickStart}
                  />

                ) : null}
              </CarouselItem>
              <CarouselItem>
                {current == 2 ? (

                  <Step2 />

                ) : null}
              </CarouselItem>
              <CarouselItem>
                {current == 3 ? (

                  <Step3 />
                ) : null}
              </CarouselItem>
              <CarouselItem>
                {current == 4 ? (

                  <Step4 />
                ) : null}
              </CarouselItem>
              <CarouselItem>
                {current == 5 ? (


                  <Step5 />
                ) : null}
              </CarouselItem>
              <CarouselItem>
                {current == 6 ? (


                  <Step6 />
                ) : null}

              </CarouselItem>
              <CarouselItem>
                {current == 7 ? (


                  <Step7 />
                ) : null}

              </CarouselItem>
              <CarouselItem>
                {current == 8 ? (


                  <Step8 api={api} data={data} setData={setData} />

                ) : null}
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
        {current !== 8 && (
          <div className="w-full items-center flex justify-center flex-col">
            <button
              className="nextButton max-w-[356px] w-full md:py-4 py-2  rounded-lg bg-blueDark disabled:bg-[#EAEBED] text-white disabled:text-black text-center"
              disabled={!nextActive}
              onClick={() => {
                api?.scrollNext();
              }}
            >
              Next
            </button>
            {current > 1 ? (
              <div id="nextSkip" className="nextSkip max-w-[450px] w-full flex items-center justify-between mt-6">
                <span
                  className="flex items-center justify-center text-blue cursor-pointer text-sm md:text-lg"
                  onClick={() => api?.scrollPrev()}
                >
                  <LeftArrow />
                  &nbsp;Back to Previous Page
                </span>
                <span
                  className="flex items-center justify-center text-blue cursor-pointer text-sm md:text-lg"
                  onClick={() => api?.scrollTo(8)}
                >
                  Skip to Profile Info
                </span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}

export default Onboarding;
