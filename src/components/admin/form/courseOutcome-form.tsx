import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/module/store";
import CheckableTag from "antd/es/tag/CheckableTag";
import { useEffect, useState } from "react";

interface UniversityFormProps {
    form: any;
    editState: EditState;

}

interface Tag {
    id: string;

}
interface Outcome {
    id: string;
}
interface EditState {
    repeatAfter?: string;
    outcomes: { outcome: Outcome }[];
}

export default function CourseOutcomeForm({ form, editState, selectedCheckbox, setSelectedCheckbox, repateAfter, setRepateAfter, selectedTags, setSelectedTags }: any) {
    const outcomes = useAppSelector(state => state.outcomesSlice.outcomes)

    const handleCheckboxChange = (value: any) => {
        setSelectedCheckbox(value);
    };
    const handleChangeInput = (e: any) => {
        const value = e.target.value;

        if (value >= 0 || value === "") {
            setRepateAfter(value);
        }
    };

    const handleChange = (tag: Tag, checked: boolean): void => {

        const nextSelectedTags = checked
            ? [...selectedTags, tag.id]
            : selectedTags.filter((t: string) => t !== tag.id);

        setSelectedTags(nextSelectedTags);
    };

    useEffect(() => {
        if (editState) {
            if (editState?.outcomes?.length) {
                let arr: any = []
                editState?.outcomes?.map(({ outcome }: any, i: any) => {
                    arr.push(outcome.id)
                })
                let updData = { ...editState, outcomes: arr }
                console.log(updData, 'updData')
                setSelectedTags(arr)
            }
        }
    }, [editState])

    return (
        <div className="grid grid-cols-1 gap-6 py-4">

            <div className="flex items-center gap-x-4">
                <Input
                    placeholder={"Repeat After"}
                    className="py-3"
                    type="number"
                    value={repateAfter}
                    onChange={handleChangeInput}
                    min="0"
                />
                <div className="flex items-center gap-x-4 text-sm">
                    <label className="flex  gap-2 items-center">
                        <Input
                            type="radio"
                            value="days"
                            className="w-4 h-4"

                            checked={selectedCheckbox === "days"}
                            onChange={() => handleCheckboxChange("days")}
                        />
                        <span> Day</span>
                    </label>

                    <label className="flex gap-2 items-center">
                        <Input
                            type="radio"
                            value="months"
                            className="w-4 h-4"
                            checked={selectedCheckbox === "months"}
                            onChange={() => handleCheckboxChange("months")}
                        />
                        Month
                    </label>
                </div>
            </div>

            <div id="outcome" className="bg-white p-2 max-h-[60vh] overflow-auto">

                {outcomes?.map((a: any, i) => (
                    <CheckableTag
                        className={`bg-gray-50 ${selectedTags.includes(a.id) ? 'checked:bg-blueDark' : ''
                            }`}
                        key={i}
                        checked={selectedTags.includes(a.id)}
                        onChange={(checked) => handleChange(a, checked)}
                    >
                        {a?.name}
                    </CheckableTag>
                ))}
            </div>
        </div>
    );
}
