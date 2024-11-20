"use client";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function AdminAssessments({ DataTable, data, searchParams }: any) {
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
            accessorKey: "question",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800  w-full  flex justify-start"
                >
                    Question
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="text-blueDark ml-4  ">
                    {row.getValue("question")}
                </div>
            ),
        },
        {
            accessorKey: "name",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full  flex justify-starttransition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Competency name
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("name")}

                </div>
            ),
        },
        {
            accessorKey: "key",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full  flex justify-starttransition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Key
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("key")}
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full  flex justify-starttransition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    status
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    {row.getValue("status")}
                </div>
            ),
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
            data={data.filter((key: any) => key.status === status)}
            isOpen={isOpen}
            type={type}
            setType={setType}
            setOpen={setOpen}
            editData={editData}
            searchParams={searchParams}
            setStatus={setStatus}
            status={status}
            setdata={setdata}
        />
    );
}
