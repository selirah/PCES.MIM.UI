import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/outline';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useGlobalFilter } from 'react-table';
import { GlobalFilter } from './GlobalFilter';
const ReactTable = require('react-table');
const { useTable, usePagination } = ReactTable;

type TableProps = {
  columns: any;
  data: any;
};

const BaseTable: React.FC<TableProps> = (props) => {
  const { columns, data } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <>
      <div className="w-full h-full flex flex-col items-start space-y-4 pt-2 px-4 text-center">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        {data && data.length > 0 ? (
          <div className="w-full h-full flex flex-col items-start justify-between">
            <table {...getTableProps()} className="table-auto w-full h-full">
              <thead className=" bg-gradient-left-right">
                {headerGroups.map(
                  (
                    headerGroup: {
                      getHeaderGroupProps: () => JSX.IntrinsicAttributes &
                        React.ClassAttributes<HTMLTableRowElement> &
                        React.HTMLAttributes<HTMLTableRowElement>;
                      headers: any[];
                    },
                    i: React.Key | null | undefined
                  ) => (
                    <tr
                      {...headerGroup.getHeaderGroupProps()}
                      key={i}
                      className=""
                    >
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps()}
                          className="pl-1 pb-2 pt-2 pr-2 font-play text-white first:rounded-tl-md last:rounded-tr-md text-left"
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  )
                )}
              </thead>
              <tbody {...getTableBodyProps()} className="pt-2 font-play text-blue-navy font-semibold">
                {page.map((row: any, i: React.Key | null | undefined) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps}
                      key={i}
                      className="shadow-sm hover:bg-blue-100 text-left"
                    >
                      {row.cells.map(
                        (cell: {
                          getCellProps: () => JSX.IntrinsicAttributes &
                            React.ClassAttributes<HTMLTableDataCellElement> &
                            React.TdHTMLAttributes<HTMLTableDataCellElement>;
                          render: (
                            arg0: string
                          ) =>
                            | boolean
                            | React.ReactChild
                            | React.ReactFragment
                            | React.ReactPortal
                            | null
                            | undefined;
                        }) => {
                          return (
                            <td {...cell.getCellProps()} className="text-sm">
                              {cell.render('Cell')}
                            </td>
                          );
                        }
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="w-full flex flex-row space-x-6 items-center justify-end pb-3">
              <div className="flex flex-row items-center justify-center space-x-3">
                <button
                  className="p-2 bg-blue-900 text-white text-sm disabled:pointer-events-none disabled:bg-gray-300"
                  disabled={!canPreviousPage}
                  onClick={() => gotoPage(0)}
                >
                  <ChevronDoubleLeftIcon className="w-3 h-3 " />
                </button>
                <button
                  className="p-2 bg-blue-900 text-white text-sm disabled:pointer-events-none disabled:bg-gray-300 "
                  disabled={!canPreviousPage}
                  onClick={() => previousPage()}
                >
                  <ChevronLeftIcon className="w-3 h-3" />
                </button>
                <button
                  className="p-2 bg-blue-900 text-white text-sm disabled:pointer-events-none disabled:bg-gray-300"
                  disabled={!canNextPage}
                  onClick={() => nextPage()}
                >
                  <ChevronRightIcon className="w-3 h-3" />
                </button>
                <button
                  className="p-2 bg-blue-900 text-white text-sm disabled:pointer-events-none disabled:bg-gray-300"
                  disabled={!canNextPage}
                  onClick={() => gotoPage(pageCount - 1)}
                >
                  <ChevronDoubleRightIcon className="w-3 h-3" />
                </button>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <span>
                  | Go to page:{' '}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    className="w-20 border-gray-400 text-xs p-2"
                  />
                </span>
              </div>
              <select
                value={pageSize}
                className="text-xs border-gray-400 font-bold px-4 py-2"
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    </>
  );
};

export default BaseTable;
