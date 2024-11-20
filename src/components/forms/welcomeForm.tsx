"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  searchUniversitiesWithYour,
} from "@/module/features/university";
import { createYearArray, getGraduationYears } from "@/lib/utils";
import { getDepartment } from "@/module/features/department";
import { useSelector } from "react-redux";

type Props = {
  form: any;
  selectedUniversityName?: any;
  setSelectedUniversityName?: any;
};

function WelcomeForm({ form, setSelectedUniversityName }: Props) {
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(getDepartment())
  }, [])


  const department = useSelector(
    (state: any) => state?.departmentSlice.department
  )?.map((a: any, i: any) => {
    return {
      ...a,
      value: a.id,
      label: a.name,
    };
  })

  const universityList = useAppSelector(
    (state: any) => state.universitySlice.searchUniversitieWithYoursData
  );
  const [universityArr, setUniversityArr] = useState([]);
  const [search, setSearch] = useState('')
  const currentYear = new Date().getFullYear();

  // State to manage selected enrollment year
  const [selectedEnrollYear, setSelectedEnrollYear] = useState('');

  // Create enrollment years (last 20 years)
  const enrollmentYears = createYearArray(currentYear - 20, currentYear);

  // Graduation years based on selected enrollment year
  const graduationYears = selectedEnrollYear
    ? getGraduationYears(selectedEnrollYear)
    : [];

  useEffect(() => {
    if (universityList) {
      let arr: any = [];
      console.log(universityList, "universityList");
      universityList.slice(0, 10).map((a: any, i: number) => {
        arr.push({
          value: `${a?.id}`,
          label: `${a?.NAME}`,
          ...a,
        });
      });
      setUniversityArr(arr || []);
    }
  }, [universityList]);

  useEffect(() => {
    const debounceId = setTimeout(() => {

      dispatch(searchUniversitiesWithYour({ search: search }))


    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [search]);

  return (
    <div className="flex flex-col justify-between items-center w-full  overflow-hidden ">
      <div className="flex flex-col gap-y-7 w-full">
        <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px]">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem id="FirstName" className="relative">
                  <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent  border-[#C6C9CF] md:py-[27px] py-[13px] pl-[16px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem id="LastName" className="relative">
                  <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent  border-[#C6C9CF] md:py-[27px] py-[13px] pl-[16px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem id='Gender' className="relative">
                <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                  Gender
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    onOpenChange={() => {
                      console.log(field.value);
                    }}
                  >
                    <SelectTrigger className="bg-transparent  border-[#C6C9CF] md:py-[27px] py-[13px] pl-[16px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                      <SelectValue placeholder="Select a University" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["Male", "Female", "Non_Binary", "Not Specified"]?.map((a: any) => (
                          <SelectItem key={a} value={a}>
                            {a}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[#d33]" />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem id="University" className="relative">
                <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                  University
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);

                      let universityName = Number(value);
                      // @ts-ignore
                      setSelectedUniversityName(universityArr.filter((obj: any) => obj.value == value)[0]?.NAME);
                    }}
                    onOpenChange={() => {
                      console.log(field.value);
                    }}
                  >
                    <SelectTrigger className="bg-transparent  border-[#C6C9CF] md:py-[27px] py-[13px] pl-[16px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                      <SelectValue placeholder="Select a University" />
                    </SelectTrigger>
                    <SelectContent>
                      <div className="searchUniversityInput w-1/2 p-3 pb-0 sticky top-0 bg-white z-10 w-full">
                        <label className=" flex flex-col">
                          <span className="mb-1 font-bold text-grey">Search:</span>
                          <input className="border-grey border-b-[1px] outline-none text-grey" placeholder="University Name"
                            onChange={(ev) => {
                              setSearch(ev?.target?.value)
                            }}
                          />
                        </label>
                      </div>
                      <SelectGroup className="z-0">
                        {universityArr?.map((a: any) => (
                          <SelectItem className="hover:bg-[#F5F5F5]" key={a?.value} value={a?.value}>
                            {a?.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[#d33]" />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="department_id"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                  Department
                </FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(value) => field.onChange(Number(value))}
                    onOpenChange={() => { }}
                  >
                    <SelectTrigger className="bg-transparent  border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                      <SelectValue
                        placeholder="Select Department"
                        className="placeholder:text-slate-500"
                      >
                        {department?.find((a: any) => Number(a.value) === Number(field.value))?.label || "Select Concentration"}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {department?.map((a: any) => (
                          <SelectItem key={a.value} value={a.value}>
                            {a.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="enrollDate"
            render={({ field }) => (
              <FormItem id="EnrollmentDate" className="relative">
                <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                  Enrollment Date
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedEnrollYear(value); // Update state with selected enrollment year
                    }}
                  >
                    <SelectTrigger className="bg-transparent  border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                      <SelectValue placeholder="Select a Entry year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="z-0">
                        {enrollmentYears.map((year) => (
                          // @ts-ignore
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[#d33]" />
              </FormItem>
            )}
          />
        </div>

        {/* Expected Graduation Date */}
        <div>
          <FormField
            control={form.control}
            name="graduationDate"
            render={({ field }) => (
              <FormItem id="ExpectedGraduationDate" className="relative">
                <FormLabel className="text-[#033239] md:text-[24px] text-[20px] md:leading-normal leading-6 font-medium">
                  Expected Graduation Date
                </FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={(value) => field.onChange(value)}
                    disabled={!selectedEnrollYear} // Disable if no enrollment year is selected
                  >
                    <SelectTrigger className="bg-transparent  border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                      <SelectValue placeholder="Select a graduation date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup className="z-0">
                        {graduationYears.map((year) => (
                          // @ts-ignore
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-[#d33]" />
              </FormItem>
            )}
          />
        </div>

      </div>
    </div>
  );
}

export default WelcomeForm;
