"use client";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export default function AdminUniversity({ data, DataTable }: any) {
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
            accessorKey: "NAME",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-start w-full hover:text-blue-600 transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    University Name
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="ml-4 text-blueDark">
                    {row.getValue("NAME")}
                </div>
            ),
        },
        {
            accessorKey: "NAME",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-start w-full hover:text-blue-600 transition"
                >
                    Department
                </Button>
            ),
            cell: ({ row }: any) => {

                // console.log('first', JSON.stringify(row.original.university_department))
                return <div className="flex items-center justify-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="outline" className="text-blueDark">Department</Button>
                            </TooltipTrigger>
                            {row?.original.university_department?.length ? (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    <p>
                                        {row?.original.university_department?.map(({ department }: any) => {
                                            return department?.name + ",  ";
                                        })}
                                    </p>
                                </TooltipContent>
                            ) : (
                                <TooltipContent className="flex items-center justify-center bg-white max-w-80">
                                    <p>
                                        No Department Found
                                    </p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </TooltipProvider>
                </div>
            },
        },
        {
            accessorKey: "WEBSITE",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800   "
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    University Website
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className=" text-blueDark">
                    <a href={row.getValue("WEBSITE")} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {row.getValue("WEBSITE")}
                    </a>
                </div>
            ),
        },
        {
            accessorKey: "CITY",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800  "
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    City
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className=" text-blueDark w-48 ">
                    {row.getValue("CITY")}
                </div>
            ),
        },
        {
            accessorKey: "TELEPHONE",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800  hover:text-blue-600 transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Telephone
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className=" text-blueDark w-48 ">
                    {row.getValue("TELEPHONE")}
                </div>
            ),
        },
        {
            header: "Action",
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
