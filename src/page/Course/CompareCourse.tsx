"use client";
import Heading from "@/components/common/Heading";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCompareCourses, getSearchCourses } from "@/module/features/courses";
import { useAppDispatch, useAppSelector } from "@/module/store";
import React, { useEffect, useState } from "react";

function CompareCourse(props: any) {

  const course_1_id = props?.searchParams?.course_1_id || ""
  const comparecourses: any = useAppSelector(
    (state) => state?.coursesSlice?.comparecourses
  );
  const searchedcourses: any = useAppSelector(
    (state) => state?.coursesSlice?.searchCourses
  );
  const [Competencies, setCompetencies] = useState<any>([]);
  const [search, setsearch] = useState<any>("");
  const [course_id_2, setcourse_id_2] = useState<number>(0);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (course_id_2 > 0) {
      dispatch(
        getCompareCourses({
          course_id_1: Number(course_1_id),
          course_id_2: course_id_2,
        })
      );
      setsearch("");
      dispatch(getSearchCourses({ search: "" }));
    }
  }, [course_id_2]);
  useEffect(() => {
    const debounceId = setTimeout(() => {
      if (search) {
        dispatch(getSearchCourses({ search: search }));
      }
    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [search]);
  useEffect(() => {
    if (comparecourses) {
      let c1_competencies = comparecourses?.course1.course_competencies?.map(
        (a: any) => {
          return {
            average: a?.competencies?.average,
            id: a?.competencies?.id,
            name: a?.competencies?.name,
            course1: true,
            course2: false,
          };
        }
      );
      let c2_competencies = comparecourses?.course2.course_competencies?.map(
        (a: any) => {
          return {
            average: a?.competencies?.average,
            id: a?.competencies?.id,
            name: a?.competencies?.name,
            course2: true,
            course1: false,
            both: c1_competencies?.filter((b: any) => b?.id == a?.id).length
              ? true
              : false,
          };
        }
      );
      let c2_remove_duplicate = c2_competencies?.filter(
        (b: any) => !c1_competencies?.filter((a: any) => a?.id === b?.id).length
      );
      let competencies = [...c1_competencies, ...c2_remove_duplicate].map(
        (a: any) => {
          return {
            ...a,
            both: c2_competencies?.filter((b: any) => b?.id == a?.id).length
              ? true
              : false,
          };
        }
      );
      console?.log(
        { c1_competencies, competencies },
        c2_competencies?.filter(
          (b: any) => !c1_competencies?.filter((a: any) => a?.id === b?.id).length
        )
      );
      setCompetencies(competencies);
    }
  }, [comparecourses]);
  return (
    <div className="w-full fixed inset-0 top-0 bottom-0 bg-white z-20 py-[40px] px-[45px] min-h-screen overflow-auto ">

      <div className="flex flex-col gap-y-[24px] w-full mb-[32px]">
        <Heading
          className="font-medium text-[24px] mb-[] "
          text="Compare Courses "
        ></Heading>

        <div className="relative">
          <Input
            placeholder="Enter course here?..."
            value={search}
            onChange={(ev) => setsearch(ev?.target?.value)}
            className="w-full bg-white  h-[72px] text-[20px] pl-[80px] border-[#C6C9CF] placeholder:text-black rounded-[12px]"
          ></Input>
          <div className="absolute top-[25px] bottom-0 left-11">
            <svg
              width="22.5"
              height="22.5"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.75 3.24999C7.0924 3.24999 5.50269 3.90847 4.33058 5.08057C3.15848 6.25267 2.5 7.84238 2.5 9.49999C2.5 11.1576 3.15848 12.7473 4.33058 13.9194C5.50269 15.0915 7.0924 15.75 8.75 15.75C10.4076 15.75 11.9973 15.0915 13.1694 13.9194C14.3415 12.7473 15 11.1576 15 9.49999C15 7.84238 14.3415 6.25267 13.1694 5.08057C11.9973 3.90847 10.4076 3.24999 8.75 3.24999ZM2.75727e-07 9.49999C2.63725e-06 8.11406 0.329219 6.74796 0.96054 5.51418C1.59186 4.28039 2.50722 3.21422 3.63126 2.40345C4.75529 1.59269 6.05583 1.06053 7.4258 0.850782C8.79576 0.64104 10.1959 0.75972 11.5111 1.19705C12.8262 1.63438 14.0186 2.37785 14.9901 3.36623C15.9617 4.35461 16.6845 5.55964 17.0992 6.88208C17.5138 8.20452 17.6084 9.60655 17.3752 10.9727C17.1419 12.3389 16.5875 13.6301 15.7575 14.74L22.1337 21.115C22.3683 21.3494 22.5001 21.6673 22.5002 21.9989C22.5004 22.3305 22.3688 22.6486 22.1344 22.8831C21.9 23.1177 21.582 23.2495 21.2504 23.2496C20.9189 23.2497 20.6008 23.1181 20.3662 22.8837L13.9912 16.5087C12.6906 17.4817 11.1449 18.0734 9.52709 18.2176C7.90927 18.3619 6.28323 18.053 4.83101 17.3255C3.37879 16.598 2.15772 15.4807 1.3045 14.0986C0.451283 12.7165 -0.000407407 11.1242 2.75727e-07 9.49999Z"
                fill="#A1A6B0"
              />
            </svg>
          </div>
          {searchedcourses?.length ? (
            <div className="max-h-96 overflow-auto bg-white pl-4 border-2 border-[#C6C9CF] w-full absolute z-50">
              {searchedcourses?.map((a: any, i: string) => {
                return (
                  <div>
                    <h3
                      className="py-4 cursor-pointer"
                      onClick={() => setcourse_id_2(a?.id)}
                    >
                      {a?.course}
                    </h3>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      {course_id_2 ? (
        <div>
          <div className="grid grid-cols-2 gap-x-[45px] mb-[64px]">
            <div className="bg-white shadow-lg course-shadow flex flex-col justify-between text-center gap-y-6 rounded-lg w-full px-[24px] py-[16px] relative">

              <Heading
                className="text-center"
                text={
                  comparecourses?.course1?.course_code ||
                  "Course Code" + ": " + comparecourses?.course1?.course
                }
              />
              <div className="text-[20px] font-medium text-[#009C9E]">
                4.4/5{" "}
                <span className="text-[14px] font-normal">
                  (39 course ratings)
                </span>{" "}
              </div>

              <div className="text-[20px] font-medium">
                <p>Intro level | 6 credit</p>
                <p className="text-[14px] font-normal">
                  No pre-requisites
                </p>{" "}
              </div>
              <div className="text-[20px] font-medium">
                <p>{comparecourses?.course1?.degree}</p>
              </div>
              <div className="text-[20px] font-medium">
                {comparecourses?.course1?.concentration_id ? (
                  <p>Major Required</p>
                ) : (
                  <p>Elective</p>
                )}
              </div>
            </div>
            <div className="bg-white shadow-lg course-shadow flex flex-col justify-between text-center gap-y-6 rounded-lg w-full px-[24px] py-[16px] relative">

              <Heading
                className="text-center"
                text={
                  comparecourses?.course2?.course_code ||
                  "Course Code" + ": " + comparecourses?.course2?.course
                }
              />
              <div className="text-[20px] font-medium text-[#009C9E]">
                4.4/5{" "}
                <span className="text-[14px] font-normal">
                  (39 course ratings)
                </span>{" "}
              </div>

              <div className="text-[20px] font-medium">
                <p>Intro level | 6 credit</p>
                <p className="text-[14px] font-normal">
                  No pre-requisites
                </p>{" "}
              </div>
              <div className="text-[20px] font-medium">
                <p>{comparecourses?.course2?.degree}</p>
              </div>
              <div className="text-[20px] font-medium">
                {comparecourses?.course2?.concentration_id ? (
                  <p>Major Required</p>
                ) : (
                  <p>Elective</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Heading
              text="Current Courses"
              className=" text-black font-medium"
            />

            <div className="flex gap-6 w-full mt-6 flex-wrap rounded-lg overflow-hidden">
              <Table className="bg-white w-full shadow-lg">
                <TableHeader className="bg-[rgba(229,245,245,1)] w-full ">
                  <TableRow>
                    <TableHead className=" text-start font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]   ">
                      Top Skill
                    </TableHead>
                    <TableHead className="text-center font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]   ">
                      {comparecourses?.course1?.course_code || "Course Code"}
                      <br /> {comparecourses?.course1?.course}
                    </TableHead>
                    <TableHead className="text-center font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]   ">
                      {comparecourses?.course2?.course_code || "Course Code"}
                      <br /> {comparecourses?.course2?.course}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Competencies?.map((a: any, i: string) => (
                    <TableRow key={i}>
                      <TableCell className="text-start font-medium text-[16px] text-sm leading-[24px]">
                        {a?.name}
                      </TableCell>
                      <TableCell className="text-center font-medium text-[16px] text-sm leading-[24px]">
                        {a?.course1 || a?.both ? (
                          <Checkbox
                            className="bg-blue text-white w-[20px] h-[20px]  rounded text-sm font-semibold outline-none ring-0"
                            checked={true}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell className="text-center font-medium text-[16px] text-sm leading-[24px]">
                        {a?.course2 || a?.both ? (
                          <Checkbox
                            className="bg-blue text-white w-[20px] h-[20px]  rounded text-sm font-semibold outline-none ring-0"
                            checked={true}
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex gap-6 w-full mt-6 flex-wrap rounded-lg overflow-hidden">
              <Table className="bg-white w-full shadow-lg">
                <TableHeader className="bg-[rgba(229,245,245,1)] w-full ">
                  <TableRow className="w-full">
                    <TableHead className=" text-start font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]   ">
                      Competency Amount
                    </TableHead>
                    <TableHead className="text-center font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]   "></TableHead>
                    <TableHead className="text-center  font-medium text-[20px] leading-[24px] text-black pt-3 w-[319.33px]  "></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Competencies?.map((a: any, i: string) => (
                    <TableRow key={i}>
                      <TableCell className="text-start font-medium text-[16px] leading-[24px]  w-[319.33px] ">
                        {a?.name}
                      </TableCell>
                      <TableCell className="text-start font-normal flex text-[12px] leading-[14.4px] w-[319.33px] mx-auto ">
                        {a?.course1 || a?.both ? (
                          <div className="flex items-center justify-center gap-x-3">
                            <div className="boardingProgressouter w-[228px] h-[6px] bg-[#EAEBED] rounded-[20px]">
                              <div
                                className={`borderProgress  h-full bg-blue rounded-[20px]`}
                                style={{ width: `${(a?.average * 100) / 5}%` }}
                              ></div>
                            </div>
                            <p className="text-blue">
                              {(a?.average * 100) / 5}%
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-center font-normal text-[12px] leading-[14.4px] w-[319.33px]  ">
                        {a?.course2 || a?.both ? (
                          <div className="flex items-center justify-center gap-x-3">
                            <div className="boardingProgressouter w-[228px] h-[6px] bg-[#EAEBED] rounded-[20px]">
                              <div
                                className={`borderProgress  h-full bg-blue rounded-[20px]`}
                                style={{ width: `${(a?.average * 100) / 5}%` }}
                              ></div>
                            </div>
                            <p className="text-blue">
                              {(a?.average * 100) / 5}%
                            </p>
                          </div>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="font-bold text-center text-[24px]">
          No course Selected
        </h1>
      )}
    </div>
  );
}

export default CompareCourse;
