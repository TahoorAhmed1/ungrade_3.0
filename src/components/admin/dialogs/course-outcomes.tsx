import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SubmitHandler } from "react-hook-form";
import { updateTierAndVisiblityCourse } from "@/module/features/courses";
import { useAppDispatch } from "@/module/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDegree } from "@/module/features/degree";
import CourseOutcomeForm from "../form/courseOutcome-form";
import { message } from "antd";



export function CourseOutcomeDialog({ isOpen, setOpen, editData }: any) {
    const dispatch = useAppDispatch()

    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [repateAfter, setRepateAfter] = useState("");

    const [selectedCheckbox, setSelectedCheckbox] = useState("");

    const router = useRouter()

    useEffect(() => {
        dispatch(getDegree())


    }, [])







    const updateOutcomes: SubmitHandler<any> = () => {

        if (!selectedTags.length || !repateAfter || !selectedCheckbox) {
            message.error("All fields are required.");
            return;
        }


        let data: any = {
            outcomes: selectedTags,
            repeatAfter: repateAfter + " " + selectedCheckbox,
        };

        let payload: any = {
            data: data, id: editData.id, callback: () => {
                router.refresh()
            }
        }
        dispatch(
            updateTierAndVisiblityCourse(payload)
        );
        setOpen(false);

    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            setRepateAfter("")
            setSelectedTags([])
            setSelectedCheckbox("")
            setOpen()

        }}>
            <DialogContent className="sm:max-w-[565px] bg-[#f6f5fd]">
                <DialogHeader>
                    <DialogTitle>
                        Edit Outcome
                    </DialogTitle>
                </DialogHeader>
                <CourseOutcomeForm editState={editData} setSelectedCheckbox={setSelectedCheckbox} selectedCheckbox={selectedCheckbox} setRepateAfter={setRepateAfter} repateAfter={repateAfter} selectedTags={selectedTags} setSelectedTags={setSelectedTags} />
                <DialogFooter>
                    <Button onClick={updateOutcomes} className="bg-blueDark text-white border-1 font-medium px-6">
                        Update Outcome
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}