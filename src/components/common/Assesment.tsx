"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import AssesmentProgress from "./AssesmentProgress";
import {
  BookOpen,
  Boxes,
  Presentation,
  Shield,
  User,
  Users,
} from "lucide-react";
import { Ladder, SignPost } from "@/Assets/Icons";
import AssesmentLayout from "./AssesmentLayout";
import RangeSelector from "./RangeSelector";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  addAssessmentsAnswers,
  addAssessmentsAnswersTier,
  getanswersTier,
} from "@/module/features/assesments";
import { message } from "antd";
// import Router from "next/router";
import {
  getProfile,
  updateProfileTier,
} from "@/module/features/completeProfile";
import { useRouter, useSearchParams } from "next/navigation";

type SkillBoxProp = {
  icon: ReactNode;
  name: string;
};

const SkillBox = ({ icon, name }: SkillBoxProp) => {
  return (
    <div className="TopSkillProgress relative flex justify-start items-end bg-[rgba(229,245,245,1)] md:p-6 py-[4px] px-[18px] md:rounded-radius rounded-[25px] shadow-[0px_2px_4px_-2px_rgba(16,24,40,0.06)]">
      <div className="flex items-center ">
        <div className="rounded-full w-5 h-5 md:w-10 md:h-10 mr-4 bg-[#B3E1E2] text-blueDark flex items-center justify-center">
          {icon}
        </div>
        <div className="">
          <p className="font-normal text-[] md:text-xl leading-[28.8px] text-left text-blueDark">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
};

type Props = {
  skills?: any;
  id?: any;
  course?: any;
};

function Assesment({ skills, id, course }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const courses: any = useAppSelector(
    (state) => state.coursesSlice.userCourses
  );
  // console.log(skills)
  const userProfile: any = useAppSelector(
    (state) => state.completeProfileSlice.userProfile
  );
  const assessments: any = useAppSelector(
    (state) => state.assessmentSlice.tierAssesment
  );
  const answers = useAppSelector((state) => state.assessmentSlice.tieranswers);

  const params = useSearchParams();
  const assesmentType = params.get("assesmentType");

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [unansweredArr, setUnansweredArr] = useState<any>([]);
  const [answer, setanswer] = useState<any>(1);
  const [loader, setloader] = useState<any>(false);
  const [instruction, setinstruction] = useState<any>(0);
  const [activeIndex, setactiveIndex] = useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    console.log(api.selectedScrollSnap());

    api.on("select", () => {
      console.log(api.selectedScrollSnap());
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  useEffect(() => {
    if (answers?.length || assessments?.length) {
      if (answers?.length > 0) {
        let arr = assessments?.map((a: any, i: number) => {
          let answer = answers.filter(
            (obj: any) => Number(a?.id) === Number(obj.question_id)
          )?.length
            ? true
            : false;

          console.log(answer, "asdsadasdsad");
          if (answer) {
            api?.scrollTo(i + 1 + 1);

            setactiveIndex(i + 1 + 1);
          }
          return {
            ...a,
            answer,
          };
        });

        setUnansweredArr(arr);
      } else {
        console.log("answerNotFound asdsadasdsad");
        setUnansweredArr(assessments);
        setactiveIndex(1);
      }
    }
  }, [answers]);
  const handleNextButtonClick = () => {
    setactiveIndex(activeIndex + 1);
    api?.scrollNext();
  };
  const getUpdatedProfile = () => {
    //@ts-ignore
    dispatch(getProfile({ id: userProfile?.userProfile?.id }));
    message.success("Assesment Submitted");

    router.push("/dashboard");
    setactiveIndex(0);
  };
  const callback = (index: Number) => {
    if (index === assessments?.length - 1) {
      if (Number(skills[0].tier) < 4) {
        dispatch(
          // @ts-ignore
          updateProfileTier({
            data: { tier: skills[0].tier + 1 },
            id: userProfile?.userProfile?.id,
            callback: getUpdatedProfile,
          })
        );
      }
    } else {
      handleNextButtonClick();
    }
  };
  const addAssesmentFun = () => {
    if (instruction === 2) {

      const groupIndex = Math.floor((activeIndex - 1) / 10);
      const currentGroup = assessments[groupIndex];
      console.log("runn")



      const answersArray = currentGroup?.map((question: any) => ({
        question_id: question.id,
        answer: String(answer),
        key: question.key,
        competency_id: Number(question.competency_id),
        assessmentType: assesmentType,
        professor_id: 1,
        course_id: Number(id),
        university_id: userProfile?.university_id,
        completed:
          question === currentGroup[currentGroup.length - 1]
            ? true
            : false,
      }));

      setloader(true);

      console.log('answersArray', answersArray)

      dispatch(
        // @ts-ignore
        addAssessmentsAnswers({
          data: answersArray,
          callback,
          setLoader: setloader,
          index: groupIndex,
        })
      );
    } else {
      if (instruction < 2) {
        setinstruction(instruction + 1);
      }
      api?.scrollNext();
    }
  };


  useEffect(() => {
    if (id) {
      dispatch(
        getanswersTier({
          courseIds: id,
        })
      );
    }
  }, [id]);

  return (
    <>
      <AssesmentProgress percent={50} />
      <div className="Assesment md:min-h-screen flex flex-col justify-center ">
        <Carousel
          setApi={setApi}
          draggable={false}
          style={{ overflow: "auto" }}
        >
          <CarouselContent style={{}}>
            <CarouselItem>
              <div id="skillPage" className="innerCarouselItem w-full flex flex-col items-center justify-center mt-9">
                <h5 className="font-normal text-xl leading-[28.8px] text-center w-full max-w-[710px]">
                  A ‘tier’ represents a cluster of foundational skills based on
                  the Competency Model formed by the Department of Labor.
                </h5>
                <div className="flex-col flex items-center justify-center py-8">
                  <h3 className="font-medium text-xl leading-[28.8px] text-center mb-6">
                    {course
                      ? `The ${courses?.filter((a: any) => a?.course.id === id)[0]
                        ?.course.course
                      } Assessment will test skills in:`
                      : "The Tier 1 Assessment will test skills in:"}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {skills.length ? (
                      skills.map((skill: any, id: Number) => {
                        return (
                          <SkillBox
                            key={skill.id}
                            icon={<BookOpen />}
                            name={skill.name}
                          />
                        );
                      })
                    ) : (
                      <h1>There's no Skill added in this course</h1>
                    )}
                    {/* <SkillBox icon={<Users />} name="Interpersonal Skills" />
                    <SkillBox
                      icon={<Shield />}
                      name="Dependability & Reliability"
                    />
                    <SkillBox icon={<Presentation />} name="Professionalism" />
                    <SkillBox icon={<Ladder />} name="Initiative" />
                    <SkillBox icon={<Boxes />} name="Integrity" />
                    <SkillBox
                      icon={<SignPost />}
                      name="Adaptability & Flexibility"
                    /> */}
                  </div>
                  <p className="font-normal text-xl leading-[28.8px] text-left mt-16">
                    You will take each test at both the beginning and end of
                    each semester.
                  </p>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="innerCarouselItem w-full flex flex-col items-center justify-center mt-9">
                <h5 className="font-normal text-xl leading-[28.8px] text-center w-full max-w-[710px] mb-9">
                  The Evaluation Center is the hub for all of your assessment
                  results.
                </h5>
                <h5 className="font-normal text-xl leading-[28.8px] text-center w-full max-w-[940px] mb-9">
                  You’ll be able to track your progress, see your growth over
                  time, and receive recommendations on ways to improve your
                  scores.
                </h5>
                <h5 className="font-normal text-xl leading-[28.8px] text-center w-full max-w-[940px]">
                  Let’s get started!
                </h5>
              </div>
            </CarouselItem>
            {assessments?.length
              ? assessments.map((group: any[], groupIndex: number) => {
                return (
                  <CarouselItem key={groupIndex}>
                    {group.map((val: any, i: number) => (
                      <AssesmentLayout
                        key={val.id}
                        totalQuestions={group.length}
                        activeQuestion={activeIndex}
                        question={val?.question}
                        suggestions={
                          "1: Very Inaccurate | 2: Moderately Inaccurate | 3: Neutral | 4: Moderately Accurate | 5: Accurate"
                        }
                      >
                        <RangeSelector setanswer={(val) => setanswer(val)} />
                      </AssesmentLayout>
                    ))}
                  </CarouselItem>
                );
              })
              : null}

          </CarouselContent>
        </Carousel>
        <div className="w-full items-center flex justify-center ">
          <button
            id="nextButton"
            className="max-w-[200px] w-full py-2 rounded-radius bg-blueDark disabled:bg-[#EAEBED] text-white disabled:text-black text-center"
            disabled={!skills.length || loader}
            onClick={() => {
              addAssesmentFun();
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
    </>
  );
}

export default Assesment;
