"use client";
import Heading from "@/components/common/Heading";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import AreaOfStudy from "./Filters/AreaOfStudy";
import CourseLevel from "./Filters/CourseLevel";
import { getSearchCourses } from "@/module/features/courses";
import { addWishlist, getWishlist } from "@/module/features/wishlist";
import { useAppDispatch, useAppSelector } from "@/module/store";
import Concentration from "./Filters/Concentration";

type Props = {};

function SearchCourse(props: any) {
  console?.log(props)
  const searchedcourses: any = useAppSelector(
    (state) => state?.coursesSlice?.searchCourses
  );
  const concentration: any = useAppSelector(
    (state) => state?.ConcentrationSlice?.concentration
  );

  const degree: any = useAppSelector((state) => state?.degreeSlice?.degrees);
  const [search, setsearch] = useState<any>("");
  const [course_id_2, setcourse_id_2] = useState<number>(0);
  const search_text = props?.searchParams?.search_text || "";
  const [selectedConcentration, setSelectedConcentration] = useState<string[]>(
    []
  );
  const [selectedDegrees, setSelectedDegrees] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (course_id_2 > 0) {
      dispatch(getSearchCourses({ search: "" }));
    }
  }, [course_id_2]);

  useEffect(() => {
    // @ts-ignore
    dispatch(getWishlist());
  });

  useEffect(() => {
    const debounceId = setTimeout(() => {
      dispatch(
        getSearchCourses({
          search: search,
          concentrations_id: selectedConcentration,
          degrees_id: selectedDegrees,
        })
      );
    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [search, selectedDegrees?.length, selectedConcentration, length]);
  useEffect(() => {
    if (search_text) {
      setsearch(search_text);
    }
  }, [search_text]);
  return (
    <div className=" bg-[#FBFBFB]  z-20 py-[40px] px-[49px] min-h-screen overflow-auto ">
      <div className="flex flex-col gap-y-[24px] w-full mb-[32px]">
        <Heading
          className="font-medium text-[24px] mb-[] "
          text="Search Course "
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
          {/* {searchedcourses?.length ? (
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
          ) : null} */}
        </div>
      </div>
      <div className="flex w-full h-full  gap-5 ">
        <div className="hidden lg:block    w-[45%]  overflow-auto h-full">
          <Heading className="mb-5" text="Filter by"></Heading>
          <div className="w-full flex flex-col gap-y-10    ">
            <AreaOfStudy
              degree={degree}
              selectedDegrees={selectedDegrees}
              setSelectedDegrees={setSelectedDegrees}
              search={search}
              selectedConcentration={selectedConcentration}
            />
            <Concentration
              concentration={concentration}
              selectedConcentration={selectedConcentration}
              setSelectedConcentration={setSelectedConcentration}
            />
            {/* <CourseLevel /> */}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full ">
          {searchedcourses?.length ? (
            searchedcourses?.map((a: any, i: string) => {
              console?.log(a?.id, "dasaffs");

              return (
                <CourseCard
                  name={a?.course}
                  competencies={a?.course_competencies}
                  id={a?.id}
                  wishlistId={a?.id}
                />
              );
            })
          ) : (
            <h1 className="font-bold text-center text-[24px]">
              {search ? "No Course Found" : "No Filter Applied"}
            </h1>
          )}
          {/* <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard />
          <CourseCard /> */}
        </div>
      </div>
    </div>
  );
}

export default SearchCourse;
