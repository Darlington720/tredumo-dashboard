import React, { useState } from "react";
import { Pagination, Table, Form } from "react-bootstrap";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import ld from "lodash";

function convertDateFormat(inputDate) {
  const parts = inputDate.split("/");
  const year = parts[2];
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DaysComponent = React.memo(({ year, month, staffData }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  let daysInMonth = new Date(year, month, 0).getDate();

  // if (year === currentYear && month === currentMonth) {
  //   daysInMonth = currentDate.getDate(); // Set daysInMonth to the current day
  // }
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const _days = Array.from({ length: daysInMonth }, (_, day) => {
    let present = 0;
    let absent = 0;
    const date = new Date(year, month - 1, day + 1); // Adding 1 to day since day is 0-based
    // console.log("days in the month", date);
    const formattedDate =
      date.toLocaleString("en-US", { weekday: "short" }) +
      " " +
      date.toLocaleString("en-US", { day: "2-digit" });

    return {
      accessorKey: "datesPresent",
      cell: (info) => {
        // console.log("the value", info.getValue());

        if (date <= currentDate) {
          if (info.getValue().length !== 0) {
            const db_date = ld.find(info.getValue(), {
              signin_date: convertDateFormat(date.toLocaleDateString()),
            });

            // console.log("member.datesPresent", member.datesPresent);

            if (db_date) {
              present++;
              return (
                // <i className="fa fa-check-circle hidden-print text-success"></i>
                // <i class="fa fa-check-circle" aria-hidden="true"></i>
                <i
                  class="bi bi-check-circle-fill text-success"
                  style={{
                    fontWeight: "bolder",
                  }}
                ></i>
              );
            } else {
              absent++;
              return (
                // <i className="far fa-times-circle hidden-print text-danger"></i>
                <i
                  class="bi bi-x-circle-fill text-danger"
                  style={{
                    fontWeight: "bolder",
                  }}
                ></i>
              );
            }
          } else {
            absent++;
            return (
              // <i className="far fa-times-circle hidden-print text-danger"></i>
              <i
                class="bi bi-x-circle-fill text-danger"
                style={{
                  fontWeight: "bolder",
                }}
              ></i>
            );
          }
        }
      },
      header: formattedDate,
    };
  });

  const columns = [
    {
      header: "Staff",
      accessorKey: "staff_name",
    },
    ..._days,
    {
      header: "%",
      accessorFn: (row) =>
        `${((row.datesPresent.length / daysInMonth) * 100).toFixed(0)}`,
    },
    // {
    //   accessorFn: (row) => 0,
    //   header: "W",
    // },
    {
      accessorFn: (row) => `${row.datesPresent.length}`,
      header: "P",
    },
    {
      accessorFn: (row) => `${daysInMonth - row.datesPresent.length}`,
      header: "A",
    },
  ];

  const table = useReactTable({
    columns: columns,
    data: staffData,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  // const currentPage = table.in;

  const renderPageButtons = () => {
    const pageCount = table.getPageCount();
    const MAX_VISIBLE_PAGES = 10;
    const pageButtons = [];

    if (pageCount <= MAX_VISIBLE_PAGES) {
      for (let index = 0; index < pageCount; index++) {
        pageButtons.push(
          <Pagination.Item
            key={index}
            active={currentPage === index}
            onClick={() => {
              table.setPageIndex(index);
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </Pagination.Item>
        );
      }
    } else {
      const firstVisiblePage = Math.max(
        currentPage - Math.floor(MAX_VISIBLE_PAGES / 2),
        0
      );
      const lastVisiblePage = Math.min(
        firstVisiblePage + MAX_VISIBLE_PAGES - 1,
        pageCount - 1
      );

      if (firstVisiblePage > 0) {
        pageButtons.push(
          <Pagination.Ellipsis
            onClick={() => {
              table.setPageIndex(0);
              setCurrentPage(0);
            }}
            key="start-ellipsis"
          />
        );
      }

      for (let index = firstVisiblePage; index <= lastVisiblePage; index++) {
        pageButtons.push(
          <Pagination.Item
            key={index}
            active={currentPage === index}
            onClick={() => {
              table.setPageIndex(index);
              setCurrentPage(index);
            }}
          >
            {index + 1}
          </Pagination.Item>
        );
      }

      if (lastVisiblePage < pageCount - 1) {
        pageButtons.push(
          <Pagination.Ellipsis
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
              setCurrentPage(table.getPageCount() - 1);
            }}
            key="end-ellipsis"
          />
        );
      }
    }

    return pageButtons;
  };

  let weekends = 0;
  //   console.log("month", month);
  //   console.log("daysInMonth", daysInMonth);

  // Rest of your component code

  return (
    <>
      <div
        style={{
          display: "flex",
          width: 400,
        }}
      >
        <Form.Control
          className="mb-2 mg-b-10"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search"
        />
      </div>
      <Table
        responsive
        bordered
        hover
        condensed
        style={{
          padding: 0,
          marginBottom: 5,
        }}
      >
        <thead
          style={{
            padding: 0,
          }}
        >
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr
              key={index}
              style={{
                padding: 0,
                margin: 0,
                // backgroundColor: "red",
                backgroundColor: "lightgray",
                // textAlign: "start",
              }}
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  onClick={
                    header.column.columnDef.accessorKey == "staff_name" ||
                    header.column.columnDef.header == "%" ||
                    header.column.columnDef.header == "P" ||
                    header.column.columnDef.header == "A"
                      ? header.column.getToggleSortingHandler()
                      : null
                  }
                  style={{
                    padding: 5,
                    textTransform: "capitalize",
                    cursor:
                      header.column.columnDef.accessorKey == "staff_name" ||
                      header.column.columnDef.header == "%" ||
                      header.column.columnDef.header == "P" ||
                      header.column.columnDef.header == "A"
                        ? "pointer"
                        : null,
                    textAlign:
                      header.column.columnDef.accessorKey == "staff_name"
                        ? "start"
                        : "center",

                    // backgroundColor: "blue",
                  }}
                >
                  {/* {console.log()} */}
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {
                      {
                        asc: (
                          <i
                            style={
                              {
                                // marginLeft: 10,
                              }
                            }
                            className="fa fa-angle-up"
                          ></i>
                        ),
                        desc: (
                          <i
                            style={
                              {
                                // marginLeft: 10,
                              }
                            }
                            className="fa fa-angle-down"
                          ></i>
                        ),
                      }[header.column.getIsSorted() ?? null]
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            padding: 0,
          }}
        >
          {table.getRowModel().rows.map((row, index) => (
            <tr key={index}>
              {row.getVisibleCells().map((cell, i) => (
                <td
                  style={{
                    padding: 5,
                    fontSize:
                      cell.column.columnDef.accessorKey === "staff_name"
                        ? 13
                        : 15,
                    // textAlign: "center",
                  }}
                  key={i}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div
        style={{
          marginTop: 10,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Pagination className="mb-0">
          <Pagination.Prev
            disabled={currentPage === 0}
            onClick={() => {
              table.previousPage();
              setCurrentPage(currentPage - 1);
            }}
          />
          {/* {Array.from({ length: table.getPageCount() }, (_, index) => (
            <Pagination.Item
              onClick={() => table.setPageIndex(index)}
              key={index}
            >
              {index + 1}
            </Pagination.Item>
          ))} */}
          {renderPageButtons()}
          <Pagination.Next
            disabled={currentPage === table.getPageCount() - 1}
            onClick={() => {
              table.nextPage();
              setCurrentPage(currentPage + 1);
            }}
          />
        </Pagination>
      </div>
    </>
  );
});
export default DaysComponent;
