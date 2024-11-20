import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CompetencyFormProps {
    form: any;
}

export default function CompetencyForm({ form }: CompetencyFormProps) {
    const fields = [
        { name: "name", label: "Competency Name", placeholder: "Competency Name" },
        { name: "level", label: "Competency Level", placeholder: "Competency Level" },
        { name: "average", label: "Competency Average", placeholder: "Competency Average" },
    ];
    let level = [
        {
            value: 0,
            label: 'level',
        },
        {
            value: 1,
            label: 'Advanced',
        }
    ]
    return (
        <div className="grid grid-cols-2 gap-6 py-4">
            {fields.map(({ name, label, placeholder }) => {

                if (name == "level") {
                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>Course Level</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(Number(value))}
                                            onOpenChange={() => {
                                                console.log(field.value);
                                            }}

                                        >
                                            <SelectTrigger
                                                className="py-3 mt-2 ring-0 focus:ring-0"
                                            >
                                                <SelectValue
                                                    placeholder="Select Competency"
                                                    className="placeholder:text-slate-500"
                                                >
                                                    {level?.find((a: any) => Number(a.value) === Number(field.value))?.label || "Select Concentration"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {level?.map((a: any) => (
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
                } else {

                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name={name}
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder={placeholder}
                                            className="py-3 mt-2"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                }
            })}
        </div>
    );
}
