import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  title: string;
  icon: () => JSX.Element;
  className?: string;
  textHeading: string;
  textPara: string;
  completed: boolean;
  completedText: string;
  type: string;
  link: string;
  disable?:Boolean;
  buttonClass?:any;
};

function CourseCard({
  title,
  link,
  icon,
  className,
  textHeading,
  textPara,
  completed,
  completedText,
  type,
  disable,
  buttonClass
}: Props) {
  return (
    <div
      className={
        "CourseCard bg-white rounded-radius flex flex-col justify-between shadow-md w-full" +
        " " +
        className
      }
    >
      {completed ? (
        <>
          {type === "Tier" ? (
            <>
              <div className="text-center">
                <div className="cardHeader py-4 px-6 flex items-center filter-greyScale">
                  {icon()}
                  <p className="ml-4 font font-medium text-base leading-6 text-left">
                    {title}
                  </p>
                  {/* {icon} */}
                </div>
              </div>
              <Image
                width={200}
                height={200}
                alt="bg"
                src={require("@/Assets/Images/assesComplete.png")}
                className="w-1/2 mx-auto"
              />
              <div className="pb-6 px-6">
                <p className="text-sm text-[#3A3D44]">{completedText}</p>
              </div>
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="cardHeader py-4 px-6 flex items-center filter-greyScale">
                  {icon()}
                  <p className="ml-4 font font-medium text-base leading-6 text-left">
                    {title}
                  </p>
                  {/* {icon} */}
                </div>
              </div>
              <Image
                width={200}
                height={200}
                alt="bg"
                src={require("@/Assets/Images/assesCourseComplete.png")}
                className="w-1/2 mx-auto"
              />
              <div className="pb-6 px-6">
                <p className="text-sm text-[#3A3D44]">{completedText}</p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div>
            <div className="cardHeader py-4 px-6 flex items-center">
              {icon()}
              <p className="ml-4 font font-medium text-base leading-6 text-left">
                {title}
              </p>
              {/* {icon} */}
            </div>
            <Image
              width={200}
              height={200}
              alt="bg"
              src={require("@/Assets/Images/assesBack.png")}
              className="w-full h-16 border-t-2 border-[#22656E]"
            />
            <div className="pt-4 pb-6 px-6">
              <h5 className="font-medium text-lg leading-[24px] text-left mb-4">
                {textHeading}
              </h5>
              <p className="font-normal text-base leading-[19.2px] text-left">
                {textPara}
              </p>
            </div>
          </div>
          <div className="w-full px-6 pb-6">
            <Link href={link}>
            {/* @ts-ignore */}
              <button disabled={disable || false} className={" w-full py-2 rounded-radius bg-blueDark disabled:bg-[#EAEBED] text-base text-white disabled:text-black text-center " + (buttonClass ? buttonClass : '')}>
                Submit
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default CourseCard;
