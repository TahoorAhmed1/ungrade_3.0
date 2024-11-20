"use client";

import Heading from "@/components/common/Heading";
import { motion } from "framer-motion";

const CourseLevel = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-1 pr-2">
        <Heading
          text="Course Level"
          className={"text-[20px]  font-medium   "}
        />
      </div>

      <motion.div
        className="mt-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <ul className="flex flex-col gap-5 text-[16px]  text-black leading-[19.2px]">
          <motion.li
            className=" pb-2 flex items-center gap-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="checkbox"
              className=" w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
            />
            Graduate
          </motion.li>
          <motion.li
            className=" pb-2 flex items-center gap-4"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="checkbox"
              className=" w-4 h-4 rounded-[5px] text-black leading-[19.2px]"
            />
            UnGraduate
          </motion.li>
        </ul>
      </motion.div>
    </div>
  );
};

export default CourseLevel;
