import React, { useState } from "react";
import { Row, Col, Button, Spinner, Form, Card } from "react-bootstrap";
import Select from "react-select";
import Chart from "react-apexcharts";
import InvigilatorsTable from "./invigilatorsTable";

const campus = [
  { value: "1", label: "MAIN" },
  { value: "2", label: "KAMPALA" },
];

const exams = [
  { value: "1", label: "FEB 2024 EXAMS" },
  { value: "2", label: "AUG 2023 EXAMS" },
];

const ExamCard = ({ title, backgroundColor, total, onClick }) => {
  return (
    // <Col xl={3} lg={6} md={6} xm={12}>
    <Card
      className={`overflow-hidden sales-card ${backgroundColor}`}
      style={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="px-3 pt-2 pb-1 pt-0">
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            // paddingBottom: 10,
            // marginBottom: 10,
          }}
        >
          <h6 className="tx-12 text-white">{title}</h6>
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
    // </Col>
  );
};

const initialSeries = [0];
const initialOptions = {
  chart: {
    width: 500,
    height: 500,
    responsive: "true",
    reset: "true",
    type: "radialBar",
    offsetX: 0,
    offsetY: 0,
  },
  plotOptions: {
    radialBar: {
      responsive: "true",
      startAngle: -135,
      endAngle: 135,
      size: 300,
      imageWidth: 200,
      imageHeight: 200,

      track: {
        strokeWidth: "80%",
        background: "#ecf0fa",
      },
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        bottom: 0,
        blur: 3,
        opacity: 0.5,
      },
      dataLabels: {
        name: {
          fontSize: "16px",
          offsetY: 30,
        },
        hollow: {
          size: "100%",
        },
        value: {
          offsetY: -10,
          fontSize: "22px",
          formatter: function (val) {
            return val + "%";
          },
        },
      },
    },
  },
  colors: ["#0047aa"],
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.6,
      gradientToColors: "#0082a3",
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100],
    },
  },
  stroke: {
    dashArray: 4,
  },
  labels: [""],
};

function InvigilatorsReport() {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h4 className="tx-24">Invigilator Report</h4>
      </div>
      <div>
        <Form
        // onSubmit={handleSubmit}
        >
          <Row
            className="row-sm center"
            style={{
              // backgroundColor: "red",
              marginBottom: 20,
            }}
          >
            <Col lg={2}>
              <label className="lb">Campus</label>

              <Select
                classNamePrefix="Select-sm"
                required
                // value={selectedCampus}
                // onChange={(value) => setSelectedCampus(value)}
                options={campus}
                placeholder="Campus"
              />
            </Col>
            <Col lg={3}>
              <label className="lb">Exam</label>
              <Select
                classNamePrefix="Select-sm"
                required
                // value={selectedSchool}
                // onChange={(value) => setSelectedSchool(value)}
                options={exams}
                placeholder="Select Exam"
              />
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
                // onClick={loadData}
                type="submit"
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
                {loading ? (
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
                  "Load"
                )}
              </Button>
              {/* <!-- input-group --> */}
            </Col>
          </Row>
        </Form>
      </div>

      <Row>
        <Col md={9}>
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 0,
            }}
          >
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
                  {"Invigilators for the FEB 2024 exams"}
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
                  disabled={true}
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
                  disabled={true}
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
              <InvigilatorsTable data={[]} yr={null} selectedDate={null} />
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 15,
            }}
          >
            <h5>Rooms and sessions</h5>
            <ExamCard
              title={"TOTAL NUMBER OF SESSIONS"}
              total={20}
              backgroundColor="bg-success-gradient"
              onClick={() => console.log("The sessions")}
            />

            <ExamCard
              title={"TOTAL NUMBER OF ROOMS"}
              total={20}
              backgroundColor="bg-info-gradient"
              onClick={() => console.log("View room details")}
            />

            {/* <Chart
              options={initialOptions}
              series={initialSeries}
              type="radialBar"
              height={300}
            /> */}
          </Card>

          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 10,
            }}
          >
            <h5>Invigilators summary</h5>
            <ExamCard
              title={"ACTIVE INVIGILATORS"}
              total={20}
              backgroundColor="bg-success-gradient"
            />
            <ExamCard
              title={"INACTIVE INVIGILATORS"}
              total={34}
              backgroundColor="bg-warning-gradient"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default InvigilatorsReport;
