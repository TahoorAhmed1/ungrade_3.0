
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";



export default function OutcomeForm({ form }: any) {
    return (
        <div className="w-full py-4">
            <FormField
                control={form.control}
                name="name"
                render={({ field }: any) => (
                    <FormItem>
                        <FormLabel>Outcome Name</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Outcome Name"
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
