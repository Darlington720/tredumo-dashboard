import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Nav,
  ProgressBar,
  Row,
  Tab,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import ReactECharts from "echarts-for-react";
import MyTable from "../../Components/Table/MyTable";
import { useRef, useCallback } from "react";
import staffApi from "../../../api/staffApi";
import { useState } from "react";

const examsColumns = [
  // { field: "id" },
  { field: "course_unit", headerName: "Course Unit Name" },
  { field: "status", headerName: "registered", rowGroup: true, hide: true },
  { field: "session" },
  { field: "date" },
  { field: "room" },

  // { field: "room" },
];

const invColumns = [
  { field: "id" },
  { field: "invigilator_name" },
  { field: "date" },
  { field: "session" },
  { field: "room" },
];

const ExamCard = ({ title, backgroundColor, total }) => {
  return (
    // <Col xl={3} lg={6} md={6} xm={12}>
    <Card className={`overflow-hidden sales-card ${backgroundColor}`}>
      <div className="px-3 pt-3  pb-2 pt-0">
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

function BarChart() {
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
        data: ["2014", "2015", "2016", "2017", "2018", "2019"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "sales",
        type: "bar",
        barMaxWidth: 20,
        color: "#f7557a",
        emphasis: {
          focus: "series",
        },
        data: [10, 15, 9, 18, 10, 15],
      },
      {
        name: "growth",
        type: "bar",
        barMaxWidth: 20,
        color: "#285cf7",
        emphasis: {
          focus: "series",
        },
        data: [10, 14, 10, 15, 9, 25],
      },
    ],
  };

  return <ReactECharts className="chartsh " option={option} />;
}

const initialState = {
  start_date: "",
  end_date: "",
  school: {},
  campus: {},
  yr_sem: {},
};

function ExamsReport() {
  const examGridRef = useRef();
  const invGridRef = useRef();
  const [campus, setCampus] = useState([]);
  const [schools, setSchools] = useState([]);
  const [yrSem, setYrSem] = useState([]);
  const [inputForm, setInputForm] = useState(initialState);

  const onFirstDataRenderedExam = useCallback((params) => {
    examGridRef.current.api.sizeColumnsToFit();
  }, []);

  const onFirstDataRenderedInv = useCallback((params) => {
    invGridRef.current.api.sizeColumnsToFit();
  }, []);

  const getExamReportReqs = async () => {
    const res = await staffApi.examReportReqs();

    if (!res.ok) {
      return alert("Failed to fetch the requisites");
    }

    // console.log(res.data);

    let reqs = {
      schools: [],
      year_sem: [],
      campus: [],
    };

    //fitting schools with select
    res.data.result.schools.forEach((school) => {
      reqs.schools.push({
        value: school.school_id,
        label: `${school.school_name} - ${school.alias}`,
      });
    });

    const sch = res.data.result.schools.map((school) => {
      return {
        value: school.alias,
        label: `${school.school_name} - ${school.alias}`,
      };
    });

    setSchools(sch);

    //campus
    res.data.result.campus.forEach((c) => {
      reqs.campus.push({
        value: c.cam_id,
        label: c.campus_name,
      });
    });

    setCampus(reqs.campus);

    // year - sem
    res.data.result.year_sem.forEach((ys) => {
      reqs.year_sem.push({
        value: ys.ys_id,
        label: `year: ${ys.year}, sem: ${ys.sem}`,
      });
    });

    setYrSem(reqs.year_sem);
  };

  const handleLoad = async (e) => {
    e.preventDefault();
    const startD = new Date(inputForm.start_date);
    const endD = new Date(inputForm.end_date);

    const dataToBeSent = {
      start_date: startD.getFullYear - startD.getMonth + 1 - startD.getDate,
      end_date: endD.getFullYear - endD.getMonth + 1 - endD.getDate,
      school_id: inputForm.school.label,
      campus: inputForm.campus.value,
      yr_sem_id: inputForm.yr_sem.value,
    };

    console.log("sending...", dataToBeSent);
  };

  useEffect(() => {
    getExamReportReqs();
  }, []);
  return (
    <Col lg={12}>
      {/* <div className="mg-b-20">
        <MyTable />
      </div> */}
      <Card className="mg-b-20">
        <Card.Body>
          <div className="ps-0">
            <div className="main-profile-overview"></div>
            <form onSubmit={handleLoad}>
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
                <Col md={2} className="">
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
                      selected={inputForm.start_date}
                      dateFormat="dd/MM/yyyy"
                      style={{ color: "red" }}
                      onChange={(date) =>
                        setInputForm({ ...inputForm, start_date: date })
                      }
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
                      END DATE
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <DatePicker
                      className="form-control"
                      required
                      selected={inputForm.end_date}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) =>
                        setInputForm({ ...inputForm, end_date: date })
                      }
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
                      value={inputForm.school}
                      onChange={(value) => {
                        setInputForm({ ...inputForm, school: value });
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
                      value={inputForm.campus}
                      onChange={(value) => {
                        setInputForm({ ...inputForm, campus: value });
                      }}
                      placeholder="Campus"
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
                      Year Sem
                    </Form.Label>
                    {/* <Form.Control required type="text" className="mb-3" /> */}
                    <Select
                      classNamePrefix="Select-sm"
                      required
                      options={yrSem}
                      value={inputForm.yr_sem}
                      onChange={(value) => {
                        setInputForm({ ...inputForm, yr_sem: value });
                      }}
                      placeholder="Year and Sem"
                    />
                  </Form.Group>
                </Col>
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
                    // disabled={loading}
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
                      {"LOAD"}
                    </span>
                  </Button>
                </Col>
              </Row>
            </form>

            <Row className="mg-t-10">
              <Col lg={8}>
                <Tab.Container
                  className="tabs-menu "
                  id="left-tabs-example"
                  defaultActiveKey="first"
                >
                  <Nav className="profile navtab-custom panel-tabs justify-content-center">
                    <Nav.Item as="li">
                      <Nav.Link className="hidden-xs" eventKey="first">
                        <i className="las la-images tx-15 me-1 visible-xs"></i>
                        EXAMS
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                      <Nav.Link className="hidden-xs" eventKey="second">
                        <i className="las la-user-circle tx-16 me-1 visible-xs"></i>
                        INVIGILATORS
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content
                    className="border border-top-0 p-0 br-dark"
                    style={{
                      padding: 0,
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
                        {/* <h4 className="tx-15 text-uppercase mb-3">BIO Data</h4> */}
                        <MyTable
                          columns={examsColumns}
                          gridRef={examGridRef}
                          onFirstDataRendered={onFirstDataRenderedExam}
                        />
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <MyTable
                        columns={invColumns}
                        gridRef={invGridRef}
                        onFirstDataRendered={onFirstDataRenderedInv}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="third"></Tab.Pane>
                    <Tab.Pane eventKey="fourth"></Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>

              <Col
                lg={4}
                className="mg-t-20"
                style={
                  {
                    // height: 30,
                  }
                }
              >
                {/* <Card className="card-body pd-10 border shadow-none"> */}
                <Row
                  lg={12}
                  style={
                    {
                      // backgroundColor: "red",
                      // height: 120,
                    }
                  }
                >
                  <Col>
                    <ExamCard
                      title={"TOTAL EXAMS"}
                      total={20}
                      backgroundColor=" bg-primary-gradient"
                    />
                  </Col>
                  <Col>
                    <ExamCard
                      title={"TOTAL INVIGILATORS"}
                      total={34}
                      backgroundColor="bg-primary-gradient"
                    />
                  </Col>
                </Row>

                <Row
                  lg={12}
                  style={
                    {
                      // backgroundColor: "red",
                    }
                  }
                >
                  <Col>
                    <ExamCard
                      title={"EXAMS REGISTERED"}
                      total={20}
                      backgroundColor="bg-success-gradient"
                    />
                  </Col>
                  <Col>
                    <ExamCard
                      title={"ENGAGED INVIGILATORS"}
                      total={34}
                      backgroundColor="bg-success-gradient"
                    />
                  </Col>
                </Row>

                <Row
                  lg={12}
                  style={
                    {
                      // backgroundColor: "red",
                    }
                  }
                >
                  <Col>
                    <ExamCard
                      title={"EXAMS NOT REGISTERED"}
                      total={20}
                      backgroundColor=" bg-danger-gradient"
                    />
                  </Col>
                  <Col>
                    <ExamCard
                      title={"UNCOMPLIANT INVIGILATORS"}
                      total={34}
                      backgroundColor="bg-danger-gradient"
                    />
                  </Col>
                </Row>
                {/* </Card> */}
              </Col>
            </Row>

            {/* <Row className="mg-t-10">
              <Col>
                <Card className="card-body pd-20 pd-md-40 border shadow-none">
                  <BarChart />
                </Card>
              </Col>
            </Row> */}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ExamsReport;
