import { MultiSelect } from "@/components/common/Multi-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface UniversityFormProps {
    form: any;
    department: any
}

export default function UniversityForm({ form, department }: UniversityFormProps) {
    const fields = [
        { name: "department", label: "Select Departments", placeholder: "Select Department" },
        { name: "NAME", label: "University Name", placeholder: "University Name" },
        { name: "TELEPHONE", label: "University Telephone", placeholder: "University Telephone" },
        { name: "WEBSITE", label: "University Website", placeholder: "University Website" },
        { name: "ADDRESS", label: "University Address", placeholder: "University Address" },
        { name: "CITY", label: "City", placeholder: "City" },
        { name: "COUNTRY", label: "Country", placeholder: "Country" },
    ];

    return (
        <div className="grid grid-cols-2 gap-6 py-4">
            {fields.map(({ name, label, placeholder }) => {
                if (name == "department") {
                    return (
                        <div className="w-full col-span-2" key={name}>
                            <FormField
                                control={form.control}
                                name={name}
                                render={({ field }: any) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                options={department}
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                placeholder="Select options"
                                                variant="inverted"
                                                animation={2}
                                                maxCount={3}
                                                className="bg-[rgb(251,251,251)] py-2"
                                            />

                                        </FormControl>
                                        <FormMessage className="text-red-600" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    );
                } else {
                    return (
                        <div className="w-full" key={name}>
                            <FormField
                                control={form.control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={placeholder}
                                                className="py-5 mt-2"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-600" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    );
                }
            })}
        </div>

    );
}
