import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
  ProgressBar,
  Accordion,
  Pagination,
  Form,
} from "react-bootstrap";
import ReactECharts from "echarts-for-react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import moment from "moment";
import ld from "lodash";
import Modal from "react-modal";
import urls from "../../../../api/apiConstants";
import noData from "../../../../src/assets/img/svgicons/no-data.svg";

Modal.setAppElement("body");

const ExamCard = ({ title, backgroundColor, total }) => {
  return (
    <Col xl={3} lg={6} md={6} xm={12}>
      <Card className={`overflow-hidden sales-card ${backgroundColor}`}>
        <div className="px-3 pt-3  pb-2 pt-0">
          <div className="">
            <h6 className="mb-3 tx-14 text-white">{title}</h6>
          </div>
          <div className="pb-0 mt-0">
            <div className="d-flex">
              <div className="">
                <h4 className="tx-20 fw-bold mb-1 text-white">{total}</h4>
                {/* <p className="mb-0 tx-12 text-white op-7">
                    Compared to yesterday
                  </p> */}
              </div>
              {/* <span className="float-end my-auto ms-auto">
                  <i className="fas fa-arrow-circle-up text-white"></i>
                  <span className="text-white op-7"> +42</span>
                </span> */}
            </div>
          </div>
        </div>

        {/* <Order /> */}
      </Card>
    </Col>
  );
};

const DataAttr = React.memo(() => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    grid: {
      top: "6",
      right: "0",
      bottom: "17",
      left: "25",
    },
    xAxis: [
      {
        type: "category",
        align: "center",
        axisLabel: {
          show: true,
          // rotate: 90,
          // backgroundColor: "red",
          // width: 100,
          formatter: function (value, index) {
            return truncateString(value, 15);
          },
        },

        data: [
          "Business Communication",
          "Computer Maths",
          "Structured Programming",
          "Artificial Intelligence",
          "Computer Repair",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Taught Percentage",
        type: "bar",
        stack: "Stack",
        barMaxWidth: 20,
        color: "#285cf7",
        emphasis: {
          focus: "series",
        },
        data: [10, 15, 9, 18, 10, 15],
      },
      {
        name: "Not Taught",
        type: "bar",
        stack: "Stack",
        barMaxWidth: 20,

        color: "#f7557a",
        emphasis: {
          focus: "series",
        },
        data: [10, 14, 10, 15, 9, 25],
      },
    ],
  };

  return (
    <div
      style={{
        whiteSpace: "nowrap",
        overflowX: "auto",
      }}
    >
      <ReactECharts
        className="chartsh"
        option={option}
        height="150px"
        style={{
          whiteSpace: "nowrap",
          overflowX: "auto",
          // backgroundColor: "red",
        }}
      />
    </div>
  );
});

const getDuration = (arr) => {
  const taughtLectures = ld.filter(arr, (lecture) => lecture.started_at);
  if (taughtLectures.length === 0) {
    return 0;
  } else {
    //   console.log("taught lectures", taughtLectures);

    let totalDuration = moment.duration(0); // Initialize with 0 duration

    for (const interval of taughtLectures) {
      const startTimeObj = moment(interval.started_at, "h:mm:ss A");
      const endTimeObj = interval.ended_at
        ? moment(interval.ended_at, "h:mm:ss A")
        : moment(interval.end_time, "h:mm:ss A");

      const timeDifference = moment.duration(endTimeObj.diff(startTimeObj));
      totalDuration.add(timeDifference);
    }

    // Format the total duration
    const formattedTotalTime = `${totalDuration.hours()}h ${totalDuration.minutes()}m`;

    //   console.log(formattedTotalTime); // Output: "xh ym"
    return formattedTotalTime;
  }
};

const getSingleLectureDuration = (lecture) => {
  if (!lecture.started_at) {
    return 0;
  } else {
    const startTimeObj = moment(lecture.started_at, "h:mm:ss A");
    const endTimeObj = lecture.ended_at
      ? moment(lecture.ended_at, "h:mm:ss A")
      : moment(lecture.end_time, "h:mm:ss A");

    const timeDifference = moment.duration(endTimeObj.diff(startTimeObj));

    // Format the duration
    const formattedTime = `${timeDifference.hours()}h ${timeDifference.minutes()}m`;

    return formattedTime;
  }
};

function getMonthName(date) {
  const options = { month: "long" };
  return date.toLocaleString("en-US", options);
}

function generateWeeksAndDatesInMonth(year, month) {
  const weeks = [];
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const lastDayOfMonth = new Date(year, month, 0);

  let currentWeek = [];
  let currentDate = new Date(firstDayOfMonth);

  while (currentDate <= lastDayOfMonth) {
    currentWeek.push(
      convertDateFormat(new Date(currentDate).toLocaleDateString())
    );

    if (currentDate.getDay() === 6) {
      // Saturday
      weeks.push([...currentWeek]);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push([...currentWeek]);
  }

  return weeks;
}

function convertDateFormat(inputDate) {
  const parts = inputDate.split("/");
  const year = parts[2];
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const getProductivity = (arr) => {
  const allLectures = arr.length;
  const taughtLectlectures = ld.filter(
    arr,
    (lecture) => lecture.started_at
  ).length;

  // console.log("info ", taughtLectlectures / allLectures);
  return `${((taughtLectlectures / allLectures) * 100).toFixed(0)}%`;
};
function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 3) + "...";
  }
  return str;
}

const LectureTableComponent = React.memo(({ data, yr, selectedDate }) => {
  // console.log("the urls", urls);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [graphVisible, setGraphVisible] = useState(false);
  const [sorting, setSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filtering, setFiltering] = useState("");
  const [selectedRow, setSelectedRow] = useState();

  //   console.log("the data", data);

  const columns = [
    {
      header: "Staff",
      accessorFn: (row) => row,
      //   accessorKey: "staff_name",
      cell: (info) => {
        // console.log("info ", info.getValue());

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              // backgroundColor: "red",
              //   margin: 0,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "lightblue",
                marginRight: 5,
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              <img
                src={`${urls.baseUrl1}api/lecturer/image/${
                  info.getValue().staff_id
                }`}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "lightblue",
                  marginRight: 5,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: 13,
                }}
              >{`${info.getValue().title} ${info.getValue().staff_name}`}</div>
              <div
                style={{
                  fontSize: 12,
                  opacity: 0.8,
                }}
              >
                {`${info.getValue().role}`}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      header: "Total Lectures",
      accessorFn: (row) => row.lectures.length,
    },
    {
      header: "Total Lectures Taught",
      accessorFn: (row) =>
        ld.filter(row.lectures, (lecture) => lecture.started_at).length,
    },
    {
      header: "Total Hours Worked",
      accessorFn: (row) => row.lectures,
      cell: (info) => {
        // console.log("info ", info.getValue());
        const taughtLectures = ld.filter(info.getValue(), (lecture) =>
          lecture.hasOwnProperty("started_at")
        );

        const timeIntervals = [
          { startTime: "11:09:12 AM", endTime: "1:33:27 PM" },
          { startTime: "2:00:00 PM", endTime: "3:45:15 PM" },
          // ... other time intervals ...
        ];

        if (taughtLectures.length === 0) {
          return 0;
        } else {
          //   console.log("taught lectures", taughtLectures);

          let totalDuration = moment.duration(0); // Initialize with 0 duration

          for (const interval of taughtLectures) {
            const startTimeObj = moment(interval.started_at, "h:mm:ss A");
            const endTimeObj = interval.ended_at
              ? moment(interval.ended_at, "h:mm:ss A")
              : moment(interval.end_time, "h:mm:ss A");

            const timeDifference = moment.duration(
              endTimeObj.diff(startTimeObj)
            );
            totalDuration.add(timeDifference);
          }

          // Format the total duration
          const formattedTotalTime = `${totalDuration.hours()}h ${totalDuration.minutes()}m`;

          //   console.log(formattedTotalTime); // Output: "xh ym"
          return formattedTotalTime;
        }
      },
    },
    {
      header: "Average Activity",
      //   accessorKey: "staff_name",
      accessorFn: (row) => row.lectures,
      cell: (info) => {
        const allLectures = info.getValue().length;
        const taughtLectlectures = ld.filter(
          info.getValue(),
          (lecture) => lecture.started_at
        ).length;

        // console.log("info ", taughtLectlectures / allLectures);
        return (
          <div className="vertical-center ">
            <ProgressBar
              style={{
                alignSelf: "center",
                width: "100%",
                marginRight: 10,
              }}
              now={((taughtLectlectures / allLectures) * 100).toFixed(0)}
            />
            <div>{`${((taughtLectlectures / allLectures) * 100).toFixed(
              0
            )}%`}</div>
          </div>
        );
      },
    },
    {
      header: "Total Lectures Missed",
      accessorFn: (row) =>
        ld.filter(row.lectures, (lecture) => !lecture.started_at).length,
    },
    // {
    //   header: "Total Hours Missed",
    //   accessorFn: (row) => row.lectures,
    //   cell: (info) => {
    //     // console.log("info ", info.getValue());
    //     const missedLectures = ld.filter(
    //       info.getValue(),
    //       (lecture) => lecture.started_at === null
    //     );

    //     const timeIntervals = [
    //       { startTime: "11:09:12 AM", endTime: "1:33:27 PM" },
    //       { startTime: "2:00:00 PM", endTime: "3:45:15 PM" },
    //       // ... other time intervals ...
    //     ];

    //     if (missedLectures.length === 0) {
    //       return 0;
    //     } else {
    //       //   console.log("missed lectures", missedLectures);

    //       let totalDuration = moment.duration(0); // Initialize with 0 duration

    //       for (const interval of missedLectures) {
    //         const startTimeObj = moment(interval.start_time, "h:mm:ss A");
    //         const endTimeObj = moment(interval.end_time, "h:mm:ss A");

    //         const timeDifference = moment.duration(
    //           endTimeObj.diff(startTimeObj)
    //         );
    //         totalDuration.add(timeDifference);
    //       }

    //       // Format the total duration
    //       const formattedTotalTime = `${totalDuration.hours()}h ${totalDuration.minutes()}m`;

    //       //   console.log(formattedTotalTime); // Output: "xh ym"
    //       return formattedTotalTime;
    //     }
    //   },
    // },
  ];

  const table = useReactTable({
    columns: columns,
    data: data,
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
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: 400,
        }}
      >
        <Form.Control
          className="mb-2 mg-b-10"
          style={{
            alignSelf: "flex-end",
          }}
          type="text"
          value={filtering}
          onChange={(e) => {
            setFiltering(e.target.value);
            // console.log("text", e.target.value);
          }}
          placeholder="Search"
        />
      </div>
      <Table
        responsive
        bordered
        hover
        style={{
          padding: 0,
          marginBottom: 5,
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup, index) => (
            <tr
              key={index}
              style={
                {
                  //   padding: 0,
                  //   margin: 0,
                  // backgroundColor: "red",
                  //   backgroundColor: "lightgray",
                  // textAlign: "start",
                }
              }
            >
              {headerGroup.headers.map((header, index) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  style={{
                    // padding: 5,
                    // textTransform: "capitalize",
                    cursor: "pointer",
                    // width:
                    //   header.column.columnDef.header === "Staff" ? 100 : "auto",
                    // textAlign:
                    //   header.column.columnDef.accessorKey == "staff_name"
                    //     ? "start"
                    //     : "center",

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
          {/* {data.length && (
            <tr>
              <td colSpan={4} className="text-center">
                <div>Table is Empty</div>
              </td>
            </tr>
          )} */}

          {table.getRowModel().rows.length !== 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <tr
                key={index}
                onDoubleClick={() => {
                  setIsOpen(true);
                  console.log("the row", row.original);
                  setSelectedRow(row.original);
                }}
              >
                {row.getVisibleCells().map((cell, i) => (
                  <td
                    style={{
                      padding:
                        cell.column.columnDef.header === "Staff" ? 5 : null,
                      // fontSize:
                      //   cell.column.columnDef.accessorKey === "staff_name"
                      //     ? 13
                      //     : 15,
                      // textAlign: "center",
                    }}
                    key={i}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr
              style={{
                alignSelf: "center",
              }}
            >
              <td
                style={{
                  textAlign: "center",
                }}
                colSpan={6}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img src={noData} alt="" className="wd-15p" />
                  <h5 className="mg-b-10 mg-t-15 tx-18">No Data Available</h5>
                </div>
              </td>
            </tr>
          )}
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

      <div>
        <Modal
          isOpen={modalIsOpen}
          // overlayClassName=""
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "absolute",
              // top: "40px",
              // left: "40px",
              // right: "40px",
              // bottom: "40px",
              border: "1px solid #ccc",
              background: "#ecf0fa",
              overflow: "hidden",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              // padding: "20px",
            },
          }}
          // onAfterOpen={afterOpenModal}
          // onRequestClose={closeModal}
          // style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            style={{
              position: "absolute",
              top: 10,
              right: 10,
            }}
            onClick={() => setIsOpen(false)}
          >
            close
          </button>
          <Container
            style={{
              marginTop: 25,
              padding: 0,
            }}
          >
            <Row>
              <Col
                lg={3}
                style={{
                  padding: 0,
                  margin: 0,
                }}
              >
                <Card
                  style={{
                    height: 400,
                    width: "100%",
                    // flex: 1,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 10,
                      // backgroundColor: "yellow",
                      // justifyContent: "center",

                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 50,
                        backgroundColor: "lightgray",
                        marginBottom: 10,
                      }}
                    ></div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // backgroundColor: "red",
                      }}
                    >
                      <h4
                        style={{
                          textAlign: "center",
                        }}
                      >
                        {selectedRow
                          ? `${selectedRow.title} ${selectedRow.staff_name}`
                          : "AKAMPA DARLINGTON"}
                      </h4>
                      <h6>
                        {selectedRow ? `${selectedRow.role}` : `LECTURER`}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <Row
                      style={{
                        padding: 5,
                        paddingLeft: 10,

                        // backgroundColor: "red",
                      }}
                    >
                      <Col>Staff Id</Col>
                      <Col>
                        : {selectedRow ? selectedRow.staff_id : "NUA213"}
                      </Col>
                    </Row>
                    <Row
                      style={{
                        padding: 5,
                        paddingLeft: 10,
                        // backgroundColor: "red",
                      }}
                    >
                      <Col className="text-ellipsis">Monthly Payment</Col>
                      <Col>: 2,000,000 UGX</Col>
                    </Row>
                    <Row
                      style={{
                        padding: 5,
                        paddingLeft: 10,
                        // backgroundColor: "red",
                      }}
                    >
                      <Col className="text-ellipsis">Gendar</Col>
                      <Col>: Male</Col>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col
                lg={9}
                style={{
                  // flex: 1,
                  height: "80vh",
                  overflowY: "scroll",
                  overflowX: "hidden",
                  margin: 0,
                  paddingRight: 0,
                }}
              >
                <Card>
                  <div
                    style={{
                      padding: 10,
                    }}
                  >
                    <Row>
                      <ExamCard
                        title={"Total Lectures Taught"}
                        total={
                          selectedRow
                            ? ld.filter(
                                selectedRow.lectures,
                                (lecture) => lecture.started_at
                              ).length
                            : "20"
                        }
                        backgroundColor=" bg-primary-gradient"
                      />
                      <ExamCard
                        title={"Total Lectures Missed"}
                        total={
                          selectedRow
                            ? ld.filter(
                                selectedRow.lectures,
                                (lecture) => !lecture.started_at
                              ).length
                            : 34
                        }
                        backgroundColor=" bg-danger-gradient"
                      />
                      <ExamCard
                        title={"Total Hours Worked"}
                        total={
                          selectedRow ? getDuration(selectedRow.lectures) : 20
                        }
                        backgroundColor=" bg-info-gradient"
                      />
                      <ExamCard
                        title={"Productivity"}
                        total={
                          selectedRow
                            ? getProductivity(selectedRow.lectures)
                            : `20.47%`
                        }
                        backgroundColor="bg-success-gradient"
                      />
                    </Row>

                    <h5
                      style={{
                        marginBottom: 10,
                        textTransform: "capitalize",
                      }}
                    >
                      {selectedRow
                        ? `${selectedRow.title} ${selectedRow.staff_name}`
                        : "Mr.Darlington"}
                      's Weekly Lectures in the Month of{" "}
                      {getMonthName(selectedDate)}
                    </h5>
                    {Array.from(
                      {
                        length: generateWeeksAndDatesInMonth(
                          yr,
                          selectedDate ? selectedDate.getMonth() + 1 : 8
                        ).length,
                      },
                      (dates, index) => {
                        const dates1 = generateWeeksAndDatesInMonth(
                          yr,
                          selectedDate ? selectedDate.getMonth() + 1 : 8
                        )[index];

                        // console.log(
                        //   "dates",
                        //   generateWeeksAndDatesInMonth(
                        //     yr,
                        //     selectedDate ? selectedDate.getMonth() + 1 : 8
                        //   )[index]
                        // );

                        return (
                          <Accordion className="mb-3" key={index}>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>
                                Week {index + 1}
                              </Accordion.Header>

                              <Accordion.Body>
                                {dates1.map((d) => {
                                  const dateObj = new Date(d);
                                  const day = dateObj.getDay();

                                  // console.log(
                                  //   "selected Row",
                                  //   selectedRow.lectures
                                  // );
                                  // console.log(d, day.toString());

                                  const weekLectures = selectedRow
                                    ? ld.filter(selectedRow.lectures, {
                                        date: d,
                                      })
                                    : [];

                                  // console.log("the lectures", weekLectures);

                                  if (weekLectures.length === 0) {
                                    return null;
                                  } else {
                                    return (
                                      <div
                                        style={{
                                          borderLeft: "2px solid blue",
                                          padding: "10px",
                                          marginBottom: 10,
                                          // backgroundColor: "yellow",
                                        }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: 5,
                                            backgroundColor: "#f1f3f4",

                                            // marginBottom: 20,
                                          }}
                                        >
                                          <div>{dateObj.toDateString()}</div>
                                          {/* 
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              // backgroundColor: "red",
                                              width: "auto",
                                            }}
                                          >
                                            <div
                                              style={{
                                                marginLeft: 10,
                                              }}
                                            >
                                              <div>
                                                signed in at:{" "}
                                                <strong>7:00 AM</strong>
                                              </div>
                                            </div>

                                            <div
                                              style={{
                                                marginLeft: 10,
                                              }}
                                            >
                                              <div>
                                                signed out at:{" "}
                                                <strong>7:00 PM</strong>
                                              </div>
                                            </div>
                                          </div> */}

                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              // backgroundColor: "red",
                                              width: "auto",
                                            }}
                                          >
                                            <Button
                                              variant="outline-primary"
                                              onClick={() =>
                                                setGraphVisible(!graphVisible)
                                              }
                                              style={{
                                                // height: 20,
                                                alignSelf: "center",
                                                // width: 150,
                                                // marginTop: 5,
                                                padding: 10,
                                                marginLeft: 10,
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                              }}
                                            >
                                              Show Graph
                                            </Button>
                                            <Button
                                              variant="outline-primary"
                                              style={{
                                                // height: 20,
                                                alignSelf: "center",
                                                // width: 100,
                                                marginLeft: 10,
                                                padding: 10,
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                              }}
                                            >
                                              Export
                                            </Button>
                                          </div>
                                        </div>

                                        <Card.Body
                                          style={{
                                            marginTop: 10,
                                            padding: 0,
                                            backgroundColor: "#fff",
                                            // marginBottom: 10,
                                          }}
                                        >
                                          {!graphVisible ? (
                                            <Table
                                              responsive
                                              hover
                                              style={{
                                                padding: 10,
                                                // backgroundColor: "red",
                                                width: "100%",
                                                marginBottom: 5,
                                              }}
                                            >
                                              <thead>
                                                <tr>
                                                  <th>Course Unit</th>

                                                  <th className="text-ellipsis">
                                                    Total Hours Worked
                                                  </th>
                                                  {/* <th className="text-ellipsis">
                                                    Average Activity
                                                  </th>

                                                  <th className="text-ellipsis">
                                                    Total Hours Lost
                                                  </th> */}
                                                  <th className="text-ellipsis">
                                                    Total Students Present
                                                  </th>
                                                  <th className="text-ellipsis">
                                                    Total Students Absent
                                                  </th>
                                                </tr>
                                              </thead>

                                              <tbody
                                                style={{
                                                  padding: 0,
                                                }}
                                              >
                                                <tr>
                                                  {/* <td colSpan={4} className="text-center">
                          <div>Table is Empty</div>
                        </td> */}
                                                </tr>
                                                {weekLectures.map((lec) => {
                                                  if (!lec.started_at) {
                                                    return (
                                                      <tr>
                                                        <td className="text-ellipsis">
                                                          {lec.course_unit_name}
                                                        </td>

                                                        <td
                                                          colSpan={5}
                                                          style={{
                                                            color: "red",
                                                          }}
                                                        >
                                                          Not Taught
                                                        </td>
                                                      </tr>
                                                    );
                                                  } else {
                                                    return (
                                                      <tr>
                                                        <td
                                                          className="text-ellipsis"
                                                          style={{
                                                            color: "green",
                                                          }}
                                                        >
                                                          {lec.course_unit_name}
                                                        </td>

                                                        <td>
                                                          {getSingleLectureDuration(
                                                            lec
                                                          )}
                                                        </td>
                                                        {/* <td>
                                                          <div className="vertical-center ">
                                                            <ProgressBar
                                                              style={{
                                                                alignSelf:
                                                                  "center",
                                                                width: 100,
                                                                marginRight: 10,
                                                              }}
                                                              now={25}
                                                            />
                                                            <div>88%</div>
                                                          </div>
                                                        </td> */}

                                                        {/* <td>3h 7m</td> */}
                                                        <td>
                                                          {
                                                            lec
                                                              .presentStudents[0]
                                                              .count
                                                          }
                                                        </td>
                                                        <td>
                                                          {Math.abs(
                                                            lec
                                                              .enrolledStudents[0]
                                                              .count -
                                                              lec
                                                                .presentStudents[0]
                                                                .count
                                                          )}
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                })}
                                                <tr>
                                                  <td
                                                    // colSpan={2}
                                                    style={{
                                                      textAlign: "right",
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Total Hrs
                                                  </td>
                                                  <td>
                                                    {getDuration(weekLectures)}
                                                  </td>
                                                  {/* <td
                                                    // colSpan={3}
                                                    style={{
                                                      textAlign: "right",
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    Total
                                                  </td>
                                                  <td colSpan={3}>23:40 hr</td> */}
                                                </tr>
                                              </tbody>
                                            </Table>
                                          ) : (
                                            <DataAttr />
                                          )}
                                        </Card.Body>
                                      </div>
                                    );
                                  }

                                  //   return (
                                  //   <h2>{d}</h2>
                                  // )
                                })}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        );
                      }
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </Modal>
      </div>
    </>
  );
});

export default LectureTableComponent;
