"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { SignUpSchema } from "@/validations/indx";
import { z } from "zod";
import Heading from "../common/Heading";
import { getConcentration } from "@/module/features/concentration";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import {
  getAllCourses,
} from "../../module/features/courses";
import CourseForm from "./CourseForm";
import { getProfile, updateProfile } from "@/module/features/completeProfile";
import { getUser } from "@/module/features/authentication";
import AddProfessorModal from "./addProfessorModal";
import { getUniversities } from "@/module/features/university";
import { useRouter } from "next/navigation";
import { getDegree } from "@/module/features/degree";
import { getProfessors } from "@/module/features/professor";

type Props = {};

function AddCourseForm(props: any) {
  console.log(props, "props");
  const [isLoading, setIsLoading] = useState(false);
  const userProfile: any = useAppSelector(
    (state) => state.completeProfileSlice.userProfile
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = props.searchParams;
  const course_id = params?.course_id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editState, setEditState] = useState(false);
  const professorList = useAppSelector(
    (state) => state.professorSlice.professorList
  );
  const showModal = (data: any) => {
    setIsModalOpen(true);
    setEditState(data);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setEditState(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setEditState(false);
  };
  const concentration = useAppSelector(
    (state) => state.ConcentrationSlice.concentration
  );
  const concentrationCourses = useAppSelector(
    (state) => state.coursesSlice.allCourses
  );

  const degrees = useAppSelector((state) => state.degreeSlice.degrees);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof SignUpSchema>) {
    setIsLoading(true);
    try {
      console.log(values);
    } finally {
      setIsLoading(false);
    }
  }

  // Handler to add a new course
  let [courses, setCourses] = useState([
    {
      course_id: "",
      professor_id: "",
      semesterType: "semester",
      duration: "9072000000",
    },
  ]);
  const addCourse = () => {
    const arr = [
      ...courses,
      {
        course_id: "",
        professor_id: "",
        semesterType: "semester",
        duration: "9072000000",
      },
    ];
    setCourses(arr);
  };
  const [major, setMajor] = useState("");
  const [concentrationState, setConcentrationState] = useState<any>(0);

  useEffect(() => {
    if (concentrationState) {
      dispatch(getAllCourses({ id: concentrationState }));
      // dispatch(getCourseByConcentration({ id: concentrationState }));
    }
  }, [concentrationState]);
  const callback = () => {
    dispatch(getProfile());
    dispatch(getUser(false));
    setCourses([{
      course_id: "",
      professor_id: "",
      semesterType: "semester",
      duration: "9072000000",
    }])
  };
  useEffect(() => {
    dispatch(getDegree());
    dispatch(getConcentration());
    dispatch(getProfessors({}));
    dispatch(getUniversities({}));
  }, []);
  const addCoursefn = () => {
    let obj: any = {
      courseType: "course",
      courses: [...(userProfile?.profile_courses || []), ...courses].map((val: any) => {
        return {
          concentration_id: concentrationState || val.concentration_id,
          course_id: val.course_id,
          degree_id: major || val.degree_id,
          duration: val.duration,
          professor_id: val.professor_id,
          semesterType: val.semesterType,
        };
      }),
    };

    let payload: any = {
      data: { ...obj },
      callback,
      setLoader: setIsLoading,
      id: userProfile?.id,
      course: true,
    };
    dispatch(updateProfile(payload));
  };

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      userProfile &&
      userProfile?.profile_courses &&
      concentration &&
      degrees
    ) {
      setConcentrationState(
        String(userProfile?.profile_courses[0]?.concentration_id)
      );
      setMajor(String(userProfile?.profile_courses[0]?.degree_id));
      if (
        userProfile?.profile_courses[0]?.concentration_id &&
        userProfile?.profile_courses[0]?.degree_id
      ) {
        setDisable(true);
      }
    }
  }, [userProfile, concentration, degrees]);

  return (
    <div className="flex flex-col justify-between  w-full  overflow-hidden ">
      <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-x-[30px] gap-x-[25px] gap-y-[30px]  w-full mb-[32px]">
        <div id="declaredMajor">
          <label className="md:text-[24px] text-[18px] font-medium">Declared Major*</label>

          <Select
            onValueChange={(ev) => {
              setMajor(String(ev));
            }}
            value={major}
            disabled={disable}
          >
            <SelectTrigger className="border-[#C6C9CF] h-[56px]  rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0">
              <SelectValue placeholder="Select a Major" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                {degrees?.map((a: any, i: number) => (
                  <SelectItem value={String(a?.id)} key={i}>
                    {a?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div id="Concentration">
          <label className="md:text-[24px] text-[18px] font-medium">Concentration</label>

          <Select
            onValueChange={(ev) => {
              setConcentrationState(String(ev));
            }}
            value={concentrationState}
            disabled={disable}
          >
            <SelectTrigger className="border-[#C6C9CF] h-[56px]  rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0">
              <SelectValue placeholder="Select a Concentration" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectGroup>
                {concentration?.map((a: any, i: number) => (
                  <SelectItem value={String(a?.id)} key={i}>
                    {a?.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col mt-0">
        {courses.map((course, index) => (
          <CourseForm
            course={course}
            index={index}
            concentrationCourses={concentrationCourses}
            courses={courses}
            setCourses={setCourses}
            major={major}
            course_id={course_id}
            concentrationState={concentrationState}
          />
        ))}

        <div className="flex md:justify-between justify-center mt-10 md:flex-row flex-col">
          <button
            id="addCourse"
            type="button"
            className="flex items-center gap-x-4"
            onClick={() => addCourse()}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#009C9E"
                stroke="#009C9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#F2FAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#F2FAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-blue text-[20px] font-medium">
              Add Another Course
            </p>
          </button>
          <button
            id="addProfessor"
            type="button"
            className="flex items-center gap-x-4"
            onClick={() => showModal(false)}
            disabled={concentrationState == "0"}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                fill="#009C9E"
                stroke="#009C9E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8V16"
                stroke="#F2FAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 12H16"
                stroke="#F2FAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-blue text-[20px] font-medium">Add Professor</p>
          </button>
        </div>
      </div>
      <div className="flex md:justify-center md:items-center flex-col md:flex-row mt-10 md:gap-x-[24px]">
        <button
          id="submitCourse"
          type="submit"
          className="bg-blueDark md:w-[209px] capitalize  md:py-3 md:px-[17px] md:text-[26px] py-[12px] px-[116px]    rounded-lg  hover:bg-blueDark/80 text-white font-normal"
          disabled={isLoading}
          onClick={() => {
            addCoursefn();
          }}
        >
          {isLoading ? (
            <Loader className="animate-spin text-center w-5 h-5 m-auto" />
          ) : (
            "Submit"
          )}
        </button>
        <button
          type="submit"
          className="bg-[#FBFBFB] md:w-[209px] md:mt-0 mt-3 capitalize  md:py-3 md:px-[17px] md:text-[26px] py-[12px] px-[116px]   rounded-lg  border border-blueDark text-blueDark font-normal"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          {/* {isLoading ? (
            <Loader className="animate-spin text-center w-5 h-5 m-auto" />
          ) : ( */}
          Add Later
          {/* )} */}
        </button>
      </div>
      <AddProfessorModal
        showModal={showModal}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        editState={editState}
        selectedCourse={concentrationCourses || []}
      />
    </div>
  );
}

export default AddCourseForm;
