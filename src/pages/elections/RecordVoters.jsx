import React, { useEffect, useState } from "react";
import { Row, Card, Col, Carousel, Spinner } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ReactApexChart from "react-apexcharts";
import { Link } from "react-router-dom";

import votersApi from "../../../api/votersApi";
import katende from "../../../src/assets/img/guild/1.png";
import mawanda from "../../../src/assets/img/guild/2.png";
import kama from "../../../src/assets/img/guild/3.png";
// import socket from "../../../api/socketIOClient";
import urls from "../../../api/apiConstants";
import io from "socket.io-client";

const socket = io(urls.baseUrl1);

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

const CardContent = ({
  candidateName,
  otherNames,
  slogan,
  image = kangave,
}) => (
  <div
    style={{
      display: "flex",
    }}
  >
    <div
      style={{
        // backgroundColor: "red",
        width: 150,
        // height: 200,
      }}
    >
      <img
        src={image}
        style={{
          // backgroundColor: "red",
          width: 400,
          // height: 0,
        }}
      />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: 10,
      }}
    >
      <i className="si si-social-facebook tx-50 text-white mb-2"></i>
      {/* <p className="text-white mt-2">12th June</p> */}
      <h3
        className="text-white font-light"
        style={{
          fontSize: 45,
        }}
      >
        {candidateName}
        <br />
        {otherNames}
      </h3>
      <div
        className="text-white m-t-20"
        style={{
          fontSize: 20,
        }}
      >
        <i>- {slogan}</i>
      </div>
    </div>
  </div>
);

const RecordVoters = React.memo(() => {
  const [elligibleVoters, setElligibleVoters] = useState(0);
  const [totalVoters, setTotalVoters] = useState(0);
  const [options, setOptions] = useState(initialOptions);
  const [series, setSeries] = useState(initialSeries);
  const [cardColor, setCardColor] = useState("bg-primary-gradient");
  const [newVoterToastShown, setNewVoterToastShown] = useState(false);
  const [elligibleVotersToastShown, setElligibleVotersToastShown] =
    useState(false);

  const loadElectionStatistics = async (campus) => {
    const res = await votersApi.getElectionStatistics(campus);

    if (!res.ok) {
      console.log("error", res.data);
      return alert("error loading election statistics");
    }

    // console.log(
    //   "the res",
    //   (res.data.result.voters / res.data.result.elligibleVoters)
    // );
    setElligibleVoters(
      res.data.result.elligibleVoters + res.data.result.exemptions
    );
    setTotalVoters(res.data.result.voters);
    setSeries([
      parseInt(
        (res.data.result.voters /
          (res.data.result.elligibleVoters + res.data.result.exemptions)) *
          100
      ),
    ]);
  };

  useEffect(() => {
    // test();
    // console.log("socket waiting...");
    // socket.on("welcome", (data) => {
    //   console.log("welcome from the socket server", data);
    //   socket.emit("thanks", "In the details screen now");
    // });

    // socket.emit("hello", "hello server");

    socket.on("update_voters_from_server", (data) => {
      // console.log("updates from the server", data);
      // console.log("eligible voters", elligibleVoters);
      // console.log("the percentage", parseInt(data.total_voters));
      if (!newVoterToastShown) {
        toast.success(
          <p className="text-white tx-16 mb-0">New Voter Registered</p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 2000,
            theme: "colored",
          }
        );
        setNewVoterToastShown(true);
      }

      // setSeries([parseInt((data.total_voters / elligibleVoters) * 100)]);
      setSeries((prevSeries) => [
        parseInt((data.total_voters / elligibleVoters) * 100),
      ]);
      setTotalVoters(data.total_voters);
    });

    socket.on("update_elligible_voters_from_server", (data) => {
      console.log("updates from the server", data);
      // console.log("eligible voters", elligibleVoters);
      // console.log(
      //   "the percentage",
      //   parseInt((totalVoters / data.elligible_voters) * 100)
      // );
      if (!elligibleVotersToastShown) {
        toast.success(
          <p className="text-white tx-16 mb-0">
            Elligible Students Have been updated
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 2000,
            theme: "colored",
          }
        );

        setElligibleVotersToastShown(true);
      }

      // setSeries([parseInt((data.total_voters / elligibleVoters) * 100)]);
      setSeries((prevSeries) => [
        parseInt((totalVoters / data.elligible_voters) * 100),
      ]);
      setElligibleVoters(data.elligible_voters);
    });

    socket.on("update_elligible_voters_from_upload_server", (data) => {
      console.log("updates from the server", data);
      // console.log("eligible voters", elligibleVoters);
      console.log(
        "the percentage",
        parseInt((totalVoters / data.elligible_voters) * 100)
      );

      if (!elligibleVotersToastShown) {
        toast.success(
          <p className="text-white tx-16 mb-0">
            Elligible Students Have been uploaded
          </p>,
          {
            position: toast.POSITION.TOP_RIGHT,
            hideProgressBar: true,
            autoClose: 2000,
            theme: "colored",
          }
        );
        setElligibleVotersToastShown(true);
      }

      // setSeries([parseInt((data.total_voters / elligibleVoters) * 100)]);
      setSeries((prevSeries) => [
        parseInt((totalVoters / data.elligible_voters) * 100),
      ]);
      setElligibleVoters(data.elligible_voters);
    });

    return () => {
      socket.off("update_voters_from_server");
    };
  }, [elligibleVoters, newVoterToastShown, elligibleVotersToastShown]);

  useEffect(() => {
    loadElectionStatistics("MAIN");
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
          2025-2026 GUILD ELECTIONS
        </h1>
      </div>
      <Row className="justify-content-center">
        <Col xl={5} md={12} lg={6} className="col-xl-4 col-md-12 col-lg-6 ">
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 0,
            }}
          >
            <Card.Header className="pb-0">
              <Card.Title>
                <h4>VOTERS</h4>
              </Card.Title>
              <p className="tx-15 mb-0 text-muted">
                The total number of voters so far
              </p>
            </Card.Header>
            <Card.Body className="sales-info ot-0 pb-0 pt-0">
              <ReactApexChart
                options={options}
                series={series}
                type="radialBar"
                height={300}
              />
              <Row className="pb-0 mb-0 mx-auto wd-100p justify-content-center">
                <Col md={6}>
                  <p className="mb-1 d-flex tx-17">Total Voters</p>
                  <p className="mb-2 tx-30">{totalVoters}</p>
                </Col>
                <Col md={6}>
                  <p className="mb-1 d-flex tx-17">Eligible Voters</p>
                  <p className="mb-2 tx-30">{elligibleVoters}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 mb-5">
        {/* <!-- col --> */}
        <Col lg={6} md={6}>
          <Card.Title as="h1" className="mb-2">
            GUILD PRESIDENTS
          </Card.Title>
          <Card
            className={cardColor}
            style={{
              height: "100%",
            }}
          >
            <Card.Body>
              <Carousel
                indicators={false}
                interval={3000}
                onSlide={(index) => {
                  // console.log("the index", index);
                  if (index == 0) {
                    setCardColor("bg-secondary");
                  } else if (index == 1) {
                    setCardColor("bg-primary-gradient");
                  } else if (index == 2) {
                    setCardColor("bg-warning");
              
                  }
                }}
              >
                <Carousel.Item className="flex-column">
                  <CardContent
                    candidateName="MAWANDA DERICK"
                    // otherNames="IGNATIUS MUSAAZI"
                    slogan="For the people"
                    image={mawanda}
                  />
                </Carousel.Item>
                <Carousel.Item className="flex-column">
                  <CardContent
                    candidateName="KATENDE MUHAMMAD"
                    slogan="To lead, to serve, to inspire"
                    image={katende}
                  />
                </Carousel.Item>
                {/* <Carousel.Item>
                  <CardContent
                    candidateName="MUSASIZZI NICKLAS"
                    slogan="Heart For Humanity"
                    image={musaazi}
                  />
                </Carousel.Item> */}
                <Carousel.Item>
                  <CardContent
                    candidateName="ALINDA MARVIN [CAMA]"
                    slogan="Bold leadership with transparency"
                    image={kama}
                  />
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
        {/* <!-- col --> */}
        <Col lg={6} md={6}>
          <Card.Title as="h1" className="mb-2">
            VOTING REQUIREMENTS
          </Card.Title>
          <Card
            className="bg-danger-gradient"
            style={{
              height: "100%",
            }}
          >
            <Card.Body>
              <Carousel indicators={false} interval={3000}>
                <Carousel.Item className="flex-column">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      // alignItems: "center",
                    }}
                  >
                    <i className="si si-social-facebook tx-30 text-white mb-2"></i>
                    <p className="text-white mt-2">26th April</p>
                    <h3 className="text-white font-light">
                      <span
                        className="font-bold"
                        style={{
                          fontSize: 45,
                        }}
                      >
                        20% of Tuition
                      </span>
                      <br />
                    </h3>
                  </div>
                </Carousel.Item>
                <Carousel.Item className="flex-column" interval={3000}>
                  <i className="si si-social-google tx-30 text-white mb-2"></i>
                  <p className="text-white mt-2">16th September</p>
                  <h3 className="text-white font-light">
                    <span
                      className="font-bold"
                      style={{
                        fontSize: 45,
                      }}
                    >
                      Carry Your Blue Card or Identity Card
                    </span>
                    <br />
                  </h3>
                </Carousel.Item>
              </Carousel>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <ToastContainer limit={2} autoClose={1000} />
    </div>
  );
});

export default RecordVoters;
