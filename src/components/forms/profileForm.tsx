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
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { profileSchema } from "@/validations/indx";
import { z } from "zod";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { ethnicity, genders, religions } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/module/store";
import {
  searchUniversities,
  searchUniversitiesWithYour,
} from "@/module/features/university";

import "react-select-search/style.css";
import { getProfile, updateProfile } from "@/module/features/completeProfile";

import { Textarea } from "../ui/textarea";
import DatePicker from "react-date-picker";
type Props = {};
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function ProfileForm({ }: Props) {
  const [isLoading1, setIsLoading1] = useState(false);
  const [search, setSearch] = useState<any>("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setoptions] = useState<any>([]);
  const [selected_university_id, setselected_university_id] = useState<any>(1);
  const [value, onChange] = useState<Value>(new Date());

  const universityList = useAppSelector(
    (state) => state.universitySlice.searchUniversitieWithYoursData
  );
  useEffect(() => {
    const debounceId = setTimeout(() => {
      dispatch(searchUniversities({ search: search }));
    }, 1000);

    return () => {
      clearTimeout(debounceId);
    };
  }, [search]);
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      ethics: "",
      religion: "",
      university: "",
      currentLocation: "",
      yearOfEntry: 0,
      yearOfGraduation: 0,
      bio: "",
    },
  });

  const userProfile: any = useAppSelector(
    (state) => state.completeProfileSlice.userProfile
  );

  useEffect(() => {
    form?.setValue("currentLocation", userProfile?.location);
    form?.setValue("yearOfEntry", userProfile?.entryYear);
    form?.setValue("yearOfGraduation", userProfile?.graduationYear);
    form?.setValue("bio", userProfile?.bio);
    form?.setValue("gender", userProfile?.gender);
    form?.setValue("ethics", userProfile?.ethnicity);
    form?.setValue("firstName", userProfile?.fullname?.split(" ")[0]);
    form?.setValue("lastName", userProfile?.fullname?.split(" ")[1]);
    form?.setValue("religion", userProfile?.religion);
    form?.setValue("university", userProfile?.nameOfCollege);
    setselected_university_id(userProfile?.university_id || 1);
    form?.setValue("currentLocation", userProfile?.location);
  }, [userProfile?.id]);

  const dispatch = useAppDispatch();
  const [universityArr, setUniversityArr] = useState([]);

  useEffect(() => {
    if (universityList) {
      let arr: any = [];
      console.log(universityList, "universityList");
      universityList.map((a: any, i: number) => {
        arr.push({
          value: `${a?.id}`,
          label: `${a.NAME}`,
          ...a,
        });
      });
      const optionsVal: { label: string; value: string }[] = arr.map(
        (a: any) => ({
          label: a?.label,
          value: a?.value,
        })
      );
      setoptions(optionsVal);
      setUniversityArr(arr || []);
    }
  }, [universityList?.length]);

  useEffect(() => {
    dispatch(searchUniversitiesWithYour({ search: search }));
    dispatch(getProfile());
  }, []);

  const clearState = () => {
    form.reset();
  };

  const updateProfilee = (data: any) => {

    try {
      setIsLoading(true);
      let payload: any = {
        data: data,
        clearState: clearState,
        setLoader: setIsLoading1,
      };
      dispatch(updateProfile(payload));
    } catch (error) {
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    let obj = {
      nameOfCollege: values.university,
      university_id: Number(selected_university_id),
      location: values.currentLocation,
      gender: values.gender,
      entryYear: values.yearOfEntry,
      graduationYear: values.yearOfGraduation,
      fullname: values.firstName + " " + values.lastName,
      age: value,
      religion: values.religion,
      ethnicity: values.ethics,
      bio: values.bio,
    };
    updateProfilee(obj);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-between items-center w-full  overflow-hidden "
      >
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center xl:gap-x-[80px] sm:gap-x-[50px] gap-x-[25px] gap-y-[30px] w-full mb-[30px]">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    First Name*{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your first name"
                      className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
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
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    Last Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="type your last name"
                      className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                    />
                  </FormControl>
                  <FormMessage className="text-[#d33]" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full">
            <FormLabel className="xl:text-[24px] text-[22px] font-medium">
              Date of Birth*
            </FormLabel>
            <DatePicker
              onChange={onChange}
              value={value}
              className="flex h-10 w-full items-center mt-2 justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
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
                      <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {genders.map((value, index) => (
                            <SelectItem
                              value={value.value}
                              className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                            >
                              {value.label}
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
              name="ethics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    Ethnicity
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
                      <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                        <SelectValue placeholder="Select Ethnicity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {ethnicity.map((value, index) => (
                            <SelectItem
                              value={value.value}
                              className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                            >
                              {value.label}
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
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                    Religon
                  </FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                      onOpenChange={() => {
                        console.log(field, form.getValues("religion"));
                      }}
                    >
                      <SelectTrigger className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0">
                        <SelectValue
                          placeholder={field.value || "Select Religion"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {religions.map((value, index) => (
                            <SelectItem
                              value={value.value}
                              className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                            >
                              {value.label}
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
          <div className="xl:col-span-3 sm:col-span-2 col-span-1 items-center xl:gap-x-[80px] sm:gap-x-[50px] gap-x-[25px] gap-y-[30px] w-full grid sm:grid-cols-2 grid-cols-1 ">
            <div>
              <FormField
                control={form.control}
                name="university"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                      University
                    </FormLabel>
                    <FormControl>
                      <ReactSelect
                        options={options}
                        value={options.find(
                          (option: any) =>
                            option.value == selected_university_id
                        )}
                        onInputChange={(value) => {
                          setSearch(value);
                        }}
                        onChange={(selectedOption) => {
                          field.onChange(selectedOption?.label);
                          console.log(selectedOption?.value);
                          setselected_university_id(selectedOption?.value);
                        }}
                        placeholder="Select a University"
                        classNamePrefix={"py-[5px] "}
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
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                      Current Location
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your Location"
                        className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
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
                name="yearOfEntry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                      Year of Entry
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                        placeholder="Year of Entry"
                        className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
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
                name="yearOfGraduation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                      Year of Graduation
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10))
                        }
                        placeholder="Year of Graduation"
                        className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage className="text-[#d33]" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="xl:text-[24px] text-[22px] font-medium">
                  Bio
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Your Bio.."
                    className="flex h-10 w-full items-center justify-between rounded-md border px-3 ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 bg-transparent border-[#C6C9CF] py-[27px] text-[18px] ring-0 outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage className="text-[#d33]" />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-16    w-[230px] mr-auto">
          <button
            type="submit"
            className="bg-blueDark capitalize w-full py-1 text-[26px]    rounded-lg  hover:bg-blueDark/80 text-white font-mediums px-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin text-center w-5 h-5 m-auto" />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm;
