import React, { useState, useEffect } from "react";
import { Row, Col, Card, Table, Form, Button, Spinner } from "react-bootstrap";
import invalidVote from "../../assets/img/invvote.png";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";
import Swal from "sweetalert2";
import votersApi from "../../../api/votersApi";
import dashboardApi from "../../../api/dashboardApi";

const years = [
  { value: 1, label: "2022-2023" },
  { value: 2, label: "2023-2024" },
  { value: 3, label: "2024-2025" },
  { value: 4, label: "2025-2026" },
];

const campus = [
  { value: 1, label: "MAIN" },
  { value: 2, label: "KAMPALA" },
];

const modes = [
  { value: 1, label: "REAL TIME RECORDING" },
  { value: 2, label: "RECORD AT THE END" },
];

const schools = [
  {
    value: { id: "1", alias: "SCI" },
    label: "School of Computing and Informatics",
  },
  {
    value: { id: "2", alias: "SBA" },
    label: "School of Business Administration",
  },
  { value: { id: "3", alias: "SLAW" }, label: "School of Law" },
  { value: { id: "4", alias: "SEDU" }, label: "School of Education" },
  { value: { id: "5", alias: "SOSS" }, label: "School of social sciences" },
  {
    value: { id: "6", alias: "SCIAD" },
    label: "School of Commercial Industrial Art and Design",
  },
  { value: { id: "7", alias: "SCOS" }, label: "School of Science " },
];

function VoteAssigning() {
  const [recordingMode, setRecordingMode] = useState();
  const [selectedRecordingMode, setSelectedRecordingMode] = useState();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedCampus, setSelectedCampus] = useState();
  const [elections, setElections] = useState();
  const [selectedElection, setSelectedElection] = useState();
  const [contestants, setContestants] = useState();
  const [formFields, setFormFields] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState();
  const [acc_yrs, setAccYrs] = useState([]);

  const handleChange = (name, value) => {
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };
  let AutoCloseAlert = () => {
    let timerInterval;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> 1 seconds.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  };

  // useEffect(() => {
  //   getAccYrs();
  // }, []);
  const handleLoad = async (year) => {
    // console.log("am sending", {
    //   acc_yr_id: year,
    //   campus: selectedCampus.value,
    // });
    const res = await votersApi.getElectionCategories({
      acc_yr_id: year,
      campus: selectedCampus.value,
    });

    if (!res.ok) {
      return alert("Failed to load elections");
    }

    // console.log("response", res.data);

    const x = res.data.result.election_categories.map((e) => ({
      value: e,
      label: e.name,
    }));

    setElections(x);
  };

  const getAccYrs = async () => {
    const res = await dashboardApi.getAccYrs();

    if (!res.ok) {
      return alert("Failed to fetch acc_yrs");
    }

    // console.log(res.data);
    setAccYrs(
      res.data.map((yr) => ({
        value: yr.id,
        label: yr.acc_yr,
      }))
    );
  };

  const handleLoadContestants = async (e) => {
    e.preventDefault();

    // console.log("result", {
    //   campus: selectedCampus,
    //   acc_yr_id: selectedYear.value,
    //   election: selectedElection.value,
    // });

    setLoading(true);
    const res = await votersApi.loadElectionContestants({
      campus: selectedCampus,
      acc_yr_id: selectedYear.value,
      election: selectedElection.value,
      school: selectedSchool ? selectedSchool.value.id : null,
    });
    setLoading(false);

    if (!res.ok) {
      return alert("Failed to load contestants");
    }

    toast.success(
      <p className="text-white tx-16 mb-0">Contestatnts Loaded successfully</p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );

    // console.log("the result", res.data.result);

    // console.log("forms", y);
    // setFormFields(y);
    setContestants(res.data.result.contestants);
    let i = {};
    res.data.result.contestants.map(
      (c) => (i[c.stu_no] = c.total_votes ? c.total_votes : 0)
    );
    // i["invalid_vote"] = res.data.result.invalidVotes.total;
    // console.log("iiiiii", i);
    setFormFields(i);
    setRecordingMode(selectedRecordingMode);
  };

  const handleSaveResults = async (e) => {
    e.preventDefault();

    console.log("the forms", {
      allocations: formFields,
      election: selectedElection.value,
    });

    setSaving(true);
    const res = await votersApi.saveVoteAllocations({
      allocations: formFields,
      election: selectedElection.value,
      school: selectedSchool ? selectedSchool.value.id : null,
    });
    setSaving(false);

    if (!res.ok) {
      return alert("failed to save results");
    }

    // console.log("response ", res.data);
    setFormFields([]);

    toast.success(
      <p className="text-white tx-16 mb-0">Results Saved Successfully</p>,
      {
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        autoClose: 2000,
        theme: "colored",
      }
    );
    // at this point, we need to emit an event
  };

  return (
    <div>
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h3>Allocate Votes to Aspiring Candidates</h3>
      </div>
      <ToastContainer />
      <div className="mb-2">
        <Form onSubmit={handleLoadContestants}>
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
                placeholder="Select Campus"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Year</label>

              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedYear}
                onChange={(value) => {
                  setSelectedYear(value);
                  handleLoad(value.value);
                }}
                options={years}
                placeholder="Select Year"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Elections</label>
              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedElection}
                onChange={(item) => {
                  // console.log("the value", item);
                  setSelectedElection(item);

                  if (item.value.position == "law_president") {
                    setSelectedSchool({
                      value: { id: "3", alias: "SLAW" },
                      label: "School of Law",
                    });
                  }
                }}
                options={elections}
                placeholder="Select Election"
              />
            </Col>

            {selectedElection ? (
              selectedElection.value.id === 8 ||
              selectedElection.value.id === 5 ||
              selectedElection.value.id === 2 ? (
                <Col lg={3}>
                  <label className="lb">School</label>
                  <Select
                    classNamePrefix="Select-sm"
                    required
                    value={selectedSchool}
                    onChange={(value) => setSelectedSchool(value)}
                    options={schools}
                    placeholder="Select School"
                  />
                </Col>
              ) : null
            ) : null}

            <Col lg={3}>
              <label className="lb">Recording Mode</label>
              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedRecordingMode}
                onChange={(value) => {
                  setSelectedRecordingMode(value);
                }}
                options={modes}
                placeholder="Select Record Mode"
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
      </div>

      <Row className="justify-content-center">
        {recordingMode ? (
          <Col md={12} xl={5}>
            <Card>
              <Card.Header className="border-bottom-0 pb-0">
                <Card.Title as="h3">
                  Distribute votes among contestants
                </Card.Title>
                <p className="">
                  The votes allocated are reflected in real time on the
                  elections dashboard
                </p>
              </Card.Header>
              <Card.Body className="p-0">
                {recordingMode.value == 1 ? (
                  <Table className="table card-table country-table mb-0">
                    <tbody>
                      <tr>
                        <td className="wd-50">
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              backgroundColor: "transparent",
                              marginRight: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={invalidVote}
                              style={{
                                width: 70,
                                height: 70,
                                // borderRadius: 40,
                                backgroundColor: "transparent",
                                marginRight: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            />
                          </div>
                          {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                        </td>
                        <td className="justify-content-center">
                          <h5>INVALID VOTE</h5>
                          <div className="progress progress-lg mt-1">
                            <div className="progress-bar bg-primary wd-100"></div>
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <button
                              type="button"
                              className="btn btn-danger removeTR"
                              onClick={AutoCloseAlert}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,
                                marginRight: 10,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-dash-lg"
                              ></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-info removeTR"
                              onClick={AutoCloseAlert}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-plus-lg"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td className="wd-50 text-end">
                          <div
                            style={{
                              display: "flex",
                              // position: "absolute",
                              // top: 100,
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <span
                              className="text-muted"
                              style={{
                                fontSize: 25,
                              }}
                            ></span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-50">
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              backgroundColor: "lightblue",
                              marginRight: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "lightblue",
                                marginRight: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            />
                          </div>
                          {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                        </td>
                        <td className="justify-content-center">
                          <h5>DARLINGTON</h5>
                          <div className="progress progress-lg mt-1">
                            <div className="progress-bar bg-primary wd-100"></div>
                          </div>
                          <div
                            className="mt-2"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <button
                              type="button"
                              className="btn btn-danger removeTR"
                              onClick={AutoCloseAlert}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,
                                marginRight: 10,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-dash-lg"
                              ></i>
                            </button>
                            <button
                              type="button"
                              class="btn btn-info removeTR"
                              onClick={AutoCloseAlert}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-plus-lg"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td className="wd-50 text-end">
                          <div
                            style={{
                              display: "flex",
                              // position: "absolute",
                              // top: 100,
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <span
                              className="text-muted"
                              style={{
                                fontSize: 25,
                              }}
                            >
                              480
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-50">
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              backgroundColor: "lightblue",
                              marginRight: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "lightblue",
                                marginRight: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            />
                          </div>
                          {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                        </td>
                        <td className="justify-content-center">
                          <h5>DARLINGTON</h5>
                          <div className="progress progress-lg mt-1">
                            <div className="progress-bar bg-primary wd-100"></div>
                          </div>
                          <div className="mt-2">
                            <button
                              type="button"
                              class="btn btn-info removeTR"
                              onClick={AutoCloseAlert}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-plus-lg"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td className="wd-50 text-end">
                          <div
                            style={{
                              display: "flex",
                              // position: "absolute",
                              // top: 100,
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <span
                              className="text-muted"
                              style={{
                                fontSize: 25,
                              }}
                            >
                              480
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-50">
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              backgroundColor: "lightblue",
                              marginRight: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "lightblue",
                                marginRight: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            />
                          </div>
                          {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                        </td>
                        <td className="justify-content-center">
                          <h5>DARLINGTON</h5>
                          <div className="progress progress-lg mt-1">
                            <div className="progress-bar bg-primary wd-100"></div>
                          </div>
                          <div className="mt-2">
                            <button
                              type="button"
                              class="btn btn-info removeTR"
                              // onClick={onRemove}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-plus-lg"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td className="wd-50 text-end">
                          <div
                            style={{
                              display: "flex",
                              // position: "absolute",
                              // top: 100,
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <span
                              className="text-muted"
                              style={{
                                fontSize: 25,
                              }}
                            >
                              480
                            </span>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="wd-50">
                          <div
                            style={{
                              width: 80,
                              height: 80,
                              borderRadius: 40,
                              backgroundColor: "lightblue",
                              marginRight: 5,
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                            }}
                          >
                            <img
                              src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                              style={{
                                width: 80,
                                height: 80,
                                borderRadius: 40,
                                backgroundColor: "lightblue",
                                marginRight: 5,
                                whiteSpace: "nowrap",
                                flexShrink: 0,
                              }}
                            />
                          </div>
                          {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                        </td>
                        <td className="justify-content-center">
                          <h5>DARLINGTON</h5>
                          <div className="progress progress-lg mt-1">
                            <div className="progress-bar bg-primary wd-100"></div>
                          </div>
                          <div className="mt-2">
                            <button
                              type="button"
                              class="btn btn-info removeTR"
                              // onClick={onRemove}
                              style={{
                                paddingLeft: 15,
                                paddingRight: 15,

                                height: "auto",
                              }}
                            >
                              <i
                                style={{
                                  padding: 0,
                                  margin: 0,
                                  // fontSize: 15,
                                }}
                                class="bi bi-plus-lg"
                              ></i>
                            </button>
                          </div>
                        </td>
                        <td className="wd-50 text-end">
                          <div
                            style={{
                              display: "flex",
                              // position: "absolute",
                              // top: 100,
                              alignItems: "center",
                              // backgroundColor: "red",
                            }}
                          >
                            <span
                              className="text-muted"
                              style={{
                                fontSize: 25,
                              }}
                            >
                              480
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : (
                  <>
                    <Form onSubmit={handleSaveResults}>
                      <Table className="table card-table country-table mb-0">
                        <tbody>
                          <tr>
                            <td className="wd-50">
                              <div
                                style={{
                                  width: 80,
                                  height: 80,
                                  borderRadius: 40,
                                  backgroundColor: "transparent",
                                  marginRight: 5,
                                  whiteSpace: "nowrap",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={invalidVote}
                                  style={{
                                    width: 70,
                                    height: 70,
                                    // borderRadius: 40,
                                    backgroundColor: "transparent",
                                    marginRight: 5,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                  }}
                                />
                              </div>
                              {/* <img
                      src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=2000101041`}
                      alt="flags"
                      className="flag wd-30 ht-20 flag-us mt-1"
                    /> */}
                            </td>
                            <td className="justify-content-center">
                              <h5>INVALID VOTE</h5>
                              <div>
                                <Form.Group>
                                  <Form.Control
                                    required
                                    className="mb-3"
                                    name="invalid_vote"
                                    value={formFields.invalid_vote}
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.name,
                                        e.target.value
                                      )
                                    }
                                    type="number"
                                    id="inputName"
                                    placeholder="Enter the number of invalid votes"
                                  />
                                </Form.Group>
                              </div>
                            </td>
                          </tr>
                          {contestants.map((contestant) => (
                            <tr>
                              <td className="wd-50">
                                <div
                                  style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 40,
                                    backgroundColor: "lightblue",
                                    marginRight: 5,
                                    whiteSpace: "nowrap",
                                    flexShrink: 0,
                                  }}
                                >
                                  <img
                                    src={`https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${contestant.stu_no}`}
                                    style={{
                                      width: 80,
                                      height: 80,
                                      borderRadius: 40,
                                      backgroundColor: "lightblue",
                                      marginRight: 5,
                                      whiteSpace: "nowrap",
                                      flexShrink: 0,
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="justify-content-center">
                                <h5>{contestant.name}</h5>
                                <Form.Group>
                                  <Form.Control
                                    required
                                    className="mb-3"
                                    name={`${contestant.stu_no}`}
                                    value={formFields[`${contestant.stu_no}`]}
                                    onChange={(e) =>
                                      handleChange(
                                        e.target.name,
                                        e.target.value
                                      )
                                    }
                                    type="number"
                                    id="inputName"
                                    placeholder={`Enter the quantity of votes assigned to ${contestant.name}`}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Button
                          type="submit"
                          style={{
                            margin: 10,
                            width: 100,
                          }}
                        >
                          {saving ? (
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
                            "Save"
                          )}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ) : null}
      </Row>
    </div>
  );
}

export default VoteAssigning;
