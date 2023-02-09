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
      page, // use instead of rows - will render only the rows for the active page
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
          {data && data.length > 0 ? (
            <div className="w-full h-full flex flex-col items-start justify-between">
              <table {...getTableProps()} className="table-auto w-full h-full">
                <thead className=" bg-blue-even-light">
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
                            className="pl-1 pb-2 pt-2 pr-2 font-play text-blue-dark-ocean first:rounded-tl-md last:rounded-tr-md text-left"
                          >
                            {column.render('Header')}
                          </th>
                        ))}
                      </tr>
                    )
                  )}
                </thead>
                <tbody {...getTableBodyProps()} className="pt-2">
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
             
            </div>
          ) : (
           null
          )}
        </div>
      </>
    );
  };
  
  export default BaseTable;
  