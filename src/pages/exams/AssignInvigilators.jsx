import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Swal from "sweetalert2";
import staffApi from "../../../api/staffApi";

const campus = [
  { value: "MAIN", label: "Main Campus" },
  { value: "KAMPALA", label: "Kampala Campus" },
];

const initialReqs = {
  rooms: [],
  invigilators: [],
  sessions: [],
};

const initialState = {
  invigilators: [],
  campus: [],
  date: new Date(),
  session: [],
  room: "",
};

function AssignInvigilators() {
  const [invReqs, setInvReqs] = useState(initialReqs);
  const [data, setData] = useState(initialState);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadReqs = async () => {
    const res = await staffApi.getAssignInvReqs();

    if (!res.ok) {
      console.log(res.data);
      return alert(
        "Failed to load the requirements needed to start assigning invigilators"
      );
    }

    console.log(res.data);

    let reqs = {
      invigilators: [],
      rooms: [],
      sessions: [],
    };

    //rooms
    res.data.result.rooms.forEach((room) => {
      reqs.rooms.push({
        value: room.room_id,
        label: room.room_name,
      });
    });

    // sessions

    res.data.result.sessions.forEach((examSession) => {
      reqs.sessions.push({
        value: examSession.s_id,
        label: examSession.session_name,
      });
    });

    //invigilators
    res.data.result.staff_members.forEach((staff) => {
      reqs.invigilators.push({
        value: staff.staff_id,
        label: `${staff.title} ${staff.staff_name}`,
      });
    });

    setInvReqs(reqs);
  };

  const getExams = async (data) => {
    setLoading(true);
    const res = await staffApi.getExamsInRoom(data);
    setLoading(false);

    if (!res.ok) {
      console.log("Error in getting exam data", res, data);
      return alert(
        "Failed to get the exams for the specified session and room"
      );
    }

    let tempArr = [];

    res.data.result.forEach((x) => {
      tempArr.push({
        value: x.course_unit_code,
        label: x.course_unit_name,
      });
    });

    setExams(tempArr);
    // console.log("Exams ", exams);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToBeSent = {
      room: data.room,
      invigilators: data.invigilators,
      session: data.session,
      date: data.date,
      campus: data.campus,
      status: 0,
      assigned_by: 1,
    };

    // console.log(dataToBeSent);
    setLoading(true);
    const res = await staffApi.addInvigilators(dataToBeSent);
    setLoading(false);

    if (!res.ok) {
      console.log("Failed to add invigilator data to the database", res.data);
      return alert("Failed to add invigilator data to the database");
    }

    // console.log("logs", res.data);

    if (res.data.success) {
      setData(initialState);
      setExams([]);
      return Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
      });
    }
  };

  useEffect(() => {
    loadReqs();
  }, []);

  return (
    <Col md={12} xl={12} xs={12} sm={12}>
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
      <Card className="card-primary">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="main-content-label mg-b-5">Assign Invigilators</div>
            <p className="mg-b-20">exams/Assign invigilators</p>
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
                      required
                      defaultValue={campus[0]}
                      value={data.campus[0]}
                      onChange={(value) => {
                        data.campus = value;
                        setData({ ...data });
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
                    <label>Date</label>
                    <DatePicker
                      selected={data.date}
                      onChange={(date) => {
                        const myDate =
                          new Date(date).getFullYear() +
                          "-" +
                          (new Date(date).getMonth() + 1) +
                          "-" +
                          new Date(date).getDate();

                        console.log("Date", myDate);
                        data.date = date;
                        setData({ ...data });
                      }}
                      dateFormat="yyyy-MM-dd"
                      className="form-control date-picker"
                    />{" "}
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
                      value={data.room}
                      onChange={(value) => {
                        data.room = value;
                        setData({ ...data });
                      }}
                      options={invReqs.rooms}
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
                    <label>Session</label>
                    <Select
                      classNamePrefix="Select-sm"
                      name="session"
                      required
                      value={data.session}
                      onChange={(value) => {
                        data.session = value;
                        setData({ ...data });

                        const dataToBeSent = {
                          date: data.date,
                          room: data.room,
                          session: value,
                          campus: data.campus,
                        };

                        if (data.room) {
                          getExams(dataToBeSent);
                        }

                        // console.log("Required Data", dataToBeSent);
                        // getExams(dataToBeSent);
                        // setTimetable(timetableRecords);
                      }}
                      options={invReqs.sessions}
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
                    <label>Exam</label>
                    <Select
                      options={exams}
                      isMulti
                      maxMenuHeight={200}
                      value={exams}
                      // onChange={(value) => setSelectedIngilat(value)}
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
                    <label>Invigilator</label>
                    <Select
                      classNamePrefix="Select-sm"
                      isMulti
                      name="invigilator"
                      required
                      value={data.invigilators}
                      onChange={(value) => {
                        data.invigilators = value;
                        setData({ ...data });
                      }}
                      options={invReqs.invigilators}
                      placeholder="Select Invigilator"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit">Assign</Button>
            </Col>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AssignInvigilators;
