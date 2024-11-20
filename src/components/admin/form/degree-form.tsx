
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function DegreeFrom({ form, department }: any) {
    return (
        <div className="w-full py-4 flex flex-col gap-y-3">
            <FormField
                control={form.control}
                name="department_id"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                            <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(Number(value))}
                                onOpenChange={() => { }}
                            >
                                <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
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
            <FormField
                control={form.control}
                name="name"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Degree Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Degree Name"
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
