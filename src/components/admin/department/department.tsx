"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function AdminDepartment({ data, DataTable }: any) {
    const [type, setType] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [editData, setdata] = useState<any>({})


    const handleEdit = (rowData: any) => {
        setdata({})
        setType("edit");
        setOpen(true);
        setdata(rowData.original)


    };

    const columns: any = [
        {
            accessorKey: "name",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-start w-full hover:text-blue-600 transition"
                >
                    Department
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-start text-blueDark pl-4">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "university_department",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-start w-full hover:text-blue-600 transition"
                >
                    University
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="text-blueDark">Universities</Button>
                            </TooltipTrigger>
                            {row.getValue("university_department")?.length ? (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-96">

                                    {row.getValue("university_department")?.map(({ collegesAndUniversities }: any) => {
                                        return collegesAndUniversities?.NAME + ", "
                                    })}

                                </TooltipContent>
                            ) : (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    No Universities
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            ),
        },
        {
            accessorKey: "age",
            header: ({ column }: any) => (
                <div className="flex justify-end">
                    <Button
                        className="text-slate-800 flex items-center justify-center hover:text-blue-600 transition"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Action
                    </Button>
                </div>
            ),
            cell: ({ row }: any) => (
                <div className="flex justify-end items-center">

                    <Button
                        onClick={() => handleEdit(row)}
                        className="text-blue/60 px-3 hover:bg-blue-100 transition"
                    >
                        <Edit className="h-[18px] w-[18px]" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data}
            isOpen={isOpen}
            type={type}
            setType={setType}
            setOpen={setOpen}
            editData={editData}
            setdata={setdata}
        />
    );
}
