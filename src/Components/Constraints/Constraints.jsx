import React, { useState, useContext } from "react";
import styles from "./Indexpage.module.scss";
import { ToastContainer, toast } from "react-toastify";
import Pageheader from "../Layouts/Pageheader/Pageheader";
import {
  Card,
  Col,
  Nav,
  Row,
  Tab,
  Form,
  Collapse,
  FormControl,
  Button,
  Table,
} from "react-bootstrap";
import Select from "react-select";
// import { Single, disabled, Inline, multiDisabled, MultiDropdown, Groupeddata, multi } from './Data/FormAdvancedData';
// import { stateValue } from './Data/dataFormValidation';
// import { stateValue } from '../Forms/FormValidation/Data/dataFormValidation'
import StateContext from "../../context/context";
import constraintsApi from "../../../api/constraintsApi";

const Tabs = () => {
  //Show Code variables
  const stateContext = useContext(StateContext);
  const [selectedConst, setSelectedConst] = useState();
  const [percentage, setPercentage] = useState();
  const [loading, setLoading] = useState(false);

  const stateValue = [];

  stateContext.data.constraints.forEach((c, i) => {
    if (c.c_name !== "real_time") {
      stateValue.push({ value: c.c_id, label: c.c_name });
    }
  });

  const updateConstraint = async (constraint) => {
    setLoading(true);
    const res = await constraintsApi.updateConstraint(constraint);
    setLoading(false);

    if (!res.ok) {
      console.log("failed to update the constraint");
    }

    console.log("response", res.data);

    stateContext.setData({
      ...stateContext.data,
      constraints: res.data,
    });

    setPercentage("");
    setSelectedConst({ value: "", label: "" });

    toast(`Successfully updated the ${constraint.c_name} constraint`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    // successAlert();
    // console.log("response", res.data);
  };

  const handleSet = async () => {
    const d = {
      c_id: selectedConst.value,
      c_name: selectedConst.label,
      c_percentage: parseInt(percentage),
    };

    console.log("ready", d);
    await updateConstraint(d);
  };

  // console.log("the state vale", stateValue);

  return (
    <div className={styles.Tabs}>
      <Pageheader titles="Constraints" active="set constaints" />
      {/* <!-- container --> */}

      {/* <!-- row opened --> */}
      <Row className="row-sm">
        <Col xl={12}>
          {/* <!-- div --> */}
          <Card className="mg-b-20" id="tabs-style3">
            <Card.Body style={{}}>
              <div className="text-wrap">
                <div className="example">
                  <div className="panel panel-primary tabs-style-3">
                    <Tab.Container
                      id="left-tabs-example"
                      defaultActiveKey="first"
                    >
                      <div className="tabs-menu ">
                        <Nav variant="" className=" nav panel-tabs">
                          <Nav.Item>
                            <Nav.Link eventKey="first">
                              <i className="fa fa-laptop me-2"></i> Set
                              Constraint
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="second">
                              <i className="fa fa-cube me-2"></i>View
                              Constraints
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item>
														<Nav.Link eventKey="third"><i className="fa fa-cogs"></i> Tab Style 03</Nav.Link>
													</Nav.Item>
													<Nav.Item>
														<Nav.Link eventKey="fourth"><i className="fa fa-tasks"></i> Tab Style 04</Nav.Link>
													</Nav.Item> */}
                        </Nav>
                      </div>
                      <Tab.Content className="panel-body tabs-menu-body border-top-0">
                        <Tab.Pane eventKey="first">
                          <Row style={{ marginBottom: 100 }}>
                            <Col xl={3} className="mb-3">
                              <Form.Label>Select Constraint</Form.Label>
                              <Select
                                classNamePrefix="Select"
                                options={stateValue}
                                onChange={(value) => setSelectedConst(value)}
                                value={selectedConst}
                                placeholder="Choose Constraint"
                              />
                              <Form.Control.Feedback type="invalid">
                                {" "}
                                Please provide a valid state.
                              </Form.Control.Feedback>
                            </Col>
                            <Col xl={3} className="mb-3">
                              <Form.Label>Percentage</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Choose a percentage"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                required
                                isValid
                              />
                              <Form.Control.Feedback type="invalid">
                                Choose percentage
                              </Form.Control.Feedback>
                            </Col>
                            <div style={{ marginBottom: 15, marginTop: 23 }}>
                              <Col>
                                <Button onClick={handleSet} disabled={loading}>
                                  {loading ? "setting..." : "Set"}
                                </Button>
                              </Col>
                            </div>
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="table-responsive">
                            <Table className="mb-0 table-bordered border-top mb-0">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Constraint Name</th>
                                  <th>Constraint(%)</th>
                                  {/* <th>Set by</th>
                                                              <th>Date</th> */}
                                </tr>
                              </thead>
                              <tbody>
                                {stateContext.data.constraints.map((c, i) => {
                                  if (c.c_name !== "real_time") {
                                    return (
                                      <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{c.c_name}</td>
                                        <td>{c.c_percentage}</td>
                                        {/* <td>14/02/2023</td> */}
                                      </tr>
                                    );
                                  }
                                })}
                              </tbody>
                            </Table>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </div>
    // <!-- /row -->
    // <!-- Container closed -->
  );
};

Tabs.propTypes = {};

Tabs.defaultProps = {};

export default Tabs;
