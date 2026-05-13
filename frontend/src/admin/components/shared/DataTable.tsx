import { useState } from 'react';
import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getFilteredRowModel, flexRender, ColumnDef, SortingState,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  onPageChange: (p: number) => void;
}

interface Props<T> {
  data: T[];
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
  pagination?: Pagination;
  globalFilter?: string;
}

export default function DataTable<T>({ data, columns, isLoading, pagination, globalFilter }: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: !!pagination,
    pageCount: pagination ? Math.ceil(pagination.total / pagination.limit) : undefined,
  });

  if (isLoading) return (
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-12 admin-skeleton rounded" />
      ))}
    </div>
  );

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="admin-table">
          <thead>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(h => (
                  <th
                    key={h.id}
                    className={h.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-1.5">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {h.column.getCanSort() && (
                        <span className="text-slate-400">
                          {h.column.getIsSorted() === 'asc'  ? <ChevronUp className="w-3 h-3" />   :
                           h.column.getIsSorted() === 'desc' ? <ChevronDown className="w-3 h-3" />  :
                           <ChevronsUpDown className="w-3 h-3" />}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-slate-400">
                  No data found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-slate-500">
            Showing {Math.min((pagination.page - 1) * pagination.limit + 1, pagination.total)}–
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => pagination.onPageChange(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="btn-admin-secondary py-1.5 px-3 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm font-medium text-slate-700 px-2">
              {pagination.page} / {Math.ceil(pagination.total / pagination.limit)}
            </span>
            <button
              onClick={() => pagination.onPageChange(pagination.page + 1)}
              disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
              className="btn-admin-secondary py-1.5 px-3 disabled:opacity-40"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
