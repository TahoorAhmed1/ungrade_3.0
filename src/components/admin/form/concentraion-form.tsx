import { MultiSelect } from "@/components/common/Multi-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ConcentrationFormProps {
    form: any;
    degree: any;
}

export default function ConcentrationForm({ form, degree }: ConcentrationFormProps) {
    const fields = [
        { name: "name", label: "Concentration Name", placeholder: "Concentration Name" },
        { name: "degree", label: "Degree Name", placeholder: "Degree Name" },
    ];

    return (
        <div className="grid gap-6 py-4">
            {fields.map(({ name, label, placeholder }) => {

                if (name == "degree") {
                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name={name}
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={degree}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            placeholder="Select options"
                                            variant="inverted"
                                            animation={2}
                                            maxCount={3}
                                            className="bg-[rgb(251,251,251)]"
                                        />
                                        {/* <Select
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
                                                    {degree?.find((a: any) => Number(a.id) === Number(field.value))?.name || "Select Degree"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {degree?.map((a: any) => (
                                                        <SelectItem key={a.id} value={a.id}>
                                                            {a.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select> */}
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