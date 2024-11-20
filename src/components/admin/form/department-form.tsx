
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



export default function DepartmentForm({ form }: any) {
    return (
        <div className="w-full py-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Department Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Department Name"
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
