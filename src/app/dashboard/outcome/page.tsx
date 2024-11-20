"use client";
import Heading from "@/components/common/Heading";
import {
  getUserOutcomeForAllCourse,
  updateUserOutcome,
} from "@/module/features/outcomesSlice";
import { useAppDispatch, useAppSelector } from "@/module/store";
import Occupations from "@/page/Occupations/Occupations";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

function page({}: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userScheduledOutcome = useAppSelector(
    (state) => state.outcomesSlice.userScheduledOutcome
  );
  const userProfile: any = useAppSelector(
    (state) => state.completeProfileSlice.userProfile
  );
  const [selectoutcome, setselectedoutcome] = useState<any>([]);
  const [selectoutcome1, setselectedoutcome1] = useState<any>([]);
  useEffect(() => {
    dispatch(getUserOutcomeForAllCourse({}));
  }, []);
  const sendData = () => {
    for (var i = 0; i < selectoutcome.length; i++) {
      // @ts-ignore
      dispatch(updateUserOutcome({ data: selectoutcome[i] }));
      if (i + 1 === selectoutcome.length) {
        router.push("/dashboard");
      }
    }
  };
  return (
    <div className="p-6">
      <Heading text="Your Weekly Feedback " className="text-center m-14" />
      <div className="flex flex-wrap  ">
        {userScheduledOutcome?.length
          ? userScheduledOutcome?.map((a: any, i: number) => (
              <div
                key={i}
                className="w-72 flex items-center m-5 px-3 py-2 rounded-md bg-[#E5F5F5]"
              >
                <input
                  type="checkbox"
                  className="w-7 h-10 rounded-[5px] text-black leading-[19.2px] mr-4"
                  checked={selectoutcome1.includes(a?.outcome?.id)}
                  onChange={() => {
                    let professorId = userProfile?.profile_courses?.filter(
                      (obj: any) => obj.course_id === a?.course_id
                    );
                    console.log(professorId, a?.course_id, userProfile);
                    let obj = {
                      outcomes: [a?.outcome?.id],
                      course_id: a?.course_id,
                      professor_id: professorId?.length
                        ? professorId[0]?.professor_id
                        : 0,
                      assessmentType: "pre",
                      user_id: userProfile?.user_id,
                    };
                    let alldata = selectoutcome?.length
                      ? selectoutcome.map((val: any) =>
                          val?.course_id
                            ? {
                                outcomes: [...val?.outcomes, a?.outcome?.id],
                                course_id: a?.course_id,
                                professor_id: professorId?.length
                                  ? professorId[0]?.professor_id
                                  : 0,
                                assessmentType: "pre",
                                user_id: userProfile?.user_id,
                              }
                            : val
                        )
                      : [...selectoutcome, obj];

                    setselectedoutcome(alldata);
                    let ourcomeids = selectoutcome1.includes(a?.outcome?.id) ? selectoutcome1.filter((b:any)=>b !== a?.outcome?.id):[...selectoutcome1, a?.outcome?.id]
                    setselectedoutcome1(ourcomeids);
                  }}
                />
                <p className="text-[#07525C] w-[90%] text-lg">
                  {a?.outcome?.name || "-"}
                </p>
              </div>
            ))
          : "no outcome found"}
      </div>
      <div className="w-full items-center flex justify-center ">
        <button
          className="max-w-[200px] w-full py-2 rounded-radius bg-blueDark disabled:bg-[#EAEBED] text-white disabled:text-black text-center"
          onClick={() => {
            sendData();
          }}
        >
          Next
        </button>
        <button
          className="max-w-[200px] w-full py-2 rounded-radius bg-transparent border-blueDark border-solid border-[1px] ml-6 disabled:bg-[#EAEBED] text-black disabled:text-black text-center"
          onClick={() => {
            router.push("/dashboard");
          }}
        >
          Save for Later
        </button>
      </div>
    </div>
  );
}

export default page;
