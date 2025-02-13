import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
  Modal,
} from "react-bootstrap";
import "./exams.css";
import Select from "react-select";
import Swal from "sweetalert2";
import { FixedSizeList as List } from "react-window";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

import staffApi from "../../../api/staffApi";

const campus = [
  { value: "MAIN", label: "Main Campus" },
  { value: "KAMPALA", label: "Kampala Campus" },
];

const initialReqs = {
  schools: [],
  studyTimes: [],
  year_sem: [],
  rooms: [],
  modules: [],
  sessions: [],
};

const examHeaders = {
  school: "",
  campus: "",
  study_time: "",
  year_sem: "",
};

const ModalData = [
  { value: "Firefox", label: "Firefox" },
  { value: "Chrome", label: "Chrome" },
  { value: "Safari", label: "Safari" },
  { value: "Opera", label: "Opera" },
  { value: "Internet Explore", label: "Internet Explore" },
];

const modalLevels = [
  { value: "core", label: "Core" },
  { value: "elective", label: "Elective" },
];

const modalStudyYrs = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

const modalSem = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

const initialModuleDetails = {
  courseID: "",
  courseName: "",
  courseCode: "",
  moduleLevel: [],
  studyYr: [],
  sem: [],
  school: [],
};

function AssignInvigilators() {
  const timetableRecords = [
    {
      date: new Date(),
      session: "",
      room: "",
      courseUnit: "",
    },
  ];
  const [numOfRows, setNumOfRows] = useState(1);
  const [timetable, setTimetable] = useState(timetableRecords);
  const [loading, setLoading] = useState(false);
  const [examTTReqs, setExamTTReqs] = useState(initialReqs);
  const [headers, setHeaders] = useState(examHeaders);
  const [visible, setVisible] = useState(false);
  const [loadingAnime, setLoadingAnime] = useState(false);
  const [schools, setSchools] = useState([]);
  const [newModuleDetails, setNewModuleDetails] =
    useState(initialModuleDetails);
  const [disable, setDisable] = useState(false);

  const loadExamTTRequirements = async () => {
    setLoading(true);
    const res = await staffApi.getExamTTReqs();
    setLoading(false);

    if (!res.ok) {
      return alert(
        "Failed to load the requirements needed to start adding the timetable"
      );
    }

    console.log("result", res.data);

    let reqs = {
      schools: [],
      studyTimes: [],
      year_sem: [],
      rooms: [],
      modules: [],
      sessions: [],
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

    //rooms
    res.data.result.rooms.forEach((room) => {
      reqs.rooms.push({
        value: room.room_id,
        label: room.room_name,
      });
    });

    //studytimes
    res.data.result.study_times.forEach((st) => {
      reqs.studyTimes.push({
        value: st.st_id,
        label: st.study_time_name,
      });
    });

    // year - sem
    res.data.result.year_sem.forEach((ys) => {
      reqs.year_sem.push({
        value: ys.ys_id,
        label: `year: ${ys.year}, sem: ${ys.sem}`,
      });
    });

    // sessions

    res.data.result.sessions.forEach((examSession) => {
      reqs.sessions.push({
        value: examSession.s_id,
        label: examSession.session_name,
      });
    });

    //modules
    res.data.result.modules.forEach((m) => {
      reqs.modules.push({
        value: {
          course_code: m.course_id,
          course_name: m.course_name,
        },
        label: `${m.course_name} - ${m.school_id}`,
      });
    });

    setExamTTReqs(reqs);
  };

  useEffect(() => {
    loadExamTTRequirements();
  }, []);

  class MenuList extends React.Component {
    render() {
      const { options, children, maxHeight, getValue } = this.props;
      const [value] = getValue();
      const initialOffset = options.indexOf(value) * 40;

      return (
        <List
          height={maxHeight}
          itemCount={children.length}
          itemSize={40}
          initialScrollOffset={initialOffset}
        >
          {({ index, style }) => <div style={style}>{children[index]}</div>}
        </List>
      );
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToBeSent = {
      headers: {
        school: headers.school,
        studyTime: headers.study_time,
        campus: headers.campus,
        year_sem: headers.year_sem,
      },
      timetable: timetable,
    };

    console.log("To be added", dataToBeSent);

    setLoading(true);
    const res = await staffApi.addExamTT(dataToBeSent);
    setLoading(false);

    if (!res.ok) {
      console.log(res.data);
      return alert("Failed to save the timetable");
    }

    console.log(res.data);

    if (!res.data.success) {
      return Swal.fire({
        title: "Error",
        text: res.data.message,
      });
    }

    if (res.data.success) {
      setNumOfRows(1);
      setTimetable(timetableRecords);
      setHeaders(examHeaders);
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });
    }

    // if (!res.ok) {
    //   alert("Failed to save the timetable");
    // } else {
    //   if (res.data == "Success") {
    //     alert("timetable Saved successfully");
    //     setNumOfRows(1);
    //     setTimetable(timetableRecords);
    //     setSchool([]);
    //     setStudyTime([]);
    //     setMonth([]);
    //     setYear([]);
    //   }
    // }

    // console.log("Data final", dataToBeSent);

    // addInvigilators(dataToBeSent);
  };

  const handleSubmitNewModule = async (e) => {
    e.preventDefault();
    console.log("data am sending", newModuleDetails);
    setLoadingAnime(true);
    const res = await staffApi.addNewModule(newModuleDetails);
    setLoadingAnime(false);

    if (!res.ok) {
      console.log("Error saving module");
    }

    if (!res.data.success) {
      return alert(res.data.message);
    }

    alert(res.data.message);
    setNewModuleDetails(initialModuleDetails);
    loadExamTTRequirements();
  };

  const handleChangeModuleDetails = (name, value) => {
    setNewModuleDetails({ ...newModuleDetails, [name]: value });
  };

  return (
    <Col md={12} xl={12} xs={12} sm={12}>
      <Modal show={visible} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>ADD NEW COURSE UNIT</Modal.Title>
          <Link
            to="#"
            as="span"
            className="d-flex ms-auto text-dark"
            onClick={() => {
              setVisible(false);
            }}
          >
            <i className="fe fe-x ms-auto"></i>
          </Link>
        </Modal.Header>
        <Form onSubmit={handleSubmitNewModule}>
          <Modal.Body>
            <h6>Course ID</h6>

            <Form.Control
              className="mb-3"
              required
              type="text"
              name="courseID"
              value={newModuleDetails.courseID}
              // id="inputName"
              onChange={(e) =>
                handleChangeModuleDetails(e.target.name, e.target.value)
              }
              placeholder="Course ID"
            />

            <h6>Course Name</h6>
            <Form.Control
              className="mb-3"
              required
              type="text"
              id="inputName"
              value={newModuleDetails.courseName}
              name="courseName"
              onChange={(e) =>
                handleChangeModuleDetails(e.target.name, e.target.value)
              }
              placeholder="Course Name"
            />

            <h6>Course Code</h6>
            <Form.Control
              className="mb-3"
              type="text"
              required
              id="inputName"
              placeholder="Course Code"
              value={newModuleDetails.courseCode}
              name="courseCode"
              onChange={(e) =>
                handleChangeModuleDetails(e.target.name, e.target.value)
              }
            />

            <h6>Module level</h6>
            <Select
              classNamePrefix="Select-sm mb-3"
              required
              name="moduleLevel"
              value={newModuleDetails.moduleLevel}
              onChange={(value) =>
                handleChangeModuleDetails("moduleLevel", value)
              }
              options={modalLevels}
              placeholder="Module Level"
            />

            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Col>
                <h6>Study Year</h6>
                <Select
                  required
                  classNamePrefix="Select-sm"
                  value={newModuleDetails.studyYr}
                  options={modalStudyYrs}
                  name="studyYr"
                  onChange={(value) =>
                    handleChangeModuleDetails("studyYr", value)
                  }
                  placeholder="Study Year"
                />
              </Col>

              <Col>
                <h6>Sem</h6>
                <Select
                  required
                  classNamePrefix="Select-sm"
                  value={newModuleDetails.sem}
                  options={modalSem}
                  onChange={(value) => handleChangeModuleDetails("sem", value)}
                  placeholder="Sem"
                />
              </Col>
            </Row>

            <h6>School</h6>
            <Select
              required
              classNamePrefix="Select-sm"
              value={newModuleDetails.school}
              onChange={(value) => handleChangeModuleDetails("school", value)}
              options={schools}
              placeholder="School"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" className="ripple" variant="primary">
              {loadingAnime ? "Saving..." : "Save"}
            </Button>
            <Button
              className="ripple"
              variant="secondary"
              onClick={() => setVisible(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

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

      {/* {console.log("reqs", examTTReqs)} */}
      <Card className="card-primary">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={12} md={6}>
                <div className="main-content-label mg-b-5">
                  Add Exam Timetable
                </div>
                <p className="mg-b-20">Exams/Add Exam Timetable</p>
              </Col>
              <Col
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // justifyContent: "flex-end",
                  // backgroundColor: "red",
                }}
              >
                <div
                  onClick={() => console.log("open modal")}
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  <Button
                    className="main-content-label mg-b-5 text-white"
                    onClick={() => setVisible(true)}
                  >
                    Add Course Unit
                  </Button>
                </div>
              </Col>
            </Row>

            <label
              className="main-content-label mg-b-5"
              style={{
                fontSize: 12,
              }}
            >
              General Examination details
            </label>
            <Card
              className="card-body border shadow-none"
              style={{
                padding: 5,
              }}
            >
              <Col lg={12}>
                <Row>
                  <Col lg={6} md={6}>
                    <Form.Group
                      style={{
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                      <label>Campus</label>
                      <Select
                        classNamePrefix="Select-sm"
                        name="staff"
                        isDisabled={numOfRows > 1 ? true : false}
                        required
                        value={headers.campus}
                        onChange={(value) => {
                          headers.campus = value;
                          setHeaders({ ...headers });
                        }}
                        options={campus}
                        placeholder="Campus"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6}>
                    <Form.Group
                      style={{
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                      <label>School</label>
                      <Select
                        classNamePrefix="Select-sm"
                        name="school"
                        isDisabled={numOfRows > 1 ? true : false}
                        required
                        value={headers.school}
                        onChange={(value) => {
                          headers.school = value;
                          setHeaders({ ...headers });
                        }}
                        options={examTTReqs.schools}
                        placeholder="Select School"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={6}>
                    <Form.Group
                      style={{
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                      <label>Study Time</label>
                      <Select
                        classNamePrefix="Select-sm"
                        name="study_time"
                        isDisabled={numOfRows > 1 ? true : false}
                        required
                        value={headers.study_time}
                        onChange={(value) => {
                          headers.study_time = value;
                          setHeaders({ ...headers });
                        }}
                        options={examTTReqs.studyTimes}
                        placeholder="Select Study time"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={6}>
                    <Form.Group
                      style={{
                        marginBottom: 10,
                        marginTop: 0,
                      }}
                    >
                      {/* <Form.Control
                    className="mb-3"
                    type="text"
                    id="inputName"
                    placeholder="Title"
                  /> */}
                      <label>Year - Sem</label>
                      <Select
                        classNamePrefix="Select-sm"
                        name="year_sem"
                        isDisabled={numOfRows > 1 ? true : false}
                        required
                        value={headers.year_sem}
                        onChange={(value) => {
                          headers.year_sem = value;
                          setHeaders({ ...headers });
                        }}
                        options={examTTReqs.year_sem}
                        placeholder="select year - sem"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Card>

            <label
              className="main-content-label mg-b-5 text-center"
              style={{
                fontSize: 12,
                textAlign: "center",
              }}
            >
              Examinations
            </label>

            {[...Array(numOfRows)].map((item, index) => {
              return (
                <Card
                  key={index}
                  className="card-body border shadow-none "
                  style={{
                    padding: 5,
                    //   color: "black",
                    //   borderColor: "blue",
                  }}
                >
                  <Col lg={12}>
                    <Row>
                      <Col lg={6} md={6}>
                        <Form.Group
                          style={{
                            marginBottom: 10,
                            marginTop: 0,
                          }}
                        >
                          {/* <Form.Control
                        className="mb-3"
                        type="text"
                        id="inputName"
                        placeholder="Title"
                      /> */}
                          <label>Date</label>
                          <DatePicker
                            selected={timetable[index].date}
                            onChange={(date) => {
                              const myDate =
                                new Date(date).getFullYear() +
                                "-" +
                                (new Date(date).getMonth() + 1) +
                                "-" +
                                new Date(date).getDate();

                              console.log("Date", myDate);
                              timetable[index].date = date;
                              setTimetable([...timetable]);
                            }}
                            dateFormat="yyyy-MM-dd"
                            className="form-control date-picker"
                          />{" "}
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group
                          style={{
                            marginBottom: 10,
                            marginTop: 0,
                          }}
                        >
                          {/* <Form.Control
                        className="mb-3"
                        type="text"
                        id="inputName"
                        placeholder="Title"
                      /> */}
                          <label>Session</label>
                          <Select
                            classNamePrefix="Select-sm"
                            name="session"
                            required
                            value={timetable[index].session}
                            onChange={(value) => {
                              timetable[index].session = value;
                              setTimetable([...timetable]);
                              // setTimetable(timetableRecords);
                            }}
                            options={examTTReqs.sessions}
                            placeholder="Select Session"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={6}>
                        <Form.Group
                          style={{
                            marginBottom: 10,
                            marginTop: 0,
                          }}
                        >
                          {/* <Form.Control
                        className="mb-3"
                        type="text"
                        id="inputName"
                        placeholder="Title"
                      /> */}
                          <label>Room</label>
                          <Select
                            classNamePrefix="Select-sm"
                            name="room"
                            required
                            value={timetable[index].room}
                            onChange={(value) => {
                              timetable[index].room = value;
                              setTimetable([...timetable]);
                            }}
                            options={examTTReqs.rooms}
                            placeholder="Select Room"
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={6} md={6}>
                        <Form.Group
                          style={{
                            marginBottom: 10,
                            marginTop: 0,
                          }}
                        >
                          {/* <Form.Control
                        className="mb-3"
                        type="text"
                        id="inputName"
                        placeholder="Title"
                      /> */}
                          <label>Course Unit</label>

                          <Select
                            components={{ MenuList }}
                            maxMenuHeight={200}
                            value={timetable[index].courseUnit}
                            onChange={(value) => {
                              let modifiedCourseUnit = {
                                label: `${value.label}`,
                                value: {
                                  ...value.value,
                                  course_code:
                                    headers.study_time.label === "DAY/WEEKEND"
                                      ? `${value.value.course_code}`
                                      : `${value.value.course_code}-${headers.study_time.label}`,
                                },
                              };

                              timetable[index].courseUnit = modifiedCourseUnit;
                              setTimetable([...timetable]);
                            }}
                            classNamePrefix="Select-sm"
                            name="module"
                            // isMulti
                            required
                            options={examTTReqs.modules}
                            placeholder="Select Course Unit"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Card>
              );
            })}

            <div
              style={{
                display: "flex",
                width: "100%",
                //   backgroundColor: "yellow",
                justifyContent: "space-between",
              }}
            >
              <Button type="submit">Save Timetable</Button>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  style={{
                    marginRight: 5,
                  }}
                >
                  <Button
                    onClick={() => {
                      if (numOfRows == 1) {
                        alert("Deleting the 1st row is not allowed");
                      } else {
                        // patient.splice(index, 1);
                        timetable.pop();

                        setNumOfRows(numOfRows - 1);
                      }
                    }}
                    style={{
                      backgroundColor: "red",
                      padding: 0,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </div>
                <div
                  style={{
                    marginLeft: 5,
                  }}
                >
                  <Button
                    onClick={() => {
                      setTimetable(timetable.concat(timetableRecords));

                      setNumOfRows(numOfRows + 1);
                    }}
                    style={{
                      backgroundColor: "blue",
                      padding: 0,
                      width: 40,
                      height: 40,
                    }}
                  >
                    <i className="fa fa-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AssignInvigilators;
