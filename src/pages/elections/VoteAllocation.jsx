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
  const [loading, setLoading] = useState(true);
  // console.log("active election", stateContext.activeElection);

  const pieChartSeries = contestants
    ? contestants.map((c) => c.total_votes)
    : [];

    const pieChartOptions = {
      chart: {
        width: 380,
        type: "pie",
        fontFamily: 'inherit',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val) {
          return Math.round(val) + '%'
        },
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + ' votes'
          }
        }
      },
      legend: {
        position: 'bottom',
        fontSize: '14px',
      },
      colors: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#3F51B5', '#E91E63', '#009688'],
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
      fontFamily: 'inherit',
      toolbar: {
        show: false
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        barHeight: '70%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val + ' votes'
      },
      style: {
        fontSize: '14px',
      }
    },
    colors: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722', '#9C27B0', '#3F51B5', '#E91E63', '#009688'],
    xaxis: {
      categories: contestants.map((c) => c.name),
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
    },
    grid: {
      borderColor: '#f1f1f1',
      xaxis: {
        lines: {
          show: false
        }
      }
    },
  };

  const loadContestants = async () => {
    setLoading(true);
    try {
      const res = await votersApi.loadElectionContestants(
        stateContext.activeElection
      );

      if (!res.ok) {
        return alert("Failed to load contestants");
      }

      let t = 0;
      res.data.result.contestants.forEach((c) => {
        t += c.total_votes;
      });

      setContestants(res.data.result.contestants);
      setVotes({
        ...votes,
        total_votes: res.data.result.total_votes,
        allocated_votes: t,
        invalid_votes: res.data.result.invalidVotes.total,
        remaining_votes:
          res.data.result.total_votes - (t + res.data.result.invalidVotes.total),
      });
    } catch (error) {
      console.error("Error loading contestants:", error);
      alert("An error occurred while loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContestants();
  }, []);

  return (
    <div className="vote-allocation-container p-3">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading election data...</p>
        </div>
      ) : <>
      <div className="page-header mb-4">
        <h1 className="text-center mb-2">
          {stateContext.activeElection.election.name}
        </h1>
        {stateContext.activeElection.election.position === "mp" && (
          <h3 className="text-center mb-3 text-muted">
            {stateContext.activeElection.school_name}
          </h3>
        )}
      </div>

      <Row className="row-sm mb-3">
        {/* bg-primary-gradient text-white h-100 shadow-sm */}
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
      <Row className="mb-3">
        <Col lg={6} md={12}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-secondary text-white py-3">
              <Card.Title as="h3" className="mb-0 text-white">Vote Distribution</Card.Title>
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
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-secondary text-white py-3">
              <Card.Title as="h3" className="mb-0 text-white">Vote Percentage</Card.Title>
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
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-secondary text-white py-3">
              <Card.Title as="h3" className="mb-0" style={{
                color: 'white',
              }}>
                <i className="bi bi-trophy me-2"></i>
                Contestant Details
              </Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
              <Table responsive hover className="mb-0 table-borderless">
                <thead className="bg-light">
                  <tr>
                    <th className="py-3 ps-4" style={{ width: '5%' }}>#</th>
                    <th className="py-3" style={{ width: '50%' }}>Contestant Name</th>
                    <th className="py-3 text-center" style={{ width: '20%' }}>Votes</th>
                    <th className="py-3 text-center" style={{ width: '25%' }}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {contestants.map((contestant, index) => {
                    const percentage = votes.allocated_votes > 0 
                      ? ((contestant.total_votes / votes.allocated_votes) * 100).toFixed(2) 
                      : 0;
                    
                    // Determine if this contestant has the highest votes
                    const isWinner = contestant.total_votes === Math.max(...contestants.map(c => c.total_votes));
                    
                    return (
                      <tr key={index} className={isWinner ? "bg-light-success" : ""}>
                        <td className="py-2 ps-4">
                          <div className="d-flex align-items-center justify-content-center" 
                               style={{ 
                                 width: '32px', 
                                 height: '32px', 
                                 borderRadius: '50%', 
                                 background: isWinner ? '#28a745' : '#f8f9fa',
                                 color: isWinner ? 'white' : '#212529'
                               }}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="py-3 fw-medium">
                          {isWinner && <i className="bi bi-award text-warning me-2"></i>}
                          {contestant.name}
                        </td>
                        <td className="py-3 text-center">
                          <span className="badge bg-primary rounded-pill px-3 py-2 fs-6">
                            {contestant.total_votes}
                          </span>
                        </td>
                        <td className="py-3 text-center">
                          <div className="progress" style={{ height: '10px' }}>
                            <div 
                              className="progress-bar" 
                              role="progressbar" 
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: isWinner ? '#28a745' : '#0d6efd'
                              }} 
                              aria-valuenow={percentage} 
                              aria-valuemin="0" 
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <span className="mt-1 d-block">{percentage}%</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </>
       }
    </div>
  );
}

export default VoteAllocation;
