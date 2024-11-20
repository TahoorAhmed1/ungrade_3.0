
"use client";

import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function AdminConcentration({ DataTable, data }: any) {
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
                    className="text-slate-800 -full hover:text-blue-600 transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Concentration
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="ml-4 text-blueDark">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "degree_Concentration",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full hover:text-blue-600 transition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Degree
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("degree_Concentration")?.map(({ degree }: any) => {
                        return degree?.name + ",  ";
                    })}
                </div>
            ),
        },
        {
            accessorKey: "action",
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
