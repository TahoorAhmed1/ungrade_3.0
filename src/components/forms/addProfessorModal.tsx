import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import "./addprofesso.css";
import { Input, Select as AntSelect, message } from "antd";
import { addProfessor, getProfessors } from "@/module/features/professor";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { Loader } from "lucide-react";
const { Option } = AntSelect;

function FormDiv({
  selectedCourse,
  showModal,
  handleOk,
  handleCancel,
  isModalOpen,
  setIsModalOpen,
  editState,
}: any) {
  const universityList = useAppSelector(
    (state) => state.universitySlice.universityList
  );
  const courses = useAppSelector((state) => state.coursesSlice.courses);
  const [coursesArr, setCoursesArr] = useState([]);
  const user = useAppSelector((state) => state.Authentication.user);
  const userProfile: any = useAppSelector(
    (state) => state.completeProfileSlice.userProfile
  );
  const degrees = useAppSelector((state) => state.degreeSlice.degrees);
  // console.log({selectedCourse},"degrees")
  const [selectedCourseArr, setSelectedCourseArr] = useState([]);
  const [universityArr, setUniversityArr] = useState<any>([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({
    university_id: 0,
    professor_name: "",
    // department_id: 0,
    // department_name: "",
    courses: "",
  });
  const onChange = (value: any) => {
    let obj = { ...data };
    obj.university_id = value;
    setData(obj);
    console.log(`selected ${value} `);
  };
  const onSearch = (value: any) => {
    console.log("search:", value);
  };
  const filterOption = (input: any, option: any) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  useEffect(() => {
    if (universityList) {
      let arr = universityList.map((a: any, i) => {
        return {
          value: `${a?.id}`,
          label: `${a?.NAME}`,
          ...a,
        };
      });
      setUniversityArr(arr);
    }
  }, [universityList]);
  const callback = () => {
    // @ts-ignore
    dispatch(getProfessors());
    let oldData = { ...data };
    // oldData?.professor_name = "";
    // oldData?.department_id = 0;
    // oldData?.department_name = "";
    // oldData?.courses = "";
    setData(oldData);
    setIsModalOpen(false);
    // setSelectedCourseArr([])
    // setData({
    //     university_id: 0,
    //     professor_name: "",
    //     department_id: 0,
    //     department_name: "",
    //     courses: ""
    // });
    setLoader(false);
  };
  useEffect(() => {
    if (userProfile) {
      console.log(userProfile, "userProfile asda");
      if (userProfile?.university_id) {
        setSelectedUniversity(userProfile?.university_id);
      }
    }
  }, [userProfile]);
  useEffect(() => {
    if (selectedCourse) {
      console.log(selectedCourse, "selectedCourse");
      let obj = { ...data };
      let arr = selectedCourse.map((a: any) => a?.id);
      obj.courses = selectedCourse.map((a: any) => a?.id);
      setSelectedCourseArr(arr);
      setData(obj);
    }
    if (selectedUniversity) {
      let obj: any = { ...data };
      obj.university_id = selectedUniversity;
      setData(obj);
      console.log(selectedUniversity, "selectedUniversity");
    }
  }, [selectedCourse, selectedUniversity]);
  const addProfessorFn = () => {
    console.log(data);
    // if (user) {
      if (data.university_id && data.professor_name && data.courses) {
        if (agreeTerms) {
          setLoader(true);
          dispatch(
            // @ts-ignore
            addProfessor({
              data: {
                ...data,
                courses: data?.courses.length ? data?.courses : selectedCourseArr,
              },
              callback: callback,
            })
          );
        } else {
          message.error("Agree to terms and conditon");
        }
      } else {
        message.error("All Fields are required");
      }
    // } else {
    //   message.error("Login to add your professor");
    // }
  };
  const renderOptionUniversity = (option: any) => {
    // Customize the rendering of each option
    return (
      <div className="universityListOpt" onClick={() => console.log(option)}>
        {/* <div> */}
        <span style={{ marginRight: "8px" }}>{option.label}</span>
        <div className="flex">
          <span className="location">
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144zm0 224a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64z"></path>
            </svg>
            {/* &nbsp; */}
            {option.CITY ? option.CITY + ", " : ""}{" "}
            {option.COUNTRY ? option.COUNTRY : ""}
          </span>
        </div>
        {/* </div> */}
      </div>
    );
  };
  useEffect(() => {
    if (selectedCourse?.length) {
      let arr: any = selectedCourse.map((a: any, i: number) => {
        return {
          ...a,
          value: a?.id,
          label: a?.course,
        };
      });
      setCoursesArr(arr);
    }
  }, [selectedCourse]);
  return (
    <Modal
      title={!editState ? "Add Professor" : "Edit Professor"}
      open={isModalOpen}
      footer={false}
      onCancel={() => {
        handleCancel();
      }}
    >
      <div className="innerAddForm">
        <p className="addProfDes font-semibold">
          Please use the search bar above to make sure that the professor does
          not already exist at this school.
        </p>
        <div className="addFormInner">
          <div className="mt-3">
            <label className="text-[20px] font-medium">Name of School</label>
            <AntSelect
              showSearch
              optionFilterProp="children"
              className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl bg-white w-full focus-visible:ring-0"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              disabled
              value={data?.university_id.toString()}
            >
              {universityArr.map((option: any) => (
                <Option key={option.value} value={option.value}>
                  {renderOptionUniversity(option)}
                </Option>
              ))}
            </AntSelect>
          </div>

          <div className="mt-3">
            <label className="text-[20px] font-medium">
              Professor's Full Name
            </label>
            <Input
              className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
              placeholder="Professor Name"
              value={data?.professor_name}
              onChange={(ev) => {
                let obj = { ...data };
                obj.professor_name = ev.target.value;
                setData(obj);
              }}
            />
          </div>
          {/* <div>
          <label className="text-[24px] font-medium">Department</label>

          <Select
            value={data?.department_name}
            onValueChange={(ev) => {
              let obj = { ...data };
              obj.department_name = ev
              setData(obj);
            }}
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
        </div> */}
          {/* <label>
            <p>Department</p>
            <Input
              value={data?.department_name}
              onChange={(ev) => {
                let obj = { ...data };
                obj.department_name = ev.target.value;
                setData(obj);
              }}
            />
          </label> */}
          {/* <label>
            <p>Select course</p>
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              options={coursesArr}
              value={selectedCourseArr}
              disabled={selectedCourse}
              onValueChange={(ev:any) => {
                setSelectedCourseArr(ev);
                let obj: any = { ...data };
                obj.courses = ev;
                setData(obj);
              }}
            />
          </label> */}
          <div className="col-span-2 mt-3">
            <label className="text-[20px] font-medium">Name of Course</label>
            <AntSelect
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              options={coursesArr}
              value={selectedCourseArr}
              onChange={(ev: any) => {
                setSelectedCourseArr(ev);
                let obj: any = { ...data };
                obj.courses = ev;
                setData(obj);
              }}
            />
            {/* <Select
          onValueChange={(ev) => {
            let obj: any = { ...data };
            obj.courses = [ev];
            setData(obj);
          }}
          value={data?.courses[0]}
        >
          <SelectTrigger
            value={data?.courses[0]}
            className="border-[#C6C9CF] h-[56px] rounded-lg placeholder:text-[#B9BDC4] text-xl py-[22px] bg-white px-[24px] w-full focus-visible:ring-0"
          >
            <SelectValue placeholder="Select a Course" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              {selectedCourse?.map((a: any, i: number) => (
                <SelectItem value={String(a?.id)} key={i}>
                  {a?.course}({a?.course_code})
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select> */}
          </div>
          <label className="checkBox mt-3">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(ev) => {
                setAgreeTerms(ev.target.checked);
              }}
            />
            <p>I agree to the Terms of Use and Privacy Policy</p>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blueDark w-[209px] capitalize mt-3 py-3 px-[17px] text-[26px]    rounded-lg  hover:bg-blueDark/80 text-white font-normal"
          disabled={loader}
          onClick={() => {
            addProfessorFn();
          }}
        >
          {loader ? (
            <Loader className="animate-spin text-center w-5 h-5 m-auto" />
          ) : (
            "Add Professor"
          )}
        </button>
      </div>
    </Modal>
  );
}

export default FormDiv;
