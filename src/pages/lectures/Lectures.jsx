import React, { useCallback, useRef, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer, toast } from "react-toastify";
import ReactECharts from "echarts-for-react";
import "./lecture_styles.css";
import Chart from "react-apexcharts";
// import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { AgGridReact } from "ag-grid-react";
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
import Modal from "react-modal";
import { Nav, Tab } from "react-bootstrap";
// import { ModuleRegistry } from "@ag-grid-community/core";
// import { ExcelExportModule } from "@ag-grid-enterprise/excel-export";

// ModuleRegistry.registerModules([ExcelExportModule]);
import Pageheader from "../../Components/Layouts/Pageheader/Pageheader";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import lecturesApi from "../../../api/lecturesApi";
import LectureDetails from "./LectureDetails";

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

const study_times = [
  { value: "DAY", label: "DAY" },
  { value: "WEEKEND", label: "WEEKEND" },
  { value: "DISTANCE", label: "DISTANCE" },
  { value: "MASTERS", label: "MASTERS" },
];

const campus = [
  { value: "MAIN", label: "MAIN" },
  { value: "KAMPALA", label: "KAMPALA" },
];

const schools = [
  { value: "SCI", label: "SCI" },
  { value: "SBA", label: "SBA" },
  { value: "SLAW", label: "SLAW" },
  { value: "SEDU", label: "SEDU" },
  { value: "SOSS", label: "SOSS" },
  { value: "SCIAD", label: "SCIAD" },
  { value: "SCOS", label: "SCOS" },
];

const Single = [
  { value: "Volvo", label: "Volvo" },
  { value: "Saab", label: "Saab" },
  { value: "Mercedes", label: "Mercedes" },
  { value: "Audi", label: "Audi" },
];

const colData = [
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
  {
    id: "1",
    day: "Monday",
    course_unit: "Survey of programming languages",
    session: "Morning",
    date: "2022-01-02",
    lecturer: "Mr Jude Lubega",
  },
];

const columns = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    field: "day",
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Course Unit",
    field: "course_unit_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Session",
    field: "session_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  {
    field: "date",
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
    valueFormatter: (params) => {
      // const date = new Date(params.value);

      const dateOnly = params.value.slice(0, 10);
      const newDateObj = new Date(dateOnly);
      newDateObj.setDate(newDateObj.getDate() + 1);
      const newDate = newDateObj.toISOString().slice(0, 10);
      return newDate;
      // return date.toLocaleDateString();
    },
  },
  {
    headerName: "lecturer",
    field: "staff_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
];

const columns2 = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    field: "day",
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Course Unit",
    field: "course_unit_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Session",
    field: "session_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  {
    field: "date",
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
    valueFormatter: (params) => {
      // const date = new Date(params.value);
      const dateOnly = params.value.slice(0, 10);
      return dateOnly;
      // return date.toLocaleDateString();
    },
  },
  {
    headerName: "lecturer",
    field: "staff_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
];

const lecturerCol = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    field: "lecturer_name",
    headerName: "Lecturer Name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    // width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Attended",

    field: "course_unit_name",
    valueGetter: (params) => params.data.attended.length,
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Missed",
    field: "session_name",
    valueGetter: (params) => params.data.missed.length,
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },

  {
    headerName: "Percentage(%)",
    field: "session_name",
    valueGetter: (params) =>
      (Math.round(
        (params.data.attended.length /
          (params.data.attended.length + params.data.missed.length)) *
          100
      ) *
        10) /
      10,
    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
];

const lectureHeaders = ["Attended", "Missed", "Analysis"];

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

function Lectures() {
  const gridRef = useRef();
  const gridRef2 = useRef();
  const gridRef3 = useRef();
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());
  const [selectedSchool, setSelectedSchool] = useState();
  const [selectedCampus, setSelectedCampus] = useState();
  const [tableData, setTableData] = useState([]);
  const [attended, setAttended] = useState([]);
  const [missed, setMissed] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [dataFromServer, setDataFromServer] = useState();
  const [xAxisValues, setXAxisValues] = useState([]);
  const [attendedGraph, setAttendedGraph] = useState([]);
  const [missedGraph, setMissedGraph] = useState([]);
  const [loading, setLoading] = useState(false);
  const [graphType, setGraphType] = useState("bar");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const lecturer_names = lecturers.map((lecturer) => lecturer.lecturer_name);

  const missedLecturesByLecturer = lecturers.map(
    (lecturer) => lecturer.missed.length
  );

  const attendedLecturesByLecturer = lecturers.map(
    (lecturer) => lecturer.attended.length
  );

  const pieChartData = lecturers.map((lecturer) => ({
    value:
      (Math.round(
        (lecturer.attended.length /
          (lecturer.attended.length + lecturer.missed.length)) *
          100
      ) *
        10) /
      10,

    name: lecturer.lecturer_name,
  }));

  console.log("piechart data", pieChartData);

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 9999,
    },
    content: {
      // top: modalIsFullscreen ? 0 : '50%',
      // left: modalIsFullscreen ? 0 : '50%',
      // right: modalIsFullscreen ? 0 : 'auto',
      // bottom: modalIsFullscreen ? 0 : 'auto',
      // transform: modalIsFullscreen ? 'none' : 'translate(-50%, -50%)',
      // width: modalIsFullscreen ? '100%' : '80%',
      // height: modalIsFullscreen ? '100%' : 'auto',
      // maxWidth: modalIsFullscreen ? '100%' : 'none',
      // maxHeight: modalIsFullscreen ? '100%' : 'none',
      border: "none",
      borderRadius: 0,
      // padding: modalIsFullscreen ? 0 : '20px',
      // overflow: modalIsFullscreen ? 'auto' : 'visible',
      background: "#fff",
      position: "absolute",
    },
  };

  // console.log(
  //   "lecturer names",
  //   lecturers.map((lecturer) => lecturer.lecturer_name)
  // );

  // console.log(
  //   "attended",
  //   lecturers.map((lecturer) => lecturer.attended.length)
  // );

  // console.log(
  //   "missed",
  //   lecturers.map((lecturer) => lecturer.missed.length)
  // );

  const option = {
    legend: {
      // top: "bottom",

      type: "scroll",
      orient: "vertical",
      right: 50,
      top: 40,
      bottom: 20,
    },
    title: {
      text: "Lecturers with their respective pecentage",
      subtext: "FROM 1/03/2023 T0 21/03/2023 SBA - MAIN",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Lecturer",
        type: "pie",
        radius: "55%",
        center: ["40%", "50%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        // data: [
        //   { value: 40, name: "rose 1" },
        //   { value: 38, name: "rose 2" },
        //   { value: 32, name: "rose 3" },
        //   { value: 30, name: "rose 4" },
        //   { value: 28, name: "rose 5" },
        //   { value: 26, name: "rose 6" },
        //   { value: 22, name: "rose 7" },
        //   { value: 18, name: "rose 8" },
        // ],

        data: pieChartData,
      },
    ],
  };

  const pieChartOptions2 = {
    legend: {
      // top: "bottom",

      type: "scroll",
      orient: "vertical",
      right: 50,
      top: 40,
      bottom: 20,
    },
    title: {
      text: "General Overview of Attended and Missed Lectures in SBA",
      subtext: "FROM 1/03/2023 T0 21/03/2023 SBA - MAIN",
      left: "center",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Lectures",
        type: "pie",
        radius: "55%",
        center: ["40%", "50%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        data: [
          { value: attended.length, name: "attended lectures" },
          { value: missed.length, name: "missed lectures" },
        ],
        color: ["#00ff00", "#ff0000"],
      },
    ],
  };

  const options = {
    chart: {
      type: { graphType },
    },
    xaxis: {
      type: "datetime",
      // categories: [
      //   "2023-02-20",
      //   "2023-02-21",
      //   "2023-02-22",
      //   "2023-02-23",
      //   "2023-02-24",
      // ],
      categories: xAxisValues,
    },
    yaxis: {
      min: 0,
      // max: 100,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
      curve: "smooth",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val + " Lectures";
        },
      },
    },
  };

  const options2 = {
    chart: {
      type: "bar",
    },
    xaxis: {
      type: "category",
      // categories: [
      //   "2023-02-20",
      //   "2023-02-21",
      //   "2023-02-22",
      //   "2023-02-23",
      //   "2023-02-24",
      // ],
      categories: lecturer_names,
    },
    yaxis: {
      min: 0,
      // max: 100,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
      curve: "smooth",
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val + " Lectures";
        },
      },
    },
  };

  const onBtExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const series = [
    {
      name: "Attended",
      // data: [5, 8, 34, 3, 0],
      data: attendedGraph,
      color: "#00ff00",
    },
    {
      name: "Missed",
      // data: [30, 40, 35, 50, 49],
      data: missedGraph,
      color: "#ff0000",
    },
  ];

  const series2 = [
    {
      name: "Attended",
      // data: [5, 8, 34, 3, 0],
      data: attendedLecturesByLecturer,
      color: "#00ff00",
    },
    {
      name: "Missed",
      // data: [30, 40, 35, 50, 49],
      data: missedLecturesByLecturer,
      color: "#ff0000",
    },
  ];

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);

  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const onBtShowLoading = useCallback(() => {
    gridRef.current.api.showLoadingOverlay();
    gridRef2.current.api.showLoadingOverlay();
    gridRef3.current.api.showLoadingOverlay();
  }, []);

  const onBtHide = useCallback(() => {
    gridRef.current.api.hideOverlay();
    gridRef2.current.api.hideOverlay();
    gridRef3.current.api.hideOverlay();
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

  const loadingCellRenderer = useMemo(() => {
    return customLoadingCellRenderer;
  }, []);

  const loadingCellRendererParams = useMemo(() => {
    return {
      loadingMessage: "One moment please...",
    };
  }, []);

  const gridOptions = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const gridOptions2 = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const gridOptions3 = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // gridRef.current.api.showLoadingOverlay();

    if (!selectedSchool || !selectedCampus) {
      toast("please fill all the required fields", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return;
    }

    const data = {
      startDate,
      endDate,
      school: selectedSchool.value,
      campus: selectedCampus.value,
    };

    console.log("am sending", data);

    setLoading(true);
    onBtShowLoading();

    const res = await lecturesApi.getLectureInfo(data);
    onBtHide();
    setLoading(false);

    if (!res.ok) {
      alert("Error handling your request!!!");
      console.log("error", res.data);
      return;
    }

    console.log("The data", res.data);
    setAttended(res.data.attended);
    setMissed(res.data.missedLectures);
    setLecturers(res.data.lecturers);
    setXAxisValues(res.data.graphData.xAxis);

    let attendedGraphData = [];
    let missedGraphData = [];

    for (let i = 0; i < res.data.graphData.xAxis.length; i++) {
      let found = false;
      for (let j = 0; j < res.data.graphData.details.length; j++) {
        if (
          res.data.graphData.details[j].date === res.data.graphData.xAxis[i]
        ) {
          attendedGraphData.push(res.data.graphData.details[j].data.attended);
          missedGraphData.push(res.data.graphData.details[j].data.missed);
          found = true;
          break;
        }
      }
      if (!found) {
        attendedGraphData.push(0);
        missedGraphData.push(0);
      }
    }

    // console.log("Attended graph", attendedGraphData);
    // console.log("MIssed graph", missedGraphData);

    setAttendedGraph(attendedGraphData);
    setMissedGraph(missedGraphData);

    // setTableData(colData);
  };

  const rowClickedListener = useCallback((e) => {
    console.log(e.data);
    setSelectedRow(e.data);
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
    gridRef.current.api.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  }, []);

  const onFilterTextBoxChanged2 = useCallback(() => {
    gridRef2.current.api.setQuickFilter(
      document.getElementById("filter-text-box2").value
    );
  }, []);

  const onFilterTextBoxChanged3 = useCallback(() => {
    gridRef3.current.api.setQuickFilter(
      document.getElementById("filter-text-box3").value
    );
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  return (
    <div>
      {/* <Pageheader titles="Lectures" active="lectures" /> */}
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
            <form onSubmit={handleSubmit}>
              <Row
                className="row-xs justify-content-center"
                style={{
                  // backgroundColor: "red",
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col md={3} className="">
                  <Form.Group>
                    <Form.Label
                      className="main-content-label tx-11 tx-medium tx-gray-600"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      START DATE
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <DatePicker
                      className="custom-datepicker form-control"
                      required
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      style={{ color: "red" }}
                      onChange={(date) => setStartDate(date)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="mg-t-10 mg-md-t-0">
                  <Form.Group>
                    <Form.Label
                      className="main-content-label tx-11 tx-medium tx-gray-600"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      END DATE
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <DatePicker
                      className="form-control"
                      required
                      selected={endDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => setEndDate(date)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3} className="mg-t-10 mg-md-t-0">
                  <Form.Group>
                    <Form.Label
                      className="main-content-label tx-11 tx-medium tx-gray-600"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      SCHOOL
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <Select
                      classNamePrefix="Select-sm"
                      required
                      options={schools}
                      placeholder="School"
                      value={selectedSchool}
                      onChange={(value) => {
                        setSelectedSchool(value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={2} className="mg-t-10 mg-md-t-0">
                  <Form.Group>
                    <Form.Label
                      className="main-content-label tx-11 tx-medium tx-gray-600"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      CAMPUS
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <Select
                      classNamePrefix="Select-sm"
                      required
                      options={campus}
                      value={selectedCampus}
                      onChange={(value) => {
                        setSelectedCampus(value);
                      }}
                      placeholder="Campus"
                    />
                  </Form.Group>
                </Col>
                {/* <Col md={2} className="mg-t-10 mg-md-t-0">
                  <Form.Group>
                    <Form.Label
                      className="main-content-label tx-11 tx-medium tx-gray-600"
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      STUDY TIME
                    </Form.Label>
                    
                    <Select
                      classNamePrefix="Select-sm"
                      required
                      options={study_times}
                      value={selectedStudyTime}
                      onChange={(value) => {
                        setSelectedStudyTime(value);
                      }}
                      placeholder="studytime"
                    />
                  </Form.Group>
                </Col> */}
                <Col
                  md={1}
                  // className="mg-t-10 mg-md-t-0"
                  style={{
                    marginBottom: 5,
                    alignSelf: "flex-end",
                  }}
                >
                  <Button
                    //   onClick={setLoader}
                    className="btn-primary btn-block"
                    disabled={loading}
                    type="submit"
                    style={{
                      padding: 5,
                      // width: 100,
                      fontWeight: "bold",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {loading ? "LOADING" : "LOAD"}
                    </span>
                  </Button>
                </Col>
              </Row>
            </form>
            {/* </div> */}
            {/* </Card.Body> */}

            <Tab.Container
              className="tabs-menu "
              id="left-tabs-example"
              defaultActiveKey="first"
            >
              <Nav className="profile navtab-custom panel-tabs justify-content-center">
                <Nav.Item as="li">
                  <Nav.Link className="hidden-xs" eventKey="first">
                    <i className="las la-user-circle tx-16 me-1 visible-xs"></i>
                    ATTENDED
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link className="hidden-xs" eventKey="second">
                    <i className="las la-images tx-15 me-1 visible-xs"></i>
                    MISSED
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link className="hidden-xs" eventKey="third">
                    <i className="las la-life-ring tx-16 me-1 visible-xs"></i>
                    LECTURERS
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link className="hidden-xs" eventKey="fourth">
                    <i className="las la-life-ring tx-16 me-1 visible-xs"></i>
                    ANALYSIS
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content
                className="border border-top-0 p-0  br-dark"
                style={{
                  padding: 0,
                  //   backgroundColor: "green",
                }}
              >
                <Tab.Pane eventKey="first">
                  <div
                    style={{
                      paddingTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <h5>
                      {selectedSchool && selectedCampus
                        ? `Attended Lectures in ${
                            selectedSchool.value
                          } from ${startDate.toLocaleDateString()} To ${endDate.toLocaleDateString()} - ${
                            selectedCampus.value
                          } Campus`
                        : "-"}
                    </h5>
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
                      <div
                        style={
                          {
                            //   marginRight: 5,
                          }
                        }
                      >
                        <Button
                          variant="primary"
                          onClick={() => setModalVisible(true)}
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
                      ref={gridRef}
                      gridOptions={gridOptions}
                      columnDefs={columns}
                      rowData={attended}
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
                      loadingOverlayComponentParams={
                        loadingOverlayComponentParams
                      }
                      // loadingOverlayComponent={
                      //   true ? CustomLoadingOverlay : null
                      // }
                      noRowsOverlayComponentParams={
                        noRowsOverlayComponentParams
                      }
                      pagination={true}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <div
                    style={{
                      paddingTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <h5>
                      {selectedSchool && selectedCampus
                        ? `Missed Lectures in ${
                            selectedSchool.value
                          } from ${startDate.toLocaleDateString()} To ${endDate.toLocaleDateString()} - ${
                            selectedCampus.value
                          } Campus`
                        : "-"}
                    </h5>
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
                        id="filter-text-box2"
                        placeholder="Search..."
                        onInput={onFilterTextBoxChanged2}
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
                      </div>
                    </div>
                  </div>
                  <div
                    className="ag-theme-alpine justify-content-center"
                    style={{ height: 400, paddingLeft: 10, paddingRight: 10 }}
                  >
                    <AgGridReact
                      ref={gridRef2}
                      gridOptions={gridOptions2}
                      columnDefs={columns2}
                      rowData={missed}
                      rowHeight={30}
                      headerHeight={30}
                      onCellClicked={rowClickedListener}
                      cacheQuickFilter={true}
                      rowSelection="single"
                      animateRows={true}
                      rowStyle={{ borderBottom: "1px solid #ccc" }}
                      defaultColDef={defaultColDef}
                      noRowsOverlayComponent={noRowsOverlayComponent}
                      noRowsOverlayComponentParams={
                        noRowsOverlayComponentParams
                      }
                      pagination={true}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <div
                    style={{
                      paddingTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <h5>
                      {selectedSchool && selectedCampus
                        ? `Missed and Attended Lectures by lecturer in ${
                            selectedSchool.value
                          } from ${startDate.toLocaleDateString()} To ${endDate.toLocaleDateString()} - ${
                            selectedCampus.value
                          } Campus`
                        : "-"}
                    </h5>
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
                        id="filter-text-box3"
                        placeholder="Search..."
                        onInput={onFilterTextBoxChanged3}
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
                      </div>
                    </div>
                  </div>
                  <div
                    className="ag-theme-alpine justify-content-center"
                    style={{ height: 400, paddingLeft: 10, paddingRight: 10 }}
                  >
                    <AgGridReact
                      ref={gridRef3}
                      gridOptions={gridOptions3}
                      columnDefs={lecturerCol}
                      rowData={lecturers}
                      rowHeight={30}
                      headerHeight={30}
                      onCellClicked={rowClickedListener}
                      cacheQuickFilter={true}
                      rowSelection="single"
                      animateRows={true}
                      rowStyle={{ borderBottom: "1px solid #ccc" }}
                      defaultColDef={defaultColDef}
                      noRowsOverlayComponent={noRowsOverlayComponent}
                      noRowsOverlayComponentParams={
                        noRowsOverlayComponentParams
                      }
                      pagination={true}
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="fourth">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingRight: 10,
                    }}
                  >
                    <div
                      style={{
                        paddingTop: 10,
                        paddingLeft: 10,
                        paddingRight: 10,
                      }}
                    >
                      <h5>
                        {selectedSchool && selectedCampus
                          ? `Analysis of lectures in ${
                              selectedSchool.value
                            } from ${startDate.toLocaleDateString()} To ${endDate.toLocaleDateString()} - ${
                              selectedCampus.value
                            } Campus`
                          : "-"}
                      </h5>
                    </div>

                    <div>
                      {/* <Button>Action</Button> */}
                      <ButtonGroup
                        // key={variant}
                        // className="ms-2 mt-2 mb-2"
                        style={{
                          padding: 0,
                        }}
                      >
                        <Dropdown
                          style={{
                            padding: 0,
                          }}
                        >
                          <Dropdown.Toggle
                            // variant={variant}
                            className="ripple mt-1"
                            id="dropdown-basic"
                            style={{
                              padding: 5,
                            }}
                          >
                            Action
                          </Dropdown.Toggle>
                          <Dropdown.Menu
                            style={{ margin: "0px" }}
                            className="tx-13"
                          >
                            <Dropdown.Item
                              className=""
                              href="#"
                              onClick={() => setGraphType("line")}
                            >
                              Switch to line graph
                            </Dropdown.Item>
                            <Dropdown.Item
                              className=""
                              href="#"
                              onClick={() => setGraphType("bar")}
                            >
                              Switch to bar graph
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </ButtonGroup>
                    </div>
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

                  <div>
                    {console.log("graph type", graphType)}
                    <Chart
                      options={options}
                      series={series}
                      type={graphType}
                      width="100%"
                      height={300}
                    />
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

                  {/* a piechart to show the general overview of attended vs missed */}

                  <div
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <ReactECharts
                      className="chartsh"
                      option={pieChartOptions2}
                      style={{
                        height: 450,
                      }}
                    />
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
                  {/* another chart for the lecturers */}

                  <div
                    style={{
                      paddingTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <h5>
                      {selectedSchool && selectedCampus
                        ? `Missed and Attended Lectures by lecturer in ${
                            selectedSchool.value
                          } from ${startDate.toLocaleDateString()} To ${endDate.toLocaleDateString()} - ${
                            selectedCampus.value
                          } Campus`
                        : "-"}
                    </h5>
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
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                      width: "100%",
                      // display: "flex",
                    }}
                  >
                    <div
                      style={{
                        // display: "flex",
                        // width: "100%",
                        overflowX: "auto",
                      }}
                    >
                      {console.log("graph type", graphType)}
                      <Chart
                        options={options2}
                        series={series2}
                        type="bar"
                        width="100%"
                        height={400}
                      />
                    </div>
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
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <ReactECharts
                      className="chartsh "
                      option={option}
                      style={{
                        height: 600,
                      }}
                    />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Card>
        </Col>

        <Modal
          isOpen={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          style={modalStyle}
          ariaHideApp={false}
        >
          <div style={{ position: "absolute", top: 5, right: 5 }}>
            <button
              className="modal-button"
              // onClick={handleOpenFullscreen}
            >
              Fullscreen
            </button>
            <button
              className="modal-button"
              onClick={() => setModalVisible(false)}
            >
              Close
            </button>
          </div>
          <div
            style={{
              marginTop: 20,
            }}
          >
            <LectureDetails row={selectedRow} />
          </div>
        </Modal>

        {/* <Card className="custom-card">
          <Card.Body>
            <Modal
              // size="lg"
              style={{ height: "100vh", width: "100vw" }}
              show={modalVisible}
            >
              <Modal.Header>
                <Modal.Title>Large Modal</Modal.Title>
                <Link
                  to="#"
                  as="span"
                  className="d-flex ms-auto text-dark"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  <i className="fe fe-x ms-auto"></i>
                </Link>
              </Modal.Header>

              <Modal.Body>
                <LectureDetails />
              </Modal.Body>
              <Modal.Footer>
                <Button className="ripple" variant="primary">
                  Save Changes
                </Button>
                <Button
                  className="ripple"
                  variant="secondary"
                  onClick={() => {
                    setModalVisible(false);
                  }}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card> */}
      </Row>
      <ToastContainer />
    </div>
  );
}

export default Lectures;
