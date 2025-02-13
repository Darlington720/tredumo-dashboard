import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Table } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import StateContext from "../../context/context";
import votersApi from "../../../api/votersApi";

const _votes = {
  total_votes: 0,
  allocated_votes: 0,
  invalid_votes: 0,
  remaining_votes: 0,
};

function VoteAllocation() {
  const stateContext = useContext(StateContext);
  const [contestants, setContestants] = useState([]);
  const [votes, setVotes] = useState(_votes);
  const [data, setData] = useState();
  // console.log("active election", stateContext.activeElection);

  const pieChartSeries = contestants
    ? contestants.map((c) => c.total_votes)
    : [];

  const pieChartOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    dataLabels: {
      enabled: true,
    },
    labels: contestants.map((c) => c.name),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const series = [
    {
      data: contestants ? contestants.map((c) => c.total_votes) : [],
      color: "#26a0fc",
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
    },

    xaxis: {
      categories: contestants.map((c) => c.name),
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: 16,
          textWrap: "nowrap",
        },
      },
    },
  };

  const loadContestants = async () => {
    const res = await votersApi.loadElectionContestants(
      stateContext.activeElection
    );

    if (!res.ok) {
      return alert("Failed to load contestants");
    }

    // console.log("the result", res.data.result);

    let t = 0;
    const allocated = res.data.result.contestants.map((c) => {
      t += c.total_votes;
    });

    // console.log("the total", t);

    setContestants(res.data.result.contestants);
    // setData(res.data.result);
    setVotes({
      ...votes,
      total_votes: res.data.result.total_votes,
      allocated_votes: t,
      invalid_votes: res.data.result.invalidVotes.total,
      remaining_votes:
        res.data.result.total_votes - (t + res.data.result.invalidVotes.total),
    });
  };

  useEffect(() => {
    loadContestants();
  }, []);

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {stateContext.activeElection.election.name}
        </h1>
      </div>

      <div>
        <h3
          style={{
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {stateContext.activeElection.election.position === "mp" &&
            stateContext.activeElection.school_name}
        </h3>
      </div>

      <Row className="row-sm">
        <Col lg={6} xl={3} md={6} col={12}>
          <Card className="bg-primary-gradient text-white ">
            <Card.Body>
              <Row className="">
                <Col col={6}>
                  <div className="icon1 mt-2 text-center">
                    <i className="bi bi-card-checklist tx-40"></i>
                  </div>
                </Col>
                <Col col={6}>
                  <div className="mt-0 text-center">
                    <span className="text-white">Total Votes</span>
                    <h1 className="text-white mb-0">
                      {stateContext.activeElection.election.position === "mp" || stateContext.activeElection.election.position === "law_president" 
                        ? votes.allocated_votes + votes.invalid_votes
                        : 
                        votes.total_votes}
                    </h1>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} xl={3} md={6} col={12}>
          <Card className="bg-success-gradient text-white">
            <Card.Body>
              <Row className="">
                <Col col={6}>
                  <div className="icon1 mt-2 text-center">
                    {/* <i className="fe fe-shopping-cart tx-40"></i> */}
                    <i class="bi bi-check2-square tx-40"></i>
                  </div>
                </Col>
                <Col col={6}>
                  <div className="mt-0 text-center">
                    <span className="text-white">Allocated Votes</span>
                    <h1 className="text-white mb-0">{votes.allocated_votes}</h1>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} xl={3} md={6} col={12}>
          <Card className="bg-danger-gradient text-white">
            <Card.Body>
              <Row className="">
                <Col col={6}>
                  <div className="icon1 mt-2 text-center">
                    <i className="bi bi-x-square tx-40"></i>
                  </div>
                </Col>
                <Col col={6}>
                  <div className="mt-0 text-center">
                    <span className="text-white">Invalid Votes</span>
                    <h1 className="text-white mb-0">{votes.invalid_votes}</h1>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} xl={3} md={6} col={12}>
          <Card className="bg-warning-gradient text-white">
            <Card.Body>
              <Row className="">
                <Col col={6}>
                  <div className="icon1 mt-2 text-center">
                    <i className="bi bi-pie-chart tx-40"></i>
                  </div>
                </Col>
                <Col col={6}>
                  <div className="mt-0 text-center">
                    <span className="text-white">Remaining Votes</span>
                    <h1 className="text-white mb-0">
                      {stateContext.activeElection.election.position === "mp" || stateContext.activeElection.election.position === "law_president" 
                        ? 0
                        : votes.remaining_votes}
                    </h1>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h3">Bar chart</Card.Title>
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
        <Col lg={6} md={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h3">Pie Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <ReactApexChart
                options={pieChartOptions}
                series={pieChartSeries}
                type="pie"
                height={350}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default VoteAllocation;
