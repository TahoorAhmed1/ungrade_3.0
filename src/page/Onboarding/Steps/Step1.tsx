import {
  BookIcon,
  CursorIcon,
  ScholarIcon,
  SearchIcon,
  UniversityIcon,
} from "@/Assets/Icons";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Joyride, { CallBackProps, STATUS } from "react-joyride";
import { useMount, useSetState } from "react-use";
import TourGuide from "./Step1TourGuide";
import { useAppSelector } from "@/module/store";
// import a11yChecker from "a11y-checker";
type CardProps = {
  className?: any;
  comingSoon: boolean;
  title: string;
  text: string;
  icon: ReactNode;
  onClick: (_?: any) => void;
  selected: boolean;
};
// const Card = ({ icon, text, title, comingSoon, selected, setSelected }) => {
const Card = ({
  className,
  comingSoon,
  title,
  text,
  icon,
  onClick,
  selected,
}: CardProps) => {
  return (
    <div
      onClick={comingSoon ? () => { } : onClick}
      className={`${comingSoon ? "" : "cursor-pointer"
        }  bg-white w-full p-6 shadow-md h-[390px] rounded-[2px] ${selected ? "border-2 border-solid border-blue bg-[#F8FFFE] " : ""
        }`}
    >
      <div className="flex-col flex items-center h-full justify-between">
        <div className="title flex-col flex items-center justify-center relative">
          <div className="icon bg-[#CCEBEC] w-11 h-11 rounded-full text-blue flex items-center justify-center mb-4">
            {icon}
          </div>
          <h5 className="text-sm text-blueDark font-medium">{title}</h5>
          <p
            className={`leading-6 text-sm font-normal mt-10 text-gray ${comingSoon ? "blur-sm" : ""
              }`}
          >
            {text}
          </p>
          {comingSoon ? (
            <div className="bg-white px-11 py-9 text-blue text-sm font-medium leading-6 text-center absolute -bottom-11 m-0 shadow-md">
              Coming Soon
            </div>
          ) : null}
        </div>
        {comingSoon ? null : (
          <button
            className={`${className} bg-blueDark max-w-52 w-full py-2 text-white text-sm font-medium leading-6 text-center rounded-lg mt-10`}
          >
            {selected ? "Selected" : "Select"}
          </button>
        )}
      </div>
    </div>
  );
};
type Props = {
  userType: string;
  setUserType: Dispatch<SetStateAction<string>>;
  setNextActive: Dispatch<SetStateAction<boolean>>;
  handleClickStart?: any;
};
function Step1({ userType, setUserType, setNextActive, handleClickStart }: Props) {
  const userProfile: any = useAppSelector(
    (state) => state?.completeProfileSlice?.userProfile
  );
  const [startTour, setStartTour] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true)
  }, []);

  const handleStartTour = () => {
    setStartTour(true);
  };

  const handleTourEnd = () => {
    setStartTour(false);
  };

  useEffect(()=>{
    console.log(userProfile,'userProfileuserProfile')
  },[userProfile])

  if (!loaded) {
    return null;
  }
  return (
    <div className="Step1 w-full pt-10 mb-4">
      {!userProfile ?
        <>

          {startTour && (
            <TourGuide
              start={startTour}
              setStartTour={setStartTour}
              onTourEnd={handleTourEnd}
            />
          )}
        </>
        :
        null
      }
      <div className="">
        <h3 className="text-blue text-3xl leading-10 font-bold mb-4 text-center">
          Welcome to Ungrade, Andy!
        </h3>
        <p className="text-grey text-base  text-center">
          How would you like to get started?
        </p>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 items-center gap-8 mt-16 mb-10">
          <Card
            className={"collegeStudent"}
            selected={userType === "COLLEGE STUDENT" ? true : false}
            comingSoon={false}
            title={"COLLEGE STUDENT"}
            text={
              "I’ll be using Ungrade as a student to track my progress and see how my skills match up with various career paths."
            }
            icon={<ScholarIcon />}
            onClick={(e) => {
              setNextActive(true);
              setUserType("COLLEGE STUDENT");
              handleClickStart(e)
            }}
          />
          <Card
            className={"professor"}
            selected={userType === "PROFESSOR" ? true : false}
            comingSoon={true}
            title={"PROFESSOR"}
            text={
              "I’ll be using Ungrade as a student to track my progress and see how my skills match up with various career paths."
            }
            icon={<BookIcon />}
            onClick={() => {
              setNextActive(true);
              setUserType("PROFESSOR");
            }}
          />
          <Card
            className={"university"}
            selected={userType === "UNIVERSITY" ? true : false}
            comingSoon={true}
            title={"UNIVERSITY"}
            text={
              "I’ll be using Ungrade as a student to track my progress and see how my skills match up with various career paths."
            }
            icon={<UniversityIcon />}
            onClick={() => {
              setNextActive(true);
              setUserType("UNIVERSITY");
            }}
          />
          <Card
            className={"recruiter"}
            selected={userType === "RECRUITER" ? true : false}
            comingSoon={true}
            title={"RECRUITER"}
            text={
              "I’ll be using Ungrade as a student to track my progress and see how my skills match up with various career paths."
            }
            icon={<SearchIcon />}
            onClick={() => {
              setNextActive(true);
              setUserType("RECRUITER");
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Step1;
