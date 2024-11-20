"use client";

import Heading from "@/components/common/Heading";
import { getSearchCourses } from "@/module/features/courses";
import { useAppDispatch } from "@/module/store";
import { motion } from "framer-motion";

const AreaOfStudy = ({
  degree,
  selectedDegrees,
  setSelectedDegrees,
  selectedConcentration,
  search,
}: any) => {
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (id: string) => {
    setSelectedDegrees((prevSelectedDegrees: any) =>
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
        <Heading text="Area of Study" className="text-[20px] font-medium" />
      </div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ul className="flex flex-col gap-5 text-[16px] text-black leading-[19.2px]">
          {degree?.map((data: any) => (
            <motion.li
              key={data?.id}
              className="pb-2 flex items-center gap-4"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="checkbox"
                className="w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
                checked={selectedDegrees?.includes(data?.id)} // Check if selected
                onChange={() => handleCheckboxChange(data?.id)} // Handle checkbox toggle
              />
              {data?.name}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AreaOfStudy;