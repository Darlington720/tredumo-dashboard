import React, { useState } from "react";
import { Button, Form, Row, Col, Spinner } from "react-bootstrap";
import Select from "react-select";
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

const TimetableComponent = ({
  reqs,
  days,

  handleSave,
  showDialog,
  setShow3,
  defaultDay,
  defaultSession,
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

  useEffect(() => {
    setSelectedDay(defaultDay);
    setSelectedSession(defaultSession);
  }, [defaultDay, defaultSession]);
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

  const addTableRow = () => {
    setTTinputs([
      ...ttInputs,
      <TableRow index={timetableInputs.length} onRemove={removeTableRow} />,
    ]);
  };

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
      selectedDay,
      selectedSession,
      timetableFormFields,
    };
    setTimetableSaving(true);
    await handleSave(data);
    setTimetableSaving(false);

    //reset the form
    setSelectedDay(null);
    setSelectedSession(null);
    setTTinputs([]);
    setTimetableFormFields(timetableRecords);
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
          "Save Changes"
        )}
      </Button>
      <Button
        className="ripple"
        variant="secondary"
        onClick={() => {
          setShow3(false);
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
        header="Add Timetable"
        visible={showDialog}
        position="top"
        footer={footerContent}
        maximizable
        style={{ width: "70vw", padding: 0 }}
        onHide={() => setShow3(false)}
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
                {existData.length > 0 ? (
                  existData.map((value, key) => (
                    <tr className="iadd">
                      <td className="center" width="90">
                        <div className="checkbox-replace">
                          <label className="i-checks">
                            <input
                              type="checkbox"
                              //   name={`timetable[${key}][break]`}
                              defaultChecked={false}
                            />
                            <i></i>
                          </label>
                        </div>
                      </td>
                      <td width="20%">
                        <div>
                          <Dropdown
                            value={selectedItem}
                            onChange={(e) => setSelectedItem(e.value)}
                            options={items}
                            virtualScrollerOptions={{ itemSize: 38 }}
                            placeholder="Select Item"
                            className="w-full md:w-14rem"
                          />
                        </div>
                      </td>
                      <td width="20%">
                        <div>
                          <Select
                            classNamePrefix="Select-sm"
                            // value={selectedCampus}
                            // onChange={(value) => setSelectedCampus(value)}
                            // options={campus}
                            placeholder="Select Lecturer"
                          />
                          <span className="error"></span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="far fa-clock"></i>
                            </span>
                            <input
                              type="text"
                              name={`timetable[${key}][time_start]`}
                              className="form-control"
                            />
                          </div>
                          <span className="error"></span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="input-group">
                            <span className="input-group-addon">
                              <i className="far fa-clock"></i>
                            </span>
                            <input
                              type="text"
                              name={`timetable[${key}][time_end]`}
                              className="form-control"
                            />
                          </div>
                          <span className="error"></span>
                        </div>
                      </td>
                      <td className="timet-td">
                        <input
                          type="text"
                          className="form-control"
                          name={`timetable[${key}][class_room]`}
                        />
                        <button
                          type="button"
                          className="btn btn-danger removeTR"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
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
                    {ttInputs.map((input, index) => (
                      <TableRow
                        key={index}
                        index={index}
                        onRemove={() => {
                          timetableFormFields.pop();
                          removeTableRow(index);
                        }}
                        checkBoxValue={timetableFormFields[index + 1].day_wkd}
                        cuValue={timetableFormFields[index + 1].courseUnit}
                        lecturerValue={timetableFormFields[index + 1].lecturer}
                        roomValue={timetableFormFields[index + 1].room}
                        onCheckBoxChange={(e) => {
                          timetableFormFields[index + 1].day_wkd =
                            e.target.checked;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        onChangeCU={(e) => {
                          timetableFormFields[index + 1].courseUnit = e.value;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        onChangeLecturer={(e) => {
                          timetableFormFields[index + 1].lecturer = e.value;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        onChangeRoom={(e) => {
                          timetableFormFields[index + 1].room = e.value;
                          setTimetableFormFields([...timetableFormFields]);
                        }}
                        reqs={reqs}
                      />
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 20,
            }}
          >
            <Button
              type="button"
              variant="outline-dark"
              onClick={() => {
                setTimetableFormFields(
                  timetableFormFields.concat(timetableRecords)
                );
                addTableRow();
              }}
              class="btn btn-danger removeTR"
              style={{
                padding: 5,
                //   paddingTop: 0,
                //   paddingLeft: 12,
                //   paddingRight: 12,
                //   height: "auto",
              }}
            >
              <i class="bi bi-plus-square-fill"></i> Add More
            </Button>
          </div>
        </Form>
      </Dialog>
    </div>
  );
};

// const MemoizedTimetableComponent = React.memo(TimetableComponent);

export default TimetableComponent;
