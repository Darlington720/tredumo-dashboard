import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect,
} from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import ReactECharts from "echarts-for-react";
// import "./lecture_styles.css";
import Chart from "react-apexcharts";
// import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
// import { AgGridReact } from "ag-grid-react";
const { AgGridReact } = await import("ag-grid-react");
import {
  Button,
  Card,
  Col,
  Dropdown,
  Container,
  Form,
  InputGroup,
  Row,
  ButtonGroup,
} from "react-bootstrap";
// import { ModuleRegistry } from "@ag-grid-community/core";
// import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

// ModuleRegistry.registerModules([ExcelExportModule]);
import Pageheader from "../../Components/Layouts/Pageheader/Pageheader";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

import staffApi from "../../../api/staffApi";

// import "ag-grid-enterprise";
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const CustomNoRowsOverlay = () => {
//   return (
//     <div
//       className="ag-overlay-loading-center"
//       style={{ backgroundColor: "lightcoral", height: "9%" }}
//     >
//       <i className="far fa-frown"></i>
//     </div>
//   );
// };

function CustomNoRowsOverlay() {
  return (
    <div className="ag-overlay-no-rows-wrapper">
      <div className="ag-overlay-no-rows-center"></div>
    </div>
  );
}

const campus = [
  { value: "MAIN", label: "MAIN" },
  { value: "KAMPALA", label: "KAMPALA" },
];

const columns = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    width: 80,
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Staff ID",
    field: "staff_id",
    cellStyle: { borderLeft: "1px solid #ccc" },
    // width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Staff name",
    field: "staff_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
    valueFormatter: (params) => {
      // const date = new Date(params.value);
      //   console.log("params", params);
      return `${params.data.title} ${params.data.staff_name}`;
      // return date.toLocaleDateString();
    },
  },
  {
    headerName: "Role",
    field: "role",

    cellStyle: { borderLeft: "1px solid #ccc" },
    // width: 150,
    sortable: true,
    filter: true,
  },
  //   {
  //     headerName: "Temperature",
  //     field: "temperature",
  //     cellStyle: { borderLeft: "1px solid #ccc" },
  //     width: 150,
  //     sortable: true,
  //     filter: true,
  //     // valueFormatter: (params) => {
  //     //   // const date = new Date(params.value);
  //     //   const dateOnly = params.value.slice(0, 10);
  //     //   return dateOnly;
  //     //   // return date.toLocaleDateString();
  //     // },
  //   },
  //   {
  //     headerName: "Signed in By",
  //     field: "userfull_name",

  //     cellStyle: { borderLeft: "1px solid #ccc" },
  //     sortable: true,
  //     filter: true,
  //   },
];

function CustomHeader(props) {
  const { displayName } = props;
  return (
    <div
      className="ag-header-cell ag-header-group-cell"
      role="columnheader"
      style={{ borderLeft: "1px solid #ccc" }}
    >
      <div className="ag-header-cell-label">
        <span className="ag-header-cell-text">{displayName}</span>
      </div>
    </div>
  );
}

function CustomLoadingOverlay() {
  return (
    <div
      className="ag-overlay-loading-center"
      style={{ backgroundColor: "lightsteelblue", height: "9%" }}
    >
      <span>loading...</span>
    </div>
  );
}

function StaffMembers() {
  const staffGridRef = useRef();

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const onBtExport = useCallback(() => {
    staffGridRef.current.api.exportDataAsCsv();
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);

  const getAllStaff = async () => {
    // onBtShowLoading();
    const res = await staffApi.getAllStaffMembers();
    // onBtHide();
    if (!res.ok) {
      alert("Failed to get staff memebrs");
      return;
    }

    // console.log(res.data);
    setTableData(res.data);
  };

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const onBtShowLoading = useCallback(() => {
    staffGridRef.current.api.showLoadingOverlay();
  }, []);

  const onBtHide = useCallback(() => {
    staffGridRef.current.api.hideOverlay();
  }, []);

  function customLoadingCellRenderer() {
    if (loading) {
      return (
        <div className="ag-overlay-loading-wrapper">
          <div className="ag-overlay-loading-center">Loading...</div>
        </div>
      );
    } else {
      return null;
    }
  }

  // const loadLectureData = async () => {

  // }

  const gridOptions = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const rowClickedListener = useCallback((e) => {
    console.log(e.data);
  });

  const noRowsOverlayComponent = useMemo(() => {
    return CustomNoRowsOverlay;
  }, []);

  const noRowsOverlayComponentParams = useMemo(() => {
    return {
      noRowsMessageFunc: () => "Sorry - no rows! at: " + new Date(),
    };
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    staffGridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  useEffect(() => {
    getAllStaff();
  }, []);

  return (
    <div>
      <Pageheader titles="Staff" active="staff entrance" />
      {/* {console.log("Table Data", tableData)} */}
      <Row className="row-sm justify-content-center">
        <Col lg={12} md={12} className="justify-content-center">
          <Card
            className="card-body border shadow-none"
            style={{
              paddingTop: 10,
              padding: 10,
            }}
          >
            {/* <Card.Body
              style={{
                padding: 10,
              }}
            > */}
            {/* <div className="pd-0 pd-sm-0 background"> */}

            {/* </div> */}
            {/* </Card.Body> */}

            <div
              className="example"
              style={{
                marginTop: 10,
                padding: 0,
              }}
            >
              <div
                style={{
                  paddingTop: 10,
                  paddingLeft: 10,
                  paddingRight: 10,
                }}
              >
                <h5>{"All Staff Members in Nkumba University"}</h5>
              </div>

              <div
                style={{
                  width: "100%",
                  //   position: "absolute",
                  //   left: 0,
                  height: 1,
                  backgroundColor: "lightgray",
                }}
              />
              <div
                // className="p-2"
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: 10,
                  paddingRight: 10,
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
                    onInput={onFilterTextBoxChanged}
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
                      onClick={onBtExport}
                      style={{
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10,
                        marginRight: 5,
                        marginLeft: 5,
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
                      <span>View Details</span>
                    </Button>
                  </div> */}
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
                  </div>
                </div>
              </div>
              <div
                className="ag-theme-alpine justify-content-center"
                style={{
                  height: 400,
                  paddingLeft: 10,
                  paddingRight: 10,
                  width: "100%",
                }}
              >
                <AgGridReact
                  ref={staffGridRef}
                  gridOptions={gridOptions}
                  columnDefs={columns}
                  rowData={tableData}
                  rowHeight={30}
                  headerHeight={30}
                  onCellClicked={rowClickedListener}
                  cacheQuickFilter={true}
                  rowSelection="single"
                  animateRows={true}
                  rowStyle={{ borderBottom: "1px solid #ccc" }}
                  defaultColDef={defaultColDef}
                  noRowsOverlayComponent={noRowsOverlayComponent}
                  overlayNoRowsTemplate={CustomNoRowsOverlay}
                  frameworkComponents={{ customLoadingCellRenderer }}
                  // loadingOverlayComponent={customLoadingCellRenderer}

                  loadingOverlayComponent={loadingOverlayComponent}
                  loadingOverlayComponentParams={loadingOverlayComponentParams}
                  // loadingOverlayComponent={
                  //   true ? CustomLoadingOverlay : null
                  // }
                  noRowsOverlayComponentParams={noRowsOverlayComponentParams}
                  pagination={true}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
  );
}

export default StaffMembers;
