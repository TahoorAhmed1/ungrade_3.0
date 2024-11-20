import React, { Fragment, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { useAppSelector } from "@/module/store";

type Props = {
  course: any;
  index: any;
  concentrationCourses: any;
  courses: any;
  setCourses: any;
  major: any;
  concentrationState: any;
  course_id?: any;
};

function CourseForm({
  course,
  index,
  concentrationCourses,
  courses,
  setCourses,
  major,
  concentrationState,
  course_id,
}: Props) {
  const [courseCode, setCourseCode] = useState("");
  const professorList = useAppSelector(
    (state) => state.professorSlice.professorList
  );
  const [data, setData] = useState<any>({});

  const seachCourse = () => {
    console.log(concentrationCourses, "concentrationCourses");
    let foundData = concentrationCourses?.filter(
      (obj: any) => obj.course_code === courseCode
    )[0];
    let obj: any = { ...data };
    obj.course_id = String(foundData?.id);
    console.log(obj, "dadasdasd");
    setData(obj);
  };
  const onSelectCourse = (ev: any) => {
    let objCourse: any = { ...data };
    objCourse.course_id = String(ev);
    console.log(objCourse);
    setData(objCourse);

    console.log(concentrationCourses, "concentrationCourses");
    let foundData = concentrationCourses?.filter(
      (obj: any) => String(obj.id) === String(ev)
    )[0];
    console.log(foundData, "foundData");
    let courseCode = String(foundData?.course_code);
    setCourseCode(courseCode);
  };
  useEffect(() => {
    let arr = [...courses];
    arr.splice(index, 1, {
      ...course,
      ...data,
      degree_id: Number(major),
      concentration_id: Number(concentrationState),
    });
    console.log(arr, course, "dasdasda");
    setCourses(arr);
  }, [data]);
  useEffect(() => {
    if (course_id) {
      onSelectCourse(course_id);
    }
  }, [course_id]);
  console.log(concentrationCourses, concentrationState);

  return (
    <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 border-b-2 border-slate-100 md:py-10 xl:gap-x-[40px] gap-x-[25px] xl:gap-y-[30px] gap-[25px] w-full items-center relative">
      <div id='courseCode' className="lg:col-span-1 md:col-span-2 ">
        <label className="md:text-[24px] text-[18px] font-medium">Course Code</label>
        <Input
          placeholder="Enter course code"
          className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
          onChange={(e) => {
            setCourseCode(e.target.value);
          }}
          value={courseCode}
          onKeyDown={seachCourse}
        />
      </div>
      <div  id='professorName' className="lg:col-span-2 md:col-span-1">
        <label className="md:text-[24px] text-[18px] font-medium">Professor Name</label>
        <Select
          onValueChange={(ev) => {
            let obj: any = { ...data };
            obj.professor_id = String(ev);
            setData(obj);
          }}
          value={data?.professor_id}
        >
          <SelectTrigger
            value={data?.professor_id}
            className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
          >
            <SelectValue placeholder="Select a Professor" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {professorList?.map((a: any, i: number) => (
                <SelectItem value={String(a?.id)} key={i}>
                  {a?.professor_name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div id="nameCourse" className="lg:col-span-2 md:col-span-1 ">
        <label className="md:text-[24px] text-[18px] font-medium">Name of Course</label>
        <Select
          onValueChange={(ev) => {
            onSelectCourse(ev);
          }}
          value={data?.course_id}
        >
          <SelectTrigger
            value={data?.course_id}
            className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
          >
            <SelectValue placeholder="Select a Course" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {concentrationCourses?.map((a: any, i: number) => (
                <SelectItem value={String(a?.id)} key={i}>
                  {a?.course}({a?.course_code})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <button
        onClick={() => {
          setCourses(courses.splice(index, 1));
        }}
        className="text-red-700 flex font-bold absolute md:bottom-1 bottom-[-2rem] right-0 "
      >
        X delete
      </button>
    </div>
  );
}

export default CourseForm;
