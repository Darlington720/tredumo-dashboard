import React, { useRef, useEffect } from "react";
import {
  Card,
  OverlayTrigger,
  Tooltip,
  Row,
  Col,
  InputGroup,
  Button,
  Modal,
  Spinner,
  Form,
} from "react-bootstrap";

import styles from "./Indexpage.module.scss";

import Select from "react-select";
import { useState } from "react";
import TimetableComponent from "./TtContentInputs";
import { Toast } from "primereact/toast";
import timetableApi from "../../../api/timetableApi";
import _ from "lodash";
import EditCourseUnitModal from "./EditCourseUnit";

const dayNameToNumber = (dayName) => {
  const days = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  return days[dayName.toLowerCase()] || 0; // -1 for invalid day names
};

const campus = [
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
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
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

const CourseUnit = ({
  courseUnitName,
  lecturer,
  room,
  onClickEditCU,
  onClickDeleteCU,
}) => (
  <div
    style={{
      display: "flex",
      marginBottom: 10,
    }}
  >
    <div
      style={{
        marginRight: 5,
      }}
    >
      -
    </div>
    <div>
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip>{courseUnitName}</Tooltip>}
      >
        <div
          style={{
            // backgroundColor: "red",
            whiteSpace: "normal",
            textOverflow: "ellipsis",
            overflow: "hidden",
            // width: 150,
            height: "2.3em", // Two lines of text, each with 2.2em height
            lineHeight: "1.1em",
            display: "-webkit-box", // Set display to support ellipsis in multi-line text
            WebkitLineClamp: 2, // Number of lines to display
            WebkitBoxOrient: "vertical", // Text orientation within the box
          }}
        >
          {courseUnitName}
        </div>
      </OverlayTrigger>
      <div
        style={{
          display: "flex",
        }}
      >
        <OverlayTrigger placement="top" overlay={<Tooltip>{lecturer}</Tooltip>}>
          <div
            style={{
              marginRight: 10,
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              width: "8em",
            }}
          >
            <strong>{lecturer}</strong>
          </div>
        </OverlayTrigger>

        <div>
          <span>{room}</span>
        </div>
      </div>
      <a
        onClick={onClickEditCU}
        className="btn btn-success btn-sm text-white"
        style={{
          marginRight: 5,
        }}
      >
        Edit
      </a>
      <a
        onClick={onClickDeleteCU}
        style={{
          marginLeft: 5,
        }}
        className="btn btn-danger btn-sm"
        data-id="Sunday,11"
        data-toggle="modal"
      >
        Delete
      </a>
    </div>
  </div>
);

const Indexpage = () => {
  const toast = useRef(null);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [reqs, setReqs] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [selectedAccYr, setSelectedAccYr] = useState();
  const [selectedSem, setSelectedSem] = useState();
  const [selectedStudyTime, setSelectedStudyTime] = useState();
  const [dynamicDays, setDynamicDays] = useState([]);
  const [uniqueSessions, setUniqueSessions] = useState([]);
  const [title, setTitle] = useState();
  const [timetableLoading, setTimetableLoading] = useState(false);
  const [chosenDay, setChosenDay] = useState();
  const [chosenSession, setChosenSession] = useState();
  const [selectedCu, setSelectedCu] = useState();

  const [timetable, setTimetable] = useState();

  const items = Array.from({ length: 100000 }).map((_, i) => ({
    label: `Item #${i}`,
    value: i,
  }));

  const loadClassTTReqs = async () => {
    setLoading(true);
    const res = await timetableApi.getClassTTReqs();
    setLoading(false);
    if (!res.ok) {
      return alert("Failed to load the start up data");
    }
    console.log("result", res.data.result);
    setReqs(res.data.result);
  };

  useEffect(() => {
    loadClassTTReqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedSchool ||
      !selectedCampus ||
      !selectedAccYr ||
      !selectedStudyTime ||
      !selectedSem
    ) {
      return alert("All the fields are required!!!");
    }

    // console.log("data to be sent", {
    //   campus: selectedCampus,
    //   school: selectedSchool,
    //   accYr: selectedAccYr,
    //   sem: selectedSem,
    //   studyTime: selectedStudyTime,
    // });

    const sentData = {
      school_id: selectedSchool.value.school_id,
      study_time_id: selectedStudyTime.value.study_time_code,
      campus: selectedCampus.value,
      sem: selectedSem.value,
      year: selectedAccYr.value,
    };

    console.log("sent...", sentData);
    setTimetableLoading(true);
    const res = await timetableApi.getLectureTimetable(sentData);
    setTimetableLoading(false);

    if (!res.ok) {
      return alert("Failed to load lecture timetable");
    }

    console.log("days chosen", JSON.parse(selectedStudyTime.value.days_taught));

    setDynamicDays(JSON.parse(selectedStudyTime.value.days_taught));

    if (res.data.success) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Timetable Loaded Successfully",
        life: 3000,
      });
    }
    console.log("timetable", res.data.result);
    setTimetable(res.data.result);

    const unique = _.uniqBy(res.data.result, "session_id");

    console.log("unique sessions", unique);
    setUniqueSessions(unique);
    setTitle(
      `Timetable-${selectedSchool.value.alias}-${selectedStudyTime.value.study_time_name}`
    );
  };

  const handleSaveTT = async (data) => {
    const sentData = {
      school_id: selectedSchool.value.school_id,
      study_time_id: selectedStudyTime.value.study_time_code,
      campus: selectedCampus.value,
      sem: selectedSem.value,
      year: selectedAccYr.value,
    };

    console.log("headers", sentData);
    const x = data.timetableFormFields.map((tt_field) => {
      if (tt_field.day_wkd) {
        return {
          selectedDay: data.selectedDay,
          selectedSession: data.selectedSession,
          ...tt_field,
          courseUnit: {
            ...tt_field.courseUnit,
            course_id: tt_field.courseUnit.course_id,
          },
        };
      } else {
        return {
          selectedDay: data.selectedDay,
          selectedSession: data.selectedSession,
          ...tt_field,
          courseUnit: {
            ...tt_field.courseUnit,
            course_id: `${tt_field.courseUnit.course_id}-${selectedStudyTime.value.study_time_name}`,
          },
        };
      }
    });

    //handling day/wkd

    // console.log("handling it", x);

    const d = {
      headers: sentData,
      timetable: x,
    };

    const res = await timetableApi.saveLectureTimetable(d);

    if (!res.ok) {
      return alert(res.data.message);
    }

    console.log("insert response", res.data);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: res.data.message,
      life: 3000,
    });

    //refetch the timetable to view the changes
    setLoading(true);
    const res2 = await timetableApi.getLectureTimetable(sentData);
    setLoading(false);

    // console.log("timetable", res.data.result);
    setTimetable(res2.data.result);

    const unique = _.uniqBy(res2.data.result, "session_id");

    // console.log("unique sessions", unique);
    setUniqueSessions(unique);
  };

  const handleUpdateTT = async (data) => {
    const sentData = {
      school_id: selectedSchool.value.school_id,
      study_time_id: selectedStudyTime.value.study_time_code,
      campus: selectedCampus.value,
      sem: selectedSem.value,
      year: selectedAccYr.value,
    };

    const x = data.timetableFormFields.map((tt_field) => {
      if (tt_field.day_wkd) {
        return {
          selectedDay: data.selectedDay,
          tt_id: data.tt_id,
          selectedSession: data.selectedSession,
          ...tt_field,
          courseUnit: {
            ...tt_field.courseUnit,
            course_id: tt_field.courseUnit.course_id,
          },
        };
      } else {
        return {
          selectedDay: data.selectedDay,
          tt_id: data.tt_id,
          selectedSession: data.selectedSession,
          ...tt_field,
          courseUnit: {
            ...tt_field.courseUnit,
            course_id: `${tt_field.courseUnit.course_id}-${selectedStudyTime.value.study_time_name}`,
          },
        };
      }
    });

    //handling day/wkd

    // console.log("handling it", x);

    const d = {
      timetable: x,
    };

    const res = await timetableApi.updateLectureTimetable(d);

    if (!res.ok) {
      return alert(res.data.message);
    }

    console.log("insert response", res.data);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: res.data.message,
      life: 3000,
    });

    //refetch the timetable to view the changes
    setLoading(true);
    const res2 = await timetableApi.getLectureTimetable(sentData);
    setLoading(false);

    // console.log("timetable", res.data.result);
    setTimetable(res2.data.result);

    const unique = _.uniqBy(res2.data.result, "session_id");

    // console.log("unique sessions", unique);
    setUniqueSessions(unique);
  };

  const handleDeleteCU = async (data) => {
    const sentData = {
      school_id: selectedSchool.value.school_id,
      study_time_id: selectedStudyTime.value.study_time_code,
      campus: selectedCampus.value,
      sem: selectedSem.value,
      year: selectedAccYr.value,
    };

    const res = await timetableApi.deleteCuFromTT(data.tt_id);

    if (!res.ok) {
      return alert(res.data.message);
    }

    // console.log("insert response", res.data);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: res.data.message,
      life: 3000,
    });

    //refetch the timetable to view the changes
    setLoading(true);
    const res2 = await timetableApi.getLectureTimetable(sentData);
    setLoading(false);

    // console.log("timetable", res.data.result);
    setTimetable(res2.data.result);

    const unique = _.uniqBy(res2.data.result, "session_id");

    // console.log("unique sessions", unique);
    setUniqueSessions(unique);
  };

  return (
    <div className={styles.Indexpage}>
      <Toast ref={toast} />
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          <div>
            <h4 className="main-content-title tx-24 mg-b-1 mg-b-lg-1">
              Lecture Timetable
            </h4>
          </div>
        </div>
      </div>
      <div>
        <TimetableComponent
          reqs={reqs}
          timetable={timetable}
          days={dynamicDays}
          selectedStudyTime={selectedStudyTime}
          handleSave={handleSaveTT}
          showDialog={show3}
          setShow3={setShow3}
          defaultDay={chosenDay}
          defaultSession={chosenSession}
        />

        <EditCourseUnitModal
          reqs={reqs}
          timetable={timetable}
          days={dynamicDays}
          selectedStudyTime={selectedStudyTime}
          handleSave={handleUpdateTT}
          showDialog={show4}
          setShow4={setShow4}
          defaultDay={chosenDay}
          defaultSession={chosenSession}
          selectedCu={selectedCu}
        />

        <Form onSubmit={handleSubmit}>
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
                options={
                  reqs
                    ? reqs.campus.map((cam) => ({
                        label: cam.campus_name,
                        value: cam.cam_id,
                      }))
                    : []
                }
                placeholder="Campus"
              />
            </Col>
            <Col lg={3}>
              <label className="lb">School</label>
              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedSchool}
                onChange={(value) => setSelectedSchool(value)}
                options={
                  reqs
                    ? reqs.schools.map((sch) => ({
                        label: sch.school_name,
                        value: sch,
                      }))
                    : []
                }
                placeholder="Select School"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Acc Year</label>
              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedAccYr}
                onChange={(value) => setSelectedAccYr(value)}
                options={years}
                placeholder="Select Acc/yr"
              />
              {/* <!-- input-group --> */}
            </Col>
            <Col lg={2}>
              <label className="lb">Sem</label>
              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedSem}
                onChange={(value) => setSelectedSem(value)}
                options={sem}
                placeholder="Select Sem"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Study Time</label>

              <Select
                classNamePrefix="Select-sm"
                required
                value={selectedStudyTime}
                onChange={(value) => setSelectedStudyTime(value)}
                options={
                  reqs
                    ? reqs.study_times.map((st) => ({
                        label: st.study_time_name,
                        value: st,
                      }))
                    : []
                }
                placeholder="Study Time"
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
                // onClick={loadData}
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
                {timetableLoading ? (
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
      {dynamicDays.length > 0 && (
        <Card
          style={{
            boxShadow: "none",
            borderColor: "lightgray",
            borderWidth: 1,
            padding: 0,
          }}
        >
          <div
            className="col-md-12"
            style={{
              paddingTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div>
                <h4>{title}</h4>
              </div>
              <div>
                <Button
                  onClick={() => setShow3(true)}
                  className="btn-success"
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
                  Add
                </Button>
              </div>
            </div>
            <div className="table-responsive">
              <table
                // id="example1"
                className="table table-bordered table-striped"
              >
                <thead className="tt-thead">
                  <tr className="tt-thead">
                    <th className="col-md-2 text-white">Time</th>
                    {/* <th className="col-md-1 text-white">Sunday</th> */}
                    {dynamicDays.map((day, index) => (
                      <th key={index} className="col-md-2 text-white">
                        {day}
                      </th>
                    ))}
                    {/* <th className="col-md-2 text-white">Monday</th>
                  <th className="col-md-2 text-white">Tuesday</th>
                  <th className="col-md-2 text-white">Wednesday</th>
                  <th className="col-md-2 text-white">Thursday</th>
                  <th className="col-md-2 text-white">Friday</th> */}
                    {/* <th className="col-md-1 text-white">Saturday</th> */}
                  </tr>
                </thead>
                <tbody>
                  {/* Repeat the following row structure for different time slots */}
                  {uniqueSessions.length > 0
                    ? uniqueSessions.map((session) => (
                        <tr
                          key={session.ls_id}
                          style={{
                            whiteSpace: "nowrap",
                          }}
                          id="7.00_8.00"
                        >
                          <th
                            style={{
                              color: "white",
                              backgroundColor: "#666",
                              // fontSize: 12,
                            }}
                          >
                            <span id="spanSTime_" data-id="7.00">
                              {session.start_time}
                            </span>{" "}
                            -{" "}
                            <span id="spanETime_" data-id="8.00">
                              {session.end_time}
                            </span>
                          </th>
                          {dynamicDays.map((d, index) => (
                            <td
                              style={{
                                // whiteSpace: "nowrap",
                                maxWidth: "20%",
                              }}
                            >
                              {_.filter(timetable, {
                                day_id: dayNameToNumber(d).toString(),
                                ls_id: session.ls_id,
                              }).map((cu, indx) => (
                                <div key={indx}>
                                  <CourseUnit
                                    courseUnitName={cu.course_unit_name}
                                    lecturer={cu.staff_name}
                                    room={cu.room_name}
                                    onClickEditCU={() => {
                                      setChosenDay(dayNameToNumber(d));
                                      setChosenSession(session.ls_id);
                                      setSelectedCu(cu);
                                      setShow4(true);
                                    }}
                                    onClickDeleteCU={() => {
                                      if (
                                        confirm(
                                          "Are You sure you want to delete this course from the timetable"
                                        )
                                      ) {
                                        handleDeleteCU(cu);
                                      }
                                    }}
                                  />
                                  <hr
                                    style={{
                                      padding: 0,
                                      marginBottom: 5,
                                      marginTop: 1,
                                    }}
                                  />
                                </div>
                              ))}

                              <a
                                onClick={() => {
                                  // console.log("day", dayNameToNumber(d));
                                  // console.log("session", session.ls_id);
                                  setChosenDay(dayNameToNumber(d));
                                  setChosenSession(session.ls_id);
                                  setShow3(true);
                                }}
                                className="btn btn-success btn-sm text-white"
                                style={{
                                  marginTop: 5,
                                  alignSelf: "flex-end",
                                }}
                                data-id="Sunday,11"
                                data-toggle="modal"
                              >
                                Add
                              </a>
                              {/* Add content for Sunday */}
                            </td>
                          ))}

                          {/* Add similar cells for other days */}
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      )}

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
