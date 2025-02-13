import React, {
  useState,
  useContext,
  useRef,
  useMemo,
  useCallback,
} from "react";
import StateContext from "../../context/context";
// import { AgGridReact } from "ag-grid-react";
const { AgGridReact } = await import("ag-grid-react");
import { Card, Col, Nav, Row, Tab, Form, Collapse } from "react-bootstrap";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import lecturesApi from "../../../api/lecturesApi";

const columns = [
  {
    // field: "id",
    headerName: "ID",
    valueGetter: "node.rowIndex + 1",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  // {
  //   field: "day",
  //   cellStyle: { borderLeft: "1px solid #ccc" },
  //   width: 120,
  //   sortable: true,
  //   filter: true,
  // },
  {
    headerName: "Course Unit",
    field: "course_unit_name",
    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
  {
    headerName: "Session",
    field: "session_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  {
    headerName: "Room",
    field: "room_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    width: 150,
    sortable: true,
    filter: true,
  },
  // {
  //   field: "date",
  //   cellStyle: { borderLeft: "1px solid #ccc" },
  //   width: 150,
  //   sortable: true,
  //   filter: true,
  //   valueFormatter: (params) => {
  //     // const date = new Date(params.value);
  //     // const dateOnly = params.value.slice(0, 10);
  //     // return dateOnly;
  //     // return date.toLocaleDateString();
  //   },
  // },
  {
    headerName: "lecturer",
    field: "staff_name",

    cellStyle: { borderLeft: "1px solid #ccc" },
    sortable: true,
    filter: true,
  },
];

function CustomNoRowsOverlay() {
  return (
    <div className="ag-overlay-no-rows-wrapper">
      <div className="ag-overlay-no-rows-center">No Data Available</div>
    </div>
  );
}

function MissedLectures() {
  const stateContext = useContext(StateContext);
  const gridRefs = [];
  const gridOptions = [];
  const onFilterTextBoxChanged = [];

  // console.log("context in missed", stateContext);

  const noRowsOverlayComponent = useMemo(() => {
    return CustomNoRowsOverlay;
  }, []);

  const noRowsOverlayComponentParams = useMemo(() => {
    return {
      noRowsMessageFunc: () => "Sorry - no rows! at: " + new Date(),
    };
  }, []);

  const schools = stateContext.generalRoleIds.includes(
    stateContext.user.assignedRole.role_id
  )
    ? stateContext.data.lectures.map((item) => item.school)
    : [`${stateContext.user.assignedRole.for_wc_sch}`];

  for (let i = 0; i < schools.length; i++) {
    gridRefs[i] = useRef(null);
    gridOptions[i] = {
      rowStyle: { borderBottom: "1px solid #ccc" },
      headerHeight: 40,
      rowHeight: 10,
      // rowData: tableData,
      // columnDefs: columns,
      // headerGroupComponent: CustomHeader,
    };
    onFilterTextBoxChanged[i] = useCallback(() => {
      gridRefs[i].current.api.setQuickFilter(
        document.getElementById(`filter-text-box${i}`).value
      );
    }, []);
  }

  const missedLectures = stateContext.data.lectures.map(
    (item) => item.missedLectures
  );
  console.log("missed lectures", missedLectures);

  console.log("schools", schools);

  // const gridOptions = {
  //   rowStyle: { borderBottom: "1px solid #ccc" },
  //   headerHeight: 40,
  //   rowHeight: 10,
  //   // rowData: tableData,
  //   // columnDefs: columns,
  //   // headerGroupComponent: CustomHeader,
  // };

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
    };
  }, []);

  // const onFilterTextBoxChanged = useCallback(() => {
  //   gridRef2.current.api.setQuickFilter(
  //     document.getElementById("filter-text-box").value
  //   );
  // }, []);

  const tbs = missedLectures.map((lecture, i) => {
    return (
      <Tab.Pane
        key={i}
        eventKey={lecture[0] ? lecture[0].alias : schools[i]}
        onClick={() => console.log("lecture", lecture)}
      >
        {/* {console.log(`missed lectures in ${lecture[0].alias}`, lecture)} */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <div style={{}}>
            {/* {schools.map((sch) => (
                            <h5>{`Missed Lectures in ${sch} TODAY`}</h5>
                          ))} */}

            <h5>{`Missed Lectures in ${schools[i]} TODAY`}</h5>
          </div>

          <div>
            <Form.Control
              className="mb-3"
              style={{
                width: 300,
                // alignSelf: "flex-end",
              }}
              type="text"
              id={`filter-text-box${i}`}
              placeholder="Search..."
              onInput={onFilterTextBoxChanged[i]}
            />
          </div>
        </div>

        <div
          style={{
            width: "100%",
            //   position: "absolute",
            //   left: 0,
            height: 1,
            backgroundColor: "lightgray",
          }}
        />

        <div
          className="ag-theme-alpine justify-content-center"
          style={{
            height: 400,
            marginTop: 10,
            // paddingLeft: 10,
            // paddingRight: 10,
            width: "100%",
          }}
        >
          <AgGridReact
            ref={gridRefs[i]}
            gridOptions={gridOptions[i]}
            columnDefs={columns}
            rowData={missedLectures[i]}
            rowHeight={30}
            headerHeight={30}
            // onCellClicked={rowClickedListener}
            cacheQuickFilter={true}
            rowSelection="single"
            animateRows={true}
            rowStyle={{ borderBottom: "1px solid #ccc" }}
            defaultColDef={defaultColDef}
            noRowsOverlayComponent={noRowsOverlayComponent}
            overlayNoRowsTemplate={CustomNoRowsOverlay}
            // frameworkComponents={{ customLoadingCellRenderer }}
            // loadingOverlayComponent={customLoadingCellRenderer}

            // loadingOverlayComponent={loadingOverlayComponent}
            // loadingOverlayComponentParams={
            //   loadingOverlayComponentParams
            // }
            // loadingOverlayComponent={
            //   true ? CustomLoadingOverlay : null
            // }
            noRowsOverlayComponentParams={noRowsOverlayComponentParams}
            pagination={true}
          />
        </div>
      </Tab.Pane>
    );
  });

  console.log("tab panes", tbs);

  return (
    <div>
      <Col xl={12}>
        {/* <!-- div --> */}
        <Card id="tabs-style4">
          <Card.Body>
            <div className="main-content-label mg-b-5">
              Missed Lectures Today
            </div>
            <div className="d-grid d-sm-flex">
              <p className="mg-b-20 mg-b-20">
                {`Missed Lectures on ${new Date().toLocaleDateString()} Per School`}
              </p>
            </div>

            <div className="text-wrap">
              <div className="example">
                <div className="d-md-flex">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey={
                      stateContext.generalRoleIds.includes(
                        stateContext.user.assignedRole.role_id
                      )
                        ? `SBA`
                        : `${stateContext.user.assignedRole.for_wc_sch}`
                    }
                    className=""
                  >
                    <div className="panel panel-primary tabs-style-4">
                      <div className="tab-menu-heading">
                        <div className="tabs-menu">
                          <Nav variant="" className="nav panel-tabs me-3">
                            {schools.map((sch) => (
                              <Nav.Item>
                                <Nav.Link eventKey={sch}>{sch}</Nav.Link>
                              </Nav.Item>
                            ))}
                            {/* <Nav.Item>
                              <Nav.Link eventKey="second">
                                <i className="fa fa-cube"></i> Tab Style 02
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="third">
                                <i className="fa fa-cogs"></i> Tab Style 03
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="fourth">
                                <i className="fa fa-tasks"></i> Tab Style 04
                              </Nav.Link>
                            </Nav.Item> */}
                          </Nav>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tabs-style-4"
                      style={{
                        // backgroundColor: "blue",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          //   position: "absolute",
                          //   left: 0,
                          height: 1,
                          backgroundColor: "#EFEFEF",
                        }}
                      />
                      <Tab.Content
                        className="border border-top-0 p-0  br-dark"
                        style={{
                          // backgroundColor: "red",
                          width: "100%",
                          padding: 0,
                        }}
                      >
                        {/* <TabPanes /> */}
                        {tbs}
                        <Tab.Pane eventKey="second">
                          <p>
                            {" "}
                            Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus id
                            quod maxime placeat facere possimus, omnis voluptas
                            assumenda est, omnis dolor repellendus.{" "}
                          </p>
                          <p>
                            {" "}
                            Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus id
                            quod maxime placeat facere possimus, omnis voluptas
                            assumenda est, omnis dolor repellendus.{" "}
                          </p>
                          <p className="mb-0">
                            At vero eos et accusamus et iusto odio dignissimos
                            ducimus qui blanditiis praesentium voluptatum
                            deleniti atque corrupti quos dolores et quas
                            molestias excepturi sint occaecati cupiditate non
                            provident, similique sunt in culpa qui officia
                            deserunt mollitia animi, id est laborum et dolorum
                            fuga.
                          </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                          <p>
                            Temporibus autem quibusdam et aut officiis debitis
                            aut rerum necessitatibus saepe eveniet ut et
                            voluptates repudiandae sint et molestiae non
                            recusandae quod maxime placeat facere possimus,
                            omnis voluptas assumenda est, omnis dolor
                            repellendus.
                          </p>
                          <p>
                            Temporibus autem quibusdam et aut officiis debitis
                            aut rerum necessitatibus saepe eveniet ut et
                            voluptates repudiandae sint et molestiae non
                            recusandae quod maxime placeat facere possimus,
                            omnis voluptas assumenda est, omnis dolor
                            repellendus.
                          </p>
                          <p className="mb-0">
                            Et harum quidem rerum facilis est et expedita
                            distinctio. Nam libero tempore, cum soluta nobis est
                            eligendi optio cumque nihil impedit quo minus id
                            quod maxime placeat facere possimus, omnis voluptas
                            assumenda est, omnis dolor repellendus.{" "}
                          </p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="fourth">
                          <p>
                            On the other hand, we denounce with righteous
                            indignation and dislike men who are so beguiled and
                            demoralized by the charms of pleasure of the moment,
                            so blinded by desire quod maxime placeat facere
                            possimus, omnis voluptas assumenda est, omnis dolor
                            repellendus.
                          </p>
                          <p>
                            On the other hand, we denounce with righteous
                            indignation and dislike men who are so beguiled and
                            demoralized by the charms of pleasure of the moment,
                            so blinded by desire quod maxime placeat facere
                            possimus, omnis voluptas assumenda est, omnis dolor
                            repellendus.
                          </p>
                          <p className="mb-0">
                            Nam libero tempore, cum soluta nobis est eligendi
                            optio cumque nihil impedit quo minus id quod maxime
                            placeat facere possimus, omnis voluptas assumenda
                            est, omnis dolor repellendus. Temporibus autem
                            quibusdam et aut officiis debitis aut rerum
                            necessitatibus{" "}
                          </p>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </Card.Body>
          {/* <!-- /div --> */}
        </Card>
      </Col>
    </div>
  );
}

export default MissedLectures;
