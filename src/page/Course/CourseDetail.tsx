"use client";
import Heading from "@/components/common/Heading";
import { getSingleCourse } from "@/module/features/courses";
import { useAppDispatch, useAppSelector } from "@/module/store";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

function CourseDetail({}: Props) {
  const params = useSearchParams();
  const id = params?.get("id");
  const dispatch = useAppDispatch();
  console?.log(id);
  const singleCourse: any = useAppSelector(
    (state) => state?.coursesSlice?.SingleCourse
  );

  useEffect(() => {
    dispatch(getSingleCourse({ id }));
  }, []);
  return (
    <div className="w-full lg:p-6 p-4 ">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[45px] mb-[64px]">
        <div className="flex flex-col gap-y-[32px] w-full">
          <Heading
            className="font-semibold text-[36px]"
            text={
              singleCourse?.course_code ||
              "Course Code" + ": " + singleCourse?.course
            }
          ></Heading>
          <Heading className="text-[20px]" text="Course Overview"></Heading>
          <p className="text-[16px] text-black ">
            {singleCourse?.description || "No Description Added"}
          </p>
        </div>
        <div className="bg-white min-h-96 course-shadow flex flex-col justify-between rounded-lg w-full px-[24px] py-[16px]">
          <div className="text-[20px] font-medium">
            4.4/5{" "}
            <span className="text-[14px] font-normal">(39 course ratings)</span>{" "}
          </div>

          <div className="text-[20px] font-medium">
            <p>Intro level | 6 credit</p>
            <p className="text-[14px] font-normal">No pre-requisites</p>{" "}
          </div>
          <div className="text-[20px] font-medium">
            <p>{singleCourse?.degree}</p>
            <p className="text-[14px] font-normal">
              Offered only for {singleCourse?.degree} student
            </p>
          </div>
          <div className="text-[20px] font-medium">
            {singleCourse?.concentration_id ? (
              <p>Major Required</p>
            ) : (
              <p>Elective</p>
            )}
          </div>

          <div className="flex md:flex-row flex-col mt-5 gap-x-[24px] justify-between w-full">
            <svg
              className="md:block hidden"
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="44" height="44" rx="22" fill="#CCEBEC" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.9997 11.9711C28.6567 5.12808 45.3007 17.1026 21.9997 32.5001C-1.30133 17.1041 15.3427 5.12808 21.9997 11.9711Z"
                fill="#033239"
              />
            </svg>
            <div className="grid md:grid-cols-2 w-full gap-[24px]">
              <Link
                href={`/dashboard/course/compare?course_1_id=${id}`}
                className=" w-full py-[5px] rounded-lg bg-white border-2 border-blueDark disabled:bg-[#EAEBED]  text-blueDark text-[26px] disabled:text-black text-center"
              >
                Compare
              </Link>
              <Link
                href={`/dashboard/course/add-course?course_id=${id}`}
                className=" w-full py-[5px] rounded-lg bg-blueDark disabled:bg-[#EAEBED]  text-white disabled:text-black text-center text-[26px]"
              >
                Enroll
              </Link>
              {/* <button 
              className=" w-full py-[5px] rounded-lg bg-blueDark disabled:bg-[#EAEBED]  text-white disabled:text-black text-center text-[26px]"
              >
                Enroll{" "}
              </button> */}
            </div>
          </div>
        </div>
      </div>
      <div className="py-[14px] px-[24px] bg-[#F3F4F5] rounded-lg mb-[32px]">
        <Heading text="About the Professor" className="mb-[20px]" />
        <p className="text-black text-[16px]">
          In the ever-evolving marketing landscape, it has become imperative for
          a business to integrate digital marketing efforts into its overall
          marketing strategy. Students in this course will explore the
          development, production and implementation of digital-marketing
          delivery methods including, but not limited to, email marketing,
          web-based marketing, search-engine optimization (SEO), online
          advertising, and social media?. The curriculum will introduce tools to
          appropriately measure and evaluate the effectiveness of
          digital-marketing campaigns that are designed to improve the
          experience of the consumer. New trends, as well as key opportunities
          for innovation, will also be included.
        </p>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 w-full gap-[25px]">
        <div className="w-full">
          <Heading className="mb-[32px]" text="Learning Outcome" />
          <ul className="list-disc pl-5 text-black text-[16px]">
            {singleCourse?.outcomes?.map((a: any, i: string) => {
              return <li>{a?.outcome?.name}</li>;
            })}
            {/* <li>
              Qualify for in-demand job titles: Marketing Coordinator,
              E-commerce Associate, Paid Search Specialist
            </li>
            <li>
              Develop a strong professional network within the marketing and
              digital advertising industry
            </li> */}
          </ul>
        </div>
        <div className="w-full">
          <Heading className="mb-[32px]" text="Top 5 Skills" />
          <div className="flex flex-wrap gap-x-[20px] gap-y-[12px]">
            {singleCourse?.course_competencies?.slice(0,5)?.map((a: any, i: string) => {
              return (
                <div className="flex items-center gap-x-[16px]">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="44" height="44" rx="22" fill="#E5E5E5" />
                    <g clip-path="url(#clip0_969_1749)">
                      <path
                        d="M11.5 14.2419C12.8275 13.6869 14.731 13.0884 16.582 12.9024C18.577 12.7014 20.269 12.9969 21.25 14.0304V28.6494C19.8475 27.8544 18.07 27.7449 16.4305 27.9099C14.6605 28.0899 12.8755 28.6014 11.5 29.1264V14.2419ZM22.75 14.0304C23.731 12.9969 25.423 12.7014 27.418 12.9024C29.269 13.0884 31.1725 13.6869 32.5 14.2419V29.1264C31.123 28.6014 29.3395 28.0884 27.5695 27.9114C25.9285 27.7449 24.1525 27.8529 22.75 28.6494V14.0304ZM22 12.6744C20.5225 11.4039 18.3805 11.2149 16.4305 11.4099C14.1595 11.6394 11.8675 12.4179 10.4395 13.0674C10.3085 13.127 10.1974 13.2231 10.1194 13.3441C10.0415 13.4651 10 13.606 10 13.7499V30.2499C10 30.3754 10.0316 30.4989 10.0917 30.6091C10.1518 30.7192 10.2386 30.8125 10.3441 30.8804C10.4496 30.9483 10.5705 30.9887 10.6957 30.9978C10.8208 31.0069 10.9463 30.9844 11.0605 30.9324C12.3835 30.3324 14.515 29.6109 16.5805 29.4024C18.694 29.1894 20.4655 29.5329 21.415 30.7179C21.4853 30.8055 21.5743 30.8762 21.6756 30.9248C21.7768 30.9734 21.8877 30.9986 22 30.9986C22.1123 30.9986 22.2232 30.9734 22.3244 30.9248C22.4257 30.8762 22.5147 30.8055 22.585 30.7179C23.5345 29.5329 25.306 29.1894 27.418 29.4024C29.485 29.6109 31.618 30.3324 32.9395 30.9324C33.0537 30.9844 33.1792 31.0069 33.3043 30.9978C33.4295 30.9887 33.5504 30.9483 33.6559 30.8804C33.7614 30.8125 33.8482 30.7192 33.9083 30.6091C33.9684 30.4989 34 30.3754 34 30.2499V13.7499C34 13.606 33.9585 13.4651 33.8806 13.3441C33.8026 13.2231 33.6915 13.127 33.5605 13.0674C32.1325 12.4179 29.8405 11.6394 27.5695 11.4099C25.6195 11.2134 23.4775 11.4039 22 12.6744Z"
                        fill="black"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_969_1749">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(10 10)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className="text-[24px]">{a?.competencies?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
