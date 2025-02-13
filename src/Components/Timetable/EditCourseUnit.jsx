import React, { useState } from "react";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import _ from "lodash";
import { useRef } from "react";
import { useEffect } from "react";

const items = Array.from({ length: 100000 }).map((_, i) => ({
  label: `Item #${i}`,
  value: i,
}));

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

// const days = [
//   { label: "Sunday", value: 0 },
//   { label: "Monday", value: 1 },
//   { label: "Tuesday", value: 2 },
//   { label: "Wednesday", value: 3 },
//   { label: "Thursday", value: 4 },
//   { label: "Friday", value: 5 },
//   { label: "Saturday", value: 6 },
// ];

const TableRow = ({
  index,
  onRemove,
  reqs,
  onChangeCU,
  onChangeLecturer,
  onChangeRoom,
  onCheckBoxChange,
  cuValue,
  lecturerValue,
  roomValue,
  checkBoxValue,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <tr>
      <td
        style={{
          //   backgroundColor: "red",

          padding: 5,
          width: "5rem",
          margin: 0,
        }}
      >
        <div
          //   className="checkbox-replace"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "red",
          }}
        >
          <Form.Check
            type="checkbox"
            id="checkbox1"
            value={checkBoxValue}
            onChange={onCheckBoxChange}
            style={{
              fontSize: 25,
              position: "relative",
            }}
          />
        </div>
      </td>
      <td
        style={{
          //   backgroundColor: "red",
          padding: 5,
          maxWidth: "5rem",
          margin: 0,
        }}
      >
        <div>
          <Dropdown
            value={cuValue}
            required
            onChange={onChangeCU}
            options={
              reqs
                ? reqs.modules.map((m) => ({
                    label: `${m.course_name} - ${m.school_id}`,
                    value: m,
                  }))
                : []
            }
            filter
            virtualScrollerOptions={{ itemSize: 38 }}
            placeholder="Select Course Unit"
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
            }}
          />
        </div>
      </td>
      <td
        style={{
          //   backgroundColor: "red",
          padding: 5,
          width: "5rem",
          margin: 0,
        }}
      >
        <div>
          <Dropdown
            value={lecturerValue}
            required
            onChange={onChangeLecturer}
            options={
              reqs
                ? reqs.staff_members.map((member) => ({
                    label: member.staff_name,
                    value: member.staff_id,
                  }))
                : []
            }
            filter
            virtualScrollerOptions={{ itemSize: 38 }}
            placeholder="Select Lecturer"
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
            }}
          />
        </div>
      </td>
      <td
        style={{
          //   backgroundColor: "red",
          padding: 5,
          width: "5rem",
          margin: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            // backgroundColor: "red",
          }}
        >
          <div
            style={{
              width: "80%",
            }}
          >
            <Dropdown
              value={roomValue}
              required
              onChange={onChangeRoom}
              options={
                reqs
                  ? reqs.rooms.map((room) => ({
                      label: room.room_name,
                      value: room.room_id,
                    }))
                  : []
              }
              filter
              virtualScrollerOptions={{ itemSize: 38 }}
              placeholder="Select Room"
              style={{
                width: "100%",
                padding: 0,
                margin: 0,
              }}
            />
          </div>

          <button
            type="button"
            class="btn btn-danger removeTR"
            onClick={onRemove}
            style={{
              padding: 0,
              paddingTop: 0,
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
              class="bi bi-x-lg"
            ></i>
          </button>
        </div>
      </td>
    </tr>
  );
};

const EditCourseUnitModal = ({
  reqs,
  days,

  handleSave,
  showDialog,
  setShow4,
  defaultDay,
  defaultSession,
  selectedCu,
}) => {
  // console.log("defaults", {
  //   defaultDay,
  //   defaultSession,
  // });
  const formRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [selectedSession, setSelectedSession] = useState(defaultSession);
  const [timetableSaving, setTimetableSaving] = useState(false);

  const timetableRecords = [
    {
      room: null,
      courseUnit: null,
      lecturer: null,
      day_wkd: false,
    },
  ];
  const [timetableFormFields, setTimetableFormFields] =
    React.useState(timetableRecords);

  const timetableInputs = [];

  const [ttInputs, setTTinputs] = useState([]);

  useEffect(() => {
    setSelectedDay(defaultDay);
    setSelectedSession(defaultSession);
    console.log("cu---", selectedCu);
    if (selectedCu) {
      let c_id = "";
      const hasHyphen = selectedCu.c_unit_id.includes("-");

      if (hasHyphen) {
        const parts = selectedCu.c_unit_id.split("-");
        c_id = parts[0];
      } else {
        c_id = selectedCu.c_unit_id;
      }

      console.log("c_id---", c_id);
      setTimetableFormFields([
        {
          ...timetableFormFields[0],
          room: selectedCu.room_id,
          courseUnit: {
            course_id: c_id,
            course_name: selectedCu.course_unit_name,
          },
          lecturer: selectedCu.staff_id,
          day_wkd: hasHyphen ? false : true,
        },
      ]);
    }
  }, [defaultDay, defaultSession, selectedCu]);

  const removeTableRow = (indexToRemove) => {
    console.log("index to remove", indexToRemove);
    const updatedInputs = [...ttInputs];
    updatedInputs.splice(indexToRemove, 1);
    setTTinputs(updatedInputs);
    // setTTinputs((prevInputs) =>
    //   prevInputs.filter((_, i) => i !== indexToRemove)
    // );
  };

  const handleSub = async (e) => {
    // e.preventDefault();
    const data = {
      tt_id: selectedCu.tt_id,
      selectedDay,
      selectedSession,
      timetableFormFields,
    };

    console.log("data", data);
    setTimetableSaving(true);
    await handleSave(data);
    setTimetableSaving(false);

    // //reset the form
    // setSelectedDay(null);
    // setSelectedSession(null);
    // setTTinputs([]);
    // setTimetableFormFields(timetableRecords);
  };

  const footerContent = (
    <div>
      <Button onClick={handleSub} className="ripple" variant="primary">
        {timetableSaving ? (
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
          "Update"
        )}
      </Button>
      <Button
        className="ripple"
        variant="secondary"
        onClick={() => {
          setShow4(false);
        }}
      >
        Close
      </Button>
    </div>
  );

  //   console.log("items", items);
  const [existData, setExistData] = useState([]);

  return (
    <div>
      <Dialog
        header="Edit Timetable"
        visible={showDialog}
        position="top"
        footer={footerContent}
        maximizable
        style={{ width: "70vw", padding: 0 }}
        onHide={() => setShow4(false)}
      >
        <Form ref={formRef} id="myForm" onSubmit={handleSub}>
          <Row
            style={{
              paddingBottom: 10,
            }}
          >
            <Col lg={4}>
              <label className="lb">Day</label>
              <Dropdown
                value={selectedDay}
                required
                onChange={(e) => {
                  setSelectedDay(e.value);
                  console.log("the value", e.value);
                }}
                options={days.map((day) => ({
                  label: day,
                  value: dayNameToNumber(day),
                }))}
                virtualScrollerOptions={{ itemSize: 38 }}
                placeholder="Select Day"
                style={{
                  width: "100%",
                  padding: 0,
                  margin: 0,
                  fontSize: 10,
                }}
              />

              {/* <!-- input-group --> */}
            </Col>
            <Col lg={4}>
              <label className="lb">Session</label>
              <Dropdown
                value={selectedSession}
                required
                onChange={(e) => setSelectedSession(e.value)}
                options={
                  reqs
                    ? reqs.sessions.map((s) => ({
                        label: s.session_name,
                        value: s.ls_id,
                      }))
                    : []
                }
                virtualScrollerOptions={{ itemSize: 38 }}
                placeholder="Select Session"
                style={{
                  width: "100%",
                  padding: 0,
                  margin: 0,
                }}
              />
            </Col>
          </Row>
          <div className="table-responsive">
            <table
              style={{
                zIndex: -999,
              }}
              className="table table-bordered table-condensed"
            >
              <thead>
                <tr>
                  <th
                    style={{
                      width: "10%",
                    }}
                  >
                    Day/Weekend
                  </th>
                  <th
                    style={{
                      width: "30%",
                    }}
                  >
                    Course Unit <span className="required">*</span>
                  </th>
                  <th
                    style={{
                      width: "30%",
                    }}
                  >
                    Lecturer <span className="required">*</span>
                  </th>

                  <th
                    style={{
                      width: "30%",
                    }}
                  >
                    Room
                  </th>
                </tr>
              </thead>
              <tbody
                id="timetable_entry_append"
                style={{
                  borderBottom: "1px solid #ddd",
                }}
              >
                <>
                  <tr>
                    {/* Render hidden inputs */}
                    <td
                      style={{
                        //   backgroundColor: "red",
                        // width: 5,
                        width: "10%",
                        padding: 5,
                        margin: 0,
                      }}
                    >
                      <div
                        //   className="checkbox-replace"
                        style={{
                          display: "flex",
                          alignItems: "center",

                          justifyContent: "center",
                          // backgroundColor: "red",
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          id="checkbox1"
                          style={{
                            fontSize: 25,
                            position: "relative",
                          }}
                          value={timetableFormFields[0].day_wkd}
                          defaultChecked={timetableFormFields[0].day_wkd}
                          onChange={(e) => {
                            timetableFormFields[0].day_wkd = e.target.checked;
                            setTimetableFormFields([...timetableFormFields]);
                          }}
                        />
                      </div>
                    </td>
                    <td
                      style={{
                        //   backgroundColor: "red",
                        padding: 5,
                        maxWidth: "5rem",
                        margin: 0,
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                        <Dropdown
                          value={timetableFormFields[0].courseUnit}
                          required
                          onChange={(e) => {
                            timetableFormFields[0].courseUnit = e.value;
                            setTimetableFormFields([...timetableFormFields]);
                          }}
                          options={
                            reqs
                              ? reqs.modules.map((m) => ({
                                  label: `${m.course_name} - ${m.school_id}`,
                                  value: {
                                    course_id: m.course_id,
                                    course_name: m.course_name,
                                  },
                                }))
                              : []
                          }
                          filter
                          virtualScrollerOptions={{ itemSize: 38 }}
                          placeholder="Select Course Unit"
                          style={{
                            width: "100%",
                            padding: 0,
                            margin: 0,
                          }}
                        />
                      </div>
                    </td>
                    <td
                      style={{
                        //   backgroundColor: "red",
                        padding: 5,
                        width: "5rem",
                        margin: 0,
                        overflow: "hidden",
                      }}
                    >
                      <Dropdown
                        value={timetableFormFields[0].lecturer}
                        required
                        onChange={(e) => {
                          timetableFormFields[0].lecturer = e.value;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        options={
                          reqs
                            ? reqs.staff_members.map((member) => ({
                                label: member.staff_name,
                                value: member.staff_id,
                              }))
                            : []
                        }
                        filter
                        virtualScrollerOptions={{ itemSize: 38 }}
                        placeholder="Select Lecturer"
                        style={{
                          width: "100%",
                          padding: 0,
                          margin: 0,
                        }}
                      />
                    </td>
                    <td
                      style={{
                        //   backgroundColor: "red",
                        padding: 5,
                        width: "5rem",
                        margin: 0,
                        overflow: "hidden",
                      }}
                    >
                      <Dropdown
                        value={timetableFormFields[0].room}
                        required
                        onChange={(e) => {
                          timetableFormFields[0].room = e.value;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        options={
                          reqs
                            ? reqs.rooms.map((room) => ({
                                label: room.room_name,
                                value: room.room_id,
                              }))
                            : []
                        }
                        filter
                        virtualScrollerOptions={{ itemSize: 38 }}
                        placeholder="Select Room"
                        style={{
                          width: "100%",
                          padding: 0,
                          margin: 0,
                        }}
                      />
                    </td>
                  </tr>
                </>
              </tbody>
            </table>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

// const MemoizedTimetableComponent = React.memo(TimetableComponent);

export default EditCourseUnitModal;
