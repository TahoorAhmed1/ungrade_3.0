"use client";
import { ArrowUpDown, Edit } from "lucide-react"; // Import Edit and Trash icons
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";


export default function AdminOutcomes({ data, DataTable }: any) {
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
            header: () => (
                <Button
                    className="text-slate-800  flex justify-start  w-full "
                >
                    Outcome
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="ml-4 text-blueDark">
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: ({ column }: any) => (
                <div className="flex justify-end">
                    <Button
                        className="text-slate-800 flex items-center "
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
