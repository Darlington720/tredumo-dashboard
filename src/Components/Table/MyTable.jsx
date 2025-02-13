import React, { useRef, useCallback, useMemo } from "react";
// import "react-data-grid/lib/styles.css";
import { useState, useEffect, lazy, Suspense } from "react";
import { Button, Form } from "react-bootstrap";
// import DataGrid from "react-data-grid";
// import ReactDataGrid from "@inovua/reactdatagrid-community";
// import "ag-grid-enterprise";
// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

const demoExams = [
  {
    id: 1,
    course_unit: "Distributed Systems",
    date: "2023-06-25",
    session: "morning",
    room: "TS1",
    status: "Registered",
  },
  {
    id: 2,
    course_unit: "Automata, computability and complexity",
    date: "2023-06-25",
    session: "Evening",
    room: "TS2",
    status: "Not Registered",
  },
  {
    id: 1,
    course_unit: "Computer Math",
    date: "2023-06-25",
    session: "morning",
    room: "KH1",
    status: "Registered",
  },
];

const gridStyle = { minHeight: 350, marginTop: 10 };

function MyTable({ columns, gridRef, onFirstDataRendered }) {
  // const data = React.useMemo(() => tableData, []);
  // const gridRef = useRef();
  const [data, setData] = useState([]);
  const [isComponentLoaded, setComponentLoaded] = useState(false);

  const defaultColDef = useMemo(
    () => ({
      editable: true,
      sortable: true,
      filter: true,
      resizable: true,
    }),
    []
  );

  // useEffect(() => {
  //   // Simulating an asynchronous operation to fetch data or perform setup
  //   const loadComponent = async () => {
  //     // Simulate component loading delay
  //     await new Promise((resolve) => setTimeout(resolve, 2000));

  //     setComponentLoaded(true);
  //   };

  //   loadComponent();
  // }, []);

  const handleLoad = () => {
    setData(data);
  };

  // if (!isComponentLoaded) return <div>Loading...</div>;

  return (
    <>
      <div
        // className="p-2"
        style={{
          // marginTop: 10,
          display: "flex",
          justifyContent: "space-between",
          // paddingLeft: 10,
          // paddingRight: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // padding: 5,
          }}
        >
          <Form.Control
            className="mb-3"
            style={{
              width: 300,
              alignSelf: "flex-end",
            }}
            type="text"
            id="filter-text-box"
            placeholder="Search..."
            // onInput={onFilterTextBoxChanged}
          />
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={
              {
                //   marginRight: 5,
              }
            }
          >
            <Button
              variant="primary"
              // className=""
              // onClick={onBtExport}
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                // marginRight: 5,
                // marginLeft: 5,
                alignItems: "center",
              }}
            >
              <i
                className="si si-list"
                style={{
                  marginRight: 5,
                  marginLeft: 5,
                }}
              ></i>
              <span>Export to Excel</span>
            </Button>
          </div>
          {/* <div
            style={
              {
                //   marginRight: 5,
              }
            }
          >
            <Button
              variant="primary"
              // onClick={() => setModalVisible(true)}
              // className=""
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                alignItems: "center",
              }}
            >
              <i
                className="si si-list"
                style={{
                  marginRight: 5,
                }}
              ></i>
              <span>View Lecture Details</span>
            </Button>
          </div>
          <div
            style={{
              marginRight: 5,
              marginLeft: 5,
            }}
          >
            <Button
              variant="warning"
              //   className="btn-icon"
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <i className="mdi mdi-refresh"></i>
              <span>RELOAD</span>
            </Button>
          </div> */}
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ height: 350, width: "100%" }}>
        {/* <AgGridReact
          ref={gridRef}
          columnDefs={columns}
          // rowData={tableData}
          rowData={demoExams}
          rowSelection="single"
          animateRows={true}
          defaultColDef={defaultColDef}
          // scrollbarWidth={50}
          alwaysShowVerticalScroll={true}
          alwaysShowHorizontalScroll={true}
          onFirstDataRendered={onFirstDataRendered}
          pagination={true}
          autoGroupColumnDef={{
            headerName: "Id",
            field: "id",
            cellRendererParams: {
              checkbox: true,
            },
          }}
        /> */}
      </div>
    </>
  );
}

export default MyTable;
