"use client";
import Heading from "@/components/common/Heading";
import { getOccupationalMapscrapping } from "@/module/features/occupational";
import { useAppDispatch, useAppSelector } from "@/module/store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  id?: any;
};

function Details(props: Props) {
  console?.log(props?.id);
  const occupationdetail: any = useAppSelector(
    (state) => state?.occupationalTodo.getOccupationdetail
  );
  const [progressTab, setProgressTab] = useState(true);
  const [compentencyData, setCompentencyData] = useState<any>([]);
  const [compentencyType, setCompentencyType] = useState("all");
  const [percentage, setpercentage] = useState<any>(0);
  const [sortby, setsortby] = useState("htl");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getOccupationalMapscrapping({ id: props?.id }));
  }, [props?.id]);
  function sortval(a: any, b: any) {
    if (sortby === "htl" || sortby === "lth") {
      let aval = (a?.onetLevel * 100) / 10;
      let bval = (b?.onetLevel * 100) / 10;
      if (sortby === "lth") {
        if (aval < bval) {
          return -1;
        }
        if (aval > bval) {
          return 1;
        }
        return 0;
      }
      if (sortby === "htl") {
        if (aval > bval) {
          return -1;
        }
        if (aval < bval) {
          return 1;
        }
        return 0;
      }
    } else {
      let aval = a?.name;
      let bval = b?.name;

      if (sortby === "atz") {
        if (aval < bval) {
          return -1;
        }
        if (aval > bval) {
          return 1;
        }
        return 0;
      }
      if (sortby === "zta") {
        if (aval > bval) {
          return -1;
        }
        if (aval < bval) {
          return 1;
        }
        return 0;
      }
    }
  }
  useEffect(() => {
    if (occupationdetail?.competency?.length) {
      if (compentencyType === "all") {
        let arrayForSort: any = [...occupationdetail?.competency];
        setCompentencyData(arrayForSort?.sort(sortval) || []);
      } else if (compentencyType === "top") {
        let arrayForSort: any = [
          ...occupationdetail?.competency.filter(
            (a: any) => (a?.onetLevel * 100) / 10 >= 50
          ),
        ];
        setCompentencyData(arrayForSort?.sort(sortval) || []);
      } else {
        let arrayForSort: any = [
          ...occupationdetail?.competency.filter(
            (obj: any) => obj?.dataType === compentencyType
          ),
        ];
        setCompentencyData(arrayForSort?.sort(sortval) || []);
      }
      let givenCompetencies = occupationdetail?.competency.filter((obj: any) =>
        [...occupationdetail?.compentencyIds].includes(obj?.id)
      );
      let progress =
        givenCompetencies?.length / occupationdetail?.competency.length;
      setpercentage(progress?.toFixed(2));
    }
  }, [occupationdetail, compentencyType, sortby]);
  return (
    <div className="w-full lg:p-8 p-6">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-[45px] mb-[64px]">
        <div className="flex flex-col gap-y-[32px] w-full">
          <Heading
            className="font-semibold text-[36px]"
            text={
              occupationdetail?.occupation?.length
                ? occupationdetail?.occupation[0].title
                : ""
            }
          ></Heading>
          <Heading className="text-[20px]" text="Role Description"></Heading>
          <p className="text-[16px] text-black ">
            {occupationdetail?.description}
          </p>
          <Heading
            className="text-[20px]"
            text="Role Responsibilities"
          ></Heading>
          <ul className="list-disc">
            {occupationdetail?.task?.length
              ? occupationdetail?.task
                  ?.slice(0, 10)
                  .map((a: any, i: string) => {
                    return <li key={i}>{a}</li>;
                  })
              : null}
          </ul>
        </div>
        <div className="bg-white max-h-96 course-shadow flex flex-col rounded-lg w-full px-[24px] py-[16px]">
          <div className="flex items-center justify-between w-full">
            <Heading text="Your Progress" className="text-[14px]" />
            <div className="flex items-center md:mt-8">
              <div
                className={`p-2 cursor-pointer ${
                  progressTab ? "bg-lightBlue" : "bg-transparent"
                } rounded-radius mr-2 text-sm font-semibold leading-[16.8px] text-left text-blueDark`}
                onClick={() => {
                  setProgressTab(true);
                }}
              >
                Strength
              </div>
              <div
                className={`p-2 cursor-pointer ${
                  !progressTab ? "bg-lightBlue" : "bg-transparent"
                } rounded-radius mr-2 text-sm font-semibold leading-[16.8px] text-left text-blueDark`}
                onClick={() => {
                  setProgressTab(false);
                }}
              >
                Weakness
              </div>
            </div>
          </div>
          <Heading
            text={percentage + "% Match"}
            className="text-[#6EDED1] sm:text-[15px] mt-2"
          />
          <p className="font-lato text-base font-normal leading-[19.2px] text-left mt-4 text-grey">
            Right now, your competencies are at a {percentage}% match.
            {/* with your highest
            scores in <strong>Persuasion</strong>,{" "}
            <strong>Social Perception</strong>, and{" "}
            <strong>Customer Service</strong>. Your skills in{" "}
            <strong>Writing</strong>, <strong>Comprehension</strong>, and{" "}
            <strong>Active Learning</strong> contributed to your score?. */}
          </p>
          {/* <div className="font-jost text-xl font-medium leading-[28.8px] text-left mt-8">
            <h4>Match Rate Over Time</h4>
          </div> */}
        </div>
      </div>
      <Heading text="Competency Lists & Comparisons" />
      <div className="flex justify-end items-end mt-5">
        <Dialog >
          <DialogTrigger className="xl:hidden block bg-blueDark text-white border-slate-50 rounded-full px-6 py-3 ">
            Filter view By
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[26px] mt-6 text-[#3A3D44]">
                Competency Type
              </DialogTitle>
              <DialogDescription className="flex flex-row justify-between items-center">
                <div>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    {" "}
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={compentencyType === "top"}
                      onChange={() => setCompentencyType("top")}
                    />{" "}
                    Top Competencies Only{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    {" "}
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={compentencyType === "all"}
                      onChange={() => setCompentencyType("all")}
                    />{" "}
                    View All{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={compentencyType === "knowledge"}
                      onChange={() => setCompentencyType("knowledge")}
                    />{" "}
                    Knowledge{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={compentencyType === "skills"}
                      onChange={() => setCompentencyType("skills")}
                    />{" "}
                    Skills{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={compentencyType === "abilities"}
                      onChange={() => setCompentencyType("abilities")}
                    />{" "}
                    Abilities{" "}
                  </p>
                </div>
                {/* <Heading
            text="Options to Include"
            className="text-[16px] mt-6 text-[#3A3D44]"
          />
          <div>
            <p className="text-sm mt-2 flex items-center gap-3">
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={true}
              />{" "}
              View My Metrics{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={true}
              />{" "}
              View Similar Roles{" "}
            </p>
          </div> */}
          <div>

                <Heading
                  text="Sort By"
                  className="text-[16px] mt-1 text-[#3A3D44]"
                />
                <div>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={sortby === "htl"}
                      onChange={() => setsortby("htl")}
                    />{" "}
                    Highest Level{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    {" "}
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={sortby === "lth"}
                      onChange={() => setsortby("lth")}
                    />{" "}
                    Lowest Level{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={sortby === "atz"}
                      onChange={() => setsortby("atz")}
                    />{" "}
                    Alphabetical A-Z{" "}
                  </p>
                  <p className="text-sm mt-2 flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                      checked={sortby === "zta"}
                      onChange={() => setsortby("zta")}
                    />{" "}
                    Alphabetical Z-A{" "}
                  </p>
                </div>
          </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex w-full md:flex-row flex-col ">
        <div className="w-[20%] py-4 px-8 bg-[#F3F4F5] mt-6 hidden xl:block">
          <Heading text="Filter By" className="text-[20px]" />
          <Heading
            text="Competency Type"
            className="text-[16px] mt-6 text-[#3A3D44]"
          />
          <div>
            <p className="text-sm mt-2 flex items-center gap-3">
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={compentencyType === "top"}
                onChange={() => setCompentencyType("top")}
              />{" "}
              Top Competencies Only{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={compentencyType === "all"}
                onChange={() => setCompentencyType("all")}
              />{" "}
              View All{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={compentencyType === "knowledge"}
                onChange={() => setCompentencyType("knowledge")}
              />{" "}
              Knowledge{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={compentencyType === "skills"}
                onChange={() => setCompentencyType("skills")}
              />{" "}
              Skills{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={compentencyType === "abilities"}
                onChange={() => setCompentencyType("abilities")}
              />{" "}
              Abilities{" "}
            </p>
          </div>

          <Heading text="Sort By" className="text-[16px] mt-6 text-[#3A3D44]" />
          <div>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={sortby === "htl"}
                onChange={() => setsortby("htl")}
              />{" "}
              Highest Level{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              {" "}
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={sortby === "lth"}
                onChange={() => setsortby("lth")}
              />{" "}
              Lowest Level{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={sortby === "atz"}
                onChange={() => setsortby("atz")}
              />{" "}
              Alphabetical A-Z{" "}
            </p>
            <p className="text-sm mt-2 flex items-center gap-3">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={sortby === "zta"}
                onChange={() => setsortby("zta")}
              />{" "}
              Alphabetical Z-A{" "}
            </p>
          </div>
        </div>
        <div className="xl:w-[80%] w-full overflow-x-auto">
          <div className=" xl:mx-11 mx-0">
            <Heading
              text="Competency Chart Legend"
              className="text-[20px]text-[#3A3D44]"
            />
            <div className="flex mt-4">
              <div className="text-sm mr-4 flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 bg-[#07525C]"></div>{" "}
                Knowledge
              </div>
              <div className="text-sm mr-4 flex items-center">
                {" "}
                <div className="w-4 h-4 rounded-full mr-2 bg-[#1AA5A8]"></div>
                Skills
              </div>
              <div className="text-sm mr-4 flex items-center">
                <div className="w-4 h-4 rounded-full mr-2 bg-[#92E6DC]"></div>{" "}
                Abilties
              </div>
            </div>
            <table className="mt-6 w-full  ">
              <thead>
                <tr>
                  <th className="text-[#3A3D44] text-start">Competency</th>
                  <th className="text-[#3A3D44] text-start md:block hidden">
                    Competency Level
                  </th>
                  <th className="text-[#3A3D44]">Amount</th>
                </tr>
              </thead>
              <tbody>
                {compentencyData?.length
                  ? compentencyData?.map((a: any, i: string) => {
                      console?.log(a?.dataType);
                      let color =
                        a?.dataType === "knowledge"
                          ? "#07525C"
                          : a?.dataType === "skills"
                          ? "#1AA5A8"
                          : "#92E6DC";
                      return (
                        <tr key={i}>
                          <td>{a.name || "-"}</td>
                          <td className="md:block hidden">
                            <div className="boardingProgressouter w-[228px] h-[6px] bg-[#C6C9CF] rounded-[20px]">
                              <div
                                className={`borderProgress  h-full bg-[${color}] rounded-[20px]`}
                                style={{
                                  width: `${(a?.onetLevel * 100) / 10}%`,
                                }}
                              ></div>
                            </div>
                          </td>
                          <td className="text-center">
                            {((a?.onetLevel * 100) / 10).toFixed(2)}%
                          </td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
