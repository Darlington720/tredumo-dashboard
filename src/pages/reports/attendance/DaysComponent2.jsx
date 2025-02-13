import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Table,
  ProgressBar,
  Accordion,
} from "react-bootstrap";
// import BootstrapTable from "react-bootstrap-table-next";
import _ from "lodash";

function convertDateFormat(inputDate) {
  const parts = inputDate.split("/");
  const year = parts[2];
  const month = parts[0].padStart(2, "0");
  const day = parts[1].padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const DaysComponent = React.memo(({ year, month, staffData }) => {
  const daysInMonth = new Date(year, month, 0).getDate();

  let weekends = 0;

  const _days = Array.from({ length: daysInMonth }, (_, day) => {
    const date = new Date(year, month - 1, day + 1); // Adding 1 to day since day is 0-based
    // console.log("days in the month", date);
    const formattedDate =
      date.toLocaleString("en-US", { weekday: "short" }) +
      " " +
      date.toLocaleString("en-US", { day: "2-digit" });

    if (date.getDay() === 0) {
      weekends++;
      return {
        dataField: convertDateFormat(date.toLocaleDateString()),
        text: formattedDate,
      };
    } else {
      return {
        dataField: convertDateFormat(date.toLocaleDateString()),
        text: formattedDate,
      }; // Return a value since map expects a return
    }
  });

  const columns = [
    {
      dataField: "staff_name",
      text: "Staff",
    },
    // ..._days,
    // {
    //   dataField: "name",
    //   text: "%",
    // },
    // {
    //   dataField: "price",
    //   text: "W",
    // },
    // {
    //   dataField: "name",
    //   text: "P",
    // },
    // {
    //   dataField: "price",
    //   text: "A",
    // },
  ];
  console.log("columns", columns);

  //   console.log("month", month);
  //   console.log("daysInMonth", daysInMonth);

  // Rest of your component code

  return (
    // JSX for your component
    <>
      {/* <BootstrapTable
        keyField="staff_name"
        data={[
          {
            staff_name: "Akampa",
            // "2023-02-01": "p",
          },
        ]}
        columns={columns}
      /> */}
      <Table
        responsive
        bordered
        hover
        condensed
        style={{
          padding: 0,
          marginBottom: 5,
        }}
      >
        <thead
          style={{
            padding: 0,
          }}
        >
          <tr
            style={{
              padding: 0,
              margin: 0,
              // backgroundColor: "red",
              backgroundColor: "lightgray",
              // textAlign: "start",
            }}
          >
            <th
              style={{
                padding: 5,
                textTransform: "capitalize",
                // textAlign: "start",
              }}
            >
              Staff
            </th>
            {Array.from({ length: daysInMonth }, (_, day) => {
              const date = new Date(year, month - 1, day + 1); // Adding 1 to day since day is 0-based
              // console.log("days in the month", date);
              const formattedDate =
                date.toLocaleString("en-US", { weekday: "short" }) +
                " " +
                date.toLocaleString("en-US", { day: "2-digit" });

              if (date.getDay() === 0) {
                weekends++;
                return (
                  <th
                    key={day}
                    style={{
                      padding: 5,
                      backgroundColor: "#f99",
                      textTransform: "capitalize",
                    }}
                    className="text-center no-sort"
                    // style={cellStyle}
                  >
                    {formattedDate}
                  </th>
                );
              } else {
                return (
                  <th
                    key={day}
                    style={{
                      padding: 5,
                      textTransform: "capitalize",

                      // backgroundColor: "blue",
                    }}
                    className="text-center no-sort"
                    // style={cellStyle}
                  >
                    {formattedDate}
                  </th>
                ); // Return a value since map expects a return
              }
            })}
            <th
              className="text-center"
              style={{
                // paddingRight: "15px !important",
                padding: 5,
                textAlign: "center",
              }}
            >
              (%)
            </th>
            <th
              className="text-center"
              style={{
                // paddingRight: "15px !important",
                padding: 5,
                textAlign: "center",
              }}
            >
              W
            </th>
            <th
              className="text-success"
              style={{
                // paddingRight: "15px !important",
                padding: 5,
                textAlign: "center",
              }}
            >
              P
            </th>
            <th
              className="text-danger"
              style={{
                // paddingRight: "15px !important",
                padding: 5,
                textAlign: "center",
              }}
            >
              A
            </th>
            {/* <th className="text-center text-tertiary" style={{ paddingRight: '15px !important' }}>L</th>
<th className="text-center text-tertiary">HD</th> */}
          </tr>
        </thead>
        <tbody
          style={{
            padding: 0,
          }}
        >
          {staffData
            ? staffData.map((member, index) => {
                let present = 0;
                let absent = 0;

                return (
                  <tr key={index}>
                    <td
                      style={{
                        padding: 5,
                        fontSize: 13,
                        // textAlign: "center",
                      }}
                    >
                      {member.staff_name}
                    </td>

                    {Array.from({ length: daysInMonth }, (item, day) => {
                      const date = new Date(year, month - 1, day + 1);
                      // const formatedDate1 = convertDateFormat(date.toLocaleDateString())

                      //   console.log(
                      //     "iso date",
                      //     convertDateFormat(date.toLocaleDateString())
                      //   );

                      if (member.datesPresent.length !== 0) {
                        const db_date = _.find(member.datesPresent, {
                          signin_date: convertDateFormat(
                            date.toLocaleDateString()
                          ),
                        });

                        // console.log("member.datesPresent", member.datesPresent);
                        if (db_date) {
                          present++;
                          return (
                            <td
                              style={{
                                padding: 5,
                                textAlign: "center",
                              }}
                            >
                              <i className="far fa-check-circle hidden-print text-success"></i>
                            </td>
                          );
                        } else {
                          absent++;
                          return (
                            <td
                              style={{
                                padding: 5,
                                textAlign: "center",
                              }}
                            >
                              <i className="far fa-times-circle hidden-print text-danger"></i>
                            </td>
                          );
                        }
                      } else {
                        absent++;
                        return (
                          <td
                            style={{
                              padding: 5,
                              textAlign: "center",
                            }}
                          >
                            <i className="far fa-times-circle hidden-print text-danger"></i>
                          </td>
                        );
                      }

                      // console.log("date---", date);

                      // return (
                      //   <td
                      //     style={{
                      //       padding: 5,
                      //       textAlign: "center",
                      //     }}
                      //   >
                      //     {"x"}
                      //   </td>
                      // );
                      // Adding 1 to day since day is 0-based
                    })}

                    <td
                      style={{
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {((present / daysInMonth) * 100).toFixed(0)}
                    </td>
                    <td
                      style={{
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {weekends}
                    </td>
                    <td
                      style={{
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {present}
                    </td>
                    <td
                      style={{
                        padding: 5,
                        textAlign: "center",
                      }}
                    >
                      {absent}
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
    </>
  );
});
export default DaysComponent;
