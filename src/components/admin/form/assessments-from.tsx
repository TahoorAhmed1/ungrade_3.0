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

interface AssessmentFromProps {
    form: any;
    searchParams: any
}

export default function AssessmentFrom({ form, searchParams }: AssessmentFromProps) {
    const fields = [
        { name: "competency_id", label: "Competency", placeholder: "Competency" },
        {
            name: "name", label: "Question Name", placeholder: "Question Name"
        },
        { name: "key", label: "Question Key", placeholder: "Question Key" },
        { name: "question", label: "Question", placeholder: "Question" },
    ];
    const keyedOptions = [
        {
            value: "1-5 +keyed",
            label: "1-5 +keyed"
        },
        {
            value: "1-5 -keyed",
            label: "1-5 -keyed"
        },
        {
            value: "1-7 +keyed",
            label: "1-7 +keyed"
        },
        {
            value: "1-7 -keyed",
            label: "1-7 -keyed"
        },
        {
            value: "Open Response",
            label: "Open Response"
        },
        {
            value: "Yes/No/Uncertain",
            label: "Yes/No/Uncertain"
        },
        {
            value: "Increase/Same/Decrease",
            label: "Increase/Same/Decrease"
        },
        {
            value: "1-5 Omitted",
            label: "1-5 Omitted"
        },
        {
            value: "1-7 Omitted",
            label: "1-7 Omitted"
        },
        {
            value: "0-3 +keyed",
            label: "0-3 +keyed"
        },
        {
            value: "0-4 +keyed",
            label: "0-4 +keyed"
        },
        {
            value: "1-10 +keyed",
            label: "1-10 +keyed"
        }
    ]
    return (
        <div className="grid  gap-4 py-4">
            {fields.map(({ name, label, placeholder }) => {

                if (name == "key") {
                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                            onOpenChange={() => {
                                                // console.log(field, "dada");


                                            }}

                                        >
                                            <SelectTrigger
                                                className="py-3 mt-2 ring-0 focus:ring-0"
                                            >
                                                <SelectValue
                                                    placeholder="Select Key"
                                                    className="placeholder:text-slate-500"
                                                >
                                                    {keyedOptions?.find((a: any) => String(a.value) == String(field.value))?.label || "Select Key"}
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {keyedOptions?.map((a: any) => (
                                                        <SelectItem key={a.value} value={a.value}>
                                                            {a.value}
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
                }
                if (name == "competency_id") {
                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name="competency_id"
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            readOnly={true}
                                            placeholder={placeholder}
                                            value={searchParams?.name}
                                            className="py-3 mt-2 read-only:bg-slate-200 read-only:cursor-not-allowed"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-600" />
                                </FormItem>
                            )}
                        />
                    </div>
                } if (name == "question") {
                    return <div className="w-full" key={name}>
                        <FormField
                            control={form.control}
                            name={name}
                            render={({ field }: any) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Textarea
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
