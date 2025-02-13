import React from "react";
import { useState, useRef } from "react";
import { Button, Card, Col, Row, Spinner, Form } from "react-bootstrap";

import "react-datepicker/dist/react-datepicker.css";
import { Toast } from "primereact/toast";
import Select from "react-select";
import graduationApi from "../../../api/graduationApi";
import "../reports/lectures/lectureReport.css";
import GraduationCardTable from "./GraduationCardTable";
// import LectureTableComponent from "./LectureTableComponent";

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

const campus = [
  { value: "0", label: "ALL CAMPUSES" },
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
];

const schools = [
  { value: "1", label: "School of Computing and Informatics" },
  { value: "2", label: "School of Business Administration" },
  { value: "3", label: "School of Law" },
  { value: "4", label: "School of Education" },
  { value: "5", label: "School of social sciences" },
  { value: "6", label: "School of Commercial Industrial Art and Design" },
  { value: "7", label: "School of Science " },
];

const MyCard = ({ title, backgroundColor, total }) => {
  return (
    // <Col xl={3} lg={6} md={6} xm={12}>
    <Card className={`overflow-hidden sales-card ${backgroundColor} mb-3`}>
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

function GraduationCardReports() {
  const toast = useRef(null);
  const [selectedYr, setSelectedYr] = useState();
  const [totalCards, setTotalCards] = useState(0);
  const [givenOutCards, setGivenOuTCards] = useState([]);
  const [remainingCards, setRemainingCards] = useState(0);
  const [loading, setLoading] = useState();

  const loadData = async (e) => {
    e.preventDefault();
    // console.log("the year", selectedYr);
    setLoading(true);
    const res = await graduationApi.getGraduationCardsReport(selectedYr.value);
    setLoading(false);

    if (!res.ok) {
      console.log(res.data);
      return alert("Failed to load the data");
    }

    if (res.data.success) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Graduation Cards Loaded Successfully",
        life: 3000,
      });
    }

    console.log("the response", res.data);
    setGivenOuTCards(res.data.result.cards);
    setTotalCards(res.data.result.total_grad_cards);
  };

  return (
    <>
      <Toast ref={toast} />
      <div>
        <h5
          style={{
            marginBottom: 20,
          }}
        >
          Graduation Card Report
        </h5>
        {/* <Pageheader titles="Forms" /> */}
        <div>
          <Form onSubmit={loadData}>
            <Row
              className="row-sm center"
              style={{
                // backgroundColor: "red",
                marginBottom: 20,
              }}
            >
              <Col lg={3}>
                <label className="lb">Acc Year</label>
                <Select
                  classNamePrefix="Select-sm"
                  value={selectedYr}
                  required
                  onChange={(value) => setSelectedYr(value)}
                  options={years}
                  placeholder="Select Acc/yr"
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
        <div>
          <Row
            style={{
              // height: "80vh",
              marginBottom: 10,
              // backgroundColor: "red",
            }}
          >
            <Col lg={9}>
              <Card
                style={{
                  boxShadow: "none",
                  borderColor: "lightgray",
                  borderWidth: 1,
                  // height: "100%",
                  margin: 0,
                  padding: 0,
                }}
              >
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
                        {`Distributed Graduation Cards`}
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
                    <GraduationCardTable
                      data={givenOutCards}
                      // yr={selectedYr ? selectedYr.value : null}
                      // selectedDate={monthYear}
                    />
                  </Card.Body>
                </>
              </Card>
            </Col>
            <Col lg={3}>
              <Card
                style={{
                  boxShadow: "none",
                  borderColor: "lightgray",
                  borderWidth: 1,
                  margin: 0,
                  // padding: 0,
                  // height: ,
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                }}
              >
                <div>
                  <MyCard
                    title={"TOTAL CARDS"}
                    total={totalCards}
                    backgroundColor="bg-primary-gradient"
                  />
                </div>

                <div>
                  <MyCard
                    title={"GIVEN OUT CARDS"}
                    total={givenOutCards.length}
                    backgroundColor="bg-success-gradient"
                  />
                </div>

                <div>
                  <MyCard
                    title={"REMAINING CARDS"}
                    total={totalCards - givenOutCards.length}
                    backgroundColor="bg-warning-gradient"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default GraduationCardReports;
