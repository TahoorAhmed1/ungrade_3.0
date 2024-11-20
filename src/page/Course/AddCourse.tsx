import AddCourseForm from "@/components/forms/addCourseForm";
import TourGuide from "./AddCourseTourGuide";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/module/store";
import { checkTour } from "@/lib/utils";

type Props = {};

function AddCourse(props: any) {
  const [startTour, setStartTour] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const userProfile = useAppSelector((state) => state.completeProfileSlice.userProfile);
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
    <>
      {userProfile && checkTour(userProfile, 'addCourseTour') ?
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
      <AddCourseForm {...props} />
    </>
  )
}

export default AddCourse;
