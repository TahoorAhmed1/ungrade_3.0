"use client";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function AdminDegree({ data, DataTable }: any) {
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
                    Degree
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-start text-blueDark pl-4">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "department",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-start w-full hover:text-blue-600 transition"
                >
                    Department
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-start text-blueDark pl-4">
                    {row.getValue("department")?.name}
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