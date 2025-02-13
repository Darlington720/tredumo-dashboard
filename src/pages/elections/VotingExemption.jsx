import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Spinner,
  Table,
  ProgressBar,
  Pagination,
} from "react-bootstrap";
// import { toast, ToastContainer } from "react-toastify";
// import Pageheader from "../../Layouts/Pageheader/Pageheader";
import { Dropdown } from "primereact/dropdown";
import { AutoComplete } from "primereact/autocomplete";
import graduationApi from "../../../api/graduationApi";
import { useContext } from "react";
import StateContext from "../../context/context";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";

import noData from "../../../src/assets/img/svgicons/no-data.svg";
import votersApi from "../../../api/votersApi";
import urls from "../../../api/apiConstants";
import io from "socket.io-client";

const initialFormState = {
  staff_id: "",
  staff_name: "",
  title: "",
  role: "",
};

const socket = io(urls.baseUrl1);

const VotingExemption = () => {
  const stateContext = useContext(StateContext);
  const [data, setData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [studentLoading, setStudentLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [sorting, setSorting] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filtering, setFiltering] = useState("");
  const [selectedRow, setSelectedRow] = useState();
  const [reason, setReason] = useState("");
  const [exemptions, setExemptions] = useState([]);
  const [toastDisplayed, setToastDisplayed] = useState(false);

  // console.log("user", stateContext.user);

  const columns = [
    {
      header: "id",
      accessorFn: (row, i) => {
        return i + 1;
      },
      //   accessorKey: "staff_name",
    },
    {
      header: "name",
      accessorKey: "name",
      //   accessorFn: (row) => row.lectures.length,
    },
    {
      header: "Reason",
      accessorKey: "reason",
      //   accessorFn: (row) =>
      //     ld.filter(row.lectures, (lecture) => lecture.started_at).length,
    },
    {
      header: "Exempted By",
      accessorKey: "username",
      //   accessorFn: (row) =>
      //     ld.filter(row.lectures, (lecture) => lecture.started_at).length,
    },
  ];

  const search = async (event) => {
    // Timeout to emulate a network connection
    setStudentLoading(true);
    const response = await graduationApi.getStudentAutoComplete(
      event.query.toLowerCase()
    );
    setStudentLoading(false);

    if (!response.ok) {
      console.log("student error", response.data);
      return alert("Failed to get Student");
    }

    // console.log("suggestions", response.data.suggestions);
    setStudents(response.data.suggestions);
  };

  useEffect(() => {
    getExemptedStudents();
  }, []);

  const getExemptedStudents = async () => {
    const res = await votersApi.getExemptedStudents();

    if (!res.ok) {
      console.log("response", res.data);
      return alert("Failed to load exempted students");
    }

    // console.log("response", res.data);

    setExemptions(res.data.result.exemptedStudents);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // const data = {
    //   card_no: selectedItem.card_no,
    //   stu_no: selectedStudent.stdno,
    //   assigned_by: stateContext.user.stu_no,
    // };
    // console.log("this is what am saving", {
    //   stu_no: selectedStudent.stdno,
    //   reason,
    //   exempted_by:  stateContext.user.id
    // });

    setSaveLoading(true);
    const res = await votersApi.saveVoteExemptions({
      stu_no: selectedStudent.stdno,
      reason,
      exempted_by: stateContext.user.id,
    });
    setSaveLoading(false);

    if (!res.ok) {
      return alert("Failed to save vote exemption");
    }

    // console.log("response", res.data);

    setToastDisplayed(true);

    setExemptions(res.data.result.exemptedStudents);

    socket.emit("update_elligible_voters", {
      elligible_voters:
        res.data.result.elligibleVoters +
        res.data.result.exemptedStudents.length,
    });

    setSelectedStudent();
    setReason("");
  };

  useEffect(() => {
    if (!toastDisplayed) {
      toast.success(
        <p className="text-white tx-16 mb-0">Student successfully exempted</p>,
        {
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          autoClose: 2000,
          theme: "colored",
          toastId: Math.random(),
        }
      );
      setToastDisplayed(true);
    }
  }, [toastDisplayed]);

  const table = useReactTable({
    columns: columns,
    data: exemptions,
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
    <div>
      {/* <Pageheader titles="Staff" active="Add Staff" /> */}
      <ToastContainer limit={1} />
      {/* <!-- container --> */}

      {/* <!-- row --> */}

      <Row className="row-sm">
        <Col lg={5} xl={5} md={12} sm={12}>
          <Card className="box-shadow-0 ">
            <Card.Header>
              <Card.Title as="h4" className="mb-1">
                Voting Exemption
              </Card.Title>
              <p className="mb-2">Exempt Students to vote</p>
            </Card.Header>
            <Card.Body className="pt-0">
              <Form onSubmit={handleSave}>
                <div className="">
                  <Form.Group>
                    <Form.Label className="mb-2">Student</Form.Label>

                    <AutoComplete
                      field={(value) => {
                        // console.log("my value", value);
                        return `${value.name} - ${value.program_level}`;
                      }}
                      value={selectedStudent}
                      required
                      suggestions={students}
                      completeMethod={search}
                      onChange={(e) => {
                        // console.log("the value", e.value);
                        setSelectedStudent(e.value);
                      }}
                      className="p-autocomplete"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="mb-2">Reason</Form.Label>

                    <Form.Control
                      as="textarea"
                      className="mb-3"
                      name="reason"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      type="text"
                      placeholder="Type reason here"
                      rows="2"
                    />
                  </Form.Group>
                </div>
                <Button type="submit" variant="primary" className="mt-3 mb-0">
                  {saveLoading ? (
                    <Spinner
                      animation="border"
                      size="sm"
                      className=""
                      role="status"
                      aria-hidden="true"
                    >
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={7} xl={7} md={12} sm={12}>
          <Card
            style={{
              padding: 10,
            }}
          >
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
                              cell.column.columnDef.header === "Staff"
                                ? 5
                                : null,
                            // fontSize:
                            //   cell.column.columnDef.accessorKey === "staff_name"
                            //     ? 13
                            //     : 15,
                            // textAlign: "center",
                          }}
                          key={i}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
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
                        <h5 className="mg-b-10 mg-t-15 tx-18">
                          No Data Available
                        </h5>
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VotingExemption;
