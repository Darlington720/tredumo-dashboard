import React, { useRef, useCallback, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Nav,
  ProgressBar,
  Row,
  Tab,
} from "react-bootstrap";
// import Pageheader from '../../Layouts/Pageheader/Pageheader';
// import styles from './Profile.module.scss';
// import { Link } from "react-router-dom";

// import { AgGridReact } from "ag-grid-react";
const { AgGridReact } = await import("ag-grid-react");
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

const columns = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Name",
    field: "userfull_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    // width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Student No",
    field: "stu_id",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Course",
    field: "progcode",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
];

const columns2 = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Name",
    field: "userfull_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    // width: 120,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Student No",
    field: "stu_no",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Course",
    field: "progcode",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Joined At",
    field: "joined_at",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Rating",
    field: "rating",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
];

function Profile({ row }) {
  const gridRef = useRef();
  const gridRef2 = useRef();
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  const classReps = [];
  row.members.map((m) => {
    if (m.is_class_rep) {
      classReps.push(m.userfull_name);
    }
  });

  console.log("class rep", classReps);

  function CustomNoRowsOverlay() {
    return (
      <div className="ag-overlay-no-rows-wrapper">
        <div className="ag-overlay-no-rows-center">No Data Available</div>
      </div>
    );
  }

  const gridOptions = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const gridOptions2 = {
    rowStyle: { borderBottom: "1px solid #ccc" },
    headerHeight: 40,
    rowHeight: 10,
    // rowData: tableData,
    // columnDefs: columns,
    // headerGroupComponent: CustomHeader,
  };

  const noRowsOverlayComponent = useMemo(() => {
    return CustomNoRowsOverlay;
  }, []);
  return (
    <div>
      {/* <Pageheader titles="Pages" active="Profile" /> */}
      {/* <!-- container --> */}

      {/* <!-- row --> */}
      <Row className="row-sm">
        <Col lg={3}>
          <Card className="mg-b-20">
            <Card.Body
              style={{
                // backgroundColor: "green",
                padding: 0,
                paddingBottom: 15,
                height: 650,
              }}
            >
              <div className="ps-0">
                <div className="">
                  <div
                    style={{
                      backgroundColor: "blue",
                      height: 100,
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: -50,
                    }}
                  >
                    <div
                      //   text={findUpper(profileName)}
                      // theme="primary"
                      //   size="xl"
                      // image={
                      //   hasLoadedImage
                      //     ? `https://student1.zeevarsity.com:8001/get_photo.yaws?ic=nkumba&stdno=${
                      //         studentDetails ? studentDetails[0].stdno : "2000101041"
                      //       }`
                      //     : ""
                      // }
                      style={{
                        width: 100,
                        height: 100,
                        backgroundColor: "lightgray",
                        borderRadius: 50,
                      }}
                    >
                      {/* <div className="status dot dot-lg dot-success"></div> */}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      {row.staff_name}
                    </span>
                    <span
                      style={{
                        fontSize: 17,
                        textAlign: "center",
                        // fontWeight: "bold",
                      }}
                    >
                      {row.course_unit_name}
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        // fontWeight: "bold",
                        opacity: 0.3,
                      }}
                    >
                      {`${row.start_time} - ${row.end_time}`}
                    </span>
                  </div>

                  <Row
                    style={{
                      marginTop: 10,
                      marginBottom: 10,
                    }}
                  >
                    <Col>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 20,
                          }}
                        >
                          {row.enrolledStudents.length}
                        </span>
                        <span
                          style={{
                            opacity: 0.5,
                          }}
                        >
                          Enrolled
                        </span>
                      </div>
                    </Col>

                    <Col>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 20,
                          }}
                        >
                          {row.members.length}
                        </span>
                        <span
                          style={{
                            opacity: 0.5,
                          }}
                        >
                          Attended
                        </span>
                      </div>
                    </Col>

                    <Col>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 20,
                          }}
                        >
                          {row.enrolledStudents.length - row.members.length}
                        </span>
                        <span
                          style={{
                            opacity: 0.5,
                          }}
                        >
                          Absent
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <div
                    style={{
                      backgroundColor: "black",
                      height: 1,
                      width: "100%",
                      opacity: 0.1,
                      marginBottom: 10,
                    }}
                  ></div>

                  <div
                    style={{
                      padding: 10,
                    }}
                  >
                    {/* <div style={{ display: "flex", alignItems: "center",}}>
                  <span style={{ width: "40%" }}>Status</span>
                  <span style={{ width: "2%" }}>:</span>
                  <span style={{ width: "58%", fontWeight: "bold", fontSize: 10 }}>Ongoing</span>
                </div> */}

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Room
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.room_name}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Status
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.has_ended ? "Ongoing" : "Ended"}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Class Rep
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {classReps[0]}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Started At
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.started_at}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Ended At
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.ended_at}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Duration
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.has_ended ? "computing" : "still ongoing"}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>

                    <div
                      style={{
                        display: "flex",
                        // padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 16,
                          width: "40%",
                        }}
                      >
                        Lecture Mode
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          // marginLeft: 10,
                          width: "2%",
                          // marginRight: 10,
                        }}
                      >
                        :
                      </span>
                      <span
                        style={{
                          fontSize: 16,
                          width: "58%",
                        }}
                      >
                        {row.lecture_mode === 1 ? "Physical" : "Online"}
                      </span>
                    </div>
                    <div
                      style={{
                        backgroundColor: "black",
                        height: 1,
                        width: "100%",
                        opacity: 0.1,
                        marginBottom: 5,
                        marginTop: 5,
                      }}
                    ></div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {/* <a
                  href="http://google.com"
                  style={{
                    textAlign: "center",
                  }}
                > */}
                    <span
                      //   onClick={toggleModal}
                      style={{
                        textAlign: "center",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      Click here to view online details
                    </span>
                    {/* </a> */}

                    {/* <Button color="primary" onClick={toggleModal}>
                  Modal Default
                </Button> */}
                    {/* <Modal isOpen={modal} toggle={toggleModal}>
                      <ModalHeader
                        toggle={toggle}
                        close={
                          <button className="close" onClick={toggleModal}>
                            <Icon name="cross" />
                          </button>
                        }
                      >
                        Online Lecture Details
                      </ModalHeader>
                      <ModalBody>
                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              width: "40%",
                            }}
                          >
                            Lecture Link
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              width: "58%",
                              // display: "flex",
                              // backgroundColor: "red",
                              // textAlign: "center",
                              // flexWrap: "wrap",
                            }}
                          >
                            <a
                              href="http://googlehhjfdhdjhjhdfjhdfhjdfh
                  gruofgrfeuiogeioeriogu.com"
                            >
                              {` http://googlehhjfdhdjhjhdfjhdfhjdfh
                        fgrfeuiogeioeriogu.com`}
                            </a>
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              width: "40%",
                            }}
                          >
                            Meeting Id
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              width: "58%",
                            }}
                          >
                            6363636
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>

                        <div
                          style={{
                            display: "flex",
                            // padding: 10,
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 17,
                              width: "40%",
                            }}
                          >
                            Passcode
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              // marginLeft: 10,
                              width: "2%",
                              // marginRight: 10,
                            }}
                          >
                            :
                          </span>
                          <span
                            style={{
                              fontSize: 17,
                              width: "58%",
                            }}
                          >
                            7464784848
                          </span>
                        </div>
                        <div
                          style={{
                            backgroundColor: "black",
                            height: 1,
                            width: "100%",
                            opacity: 0.1,
                            marginBottom: 5,
                            marginTop: 5,
                          }}
                        ></div>
                      </ModalBody>
                      <ModalFooter className="bg-light">
                        <span
                          className="sub-text"
                          style={{
                            cursor: "pointer",
                          }}
                          onClick={toggleModal}
                        >
                          Close
                        </span>
                      </ModalFooter>
                    </Modal> */}
                  </div>

                  {/* <!--skill bar--> */}
                </div>
                {/* <!-- main-profile-overview --> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={9}>
          <Card>
            <Card.Body>
              <Tab.Container
                className="tabs-menu "
                id="left-tabs-example"
                defaultActiveKey="first"
              >
                <Nav className="profile navtab-custom panel-tabs">
                  <Nav.Item as="li">
                    <Nav.Link className="hidden-xs" eventKey="first">
                      <i className="las la-user-circle tx-16 me-1 visible-xs"></i>
                      ENROLLED
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link className="hidden-xs" eventKey="second">
                      <i className="las la-images tx-15 me-1 visible-xs"></i>
                      PRESENT
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link className="hidden-xs" eventKey="third">
                      <i className="las la-life-ring tx-16 me-1 visible-xs"></i>
                      ABSENT
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link className="hidden-xs" eventKey="fourth">
                      <i className="las la-cog tx-16 me-1 visible-xs"></i>
                      RATING
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <Tab.Content className="border border-top-0 p-4 br-dark">
                  <Tab.Pane eventKey="first">
                    <div
                      className="ag-theme-alpine justify-content-center"
                      style={{
                        height: 400,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: "100%",
                      }}
                    >
                      <AgGridReact
                        ref={gridRef}
                        gridOptions={gridOptions}
                        columnDefs={columns}
                        rowData={row.enrolledStudents}
                        rowHeight={30}
                        headerHeight={30}
                        //   onCellClicked={rowClickedListener}
                        cacheQuickFilter={true}
                        rowSelection="single"
                        animateRows={true}
                        rowStyle={{ borderBottom: "1px solid #ccc" }}
                        defaultColDef={defaultColDef}
                        noRowsOverlayComponent={noRowsOverlayComponent}
                        overlayNoRowsTemplate={CustomNoRowsOverlay}
                        //   frameworkComponents={{ customLoadingCellRenderer }}
                        // loadingOverlayComponent={customLoadingCellRenderer}

                        //   loadingOverlayComponent={loadingOverlayComponent}
                        //   loadingOverlayComponentParams={
                        //     loadingOverlayComponentParams
                        //   }
                        // loadingOverlayComponent={
                        //   true ? CustomLoadingOverlay : null
                        // }
                        //   noRowsOverlayComponentParams={
                        //     noRowsOverlayComponentParams
                        //   }
                        pagination={true}
                      />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {/* <PagesGallery /> */}
                    <div
                      className="ag-theme-alpine justify-content-center"
                      style={{
                        height: 400,
                        paddingLeft: 10,
                        paddingRight: 10,
                        width: "100%",
                      }}
                    >
                      <AgGridReact
                        ref={gridRef2}
                        gridOptions={gridOptions2}
                        columnDefs={columns2}
                        rowData={row.members}
                        rowHeight={30}
                        headerHeight={30}
                        //   onCellClicked={rowClickedListener}
                        cacheQuickFilter={true}
                        rowSelection="single"
                        animateRows={true}
                        rowStyle={{ borderBottom: "1px solid #ccc" }}
                        defaultColDef={defaultColDef}
                        noRowsOverlayComponent={noRowsOverlayComponent}
                        overlayNoRowsTemplate={CustomNoRowsOverlay}
                        //   frameworkComponents={{ customLoadingCellRenderer }}
                        // loadingOverlayComponent={customLoadingCellRenderer}

                        //   loadingOverlayComponent={loadingOverlayComponent}
                        //   loadingOverlayComponentParams={
                        //     loadingOverlayComponentParams
                        //   }
                        // loadingOverlayComponent={
                        //   true ? CustomLoadingOverlay : null
                        // }
                        //   noRowsOverlayComponentParams={
                        //     noRowsOverlayComponentParams
                        //   }
                        pagination={true}
                      />
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="third"></Tab.Pane>
                  <Tab.Pane eventKey="fourth">
                    <Form>
                      <Form.Group>
                        <Form.Label htmlFor="FullName">Full Name</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          defaultValue="John Doe"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="Email">Email</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="email"
                          defaultValue="first.last@example.com"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="Username">Username</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          defaultValue="john"
                          id="Username"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="Password">Password</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="password"
                          placeholder="6 - 15 Characters"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="RePassword">
                          Re-Password
                        </Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="password"
                          placeholder="6 - 15 Characters"
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Label htmlFor="AboutMe">About Me</Form.Label>
                        <Form.Control
                          className="mb-3"
                          as="textarea"
                          defaultValue="Loren gypsum dolor sit mate, consecrate disciplining lit, tied diam nonunion nib modernism tincidunt it Loretta dolor manga Amalia erst volute. Ur wise denim ad minim venial, quid nostrum exercise ration perambulator suspicious cortisol nil it applique ex ea commodore consequent."
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        variant="primary"
                        className="waves-effect waves-light w-md"
                      >
                        Save
                      </Button>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <!-- row closed --> */}
      {/* <!-- Container closed --> */}
    </div>
  );
}

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
