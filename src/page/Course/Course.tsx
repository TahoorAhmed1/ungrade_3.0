"use client";
import {
  CalenderIcon,
  CheckCircle,
  TierOneIcon,
  TierThreeIcon,
  TierTwoIcon,
} from "@/Assets/Icons";
import CourseCard from "./CourseCard";
import Heading, { SmallHeading } from "@/components/common/Heading";
import WelcomeText from "@/components/common/WelcomeText";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  getCourseTracking,
  getStudentCourses,
} from "@/module/features/courses";
import { useRouter } from "next/navigation";
import { getWishlist } from "@/module/features/wishlist";

type Props = {};

function Course({ }: Props) {
  const dispatch = useAppDispatch();

  const [search, setsearch] = useState<any>("");
  const router = useRouter();
  const courses: any = useAppSelector(
    (state) => state?.coursesSlice?.userCourses
  );
  const courseTracking: any = useAppSelector(
    (state) => state?.coursesSlice?.courseTracking
  );
  const wishlist: any = useAppSelector(
    (state) => state?.getWishlistSlice?.wishlist
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(getStudentCourses());

    // @ts-ignore
    dispatch(getWishlist());

    // @ts-ignore
    dispatch(getCourseTracking());
  }, []);
  console?.log(courses);
  function handleKeyPress(event?: any) {
    if (event?.key === "Enter") {
      router.push("/dashboard/course/search-course?search_text=" + search);
    }
  }
  return (
    <div className="Home w-full lg:p-8 p-6 py-8 ">
      <div className="w-full">
        <WelcomeText name={"COURSES"} />
        <div className="mt-8">
          <Heading text="Course Overview" className="" />
          <div className="w-full mt-6">
            <div className="grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-[24px] ">
              <div className="flex items-center bg-[#FFFFFF] w-full h-full md:px-[24px] md:py-[22px] p-4 course-shadow rounded-lg mb-4">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blueDark mr-4">
                  <CalenderIcon className=" w-5" />
                </div>
                <div className="">
                  <h6 className="font-medium md:text-xl text-[18px] md:leading-6 leading-[21.6px] text-left text-blueDark mb-1">
                    {courses?.length} Courses
                  </h6>
                  <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
                    Total Courses
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-[#FFFFFF] w-full h-full px-[24px] py-[22px] course-shadow rounded-lg ">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blueDark mr-4">
                  <CalenderIcon className="w-5" />
                </div>
                <div className="">
                  <h6 className="font-medium text-xl leading-6 text-left text-blueDark mb-1">
                    {courses?.length} Courses
                  </h6>
                  <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
                    Enrolled courses
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-[#FFFFFF] w-full h-full px-[24px] py-[22px] course-shadow rounded-lg ">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blueDark mr-4">
                  <CalenderIcon className="w-5" />
                </div>
                <div className="">
                  <h6 className="font-medium text-xl leading-6 text-left text-blueDark mb-1">
                    {(courseTracking?.completedCourse || 0) - courses?.length}
                    <span className="ml-1">Course</span>
                  </h6>
                  <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
                    Completed courses
                  </p>
                </div>
              </div>
              <div className="flex items-center bg-[#FFFFFF] w-full h-full px-[24px] py-[22px] course-shadow rounded-lg ">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-blueDark mr-4">
                  <CalenderIcon className="w-5" />
                </div>
                <div className="">
                  <h6 className="font-medium text-xl leading-6 text-left text-blueDark mb-1">
                    0 Saved
                  </h6>
                  <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
                    Saved courses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 p-8 bg-[#F3F4F5] rounded-lg ">
          <Heading
            text=" Browse Course Catalogue"
            className="text-center text-lg md:text-2xl"
          />
          <div className="w-3/4 m-auto mt-8">
            <p className="text-sm">Search by: COURSE NAME</p>
            <div className="relative mt-4">
              <Input
                placeholder="Enter course here?..."
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(ev) => {
                  console?.log(ev?.target?.ATTRIBUTE_NODE);
                  setsearch(ev?.target?.value);
                }}
                className="w-full bg-white  md:h-[72px] md:text-[18px] md:pl-10 pl-8 border-[#C6C9CF] placeholder:text-black rounded-[12px]"
              ></Input>
              <div className="absolute top-[10px] md:top-[25px] md:bottom-0 md:left-3 left-2  ">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 23 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-4 "
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.75 3.24999C7.0924 3.24999 5.50269 3.90847 4.33058 5.08057C3.15848 6.25267 2.5 7.84238 2.5 9.49999C2.5 11.1576 3.15848 12.7473 4.33058 13.9194C5.50269 15.0915 7.0924 15.75 8.75 15.75C10.4076 15.75 11.9973 15.0915 13.1694 13.9194C14.3415 12.7473 15 11.1576 15 9.49999C15 7.84238 14.3415 6.25267 13.1694 5.08057C11.9973 3.90847 10.4076 3.24999 8.75 3.24999ZM2.75727e-07 9.49999C2.63725e-06 8.11406 0.329219 6.74796 0.96054 5.51418C1.59186 4.28039 2.50722 3.21422 3.63126 2.40345C4.75529 1.59269 6.05583 1.06053 7.4258 0.850782C8.79576 0.64104 10.1959 0.75972 11.5111 1.19705C12.8262 1.63438 14.0186 2.37785 14.9901 3.36623C15.9617 4.35461 16.6845 5.55964 17.0992 6.88208C17.5138 8.20452 17.6084 9.60655 17.3752 10.9727C17.1419 12.3389 16.5875 13.6301 15.7575 14.74L22.1337 21.115C22.3683 21.3494 22.5001 21.6673 22.5002 21.9989C22.5004 22.3305 22.3688 22.6486 22.1344 22.8831C21.9 23.1177 21.582 23.2495 21.2504 23.2496C20.9189 23.2497 20.6008 23.1181 20.3662 22.8837L13.9912 16.5087C12.6906 17.4817 11.1449 18.0734 9.52709 18.2176C7.90927 18.3619 6.28323 18.053 4.83101 17.3255C3.37879 16.598 2.15772 15.4807 1.3045 14.0986C0.451283 12.7165 -0.000407407 11.1242 2.75727e-07 9.49999Z"
                    fill="#A1A6B0"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex justify-between items-center">
            <Heading text="Current Courses" className="" />
            {/* <button className="max-w-[132px] w-full py-2 rounded-lg bg-blueDark disabled:bg-[#EAEBED] lg:text-base text- text-white disabled:text-black text-center">
              View all
            </button> */}
          </div>
          <div className="flex gap-6 w-full mt-6 flex-wrap rounded-lg overflow-hidden">
            <Table className="bg-white shadow-lg">
              <TableHeader className="bg-[rgba(229,245,245,1)]">
                <TableRow>
                  <TableHead className="w-[100px] text-center font-medium lg:text-base text-xs  text-blueDark">
                    Degree
                  </TableHead>
                  <TableHead className="text-center font-medium lg:text-base text-xs  text-blueDark">
                    Course Code
                  </TableHead>
                  <TableHead className="text-center font-medium lg:text-base text-xs  text-blueDark">
                    Course Name
                  </TableHead>
                  <TableHead className="text-center font-medium lg:text-base text-xs  text-blueDark">
                    Professor
                  </TableHead>
                  <TableHead className=" w-[180px]  text-center font-medium lg:text-base text-xs  text-blueDark">
                    Skills Assessed
                  </TableHead>
                  <TableHead className="text-center font-medium lg:text-base text-xs  text-blueDark">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses?.map((a: any, i: Number) => (
                  <TableRow key={a?.id}>
                    <TableCell className="text-center font-medium text-sm ">
                      {a?.course?.degree}
                    </TableCell>
                    <TableCell className="text-center font-medium text-sm ">
                      {a?.course?.course_code || "-"}
                    </TableCell>
                    <TableCell className="text-center font-medium text-sm ">
                      {a?.course?.course}
                    </TableCell>
                    <TableCell className="text-center font-medium text-sm ">
                      {a?.professor?.professor_name}
                    </TableCell>
                    <TableCell className="text-center font-medium text-sm ">
                      {a?.course?.course_competencies?.length || 0}
                    </TableCell>
                    <TableCell className="text-center font-medium text-sm ">
                      <button
                        onClick={() =>
                          router.push(
                            `/dashboard/course/CourseDetail?id=${a?.course?.id}`
                          )
                        }
                        className="bg-[rgba(229,245,245,1)] rounded-full py-2 px-4"
                      >
                        View
                      </button>
                    </TableCell>
                  </TableRow>
                )) || <h1>no data found</h1>}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center">
            <Heading text="Saved Courses" className="" />
            <button className="max-w-[132px] w-full py-2 rounded-lg bg-blueDark disabled:bg-[#EAEBED] lg:text-base text- text-white disabled:text-black text-center">
              View all
            </button>
          </div>
          <div className="grid grid-cols-3 gap-x-[16px] w-full mt-5">
            {wishlist?.map(({ courses, id }: any) => (
              <CourseCard
                wishlistId={id}
                name={courses?.course}
                competencies={courses?.course_competencies}
                id={courses?.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;
