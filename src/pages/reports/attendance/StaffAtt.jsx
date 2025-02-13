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
// import "react-datepicker/dist/react-datepicker.css";
import dashboardApi from "../../../../api/dashboardApi";
import _ from "lodash";

import "../lectures/lectureReport.css";
import DaysComponent from "./DaysComponent";

//Data Attributes

function getFormattedDays(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const formattedDays = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const formattedDate =
      date.toLocaleString("en-US", { weekday: "short" }) +
      " " +
      date.toLocaleString("en-US", { day: "2-digit" });
    formattedDays.push(formattedDate);
  }

  return formattedDays;
}

function getSundays(formattedDays) {
  return formattedDays.filter((day) => {
    const date = new Date(day);
    return date.getDay() === 0; // 0 corresponds to Sunday
  });
}

const renderMonthContent = (month, shortMonth, longMonth) => {
  const tooltipText = `Tooltip for month: ${longMonth}`;
  return <div>{shortMonth}</div>;
};

function StaffAtt() {
  const [monthYear, setmonthYear] = React.useState(new Date());
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState();

  // const year = 2023;
  // const month = 8; // August (1-based index)
  // console.log(monthYear.getMonth());
  const [year, setYear] = useState(2023);
  const [month, setmonth] = useState(2);
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(year, month, 0).getDate()
  );

  const formattedDays = getFormattedDays(year, month);
  // const daysInMonth = new Date(year, month, 0).getDate();
  const sundays = getSundays(formattedDays);
  let weekends = 0;
  let present = 0;
  let absent = 0;

  const getAtt = async () => {
    setStaffData();
    setDaysInMonth(
      new Date(monthYear.getFullYear(), monthYear.getMonth() + 1, 0).getDate()
    );
    setYear(monthYear.getFullYear());
    setmonth(monthYear.getMonth() + 1);
    setLoading(true);
    const res = await dashboardApi.getStaffGateAttendance(
      monthYear.getMonth() + 1,
      monthYear.getFullYear()
    );
    setLoading(false);

    console.log("data", res.data);
    setStaffData(res.data);
  };

  // console.log("formatted days", formattedDays);
  return (
    <>
      <div>
        <h5
          style={{
            marginBottom: 20,
          }}
        >
          Staff Attendence Report
        </h5>
        {/* <Pageheader titles="Forms" /> */}
        <div>
          <Row
            className="row-sm center"
            style={
              {
                // backgroundColor: "red",
              }
            }
          >
            {/* <Col lg={4}>
              <label className="lb">Campus</label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-describedby="basic-addon1"
                  aria-label="Username"
                  className=""
                  placeholder="Username"
                  type="text"
                />
              </InputGroup>
           
            </Col> */}

            <Col lg={4}>
              <label className="lb">Month</label>
              <InputGroup className="mb-3">
                {/* <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  className="rounded-0"
                  type="text"
                /> */}

                <DatePicker
                  selected={monthYear}
                  className="form-control"
                  renderMonthContent={renderMonthContent}
                  onChange={(date) => {
                    setmonthYear(date);
                    // console.log("date", date);
                  }}
                  showMonthYearPicker
                  dateFormat="MM/yyyy"
                />
              </InputGroup>
              {/* <!-- input-group --> */}
            </Col>
            <Col lg={1} className="d-flex justify-content-center">
              <Button
                onClick={getAtt}
                style={{
                  // height: 20,
                  alignSelf: "center",
                  width: "100%",
                  marginTop: 5,
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
                      Report
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
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <div className="col-md-offset-8 col-md-4">
                      <Table className="table table-condensed table-bordered text-dark text-center">
                        <tbody>
                          <tr
                            style={{
                              padding: 0,
                            }}
                          >
                            <td
                              style={{
                                padding: 5,
                              }}
                            >
                              <strong>Weekends :</strong> W
                              {/* <span class="visible-print">W</span> */}
                            </td>
                            <td
                              style={{
                                padding: 5,
                              }}
                            >
                              <strong>Present :</strong>{" "}
                              {/* <i className="far fa-check-circle hidden-print text-success"></i> */}
                              <i
                                class="bi bi-check-circle-fill text-success"
                                style={{
                                  fontWeight: "bolder",
                                }}
                              ></i>
                              {/* <span class="visible-print">P</span> */}
                            </td>
                            <td
                              style={{
                                padding: 5,
                              }}
                            >
                              <strong>Absent : </strong>{" "}
                              {/* <i className="far fa-times-circle hidden-print text-danger"></i>
                               */}
                              <i
                                class="bi bi-x-circle-fill text-danger"
                                style={{
                                  fontWeight: "bolder",
                                }}
                              ></i>
                              {/* <span class="visible-print">A</span> */}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                  {/* <DaysComponent
                    year={year}
                    month={month}
                    staffData={staffData}
                  /> */}
                  <DaysComponent
                    year={year}
                    month={month}
                    staffData={staffData}
                  />
                </Card.Body>
              </>
            )}
          </Card>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default StaffAtt;
