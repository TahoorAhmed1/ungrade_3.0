"use client";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: any = [
  {
    accessorKey: "username",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-end "
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="ml-4 text-blueDark">
        {row.getValue("username")}
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-center w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Age
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center text-blueDark">
        {row.getValue("age")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-center w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center text-blueDark">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "religion",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-center w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student Religion
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center text-blueDark">
        {row.getValue("religion")}
      </div>
    ),
  },
  {
    accessorKey: "userProfile",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-center w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        User Profile
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center text-blueDark">
        {row.getValue("userProfile") == null ? "false" : "true"}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }: any) => (
      <Button
        className="text-slate-800 flex items-center justify-center w-full"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Joining
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }: any) => {
      const dateValue: any = row.getValue("createdAt");
      const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }) : "N/A";

      return (
        <div className="flex items-center justify-center text-blueDark">
          {formattedDate}
        </div>
      );
    },


  },

];


