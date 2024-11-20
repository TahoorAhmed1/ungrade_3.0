"use client";
import {
  TierOneIconWithoutBg,
  TierThreeIconWithoutBg,
  TierTwoIconWithoutBg,
} from "@/Assets/Icons";
import BarGraph from "@/components/common/BarGraph";
import Heading from "@/components/common/Heading";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  AllStudentAverageResult,
  getCompetenciesByIdTier,
} from "@/module/features/competency";
import {
  getCourseProgress,
  getStudentCourses,
  getTierCourses,
} from "@/module/features/courses";
import TourGuide from "./EvaluationTourGuide";
import { checkTour } from "@/lib/utils";

type Props = {};

function Evaluation({}: Props) {
  const [selectTier, setSelectTier] = useState("tier1");
  const userProfile: any = useAppSelector(
    (state) => state?.completeProfileSlice?.userProfile
  );
  const tier1: any = useAppSelector((state) => state?.coursesSlice?.tier1);
  const tier2: any = useAppSelector((state) => state?.coursesSlice?.tier2);
  const tier3: any = useAppSelector((state) => state?.coursesSlice?.tier3);
  const AllTierCompetencies: any = useAppSelector(
    (state) => state?.competencySlice?.AllTierCompetencies
  );
  const degree: any = useAppSelector((state) => state?.degreeSlice?.degrees);
  const AllCompetencieResult = useAppSelector(
    (state) => state?.competencySlice?.AllCompetencieResult
  );
  const courseProgessInfo: any = useAppSelector(
    (state) => state?.coursesSlice?.courseProgessInfo
  );

  const courses: any = useAppSelector(
    (state) => state?.coursesSlice?.userCourses
  );
  const dispatch = useAppDispatch();
  const getResult = () => {
    let arr: any = [];
    courses?.map((a: any, i: any) => {
      a?.course?.course_competencies?.map((competency: any, j: Number) => {
        if (!arr.includes(competency.competency_id))
          arr.push(competency.competency_id);
      });
    });
    AllTierCompetencies?.map((a: any, i: any) => {
      if (!arr.includes(a?.id)) {
        arr.push(a?.id);
      }
    });
    dispatch(
      AllStudentAverageResult({
        userId: userProfile?.userProfile?.id,
        competencyIds: arr,
      })
    );
    if (userProfile?.profile_courses?.length) {
      dispatch(
        getCourseProgress({
          id: courses?.map((a: any, i: any) => {
            return a?.course?.id;
          }),
        })
      );
    }
  };
  useEffect(() => {
    dispatch(getStudentCourses("get"));
    dispatch(getTierCourses(1));
    dispatch(getTierCourses(2));
    dispatch(getTierCourses(3));
  }, []);
  useEffect(() => {
    if (tier1?.length && tier2?.length && tier3?.length) {
      let data = {
        courseIds: [tier1[0].id, tier2[0].id, tier3[0].id],
      };
      dispatch(getCompetenciesByIdTier({ data, tier: "all" }));
    }
  }, [tier1.length, tier2.length, tier3.length]);
  useEffect(() => {
    if (userProfile?.profile_courses?.length) {
      if (courses?.length && AllTierCompetencies?.length) {
        getResult();
      }
    } else {
      if (AllTierCompetencies?.length) {
        getResult();
      }
    }
  }, [courses, AllTierCompetencies?.length]);
  console?.log(
    AllCompetencieResult,
    courses,
    AllTierCompetencies,
    "AllTierCompetencies"
  );

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Competency Evaluation Chart",
      },
    },
  };
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
    <div className="Evaluation">
       {userProfile && checkTour(userProfile, 'evaluationTour') ?
        <>
          {startTour && (
        <TourGuide
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
      )}
         </>
        : null
      }
      <div className="">
        <Heading text="Tier Assessments Results" />
        <div className="flex items-center md:justify-start justify-between mt-5 mb-5">
          <div
            id="tier1"
            className="cardHeader md:py-4 md:px-6  flex items-center cursor-pointer"
            onClick={() => {
              setSelectTier("tier1");
            }}
          >
            <div
              className={`md:w-11 md:h-11 h-9 w-9  ${
                selectTier === "tier1" ? "bg-blueDark" : "bg-[#CCEBEC]"
              } rounded-full flex items-center justify-center`}
            >
              <TierOneIconWithoutBg
                active={selectTier === "tier1"}
                className="w-[20px]"
              />
            </div>
            <p className="md:ml-4 ml-1 font font-medium text-base leading-6 text-left">
              Tier 1
            </p>
            {/* {icon} */}
          </div>
          <div
            id="tier2"
            className="cardHeader md:py-4 md:px-6  flex items-center cursor-pointer"
            onClick={() => {
              setSelectTier("tier2");
            }}
          >
            <div
              className={`md:w-11 md:h-11 h-9 w-9 ${
                selectTier === "tier2" ? "bg-blueDark" : "bg-[#CCEBEC]"
              } rounded-full flex items-center justify-center`}
            >
              <TierTwoIconWithoutBg active={selectTier === "tier2"} />
            </div>
            <p className="md:ml-4 ml-1  font font-medium text-base leading-6 text-left">
              Tier 2
            </p>
            {/* {icon} */}
          </div>
          <div
            id="tier3"
            className="cardHeader md:py-4 md:px-6  flex items-center cursor-pointer"
            onClick={() => {
              setSelectTier("tier3");
            }}
          >
            <div
              className={`md:w-11 md:h-11 h-9 w-9  ${
                selectTier === "tier3" ? "bg-blueDark" : "bg-[#CCEBEC]"
              } rounded-full flex items-center justify-center`}
            >
              <TierThreeIconWithoutBg active={selectTier === "tier3"} />
            </div>
            <p className="md:ml-4 ml-1  font font-medium text-base leading-6 text-left">
              Tier 3
            </p>
            {/* {icon} */}
          </div>
        </div>
        <div id="tierResultGraph" className="">
          <div className="flex justify-end items-center">
            {/* <p className="font-medium text-[20px] leading-[24px] text-right">
              Filter By
            </p> */}
          </div>
          <div className="bg-white px-12 py-6 shadow-md rounded-radius mt-6">
            <BarGraph
              compentencies={
                AllCompetencieResult?.filter((a: any) =>
                  selectTier === "tier1"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 1)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : selectTier === "tier2"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 2)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : AllTierCompetencies?.filter((b: any) => b?.tier == 3)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                )?.map((a: any) => a?.competency_name) || []
              }
              pre_percentage={
                AllCompetencieResult?.filter((a: any) =>
                  selectTier === "tier1"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 1)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : selectTier === "tier2"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 2)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : AllTierCompetencies?.filter((b: any) => b?.tier == 3)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                )?.map((a: any) => a?.pre_percentage) || []
              }
              post_percentage={
                AllCompetencieResult?.filter((a: any) =>
                  selectTier === "tier1"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 1)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : selectTier === "tier2"
                    ? AllTierCompetencies?.filter((b: any) => b?.tier == 2)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                    : AllTierCompetencies?.filter((b: any) => b?.tier == 3)
                        .map((b: any) => b?.id)
                        .includes(a?.competency_id)
                )?.map((a: any) => a?.post_percentage) || []
              }
            />
          </div>
        </div>
        <Heading text="Course Assessments Results" className="mt-12" />
        <div id="courseResults" className="">
          <div className="flex justify-end items-center">
            {/* <p className="font-medium text-[20px] leading-[24px] text-right">
              Filter By
            </p> */}
          </div>
          <div className="bg-white px-12 py-6 shadow-md rounded-radius mt-6">
            <BarGraph
              compentencies={
                AllCompetencieResult?.filter((a: any) =>
                  !AllTierCompetencies?.map((b: any) => b?.id).includes(
                    a?.competency_id
                  )
                )?.map((a: any) => a?.competency_name) || []
              }
              pre_percentage={
                AllCompetencieResult?.filter((a: any) =>
                  !AllTierCompetencies?.map((b: any) => b?.id).includes(
                    a?.competency_id
                  )
                )?.map((a: any) => a?.pre_percentage) || []
              }
              post_percentage={
                AllCompetencieResult?.filter((a: any) =>
                  !AllTierCompetencies?.map((b: any) => b?.id).includes(
                    a?.competency_id
                  )
                )?.map((a: any) => a?.post_percentage) || []
              }
            />
          </div>
        </div>
        <div  className="flex md:flex-row flex-col justify-between items-center mt-12">
          <Heading
            className="md:leading-7 leading-5 text-lg md:text-2xl"
            text="Weekly Assessments Report"
          />
          <div className="flex items-center font-medium md:text-base block  text-right">
            <p className="md:block hidden mr-1">Week of </p>
            <DropdownMenu>
              <DropdownMenuTrigger className="bg-[#99D7D8] md:p-3 py-[15px] px-[122px] md:ml-10 rounded-full text-base">
                Aug 19th - Aug 25th
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#99D7D8] w-full rounded-radius">
                <DropdownMenuItem className="text-base bg-white hover:bg-[#78d4d5]  rounded-[4px] cursor-pointer mb-1">
                  Aug 12th - Aug 18th
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base bg-white hover:bg-[#78d4d5]  rounded-[4px] cursor-pointer mb-1">
                  Aug 5th - Aug 11th
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base bg-white hover:bg-[#78d4d5]  rounded-[4px] cursor-pointer mb-1">
                  Jul 29th - Aug 4th
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base bg-white hover:bg-[#78d4d5]  rounded-[4px] cursor-pointer mb-1">
                  Jul 22nd - Jul 28th
                </DropdownMenuItem>
                <DropdownMenuItem className="text-base bg-white hover:bg-[#78d4d5]  rounded-[4px] cursor-pointer">
                  Jul 15th - Jul 21st
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div id="yourReport" className="bg-[#EAEBED] px-12 py-6 shadow-md rounded-radius mt-6">
          <p className="font-normal md:text-[20px] text-[15px] leading-[24px] text-left">
            This week you felt fantastic about your classes, describing yourself
            as 'in the zone?.' You rated your understanding of course concepts
            at 4 out of 5, indicating strong comprehension. MKTG 300 and ENGL
            101 were particularly inspiring, but you faced challenges with
            assignments?. You improved by attending course office hours and
            managing your time better. Your goals for next week include engaging
            more in class, completing all assignments, and refining your study
            habits.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Evaluation;
