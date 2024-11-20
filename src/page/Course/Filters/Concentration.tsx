"use client";

import Heading from "@/components/common/Heading";
import { getSearchCourses } from "@/module/features/courses";
import { useAppDispatch } from "@/module/store";
import { motion } from "framer-motion";
import { useState } from "react";

const Concentration = ({
  concentration,
  selectedConcentration,
  setSelectedConcentration,
  selectedDegrees,
  search,
}: any) => {
  const dispatch = useAppDispatch();
  const handleCheckboxChange = (id: string) => {
    setSelectedConcentration((prevSelectedDegrees: any) =>
      prevSelectedDegrees?.includes(id)
        ? prevSelectedDegrees?.filter((degreeId: any) => degreeId !== id)
        : [...prevSelectedDegrees, id]
    );

    // const debounceId = setTimeout(() => {
    //   if (search) {
    //     dispatch(
    //       getSearchCourses({
    //         search: search,
    //         concentrations_id: selectedDegrees,
    //         degrees_id: selectedConcentration,
    //       })
    //     );
    //   }
    // }, 1000);
    // return () => {
    //   clearTimeout(debounceId);
    // };
  };
  return (
    <div>
      <div className="flex justify-between items-center py-1 pr-2">
        <Heading text="Skills" className={"text-[20px]  font-medium   "} />
      </div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ul className="flex flex-col gap-5 text-[16px]  text-black leading-[19.2px]">
          {concentration?.map((data: any) => {
            return (
              <motion.li
                className=" pb-2 flex items-center gap-4"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  checked={selectedConcentration.includes(data?.id)} // Check if selected
                  onChange={() => handleCheckboxChange(data?.id)} // Handle checkbox toggle
                  type="checkbox"
                  className=" w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                />
                {data?.name}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};

export default Concentration;
