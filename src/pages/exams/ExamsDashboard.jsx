import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import ReactECharts from "echarts-for-react";

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
    categories: ["SBA", "SCI", "SCOS", "SOSS", "SLAW", "NUR", "SEDU", "SCIAD"],
    // categories: lecturesGraph.x_axis,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return +val + " Exams";
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
      data: [
        { value: 40, name: "SBA" },
        { value: 38, name: "SCI" },
        { value: 32, name: "SEDU" },
        { value: 30, name: "SCIAD" },
        { value: 28, name: "SCOS" },
        { value: 26, name: "SOSS" },
        { value: 22, name: "SLAW" },
      ],
      // data: studentsPieChartData,
    },
  ],
};

const series = [
  {
    name: "On-going",
    data: [44, 55, 57, 56, 61, 58, 63, 60],
    // data: lecturesGraph.ongoing,
    color: "#00ff00",
  },
  {
    name: "Missed",
    data: [76, 85, 101, 98, 87, 105, 91, 114],
    // data: lecturesGraph.missed,
    color: "#ff0000",
  },
  {
    name: "Not-Started",
    data: [35, 41, 36, 26, 45, 48, 52, 53],
    // data: lecturesGraph.notStarted,
    color: "#808080",
  },
  {
    name: "Ended",
    data: [35, 41, 36, 26, 45, 48, 52, 53],
    // data: lecturesGraph.ended,
    color: "#0000FF",
  },
];

const ExamCard = ({ title, backgroundColor, total }) => {
  return (
    <Col xl={3} lg={6} md={6} xm={12}>
      <Card className={`overflow-hidden sales-card ${backgroundColor}`}>
        <div className="px-3 pt-3  pb-2 pt-0">
          <div className="">
            <h6 className="mb-3 tx-12 text-white">{title}</h6>
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

function ExamsDashboard() {
  return (
    <>
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <div>
            <h2 className="main-content-title tx-24 mg-b-0 ">
              Exams Statistics
            </h2>
            <p className="mg-b-0">Todays statistics</p>
          </div>
        </div>
      </div>
      <Row>
        <ExamCard
          title={"ONGOING EXAMS"}
          total={20}
          backgroundColor=" bg-primary-gradient"
        />
        <ExamCard
          title={"NOT YET STARTED EXAMS"}
          total={34}
          backgroundColor="bg-success-gradient"
        />
        <ExamCard
          title={"ENDED EXAMS"}
          total={20}
          backgroundColor=" bg-info-gradient"
        />
        <ExamCard
          title={"MALPRACTICE"}
          total={20}
          backgroundColor=" bg-danger-gradient"
        />
      </Row>

      <Row>
        <Col lg={6} md={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h3">
                Basic summmary of Ongoing, Missed and Exams that haven't started
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
                Basic summmary of total students accessing campus per school
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
  );
}

export default ExamsDashboard;
