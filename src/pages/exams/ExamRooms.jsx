import React, { useRef, useState } from "react";
import { Row, Col, Button, Spinner, Form, Card } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import { Toast } from "primereact/toast";
import ExamRoomsTable from "./ExamRoomsTable";
import dashbaordApi from "../../../api/dashboardApi";

const campus = [
  { value: "1", label: "MAIN" },
  { value: "2", label: "KAMPALA" },
];

const exams = [
  { value: "1", label: "FEB 2024 EXAMS" },
  { value: "2", label: "AUG 2023 EXAMS" },
];

function convertDateFormat(inputDate) {
  const parts = inputDate.split("/");
  const year = parts[2];
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const getUniqueRoomsCount = (roomDataArray) => {
  const roomDataArr = roomDataArray.map((room) => room.room_data);
  const uniqueRooms = new Set();

  roomDataArr.forEach((room) => {
    uniqueRooms.add(room.room_id);
  });

  return uniqueRooms.size;
};
const ExamCard = ({ title, backgroundColor, total, onClick }) => {
  return (
    // <Col xl={3} lg={6} md={6} xm={12}>
    <Card
      className={`overflow-hidden sales-card ${backgroundColor}`}
      style={{
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="px-3 pt-2 pb-1 pt-0">
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

function ExamRooms() {
  const toast = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCampus, setSelectedCampus] = useState();
  const [rooms, setRooms] = useState([]);
  const [uniqueRooms, setUniqueRooms] = useState(0);
  const [totalStds, setTotalStds] = useState(0);
  const [totalInvigilators, setTotalInvigilators] = useState(0);
  let total = 0;
  let totalInv = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      campus: selectedCampus.label,
      date: convertDateFormat(new Date(selectedDate).toLocaleDateString()),
    };

    // console.log("payload", payload);

    setLoading(true);
    const res = await dashbaordApi.load_assigned_rooms(payload);
    setLoading(false);

    if (!res.ok) {
      return toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to load examination rooms",
        life: 3000,
      });
    }

    console.log("the response", res.data.result);

    res.data.result.map((room) => {
      if (room.examsDidInRoom) {
        total += room.examsDidInRoom.totalStudents;
      }

      if (room.otherInvigilators) {
        totalInv += room.otherInvigilators.length;
      }
    });

    // console.log("total stds", total);
    setTotalStds(total);
    setTotalInvigilators(totalInv);
    setRooms(res.data.result);
    // console.log("unique rooms", getUniqueRoomsCount(res.data.result));
    setUniqueRooms(getUniqueRoomsCount(res.data.result));
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: res.data.message ? res.data.message : "Rooms loaded successfully",
      life: 3000,
    });
  };
  return (
    <div>
      <Toast ref={toast} />
      <div
        style={{
          marginBottom: 20,
        }}
      >
        <h4 className="tx-24">Examination Report</h4>
      </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Row
            className="row-sm center"
            style={{
              // backgroundColor: "red",
              marginBottom: 20,
              // alignItems: "center",
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
                placeholder="Campus"
              />
            </Col>
            <Col lg={2}>
              <label className="lb">Date</label>
              <br />
              <div
                style={{
                  marginBottom: 2,
                }}
              ></div>

              <div>
                <ReactDatePicker
                  required
                  selected={selectedDate}
                  onChange={(date) => {
                    const myDate =
                      new Date(date).getFullYear() +
                      "-" +
                      (new Date(date).getMonth() + 1) +
                      "-" +
                      new Date(date).getDate();

                    // console.log("Date", myDate);
                    // timetable[index].date = date;
                    setSelectedDate(new Date(myDate));
                  }}
                  // calendarContainer={}

                  dateFormat="yyyy-MM-dd"
                  className="form-control date-picker"
                  popperClassName="date-popper"
                />
              </div>
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

      <Row>
        <Col md={9}>
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 0,
            }}
          >
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
                  {"Rooms"}
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
                  disabled={true}
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
              <ExamRoomsTable data={rooms} yr={null} selectedDate={null} />
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card
            style={{
              boxShadow: "none",
              borderColor: "lightgray",
              borderWidth: 1,
              padding: 10,
              paddingTop: 20,
            }}
          >
            <ExamCard
              title={"TOTAL ROOMS"}
              total={uniqueRooms}
              backgroundColor="bg-success-gradient"
            />
            <ExamCard
              title={"TOTAL SESSIONS"}
              total={rooms.length}
              backgroundColor="bg-info-gradient"
            />

            <ExamCard
              title={"TOTAL STUDENTS SCANNED"}
              total={totalStds}
              backgroundColor="bg-danger-gradient"
            />

            <ExamCard
              title={"TOTAL INVIGILATORS ASSIGNED"}
              total={totalInvigilators}
              backgroundColor="bg-warning-gradient"
            />
          </Card>
        </Col>
      </Row>

      <div></div>
    </div>
  );
}

export default ExamRooms;
