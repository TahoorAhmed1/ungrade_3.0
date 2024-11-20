"use client";
import { ArrowUpDown, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppDispatch } from "@/module/store";
import { useRouter } from "next/navigation";
import { updateTierAndVisiblityCompetency } from "@/module/features/competency";


export default function AdminCompetency({ DataTable, data }: any) {
    const [type, setType] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [status, setStatus] = useState("pre");
    const [editData, setdata] = useState<any>({})


    const dispatch = useAppDispatch()
    const router = useRouter()

    const updateTierAndVisiblityCompetencyFn = (data: any, id: any) => {
        let payload: any = {
            data: data, id: id, callback: () => {
                router.refresh()

            }
        }
        dispatch(updateTierAndVisiblityCompetency(payload));
    };
    const handleEdit = (rowData: any) => {
        setdata({})
        setType("edit");
        setOpen(true);
        setdata(rowData?.original)
    };

    const columns: any = [
        {
            accessorKey: "name",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800  w-full  flex justify-start"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Competency Name
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <Link href={`/admin/assessments?id=${row?.original?.id}&name=${row?.original?.name}`} className="ml-4 text-blueDark">
                    {row.getValue("name")}
                </Link>
            ),
        },
        {
            accessorKey: "CompetencyType",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full  flex justify-starttransition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Competency Type
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    Manual
                </div>
            ),
        },
        {
            accessorKey: "tier",
            header: ({ column }: any) => (
                <Button
                    className="text-slate-800 flex items-center justify-center w-full  flex justify-starttransition"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Tier
                    <ArrowUpDown className="ml-2 h-4 w-4 text-gray-500" />
                </Button>
            ),
            cell: ({ row }: any) => (
                <div className="flex items-center justify-center text-blueDark">
                    <Select
                        value={row.original.tier || ""}
                        onValueChange={(value) => {
                            if (value) {
                                updateTierAndVisiblityCompetencyFn(
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
                <div className="flex justify-end items-center w-full">

                    {row.original.hidden ? <Badge

                        onClick={() => {
                            updateTierAndVisiblityCompetencyFn(
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
                            updateTierAndVisiblityCompetencyFn(
                                {
                                    hidden: 1,
                                },
                                row.original.id

                            );
                        }}
                        className="border-blue/60 cursor-pointer bg-white text-blue/60 py-1 px-3 text-xs h-full">
                        Visible
                    </Badge>}

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
