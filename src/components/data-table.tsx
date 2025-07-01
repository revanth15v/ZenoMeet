// "use client"

// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
// } from "@tanstack/react-table"

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[]
//   data: TData[]
//   onRowClick?: (row: TData) => void
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   onRowClick,
// }: DataTableProps<TData, TValue>) {
//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   })

//   return (
//     <div className="rounded-lg border bg-background overflow-hidden">
//       <Table>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//               onClick={() => onRowClick?.(row.original)}
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//                 className="cursor-pointer"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id} className="text-sm p-4 ">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-19 text-center text-muted-foreground">
//                 No results.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }


"use client"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-6 p-1"> {/* Container with spacing */}
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <div
            onClick={() => onRowClick?.(row.original)}
            key={row.id}
            className="group cursor-pointer bg-white rounded-xl border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-blue-300/50 transition-all duration-300 overflow-hidden"
          >
            {/* Card Header with gradient */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {row.getVisibleCells().map((cell, index) => (
                  <div key={cell.id} className={`${index === 0 ? 'lg:border-r lg:border-gray-100 lg:pr-8' : ''}`}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Card Footer with subtle pattern */}
            <div className="h-2 bg-gradient-to-r from-gray-50 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-12 bg-gray-50/50 rounded-xl border-2 border-dashed border-gray-200">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-900">No agents found</h3>
            <p className="text-sm">Create your first agent to get started.</p>
          </div>
        </div>
      )}
    </div>
  )
}
