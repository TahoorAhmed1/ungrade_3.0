"use client";
import Heading from "@/components/common/Heading";
import JobBox from "@/components/common/JobBox";
import OccupationTable from "@/components/common/OccupationTable";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getStudentOccupation } from "@/module/features/assesments";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import TourGuide from "./OccupationsTourGuide";
import { checkTour } from "@/lib/utils";

type Props = {};

function Occupations({ }: Props) {
  const userProfile = useAppSelector((state) => state.completeProfileSlice.userProfile);
  const occupation = useAppSelector(
    (state) => state?.assessmentSlice?.occupation
  );

  const [selectCompetency, setSelectedCompetency] = useState<any>(false);
  const [occupationState, setOccupationState] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumber1, setPageNumber1] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useAppDispatch();

  const filteredOccupation = searchTerm
    ? occupation?.filter((item: any) =>
      item?.title?.toLowerCase().includes(searchTerm?.toLowerCase())
    )
    : occupation;

  useEffect(() => {
    if (selectCompetency) {
      console?.log(selectCompetency, "selectCompetency");
      let obj = {
        id: selectCompetency.id,
        name: selectCompetency.name,
        onet_element_id: selectCompetency.onet_element_id,
      };
      setOccupationState([]);
      dispatch(
        getStudentOccupation({
          data: {
            competencies: [obj],
          },
          page: pageNumber,
        })
      );
    } else {
      setOccupationState([]);
      dispatch(getStudentOccupation({ page: pageNumber }));
    }
  }, [selectCompetency]);

  const [startTour, setStartTour] = useState(true);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleStartTour = () => {
    setStartTour(true);
  };

  const handleTourEnd = () => {
    setStartTour(false);
  };

  if (!loaded) {
    return null;
  }

  return (
    <div className="Occupations">
      {userProfile && checkTour(userProfile, 'occupationalTour') ?
        <>
          {startTour && (
            <TourGuide
              start={startTour}
              setStartTour={setStartTour}
              onTourEnd={handleTourEnd}
            />
          )}
        </>
        : null
      }
      <div id="topMatchOccupation" className="">
        <Heading text="Top Matching Occupations for You" />
        <div>
          <OccupationTable
            occupation={occupation}
            currentPage={pageNumber}
            setCurrentPage={setPageNumber}
            totalPages={occupation?.length / 20}
          />
        </div>
      </div>
      <div id="viewAllOccupation" className="mt-12">
        <div className="flex items-center">
          <Heading text="View All Occupations" className="mr-6" />
          <label className="bg-white rounded-full max-w-[634px] w-full h-14 rounded-tr-full overflow-hidden flex">
            <input
              className="h-full w-[calc(100%-54px)] outline-none py-3 px-6 font-normal text-[16px] leading-[19.2px] text-left"
              placeholder="Search occupations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
            <button className="bg-transparent outline-none border-none h-full w-[50px] flex items-center justify-center">
              <Search />
            </button>
          </label>
        </div>
        <div>
          <OccupationTable
            occupation={filteredOccupation}
            currentPage={pageNumber1}
            setCurrentPage={setPageNumber1}
            totalPages={filteredOccupation?.length / 20}
          />
        </div>
      </div>
      {/* <div className="mt-12">
        <Heading text="Top Matching Jobs for You" className="mr-6" />
        <div className="flex items-start w-full mt-8">
          <Carousel className=" w-full">
            <CarouselContent className=" w-full">
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
              <CarouselItem className="basis-1/3">
                <div className="job">
                  <JobBox />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div> */}
    </div>
  );
}

export default Occupations;
