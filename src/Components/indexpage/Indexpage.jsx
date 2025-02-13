import React, { useState, useEffect, useContext } from "react";
import {
  Row,
  Col,
  Card,
  ListGroup,
  Table,
  ProgressBar,
  Dropdown,
  Modal,
  Spinner,
  Button,
} from "react-bootstrap";
import {
  OrderStatus,
  Order,
  DangerEarnings,
  SuccessEarning,
  Sold,
  Samantha,
  Jimmy,
  Gabe,
  Manuel,
  Sharon,
  RecentOrder,
} from "./Data/IndexpageData";
import StateContext from "../../context/context";
import "./index_styles.css";
import styles from "./Indexpage.module.scss";
import ReactECharts from "echarts-for-react";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";
import staffApi from "../../../api/staffApi";

// images

// import faces6 from "../../assets/img/faces/6.jpg";
// import { BasicColumn, ColumnMarker, ColumnNegativeValue, StackedColumn } from '../ChartFunction/apexchart';
import dashboardApi from "../../../api/dashboardApi";

const initialState = {
  students: 0,
  staff: 0,
  visitors: 0,
  nts: 0,
};

const initialLectureGraphState = {
  x_axis: [],
  ongoing: [],
  missed: [],
  notStarted: [],
  ended: [],
};

const initialPieChartData = [
  { value: 0, name: "SBA" },
  { value: 0, name: "SCI" },
  { value: 0, name: "SEDU" },
  { value: 0, name: "SCIAD" },
  { value: 0, name: "SCOS" },
  { value: 0, name: "SOSS" },
  { value: 0, name: "SLAW" },
];

const Indexpage = () => {
  const stateContext = useContext(StateContext);

  // console.log("state context User", stateContext.user);
  const [statisticsCards, setStatisticsCards] = useState(initialState);
  const [lecturesGraph, setLecturesGraph] = useState(initialLectureGraphState);
  const [studentsPieChartData, setStudentsPieChartData] =
    useState(initialPieChartData);
  const [lecturersWithMissedLectures, setLecturersWithMissedLectures] =
    useState([]);

  const [lecturesThathaveNotYetStarted, setLecturesThathaveNotYetStarted] =
    useState([]);

  const [lecturesforSchool, setLecturesForSchool] = useState([]);

  const [loading, setLoading] = useState(false);

  function getRandomLecturers(lecturersWithMissedLectures) {
    const selectedLecturers = [];
    const schools = lecturersWithMissedLectures.map((school) => school.school);
    shuffleArray(schools);

    for (let i = 0; i < schools.length; i++) {
      const school = schools[i];
      const lecturers = lecturersWithMissedLectures.find(
        (s) => s.school === school
      ).lecturers;
      shuffleArray(lecturers);

      selectedLecturers.push(lecturers[0]);

      if (selectedLecturers.length === 5) {
        break;
      }
    }

    return selectedLecturers;
  }

  function getRandomLectures(schools, numLecturers) {
    const selectedLecturers = [];
    let remainingLecturers = numLecturers;

    // Shuffle the schools array to randomize selection
    const shuffledSchools = schools.sort(() => Math.random() - 0.5);

    // Loop through each school and select a random lecturer from its notYetStarted array
    for (let i = 0; i < shuffledSchools.length && remainingLecturers > 0; i++) {
      const school = shuffledSchools[i];
      const notYetStarted = school.notYetStarted;

      // If there are no lecturers for the school, skip to the next one
      if (notYetStarted.length === 0) {
        continue;
      }

      // Select a random lecturer from the notYetStarted array and add it to the selectedLecturers array
      const randomIndex = Math.floor(Math.random() * notYetStarted.length);
      selectedLecturers.push(notYetStarted[randomIndex]);

      // Decrement the remainingLecturers counter
      remainingLecturers--;
    }

    return selectedLecturers;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const series = [
    {
      name: "On-going",
      // data: [44, 55, 57, 56, 61, 58, 63, 60],
      data: lecturesGraph.ongoing,
      color: "#00ff00",
    },
    {
      name: "Missed",
      // data: [76, 85, 101, 98, 87, 105, 91, 114],
      data: lecturesGraph.missed,
      color: "#ff0000",
    },
    {
      name: "Not-Started",
      // data: [35, 41, 36, 26, 45, 48, 52, 53],
      data: lecturesGraph.notStarted,
      color: "#808080",
    },
    {
      name: "Ended",
      // data: [35, 41, 36, 26, 45, 48, 52, 53],
      data: lecturesGraph.ended,
      color: "#0000FF",
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 50,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      // categories: [
      //   "SBA",
      //   "SCI",
      //   "SCOS",
      //   "SOSS",
      //   "SLAW",
      //   "NUR",
      //   "SEDU",
      //   "SCIAD",
      // ],
      categories: lecturesGraph.x_axis,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return +val + " Lectures";
        },
      },
    },
  };

  const option = {
    axisPointer: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      selected: {
        SBA: true,
        "Legend B": true,
        "Legend C": false,
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Students",
        type: "pie",
        radius: [50, 150],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        // data: [
        //   { value: 40, name: "SBA" },
        //   { value: 38, name: "SCI" },
        //   { value: 32, name: "SEDU" },
        //   { value: 30, name: "SCIAD" },
        //   { value: 28, name: "SCOS" },
        //   { value: 26, name: "SOSS" },
        //   { value: 22, name: "SLAW" },
        // ],
        data: studentsPieChartData,
      },
    ],
  };

  const lecture_options = {
    axisPointer: {
      show: false,
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
    legend: {
      type: "scroll",
      orient: "vertical",
      right: 10,
      top: 20,
      bottom: 20,
      selected: {
        SBA: true,
        "Legend B": true,
        "Legend C": false,
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: "Lectures",
        type: "pie",
        radius: [50, 150],
        center: ["50%", "50%"],
        roseType: "area",
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          {
            value: lecturesforSchool[0]
              ? lecturesforSchool[0].ongoingLectures.length
              : 0,
            name: "Ongoing",
            itemStyle: { color: "green" },
          },
          {
            value: lecturesforSchool[0]
              ? lecturesforSchool[0].missedLectures.length
              : 0,
            name: "Missed",
            itemStyle: { color: "red" },
          },
          {
            value: lecturesforSchool[0]
              ? lecturesforSchool[0].notYetStarted.length
              : 0,
            name: "Not Started",
            itemStyle: { color: "gray" },
          },
          {
            value: lecturesforSchool[0]
              ? lecturesforSchool[0].endedLectures.length
              : 0,
            name: "Ended",
            itemStyle: { color: "blue" },
          },
        ],
        // data: studentsPieChartData,
      },
    ],
  };

  const getDashboardData = async (campus_id) => {
    // console.log("context", stateContext.data);

    setLoading(true);
    const res = await dashboardApi.getDashboardData(campus_id);
    setLoading(false);

    if (!res.ok) return alert("error fetching the required data");

    console.log("data received", res.data);
    stateContext.setData(res.data);
    // console.log("context", stateContext.data);

    console.log("lectures", res.data);

    // setStudentsPieChartData()
    // console.log({
    //   lectures_xaxis,
    //   ongoing,
    //   notStarted,
    //   missed,
    //   ended,
    // });

    // setLecturesGraph({
    //   x_axis:
    // })
  };

  useEffect(() => {
    // getModules();
    if (
      !stateContext.data ||
      parseInt(stateContext.data.campus_id) !== stateContext.campus.id
    ) {
      getDashboardData(stateContext.campus.id);
    } else {
      stateContext.setRealTime(stateContext.data.constraints[2].c_percentage);
      console.log(
        "real time db",
        stateContext.data.constraints[2].c_percentage
      );
      const lectures_xaxis = stateContext.data.lectures.map(
        (lecture) => lecture.school
      );
      const ongoing = stateContext.data.lectures.map(
        (lecture) => lecture.ongoingLectures.length
      );
      const notStarted = stateContext.data.lectures.map(
        (lecture) => lecture.notYetStarted.length
      );
      const missed = stateContext.data.lectures.map(
        (lecture) => lecture.missedLectures.length
      );
      const ended = stateContext.data.lectures.map(
        (lecture) => lecture.endedLectures.length
      );

      let lecturesBasedOnSchool = [];
      stateContext.data.lectures.forEach((lecture) => {
        if (lecture.school === stateContext.user.assignedRole.for_wc_sch) {
          lecturesBasedOnSchool.push(lecture);
        }
      });

      // console.log("lectures based on school", lecturesBasedOnSchool);
      setLecturesForSchool(lecturesBasedOnSchool);

      const pieChart = stateContext.data.studentsAccessingCampus.map((stu) => ({
        value: stu.count,
        name: stu.facultycode,
      }));

      setLecturesThathaveNotYetStarted(
        getRandomLectures(stateContext.data.lectures, 5)
      );

      setLecturersWithMissedLectures(
        getRandomLecturers(stateContext.data.lecturersWithMissedLectures)
      );

      // console.log("pie chart", pieChart);

      const updatedPieChartData = initialPieChartData.map((item) => {
        const found = pieChart.find((elem) => elem.name === item.name);
        return found ? { ...item, value: found.value } : item;
      });

      // console.log("updated piechart data", updatedPieChartData);

      setStatisticsCards({
        students: stateContext.data.statistics.students,
        staff: stateContext.data.statistics.staff,
        visitors: stateContext.data.statistics.visitors,
      });

      setLecturesGraph({
        x_axis: lectures_xaxis,
        ongoing: ongoing,
        missed: missed,
        notStarted: notStarted,
        ended: ended,
      });

      setStudentsPieChartData(updatedPieChartData);
    }
  }, [stateContext.data, stateContext.campus]);

  // useEffect(() => {
  //   getDashboardData(stateContext.campus.id);
  // }, [stateContext.campus]);

  return (
    <div
      style={
        {
          // backgroundColor: "red",
        }
      }
    >
      <div className={styles.Indexpage}>
        {/* <!-- container --> */}

        {/* <!-- breadcrumb --> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="breadcrumb-header justify-content-between">
            <div className="left-content">
              <div>
                <h2 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
                  Hi, welcome back!
                </h2>
                <p className="mg-b-0">
                  Education monitoring dashboard.(Quality Assurance)
                </p>
              </div>
            </div>
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
              onClick={() => getDashboardData(stateContext.campus.id)}
              style={{
                padding: 5,
                paddingLeft: 10,
                paddingRight: 10,
                width: 95,
              }}
            >
              <i className="mdi mdi-refresh"></i>
              <span>RELOAD</span>
            </Button>
          </div>
        </div>
        {/* <!-- breadcrumb --> */}

        {/* <!-- row --> */}
        {stateContext.generalRoleIds.includes(
          stateContext.user.assignedRole.role_id
        ) ? (
          <>
            <Row className="row-sm">
              <Col xl={3} lg={6} md={6} xm={12}>
                <Card className="overflow-hidden sales-card bg-primary-gradient">
                  <div className="px-3 pt-3  pb-2 pt-0">
                    <div className="">
                      <h6 className="mb-3 tx-12 text-white">TODAY STUDENTS</h6>
                    </div>
                    <div className="pb-0 mt-0">
                      <div className="d-flex">
                        <div className="">
                          <h4 className="tx-20 fw-bold mb-1 text-white">
                            {statisticsCards.students}
                          </h4>
                          <p className="mb-0 tx-12 text-white op-7">
                            Compared to yesterday
                          </p>
                        </div>
                        <span className="float-end my-auto ms-auto">
                          <i className="fas fa-arrow-circle-up text-white"></i>
                          <span className="text-white op-7"> +42</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Order />
                </Card>
              </Col>
              <Col xl={3} lg={6} md={6} xm={12}>
                <Card className="overflow-hidden sales-card bg-danger-gradient">
                  <div className="px-3 pt-3  pb-2 pt-0">
                    <div className="">
                      <h6 className="mb-3 tx-12 text-white">TODAY STAFF</h6>
                    </div>
                    <div className="pb-0 mt-0">
                      <div className="d-flex">
                        <div className="">
                          <h4 className="tx-20 fw-bold mb-1 text-white">
                            {statisticsCards.staff}
                          </h4>
                          <p className="mb-0 tx-12 text-white op-7">
                            Compared to yesterday
                          </p>
                        </div>
                        <span className="float-end my-auto ms-auto">
                          <i className="fas fa-arrow-circle-down text-white"></i>
                          <span className="text-white op-7"> -23</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <DangerEarnings />
                </Card>
              </Col>
              <Col xl={3} lg={6} md={6} xm={12}>
                <Card className="overflow-hidden sales-card bg-success-gradient">
                  <div className="px-3 pt-3  pb-2 pt-0">
                    <div className="">
                      <h6 className="mb-3 tx-12 text-white">TOTAL VISIORS</h6>
                    </div>
                    <div className="pb-0 mt-0">
                      <div className="d-flex">
                        <div className="">
                          <h4 className="tx-20 fw-bold mb-1 text-white">
                            {statisticsCards.visitors}
                          </h4>
                          <p className="mb-0 tx-12 text-white op-7">
                            Compared to yesterday
                          </p>
                        </div>
                        <span className="float-end my-auto ms-auto">
                          <i className="fas fa-arrow-circle-up text-white"></i>
                          <span className="text-white op-7"> +5</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <SuccessEarning />
                </Card>
              </Col>
              <Col xl={3} lg={6} md={6} xm={12}>
                <Card className="overflow-hidden sales-card bg-warning-gradient">
                  <div className="px-3 pt-3  pb-2 pt-0">
                    <div className="">
                      <h6 className="mb-3 tx-12 text-white">
                        TOTAL NON TEACHING STAFF
                      </h6>
                    </div>
                    <div className="pb-0 mt-0">
                      <div className="d-flex">
                        <div className="">
                          <h4 className="tx-20 fw-bold mb-1 text-white">0</h4>
                          <p className="mb-0 tx-12 text-white op-7">
                            Compared to yesterday
                          </p>
                        </div>
                        <span className="float-end my-auto ms-auto">
                          <i className="fas fa-arrow-circle-down text-white"></i>
                          <span className="text-white op-7"> 0</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <Sold />
                </Card>
              </Col>
            </Row>
            <Row>
              <Col lg={6} md={6}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">
                      Basic summmary of Ongoing, Missed and lecturers that
                      haven't started
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <ReactApexChart
                      options={options}
                      series={series}
                      type="bar"
                      height={350}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={6} md={6}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">
                      Basic summmary of total students accessing campus per
                      school
                    </Card.Title>
                  </Card.Header>
                  <Card.Body
                    style={{
                      marginBottom: "65px",
                    }}
                  >
                    {/* <PieChartData /> */}
                    <ReactECharts className="chartsh " option={option} />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        ) : (
          <Row>
            <Col lg={12} md={6}>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">
                    {`BASIC SUMMMARY OF ONGOING, MISSED AND LECTURERS THAT HAVEN'T STARTED IN ${stateContext.user.assignedRole.for_wc_sch}`}
                  </Card.Title>
                </Card.Header>
                <Card.Body
                  style={{
                    marginBottom: "65px",
                  }}
                >
                  {/* <PieChartData /> */}
                  <ReactECharts className="chartsh" option={lecture_options} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* <!-- row closed --> */}

        {/* <!-- row opened --> */}
        {/*     */}
        {/* <!-- row closed --> */}

        {/* <!-- row opened --> */}

        <Row>
          <Col xl={6}>
            <Card className="mg-b-20">
              <Card.Header className="pb-0">
                <div className="d-flex justify-content-between">
                  <Card.Title as="h4" className="mg-b-0">
                    Lecturers who have missed lectures today
                  </Card.Title>
                  <i className="mdi mdi-dots-horizontal text-gray"></i>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Sammary of lecturers who have not taught their lectures{" "}
                  <Link to={`${import.meta.env.BASE_URL}missed-lectures`}>
                    Show More
                  </Link>
                </p>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table className="table-bordered mg-b-0 text-md-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Session</th>
                        <th>School</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lecturersWithMissedLectures.length === 0 ? (
                        <tr>
                          <td colSpan="4">No data available</td>
                        </tr>
                      ) : (
                        lecturersWithMissedLectures.map((lecturer, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{lecturer.lecturer_name}</td>
                            <td>{lecturer.session}</td>
                            <td>{lecturer.school}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col xl={6}>
            <Card className="mg-b-20">
              <Card.Header className="pb-0">
                <div className="d-flex justify-content-between">
                  <Card.Title as="h4" className="mg-b-0">
                    Lectures that have not yet Started Today
                  </Card.Title>
                  <i className="mdi mdi-dots-horizontal text-gray"></i>
                </div>
                <p className="tx-12 tx-gray-500 mb-2">
                  Sammary of lectures that have not yet started{" "}
                  <Link to={`${import.meta.env.BASE_URL}notstarted`}>
                    Show more
                  </Link>
                </p>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <Table className="table-bordered mg-b-0 text-md-nowrap">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>session</th>
                        <th>School</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lecturesThathaveNotYetStarted.length === 0 ? (
                        <tr>
                          <td colSpan="4">No data available</td>
                        </tr>
                      ) : (
                        lecturesThathaveNotYetStarted.map((l, i) => (
                          <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td
                              style={{
                                maxHeight: "1.2em",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {l.course_unit_name}
                            </td>
                            <td>{l.session_name}</td>
                            <td>{l.alias}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      {loading ? (
        <div
          className="overlay_dashboard"
          style={
            {
              // width: 100,
            }
          }
        >
          {/* <Lottie animationData={Loading} loop={true} speed={2} /> */}
          <Spinner
            animation="border"
            variant="primary"
            className=""
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : null}
    </div>
  );
};

Indexpage.defaultProps = {};

export default Indexpage;
