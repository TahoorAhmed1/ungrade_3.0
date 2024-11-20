"use client";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function ProfessorAdmin({ DataTable, data }: any) {
    const [type, setType] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [editData, setdata] = useState<any>({})

    const [status, setStatus] = useState("pre")

    const handleEdit = (rowData: any) => {
        setdata({})
        setType("edit");
        setOpen(true);
        setdata(rowData.original)
    };

    const columns: any = [
        {
            accessorKey: "Professor",
            header: () => (
                <Button
                    className="text-slate-800  w-full  flex justify-start"
                >
                    Professor
                </Button>
            ),

            cell: ({ row }: any) => (


                <div className=" ml-4 text-blueDark">
                    {row.original.professor_name}

                </div>
            )

        },
        {
            accessorKey: "description",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full   transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.original.description}

                </div>
            ),
        },
        {
            accessorKey: "description",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full   transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    University
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row?.original?.collegesAndUniversity?.NAME}

                </div>
            ),
        },
        {
            accessorKey: "professor_department",
            header: () => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full"
                >
                    Department
                </Button>
            ),
            cell: ({ row }: any) => {
                return <div className="flex items-center justify-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="text-blueDark">Department</Button>
                            </TooltipTrigger>
                            {row.getValue("professor_department")?.length ? (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    <p>
                                        {row.getValue("professor_department")?.map(({ department }: any) => {
                                            return department?.name + ",  ";
                                        })}
                                    </p>
                                </TooltipContent>
                            ) : (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    No Department
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            },
        },


        {
            accessorKey: "action",
            header: ({ column }: any) => (
                <div className="flex justify-end">
                    <Button
                        className="text-slate-800  flex justify-starttransition"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Action
                    </Button>
                </div>
            ),
            cell: ({ row }: any) => (
                <div className="flex justify-end items-center space-x-3">

                    <Button onClick={() => handleEdit(row)} className="text-blue/60 px-3">
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
            setStatus={setStatus}
            status={status}
            setdata={setdata}
        />
    );
}
