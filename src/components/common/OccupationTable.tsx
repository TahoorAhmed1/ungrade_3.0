"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import Pagination from "./Pagination";
import Link from "next/link";
type Props = {
  occupation?: any;
  setCurrentPage?: any;
  currentPage?: any;
  totalPages?: any;
};

function OccupationTable({
  occupation,
  setCurrentPage,
  currentPage,
  totalPages,
}: Props) {
  const startnumber = (currentPage - 1) * 20;
  const endnumber = currentPage * 20;
  return (
    <>
      <div className="flex items-center bg-white p-2 mt-4 shadow-md gap-4 justify-between rounded-radius flex-wrap">
        {occupation?.slice(startnumber, endnumber)?.map((a: any, i: string) => (
          <div key={i} className="lg:w-2/5 w-[100%] flex justify-between items-center">
                  < p className="font-jost md:text-[17px] text-[16px] line-clamp-1 md:line-clamp-none font-normal leading-6 text-left flex-1 mr-3">
            {/* <p className="font-jost md:text-lg text-[14px] line-clamp-1 md:line-clamp-none font-normal leading-6 text-left"> */}
              {a.title.split(0,10)}
            </p>
            <Link
              href={"/dashboard/occupation/" + a.domain_source}
              className="font-medium text-[14px] md:leading-[16.8px] leading-[4.8px]  text-center bg-lightBlue rounded-full p-[10px] no-underline"
            >
              View Map
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default OccupationTable;
