import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
  ProgressBar,
  Accordion,
} from "react-bootstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";
import "./lectureReport.css";
import LectureTableComponent from "./LectureTableComponent";
import dashboardApi from "../../../../api/dashboardApi";

//Data Attributes
// export const COLUMNS = [
//   {
//     Header: "FIRST NAME",
//     accessor: "FNAME",
//     className: "wd-15p border-bottom-0",
//   },
//   {
//     Header: "LAST NAME",
//     accessor: "LNAME",
//     className: "wd-15p border-bottom-0 ",
//   },
//   {
//     Header: "POSITION",
//     accessor: "POSITION",
//     className: "wd-15p border-bottom-0 ",
//   },
//   {
//     Header: "	START DATE",
//     accessor: "START",
//     className: "wd-15p border-bottom-0 ",
//   },
//   {
//     Header: "SALARY",
//     accessor: "SALARY",
//     className: "wd-15p border-bottom-0 ",
//   },
//   {
//     Header: "E-MAIL",
//     accessor: "MAIL",
//     className: "wd-15p border-bottom-0 ",
//   },
// ];

const getMonth = (month_id) => {
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return months[month_id];
};

const campus = [
  { value: "1", label: "MAIN" },
  { value: "2", label: "KAMPALA" },
];

const sem = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

const years = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
];

const schools = [
  {
    value: { id: "1", alias: "SCI" },
    label: "School of Computing and Informatics",
  },
  {
    value: { id: "2", alias: "SBA" },
    label: "School of Business Administration",
  },
  { value: { id: "3", alias: "SLAW" }, label: "School of Law" },
  { value: { id: "4", alias: "SEDU" }, label: "School of Education" },
  { value: { id: "5", alias: "SOSS" }, label: "School of social sciences" },
  {
    value: { id: "6", alias: "SCIAD" },
    label: "School of Commercial Industrial Art and Design",
  },
  { value: { id: "7", alias: "SCOS" }, label: "School of Science " },
];

function LectureReport() {
  const [monthYear, setmonthYear] = React.useState(new Date());
  const [selectedCampus, setSelectedCampus] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [selectedYr, setSelectedYr] = useState();
  const [selectedSem, setSelectedSem] = useState();
  const [display, setDisplay] = useState("");
  const [lectureData, setLectureData] = useState([]);
  const [loading, setLoading] = useState();

  const renderMonthContent = (month, shortMonth, longMonth) => {
    const tooltipText = `Tooltip for month: ${longMonth}`;
    return <div>{shortMonth}</div>;
  };

  const loadData = async () => {
    console.log("the data", {
      school_id: selectedSchool.value.id,
      campus: selectedCampus.value,
      month: monthYear.getMonth() + 1,
      year: selectedYr.value,
      sem: selectedSem.value,
    });
    const data = {
      school_id: selectedSchool.value.id,
      campus: selectedCampus.value,
      month: monthYear.getMonth() + 1,
      year: selectedYr.value,
      sem: selectedSem.value,
    };
    setLoading(true);

    const res = await dashboardApi.getLectureReport(data);
    setLoading(false);

    // console.log("response", res.data);
    setLectureData(res.data);

    setDisplay(
      `Lecture Report of ${
        selectedSchool.value.alias
      } in the month of ${getMonth(monthYear.getMonth())} ${selectedYr.value}`
    );
  };

  return (
    <>
      <div>
        <h5
          style={{
            marginBottom: 20,
          }}
        >
          Lecture Reports
        </h5>
        {/* <Pageheader titles="Forms" /> */}
        <div>
          <Row
            className="row-sm center"
            style={{
              // backgroundColor: "red",
              marginBottom: 20,
            }}
          >
            <Col lg={2}>
              <label className="lb">Campus</label>
              {/* <Form.Control
                  aria-describedby="basic-addon1"
                  aria-label="Username"
                  className=""
                  placeholder="Username"
                  type="text"
                /> */}
              <Select
                classNamePrefix="Select-sm"
                value={selectedCampus}
                onChange={(value) => setSelectedCampus(value)}
                options={campus}
                placeholder="Campus"
              />

              {/* <!-- input-group --> */}
            </Col>
            <Col lg={3}>
              <label className="lb">School</label>
              <Select
                classNamePrefix="Select-sm"
                value={selectedSchool}
                onChange={(value) => setSelectedSchool(value)}
                options={schools}
                placeholder="Select School"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Acc Year</label>
              <Select
                classNamePrefix="Select-sm"
                value={selectedYr}
                onChange={(value) => setSelectedYr(value)}
                options={years}
                placeholder="Select Acc/yr"
              />
              {/* <!-- input-group --> */}
            </Col>
            <Col lg={2}>
              <label className="lb">Sem</label>
              <Select
                classNamePrefix="Select-sm"
                value={selectedSem}
                onChange={(value) => setSelectedSem(value)}
                options={sem}
                placeholder="Select Sem"
              />
              {/* <!-- input-group --> */}
            </Col>
            <Col lg={2}>
              <label className="lb">Month</label>

              <DatePicker
                selected={monthYear}
                className="form-control"
                placeholderText="Month"
                renderMonthContent={renderMonthContent}
                onChange={(date) => {
                  setmonthYear(date);
                }}
                showMonthYearPicker
                dateFormat="MM/yyyy"
              />

              {/* <!-- input-group --> */}
            </Col>
            <Col
              lg={1}
              // className="d-flex justify-content-center align-items-end"
              style={{
                display: "flex",
                // backgroundColor: "red",
                // alignItems: "flex-end",
                justifyContent: "flex-end",
                // padding: 0,
              }}
            >
              <Button
                onClick={loadData}
                style={{
                  // height: 20,
                  alignSelf: "flex-end",
                  width: "100%",
                  marginBottom: 3,
                  padding: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                }}
              >
                Load{" "}
              </Button>
              {/* <!-- input-group --> */}
            </Col>
          </Row>
        </div>
        <div>
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 0,
            }}
          >
            {loading ? (
              <h4
                style={{
                  textAlign: "center",
                  padding: 20,
                }}
              >
                Loading...
              </h4>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // backgroundColor: "red",
                    padding: 10,
                  }}
                >
                  <div>
                    <h5
                      style={{
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {display}
                    </h5>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      // backgroundColor: "red",
                      width: "auto",
                    }}
                  >
                    <Button
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
                      View Details
                    </Button>
                    <Button
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

                <hr
                  style={{
                    padding: 0,
                    margin: 0,
                  }}
                />
                {/* <Card.Footer>Card footer</Card.Footer> */}
                <Card.Body
                  style={{
                    padding: 10,
                  }}
                >
                  <LectureTableComponent
                    data={lectureData}
                    yr={selectedYr ? selectedYr.value : null}
                    selectedDate={monthYear}
                  />
                </Card.Body>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default LectureReport;
