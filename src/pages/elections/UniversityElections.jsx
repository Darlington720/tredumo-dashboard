import React, { useContext, useState } from "react";
import { Button, Row, Col, Form, Card, Modal, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import votersApi from "../../../api/votersApi";
import StateContext from "../../context/context";

const years = [
  { value: 1, label: "2022-2023" },
  { value: 2, label: "2023-2024" },
  { value: 3, label: "2024-2025" },
];

const campus = [
  { value: 1, label: "MAIN" },
  { value: 2, label: "KAMPALA" },
];

const schools = [
  // {
  //   value: { id: "1", alias: "SCI" },
  //   label: "School of Computing and Informatics",
  // },
  // {
  //   value: { id: "2", alias: "SBA" },
  //   label: "School of Business Administration",
  // },
  // { value: { id: "3", alias: "SLAW" }, label: "School of Law" },
  // { value: { id: "4", alias: "SEDU" }, label: "School of Education" },
  // { value: { id: "5", alias: "SOSS" }, label: "School of social sciences" },
  {
    value: { id: "6", alias: "SCIAD" },
    label: "School of Commercial Industrial Art and Design",
  },
  // { value: { id: "7", alias: "SCOS" }, label: "School of Science " },
];

function UniversityElections() {
  const navigate = useNavigate();
  const stateContext = useContext(StateContext);
  const [selectedYear, setSelectedYear] = useState();
  const [selectedCampus, setSelectedCampus] = useState();
  const [title, setTitle] = useState();
  const [electionCategories, setElectionCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedElection, setSelectedElection] = useState();
  const [loading, setLoading] = useState(false);

  const handleLoad = async (e) => {
    e.preventDefault();

    // console.log("am sending", {
    //   acc_yr_id: selectedYear.value,
    //   campus: selectedCampus.value,
    // });
    setLoading(true);
    const res = await votersApi.getElectionCategories({
      acc_yr_id: selectedYear.value,
      campus: selectedCampus.value,
    });
    setLoading(false);

    if (!res.ok) {
      return alert("Failed to load elections");
    }

    // console.log("response", res.data);
    setTitle(`Elections in ${selectedYear.label}`);
    setElectionCategories(res.data.result.election_categories);
  };

  return (
    <div>
      <div className="mb-2">
        <Form onSubmit={handleLoad}>
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
                value={selectedCampus}
                onChange={(value) => setSelectedCampus(value)}
                options={campus}
                placeholder="Select Year"
              />
            </Col>

            <Col lg={2}>
              <label className="lb">Year</label>

              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedYear}
                onChange={(value) => setSelectedYear(value)}
                options={years}
                placeholder="Select Year"
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
                  marginTop: 10,
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

        <div>
          <h4>{title}</h4>
        </div>

        <div>
          {electionCategories.map((cat) => (
            <Card
              key={cat.id}
              onClick={() => {
                console.log("category", cat);
                setSelectedElection(cat);
                if (cat.position == "guild") {
                  stateContext.setActiveElection({
                    election: cat,
                    campus: selectedCampus,
                  });
                  navigate("/voteallocation");
                } else if (cat.position == "law_president") {
                  stateContext.setActiveElection({
                    election: cat,
                    campus: selectedCampus,
                    school: "3",
                    school_name: "School of Law",
                  });
                  navigate("/voteallocation");
                } else {
                  // console.log("its time for choosing school");
                  setModalVisible(true);
                }
              }}
              style={{
                cursor: "pointer",
                boxShadow: "none",
                borderColor: "lightgray",
                borderWidth: 1,
                padding: 0,
              }}
            >
              <Card.Body>
                <h3>{cat.name}</h3>
              </Card.Body>
            </Card>
          ))}
        </div>

        <Modal show={modalVisible} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>Choose School</Modal.Title>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              onClick={() => {
                setModalVisible(false);
              }}
            >
              <i className="bi bi-x tx-30"></i>
            </div>
          </Modal.Header>
          <Modal.Body>
            {schools.map((sch) => (
              <div key={sch.value.id}>
                <h4
                  onClick={() => {
                    console.log("school", sch.value);
                    stateContext.setActiveElection({
                      election: selectedElection,
                      campus: selectedCampus,
                      school: sch.value.id,
                      school_name: sch.label,
                    });
                    navigate("/voteallocation");
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {sch.label}
                </h4>
                <div
                  style={{
                    backgroundColor: "lightgray",
                    width: "100%",
                    height: 1,
                    padding: 0,
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                />
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="ripple"
              variant="secondary"
              onClick={() => setModalVisible(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default UniversityElections;
