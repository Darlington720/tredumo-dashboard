import React, { useState } from "react";
import styles from "./Indexpage.module.scss";
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

const Tabs = () => {
  //Show Code variables

  const [i, seti] = useState(false);
  const [i2, seti2] = useState(false);
  const [i3, seti3] = useState(false);
  const [i4, seti4] = useState(false);
  const [i5, seti5] = useState(false);

  const monthValue = [
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "July" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];

  const yearValue = [
    { value: "2019", label: "2019" },
    { value: "2020", label: "2020" },
    { value: "2021", label: "2021" },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ];


  const studyYrValue = [
    { value: "day", label: "DAY" },
    { value: "wkd", label: "WEEKEND" },
  ];

  return (
    <div className={styles.Tabs}>
      <Pageheader titles="Elements" active="Tabs" />
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
                    <div className="tabs-menu "></div>

                    <Row style={{ marginBottom: 0 }}>
                      <Col xl={3} className="mb-3">
                        <Form.Label>Select Month</Form.Label>
                        <Select
                          classNamePrefix="Select"
                          options={monthValue}
                          placeholder="Choose Month"
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {/* Please provide a valid state. */}
                        </Form.Control.Feedback>
                      </Col>

                      <Col xl={3} className="mb-3">
                        <Form.Label>Select Year</Form.Label>
                        <Select
                          classNamePrefix="Select"
                          options={yearValue}
                          placeholder="Choose year"
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {/* Please provide a valid state. */}
                        </Form.Control.Feedback>
                      </Col>

                      <Col xl={3} className="mb-3">
                        <Form.Label>Select Study time</Form.Label>
                        <Select
                          classNamePrefix="Select"
                          options={studyYrValue}
                          placeholder="Choose Study time"
                        />
                        <Form.Control.Feedback type="invalid">
                          {" "}
                          {/* Please provide a valid state. */}
                        </Form.Control.Feedback>
                      </Col>

{/*                       
                      <Col xl={3} className="mb-3">
                        <Form.Label>Percentage</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Choose a percentage"
                          required
                          isValid
                        />
                        <Form.Control.Feedback type="invalid">
                          Choose percentage
                        </Form.Control.Feedback>
                      </Col> */}
                      <div style={{ marginBottom: 15, marginTop: 23 }}>
                        <Col md={4} className="mb-2">
                          <Button variant='info' className="mb-1">Search</Button>
                        </Col>
                      </div>
                    </Row>
                    <div className="example">
								<div className="panel panel-primary tabs-style-1">
									<Tab.Container id="left-tabs-example" defaultActiveKey="first">
										<Nav variant="pills" className="nav panel-tabs main-nav-line" style={{justifyContent: 'center'}}>
											<Nav.Item>
												<Nav.Link eventKey="first" style={{fontWeight: 'bolder'}}>SBA</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="second" style={{fontWeight: 'bolder'}}>SCI</Nav.Link>
											</Nav.Item>
											<Nav.Item>
												<Nav.Link eventKey="third" style={{fontWeight: 'bolder'}}>SCOS</Nav.Link>
											</Nav.Item>
                                            <Nav.Item>
												<Nav.Link eventKey="fourth" style={{fontWeight: 'bolder'}}>SOSS</Nav.Link>
											</Nav.Item>
                                            <Nav.Item>
												<Nav.Link eventKey="fifth" style={{fontWeight: 'bolder'}}>SEDU</Nav.Link>
											</Nav.Item>
                                            <Nav.Item>
												<Nav.Link eventKey="sixth" style={{fontWeight: 'bolder'}}>SCIAD</Nav.Link>
											</Nav.Item>
                                            <Nav.Item>
												<Nav.Link eventKey="seventh" style={{fontWeight: 'bolder'}}>SLAW</Nav.Link>
											</Nav.Item>
										</Nav>
										<Tab.Content className='panel-body tabs-menu-body main-content-body-right border-top-0 border'>
											<Tab.Pane eventKey="first">
                                            <Table className="table-hover mb-0 text-md-nowrap">
									<thead>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Position</th>
											<th>Salary</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope="row">1</th>
											<td>Tiger Nixon</td>
											<td>System Architect</td>
											<td>$320,800</td>
										</tr>
										<tr>
											<th scope="row">2</th>
											<td>Garrett Winters</td>
											<td>Accountant</td>
											<td>$170,750</td>
										</tr>
										<tr>
											<th scope="row">3</th>
											<td>Ashton Cox</td>
											<td>Junior Technical Author</td>
											<td>$86,000</td>
										</tr>
										<tr>
											<th scope="row">4</th>
											<td>Cedric Kelly</td>
											<td>Senior Javascript Developer</td>
											<td>$433,060</td>
										</tr>
										<tr>
											<th scope="row">5</th>
											<td>Airi Satou</td>
											<td>Accountant</td>
											<td>$162,700</td>
										</tr>
									</tbody>
								</Table>
											</Tab.Pane>
											<Tab.Pane eventKey="second">
												<p>dignissimos ducimus qui blanditiis praesentium voluptatum
													deleniti atque corrupti quos dolores et quas molestias
													excepturi sint occaecati cupiditate non provident, similique
													sunt in culpa qui officia deserunt mollitia animi, id est
													laborum et dolorum fuga.</p>
												<p>Et harum quidem rerum facilis est et expedita distinctio. Nam
													libero tempore, cum soluta nobis est eligendi optio cumque
													nihil impedit quo minus id quod maxime</p>
												<p className="mb-0">placeat facere possimus, omnis voluptas
													assumenda est, omnis dolor repellendus.</p>
											</Tab.Pane>
											<Tab.Pane eventKey="three">
												<p>praesentium voluptatum deleniti atque corrupti quos dolores
													et quas molestias excepturi sint occaecati cupiditate non
													provident,</p>
												<p className="mb-0">similique sunt in culpa qui officia deserunt
													mollitia animi, id est laborum et dolorum fuga. Et harum
													quidem rerum facilis est et expedita distinctio. Nam libero
													tempore, cum soluta nobis est eligendi optio cumque nihil
													impedit quo minus id quod maxime placeat facere possimus,
													omnis voluptas assumenda est, omnis dolor repellendus.</p>
											</Tab.Pane>
										</Tab.Content>
									</Tab.Container>
								</div>
							</div>
                  </div>
                </div>
              </div>
              
            </Card.Body>
          </Card>
        </Col>
        
      </Row>
      
    </div>
    // <!-- /row -->
    // <!-- Container closed -->
  );
};

Tabs.propTypes = {};

Tabs.defaultProps = {};

export default Tabs;
