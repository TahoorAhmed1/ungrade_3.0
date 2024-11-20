"use client";
import {
  CalenderIcon,
  CheckCircle,
  TierOneIcon,
  TierThreeIcon,
  TierTwoIcon,
} from "@/Assets/Icons";
import CourseCard from "@/components/common/CourseCard";
import Heading, { SmallHeading } from "@/components/common/Heading";
import TopSkillProgress from "@/components/common/TopSkillProgress";
import WelcomeText from "@/components/common/WelcomeText";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkTour, daysLeft, isDurationCompleted } from "@/lib/utils";
import {
  AllStudentAverageResult,
  getCompetenciesByIdTier,
} from "@/module/features/competency";
import { getProfile } from "@/module/features/completeProfile";
import { getConcentration } from "@/module/features/concentration";
import {
  getCourseProgress,
  getStudentCourses,
  getTierCourses,
} from "@/module/features/courses";
import { getDegree } from "@/module/features/degree";
import { checkWeeklyOutcomes } from "@/module/features/outcomesSlice";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { message } from "antd";
import { ChevronRight, Key } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import TourGuide from "./HomeTourGuide";

type Props = {};

function Home({ }: Props) {
  const userProfile: any = useAppSelector(
    (state) => state?.completeProfileSlice?.userProfile
  );
  const checkWeeklyOutcomesBoolean: any = useAppSelector(
    (state) => state?.outcomesSlice?.checkWeeklyOutcomesBoolean
  );
  console?.log({ checkWeeklyOutcomesBoolean });
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
  const [degreeName, setDegreeName] = useState("");
  const [contentrationName, setContentrationName] = useState("");

  const router = useRouter();
  const Tiers = [
    {
      key: "1",
      label: `Personal Effectiveness Skills`,
      description:
        "The first level tier assessment tests foundational skills like interpersonal skills and adaptability.",
      enable: true,
    },
    {
      key: "2",
      label: `Academic Skill Assessment`,
      description:
        "The second level tier assessment tests academic skills like writing, reading, and others learned in general education.",
      enable: false,
    },
    {
      key: "3",
      label: `Workplace Skill Assessment`,
      description:
        "The third level tier assessment tests skills that are specific to the workplace, such as teamwork and planning abilities.",
      enable: false,
    },
  ];
  const getResult = () => {
    let arr: any = [];
    courses?.map((a: any, i: any) => {
      a.course.course_competencies.map((competency: any, j: Number) => {
        if (!arr.includes(competency?.competency_id))
          arr.push(competency?.competency_id);
      });
    });
    console.log(arr, courses, AllTierCompetencies, "AllTierCompetencies");
    AllTierCompetencies.map((a: any, i: any) => {
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
    dispatch(getProfile());
    dispatch(getDegree());
    dispatch(getConcentration());

    dispatch(getStudentCourses("get"));
    dispatch(getTierCourses(1));
    dispatch(getTierCourses(2));
    dispatch(getTierCourses(3));
    dispatch(checkWeeklyOutcomes({}));
  }, []);
  useEffect(() => {
    // check degree id in user profile profile_courses
    if (degree?.length) {
      if (userProfile?.profile_courses?.length) {
        // match degree id in user profile profile_courses
        console.log("idid", userProfile?.profile_courses[0]?.degree_id);

        degree?.map((a: any, i: any) => {
          if (a?.id === userProfile?.profile_courses[0]?.degree_id) {
            // Tiers[2].enable = true;
            setDegreeName(a.name);
            // a?.degree_Concentration[0]?.concentration?.name
          }
          a?.degree_Concentration?.map((b: any, i: any) => {
            if (b?.concentration?.id === userProfile?.profile_courses[0]?.concentration_id) {
              setContentrationName(b?.concentration?.name);
            }
          });
        });
      }
    }
  }, [degree?.length, userProfile]);

  useEffect(() => {
    if (tier1?.length && tier2?.length && tier3?.length) {
      let data = {
        courseIds: [tier1[0]?.id, tier2[0]?.id, tier3[0]?.id],
      };
      dispatch(getCompetenciesByIdTier({ data, tier: "all" }));
    }
  }, [tier1?.length, tier2?.length, tier3?.length]);
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
  const [startTourFrom, setStartTourFrom] = useState('start')
  useEffect(() => {
    // if(2 >= 2){
    if (courses?.length) {
      setStartTourFrom('courseAdded')
    } else if (Number(userProfile?.tier) >= 2) {
      setStartTourFrom('addCourse')
    }
  }, [userProfile, Tiers, courses])
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
    <div className="Home w-full lg:p-6 p-4">
      {startTour && (
        <TourGuide
          startFrom={startTourFrom}
          start={startTour}
          setStartTour={setStartTour}
          onTourEnd={handleTourEnd}
        />
      )}
      <div className="w-full">
        <WelcomeText name={userProfile?.fullname} />
        <div className="mt-8">
          <Heading text="Your Recent Summary" className="" />
          <div className="flex gap-6 w-full mt-6 lg:flex-row flex-col">
            <div className="lg:w-[35%] w-full lg:order-none order-3 lg:block flex items-center flex-col">
              <div
                id="weeklyCheckIn"
                onClick={() =>
                  !checkWeeklyOutcomesBoolean
                    ? router.push("/dashboard/outcome")
                    : message?.error("You Haven't weekly Checkin Yet")
                }
                className="cursor-pointer weekly lg:order-none order-2 relative flex justify-start w-full  items-end bg-[rgba(229,245,245,1)] p-6 rounded-lg shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)]"
              >
                <div className="flex items-center ">
                  <div className="rounded-full p-[10px] bg-blueDark mr-4">
                    <CalenderIcon />
                  </div>
                  <div className="">
                    <h6 className="font-medium text-xl leading-6 text-left text-blueDark mb-1">
                      Weekly Check-in
                    </h6>
                    <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
                      How’re you doing this week?
                    </p>
                  </div>
                </div>
                <div className="backDiv absolute right-4">
                  <Link
                    href={"/dashboard/assesment/tier/3"}
                    className="w-5 h-5 bg-blueDark rounded-full flex items-center justify-center"
                  >
                    <ChevronRight color="white" size={16} />
                  </Link>
                </div>
              </div>
              <div id="checklist" className="checklist w-full lg:order-none order-1 h-[calc(100%-108.8px)] lg:mb-0 mb-6 pt-2 pb-6 px-6 bg-white shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] mt-4">
                <div className="flex items-center justify-between mb-6">
                  <SmallHeading text="Your Check List" className="" />
                  <div className="flex ">
                    <div className="p-2 font-normal text-sm leading-[1.2] bg-[rgba(229,245,245,1)]  rounded-lg">
                      Beginning
                    </div>
                    <div className="p-2 font-normal text-sm leading-[1.2]">
                      End
                    </div>
                  </div>
                </div>

                <div className="flex-col flex">
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">
                        <CheckCircle />
                      </div>
                    </div>
                    <p>Enter Classes for Fall Semester</p>
                  </div>
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">{/* <CheckCircle /> */}</div>
                    </div>
                    <p>Complete Tier Pre-Assessments</p>
                  </div>
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">{/* <CheckCircle /> */}</div>
                    </div>
                    <p>Complete Course Pre-Assessments</p>
                  </div>
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">{/* <CheckCircle /> */}</div>
                    </div>
                    <p>View Your Evaluation Results</p>
                  </div>
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">{/* <CheckCircle /> */}</div>
                    </div>
                    <p>View Your Occupational Matches</p>
                  </div>
                  <div className="statusBox mb-3 flex items-center">
                    <div className="checkbox flex mr-4 items-center justify-center  lg:order-noneborder-[rgba(211,213,218,1)] w-6 h-6 rounded-full  lg:order-noneborder-[2px]">
                      <div className="w-6 h-6 ">{/* <CheckCircle /> */}</div>
                    </div>
                    <p>Save Future Courses for Later</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="creditCourse" className="lg:w-[35%] w-full lg:order-none order-2">
              <div className="bg-white p-6 shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] rounded-lg">
                <SmallHeading text="Course Credit Progress" className="" />
                <div className="mt-6">
                  <div>
                    <p className="font-semibold text-lg leading-[1.2] text-left">
                      You are on track to graduate May 2028
                    </p>
                    <div className="mt-4">
                      <div className="boardingProgressouter w-full h-[6px] bg-[#EAEBED] rounded-[20px]">
                        <div
                          className={`borderProgress w-[30%] h-full bg-blue rounded-[20px]`}
                        ></div>
                      </div>
                      <p className="font-normal text-xs leading-[1.2] text-left text-[#A1A6B0] mt-1">
                        18/120 Total Credit Hours
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold text-lg leading-[1.2] text-left">
                      Credit Hours toward Concentration Requirements
                    </p>
                    <div className="mt-4">
                      <div className="boardingProgressouter w-full h-[6px] bg-[#EAEBED] rounded-[20px]">
                        <div
                          className={`borderProgress w-[30%] h-full bg-blue rounded-[20px]`}
                        ></div>
                      </div>
                      <p className="font-normal text-xs leading-[1.2] text-left text-[#A1A6B0] mt-1">
                        15/75 Concentration Course Credit Hours
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="font-semibold text-lg leading-[1.2] text-left">
                      Credit Hours toward Minor
                    </p>
                    <div className="mt-4">
                      <div className="boardingProgressouter w-full h-[6px] bg-[#EAEBED] rounded-[20px]">
                        <div
                          className={`borderProgress w-[30%] h-full bg-blue rounded-[20px]`}
                        ></div>
                      </div>
                      <p className="font-normal text-xs leading-[1.2] text-left text-[#A1A6B0] mt-1">
                        0/22 Minor Course Credit Hours
                      </p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link id="addCourseButton" href={"/dashboard/course/add-course"}>
                      {/* @ts-ignore */}
                      <button className=" w-full py-2 rounded-radius bg-blueDark disabled:bg-[#EAEBED] text-base text-white disabled:text-black text-center">
                        Add Course
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[35%] w-full lg:order-none order-1 flex lg:flex-col flex-row flex-wrap justify-between">
              <div className="studentEduDetail xl:h-1/4 md:h-1/5  lg:aspect-auto aspect-square lg:w-full w-[calc(50%-12px)] gap-6 rounded-lg py-4 px-6 mb-4 shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] bg-white flex flex-col justify-center">
                <div className="w-full">
                  <SmallHeading
                    text="University"
                    className="lg:text-left text-center"
                  />
                  <p className="font-normal text-base leading-[1.2] text-left mt-3">
                    {userProfile?.nameOfCollege}
                  </p>
                </div>
              </div>
              <div className="studentEduDetail xl:h-1/4 md:h-1/5  lg:aspect-auto aspect-square lg:w-full w-[calc(50%-12px)] gap-6 rounded-lg py-4 px-6 mb-4 shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] bg-white flex flex-col justify-center">
                <div>
                  <SmallHeading
                    text="Selected Major"
                    className="lg:text-left text-center"
                  />
                  <p className="font-normal text-base leading-[1.2] text-left mt-3">
                    {/* {degree?.length ? degree[0]?.name : ""} */}
                    {degreeName || "No Major Selected"}
                  </p>
                </div>
              </div>
              <div className="studentEduDetail xl:h-1/4 md:h-1/5  lg:aspect-auto aspect-square lg:w-full w-[calc(50%-12px)] gap-6 rounded-lg py-4 px-6 mb-4 shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)] bg-white flex flex-col justify-center">
                <div>
                  <SmallHeading
                    text="Concentration"
                    className="lg:text-left text-center"
                  />
                  <p className="font-normal text-base leading-[1.2] text-left mt-3">
                    {/* {degree?.length
                      ? degree[0]?.degree_Concentration[0]?.concentration?.name
                      : ""} */}
                    {contentrationName || "No Concentration"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {AllCompetencieResult?.length ? (
          <div className="mt-8">
            <div className="flex justify-between items-center">
              <Heading
                text="Top Occupational Skills based on Course Assessments"
                className=""
              />
              <button
                onClick={() => router.push("/dashboard/evaluation")}
                className="max-w-[132px] lg:block hidden w-full py-2 rounded-lg bg-blueDark disabled:bg-[#EAEBED] text-base text-white disabled:text-black text-center"
              >
                View all
              </button>
            </div>
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 w-full mt-6">
              {AllCompetencieResult?.slice(0, 6)?.map((a: any, i) => (
                <TopSkillProgress {...a} />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {userProfile?.tier < 4 ? (
          <div id="TierAssesment" className="mt-8">
            <Heading text="Tier Assessment Action Items" className="" />
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6 w-full mt-6">
              {Tiers?.map((tier, i) => (
                <CourseCard
                  buttonClass={`tier${tier.key}Btn`}
                  key={tier.key}
                  link={
                    "/dashboard/assesment/tier/" +
                    tier.key +
                    "?assesmentType=pre"
                  }
                  type={"Tier"}
                  completedText={`You’ve completed your tier ${tier.key} pre-course assessment?. See your progress at the end of the semester by completing another assessment after your courses are over.`}
                  completed={Number(tier.key) < userProfile?.tier}
                  title={`TIER ${tier.key} PRE-ASSESSMENT `}
                  icon={TierTwoIcon}
                  className={`tier${tier.key}`}
                  disable={Number(userProfile?.tier) !== Number(tier.key)}
                  textHeading={tier.label}
                  textPara={tier.description}
                />
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {courses?.length ? (
          <div id="course" className="mt-8">
            <Heading text="Course Assessment Action Items" className="" />
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1  gap-6 w-full mt-6 flex-wrap">
              {courses?.map((a: any, i: any) => {
                //  "duration": courseData?.length ? courseData[0].duration : [],
                //  "createdAt": courseData?.length ? courseData[0].createdAt : [],
                // console?.log(
                //   daysLeft(a?.duration, a?.createdAt),
                //   isDurationCompleted(a?.duration, a?.createdAt),
                //   courseProgessInfo[i]
                // );
                return (
                  <CourseCard
                    link={
                      courseProgessInfo[i]?.item?.length < 1
                        ? `/dashboard/assesment/course/${a?.course?.id}?assesmentType=pre`
                        : `/dashboard/assesment/course/${a?.course?.id}?assesmentType=post`
                    }
                    key={i}
                    type={"course"}
                    completedText={
                      courseProgessInfo[i]?.item?.length > 1
                        ? `You’ve completed your course assessment . See more about the top occupational skills you’ve learned in the Evaluation Center.`
                        : `You’ve completed your course pre assessment and for post assessment you have ${daysLeft(
                          a?.duration,
                          a?.createdAt
                        )} . See more about the top occupational skills you’ve learned in the Evaluation Center.`
                    }
                    completed={
                      courseProgessInfo[i]?.result
                        ? isDurationCompleted(a?.duration, a?.createdAt)
                        : false
                    }
                    // completed={false}
                    title={a?.course?.course_code || "-" + " | PRE- TEST"}
                    icon={TierOneIcon}
                    // className="lg:w-[calc(33.333%-24px)] w-full"
                    textHeading={a?.course?.course || "-"}
                    textPara="Complete a psychometric assessment for a comprehensive overview of the skills learned from course concepts."
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div id="CurrentCourses" className="mt-8">
          <div className="flex justify-between items-center">
            <Heading text="Current Courses" className="" />
            <button
              onClick={() => router.push("/dashboard/course")}
              className="max-w-[132px] lg:block hidden  w-full py-2 rounded-lg bg-blueDark disabled:bg-[#EAEBED] text-base text-white disabled:text-black text-center"
            >
              View all
            </button>
          </div>
          <div className="flex gap-6 w-full mt-6 flex-wrap rounded-lg overflow-hidden">
            <Table className="bg-white shadow-lg">
              <TableHeader className="bg-[rgba(229,245,245,1)]">
                <TableRow>
                  <TableHead className="w-[100px] text-center font-medium text-base leading-[24px] text-blueDark">
                    Degree
                  </TableHead>
                  <TableHead className="text-center font-medium text-base leading-[24px] text-blueDark">
                    Course Code
                  </TableHead>
                  <TableHead className="text-center font-medium text-base leading-[24px] text-blueDark">
                    Course Name
                  </TableHead>
                  <TableHead className="text-center font-medium text-base leading-[24px] text-blueDark">
                    Professor
                  </TableHead>
                  <TableHead className="text-center font-medium text-base leading-[24px] text-blueDark">
                    Skills Assessed
                  </TableHead>
                  <TableHead className="text-center font-medium text-base leading-[24px] text-blueDark">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {
                  courses?.length ? (
                    courses?.map((a: any, i: Number) => (
                      <TableRow key={a?.id}>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          {a?.course?.degree}
                        </TableCell>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          {a?.course?.course_code || "-"}
                        </TableCell>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          {a?.course?.course}
                        </TableCell>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          {a?.professor?.professor_name}
                        </TableCell>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          {a?.course?.course_competencies?.length || 0}
                        </TableCell>
                        <TableCell className="text-center font-medium text-sm leading-[24px]">
                          <button
                            onClick={() => router.push("/dashboard/course")}
                            className="bg-[rgba(229,245,245,1)] rounded-full py-2 px-4"
                          >
                            View
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center font-medium text-sm leading-[24px]"
                      >
                        no data found
                      </TableCell>
                    </TableRow>
                  )
                  // <h1 className="text-center">no data found</h1>
                }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
