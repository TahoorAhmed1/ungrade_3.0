
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/common/Multi-select";
import { useEffect } from "react";
export default function CourseForm({ form, competencies, concentration }: any) {
    useEffect(() => {
        if (concentration) {
            console.log(concentration, 'concentrationconcentration')
        }
    }, [concentration])
    return (
        <div className="grid grid-cols-2 gap-6 py-4">
            <FormField
                control={form.control}
                name="course"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Course Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Course Name"
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
                name="degree"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Course Level</FormLabel>
                        <FormControl>
                            <Select
                                {...field}
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                                onOpenChange={() => {
                                    console.log(field.value);
                                }}

                            >
                                <SelectTrigger
                                    className="py-3 mt-2 ring-0 focus:ring-0"
                                >
                                    <SelectValue placeholder="Course Level" className="placeholder:text-slate-500" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {["Graduate", "Undergraduate"]?.map((a: any) => (
                                            <SelectItem key={a} value={a}>
                                                {a}
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

            <FormField
                control={form.control}
                name="competency"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Competencies</FormLabel>
                        <FormControl>
                            <MultiSelect
                                options={competencies}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                placeholder="Select options"
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


            <FormField
                control={form.control}
                name="course_code"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Course Code</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Course Code"
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
                name="compulsory"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Compulsory</FormLabel>
                        <div>
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="w-5 h-5 mt-2 bg-white"
                                />
                            </FormControl>
                        </div>
                        <FormMessage className="text-red-600" />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="concentration_id"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel> Concentration</FormLabel>
                        <FormControl>
                        <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(Number(value))}
                                onOpenChange={() => {
                                    console.log("Selected Value:", field.value);
                                }}
                            >
                                <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
                                    <SelectValue
                                        placeholder="Select Competency"
                                        className="placeholder:text-slate-500"
                                    >
                                        {concentration?.find((a: any) => Number(a.value) === Number(field.value))?.label || "Select Concentration"}
                                    </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {concentration?.map((a: any) => (
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
        </div>
    );
}
