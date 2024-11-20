"use client";
import { ArrowUpDown, DockIcon, Edit, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch } from "@/module/store";
import { updateTierAndVisiblityCourse } from "@/module/features/courses";
import { useRouter } from "next/navigation";

export default function AdminCourse({ DataTable, courses, }: any) {
    const [type, setType] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [data, setdata] = useState<any>({})
    const [isOpenOutcome, setOpenOutcome] = useState(false);

    const dispatch = useAppDispatch()
    const router = useRouter()

    const updateTierAndVisiblityCourseFn = (data: any, id: any) => {
        let payload: any = {
            data: data, id: id, callback: () => {
                router.refresh()

            }
        }
        dispatch(updateTierAndVisiblityCourse(payload));
    };
    const handleEdit = (rowData: any) => {
        setdata({})
        setType("edit");
        setOpen(true);
        setdata(rowData.original)
    };

    const handleOutcome = (rowData: any) => {
        setdata({})
        setOpenOutcome(true);
        setdata(rowData.original)
    };

    const columns: any = [
        {
            accessorKey: "course",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex  justify-end "
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Course Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="ml-4 text-blueDark">
                    {row.getValue("course")}
                </div>
            ),
        },
        {
            accessorKey: "course_code",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Course Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("course_code")}
                </div>
            ),
        },
        {
            accessorKey: "degree",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Program
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("degree")}
                </div>
            ),
        },
        {
            accessorKey: "concentration",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Concentration
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("concentration")?.name}
                </div>
            ),
        },
        {
            accessorKey: "course_competencies",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full"
                >
                    Competencies
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="text-blueDark">Competencies</Button>
                            </TooltipTrigger>
                            {row.getValue("course_competencies")?.length ? (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    <p>
                                        {row.getValue("course_competencies")?.map((a: any) => {
                                            return a?.competencies?.name + ",  ";
                                        })}
                                    </p>
                                </TooltipContent>
                            ) : (
                                <div />
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
        },

        {
            accessorKey: "type",
            header: () => (
                <Button className="text-slate-800  flex items-center justify-center w-full">
                    Course / Certificate
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center w-72 justify-center text-blueDark text-center gap-4">
                    <Select
                        value={row.original.type}
                        onValueChange={(value) => {
                            if (value) {
                                updateTierAndVisiblityCourseFn(
                                    {
                                        type: value,
                                        tier: value === "course" ? 0 : row.original.tier,
                                    },
                                    row.original.id
                                );
                            }
                        }}
                        onOpenChange={() => console.log(`Current Value: ${row.getValue("type")}`)}
                    >
                        <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
                            <SelectValue
                                placeholder="Course Level"
                                className="placeholder:text-slate-500"
                            />
                        </SelectTrigger>
                        <SelectContent className="mt-0">
                            <SelectGroup>
                                {[
                                    { value: "course", label: "Course" },
                                    { value: "certificate", label: "Certificate" },
                                ].map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                        {label}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    {row.original.type === "certificate" ? (
                        <Select
                            value={row.original.tier || ""}
                            onValueChange={(value) => {
                                if (value) {
                                    updateTierAndVisiblityCourseFn(
                                        {
                                            tier: value,
                                        },
                                        row.original.id
                                    );
                                }
                            }}
                        >
                            <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
                                <SelectValue
                                    placeholder="Select Tier"
                                    className="placeholder:text-slate-500"
                                />
                            </SelectTrigger>
                            <SelectContent className="mt-0 w-full">
                                <SelectGroup>
                                    {[
                                        { value: 1, label: "1st Tier" },
                                        { value: 2, label: "2nd Tier" },
                                        { value: 3, label: "3rd Tier" },
                                    ].map(({ value, label }: any) => (
                                        <SelectItem key={value} value={value}>
                                            {label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    ) : null}

                </div >
            ),
        },
        {
            accessorKey: "Action",

            header: () => (
                <Button className="text-slate-800 flex items-center justify-center w-full">
                    Action
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex justify-center gap-2 items-center w-full">

                    {row.original.hidden ? <Badge

                        onClick={() => {
                            updateTierAndVisiblityCourseFn(
                                {
                                    hidden: 0,
                                },
                                row.original.id
                            );
                        }}
                        className="border-red-600/60 cursor-pointer bg-white text-red-600/60 py-1 px-3 text-xs h-full">
                        Hidden
                    </Badge> : <Badge
                        onClick={() => {
                            updateTierAndVisiblityCourseFn(
                                {
                                    hidden: 1,
                                },
                                row.original.id

                            );
                        }}
                        className="border-blue/60 cursor-pointer bg-white text-blue/60 py-1 px-3 text-xs h-full">
                        Visible
                    </Badge>}
                    <div className="flex">

                        <Button onClick={() => handleEdit(row)} className="text-blue/60 px-1">
                            <Edit className="h-[18px] w-[18px]" />
                        </Button>
                        <Button onClick={() => handleOutcome(row)} className="text-blue/60 px-2">
                            <File className="h-[18px] w-[18px]" />
                        </Button>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            setOpenOutcome={setOpenOutcome}
            isOpenOutcome={isOpenOutcome}
            editData={data}
            columns={columns}
            data={courses}
            isOpen={isOpen}
            type={type}
            setType={setType}
            setOpen={setOpen}
            setdata={setdata}
        />
    );
}
