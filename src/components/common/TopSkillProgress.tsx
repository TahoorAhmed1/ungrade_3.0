import { CalenderIcon } from "@/Assets/Icons";
import { ChevronRight } from "lucide-react";
import React from "react";
import RadialProgressBar from "./RadialProgressBar";



function TopSkillProgress(props: any) {
  return (
    <div className="TopSkillProgress w-full relative flex justify-start items-end bg-[rgba(229,245,245,1)] p-6 rounded-lg shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
      <div className="flex items-center ">
        <div className="rounded-full mr-4">
          <RadialProgressBar progress={Math.round(props.pre_percentage * 100)} />
        </div>
        <div className="">
          <h6 className="font-medium text-lg leading-6 text-left text-blueDark mb-1">
            {props.competency_name}
          </h6>
          <p className="font-normal text-sm leading-[16.8px] text-left text-blueDark">
          View your results for this skill
          </p>
        </div>
      </div>
      <div className="backDiv absolute right-4">
        <button className="w-5 h-5 bg-blueDark rounded-full flex items-center justify-center">
          <ChevronRight color="white" size={16} />
        </button>
      </div>
    </div>
  );
}

export default TopSkillProgress;
