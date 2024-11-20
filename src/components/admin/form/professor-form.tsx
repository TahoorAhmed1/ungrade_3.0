
import { MultiSelect } from "@/components/common/Multi-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { searchUniversitiesWithYour } from "@/module/features/university";
import { useAppDispatch, useAppSelector } from "@/module/store";
import { useEffect, useState } from "react";



export default function ProfessorFrom({ form, department, setDepartment, editData }: any) {
    const universityList = useAppSelector(
        (state: any) => state.universitySlice.searchUniversitieWithYoursData
    );
    const dispatch = useAppDispatch();

    const [universityArr, setUniversityArr] = useState<any>([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        const debounceId = setTimeout(() => {

            dispatch(searchUniversitiesWithYour({ search: search }))


        }, 1000);

        return () => {
            clearTimeout(debounceId);
        };
    }, [search]);

    useEffect(() => {
        if (universityList) {
            let arr: any = [];
            universityList.slice(0, 10).map((a: any, i: number) => {
                arr.push({
                    value: `${a?.id}`,
                    label: `${a?.NAME}`,
                    ...a,
                });
            });
            setUniversityArr(arr || []);
        }
    }, [universityList, editData.id]);

    return (
        <div className="w-full py-4 flex flex-col gap-y-3">
            <FormField
                control={form.control}
                name="university_id"
                render={({ field }) => (
                    <FormItem id="University" className="relative">

                        <FormLabel>University</FormLabel>

                        <FormControl>
                            <Select

                                {...field}
                                value={field.value}
                                onValueChange={(value) => {
                                    field.onChange(Number(value))
                                    setDepartment(universityArr.filter((obj: any) => obj.value == value)[0]?.university_department?.map(({ department }: any, i: any) => {
                                        return {
                                            value: Number(department.id),
                                            label: department.name,
                                        };
                                    })
                                    )
                                }}
                            >
                                <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
                                    <SelectValue
                                        placeholder="Select University"
                                        className="placeholder:text-slate-500"
                                    >
                                        {universityArr.filter((obj: any) => Number(obj.value) === Number(field.value))[0]?.NAME || "Select University"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="searchUniversityInput p-3 pb-0 sticky top-0 bg-white z-10 w-full">
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
                )
                }
            />
            < FormField
                control={form.control}
                name="department"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                            <MultiSelect
                                options={department}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                placeholder="Select university for department"
                                variant="inverted"
                                animation={2}
                                maxCount={3}
                                className="bg-[rgb(251,251,251)]"
                            />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                    </FormItem>
                )}
            />
            < FormField
                control={form.control}
                name="professor_name"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Professor Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Professor Name"
                                {...field}
                                className="py-3 mt-2"
                            />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="description"
                render={({ field }: any) => (
                    <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Description"
                                {...field}
                                className="py-3 mt-2"
                            />
                        </FormControl>
                        <FormMessage className="text-red-600" />
                    </FormItem>
                )}
            />


        </div >
    );
}
