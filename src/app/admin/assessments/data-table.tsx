"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { AssessmentsDialog } from "@/components/admin/dialogs/assessments";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isOpen: Boolean;
  type: String;
  searchParams: any
  editData: any;
  status: any;
  setdata: any;
  setStatus: (value: SetStateAction<string>) => void;
  setType: (value: SetStateAction<string>) => void;
  setOpen: (value: SetStateAction<boolean>) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isOpen,
  type,
  setType,
  setOpen,
  editData,
  searchParams,
  status,
  setStatus,
  setdata
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <AssessmentsDialog
        isOpen={isOpen}
        type={type}
        setType={setType}
        setOpen={setOpen}
        editData={editData}
        searchParams={searchParams}
        status={status}
      />
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-semibold text-2xl ">Manage Assessments</h1>
        <div className="flex items-center justify-center gap-3">

          <div className="w-40 h-full mt-0">

            <Select
              value={status}
              onValueChange={(value) => setStatus(value)}
              onOpenChange={() => console.log(`Current Value: ${status}`)}


            >
              <SelectTrigger className="py-3 mt-2 ring-0 focus:ring-0">
                <SelectValue
                  placeholder="Course Level"
                  className="placeholder:text-slate-500"
                />
              </SelectTrigger>
              <SelectContent className="mt-0">
                <SelectGroup>
                  {["pre", "post"].map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>

          <Button
            onClick={() => {
              setdata({})
              setType("add");
              setOpen(true);
            }}
            className="bg-blueDark text-white border-1 font-medium mt-2 h-11 border-0"
          >
            <Plus className="w-5 h-5 mr-2" /> Add Assessments
          </Button>

        </div>
      </div>
      <div className="flex items-center py-4">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-500" />
          </span>
          <Input
            placeholder="Search..."
            value={table.getState().globalFilter ?? ""}
            onChange={(event) =>
              table.setGlobalFilter(event.target.value)
            }
            className="pl-10 bg-white shadow-sm border-0.5 w-full"
          />
        </div>
      </div>
      <div className="rounded-md  bg-white border-0.5 shadow-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
