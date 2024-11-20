"use client";
import { Ladder, SignPost } from "@/Assets/Icons";
import Assesment from "@/components/common/Assesment";
import AssesmentProgress from "@/components/common/AssesmentProgress";
import { getanswers, getAssessmentsTier } from "@/module/features/assesments";
import { getCompetenciesByIdTier } from "@/module/features/competency";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { BookOpen, Boxes, Presentation, Shield, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import TourGuide from "./TierAssesmentTourGuide";
import { checkTour } from "@/lib/utils";

type Props = {
  params?: String;
  course?: Boolean;
};

function TierAssesment(props: Props) {
  const tier1: any = useAppSelector((state) => state?.coursesSlice?.tier1);
  const tier2: any = useAppSelector((state) => state?.coursesSlice?.tier2);
  const tier3: any = useAppSelector((state) => state?.coursesSlice?.tier3);
  const user = useAppSelector((state) => state.Authentication.user);
  const userProfile = useAppSelector((state) => state.completeProfileSlice.userProfile);
  const tiersCompetencies: any = useAppSelector(
    (state) => state?.competencySlice?.AllCompetencieTier
  );
  const tiersCompetencies2: any = useAppSelector(
    (state) => state?.competencySlice?.AllCompetencieTier2
  );
  const tiersCompetencies3: any = useAppSelector(
    (state) => state?.competencySlice?.AllCompetencieTier3
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props?.course) {

      console.log(props.params, 'paramsparamsparams')
      let data = {
        courseIds: [Number(props?.params)],
      };
      dispatch(getCompetenciesByIdTier({ data, tier: "1" }));

      dispatch(getAssessmentsTier({ id: props?.params }));
    } else {
      if (tier1?.length && props?.params == "1") {
        let data = {
          courseIds: [tier1[0].id],
        };
        dispatch(getCompetenciesByIdTier({ data, tier: "1" }));
        dispatch(getAssessmentsTier({ id: tier1[0].id }));
      }
      if (tier2?.length && props?.params == "2") {
        let data = {
          courseIds: [tier2[0].id],
        };
        dispatch(getCompetenciesByIdTier({ data, tier: "2" }));
        dispatch(getAssessmentsTier({ id: tier2[0].id }));
      }
      if (tier3?.length && props?.params == "3") {
        let data = {
          courseIds: [tier3[0].id],
        };
        dispatch(getCompetenciesByIdTier({ data, tier: "3" }));
        dispatch(getAssessmentsTier({ id: tier3[0].id }));
      }
    }
  }, [user]);
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
    <div className="TierAssesment w-full p-6 overflow-hidden">
      {userProfile && checkTour(userProfile, 'assessmentTour') ?
        <>
          {startTour && (
            <TourGuide
              start={startTour}
              setStartTour={setStartTour}
              onTourEnd={handleTourEnd}
            />
          )}
        </>
        : null}
      <Assesment
        id={
          props?.course
            ? Number(props?.params) || 0
            : tier1?.length && props?.params == "1"
              ? tier1[0].id
              : tier2?.length && props?.params == "2"
                ? tier2[0].id
                : tier3?.length && props?.params == "3"
                  ? tier3[0].id
                  : ""
        }
        course={props?.course}
        skills={
          props?.course
            ?
            tiersCompetencies
            : props?.params == "1"
              ? tiersCompetencies
              : props?.params == "2"
                ? tiersCompetencies2
                : tiersCompetencies3
        }
      />
    </div>
  );
}

export default TierAssesment;
