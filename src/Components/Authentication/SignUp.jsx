import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import favicon from "../../assets/img/brand/favicon.png";
import faviconWhite from "../../assets/img/brand/favicon-white.png";
// import SignupImg from '../../assets/img/media/login.png';
// import { auth } from '../Firebase/FirebaseCredential';

export default function SignUp() {
  const [err, setError] = useState("");
  const [Loader, setLoader] = useState(false);
  const [data, setData] = React.useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { email, password, fullname } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const Signup = (e) => {
    e.preventDefault();
    // auth.createUserWithEmailAndPassword(email, password).then(
    //     user => { console.log(user); RouteChange(); setLoader(false) }).catch(err => { console.log(err); setError(err.message); setLoader(false) })
  };
  let navigate = useNavigate();
  const RouteChange = () => {
    let path = `${import.meta.env.BASE_URL}indexpage`;
    navigate(path);
  };

  return (
    <div>
      <div className="main-container container-fluid">
        <Row className="no-gutter">
          {/* <!-- The image half --> */}
          <Col
            md={6}
            lg={6}
            xl={7}
            className="d-none d-md-flex bg-primary-transparent"
          >
            <Row className="wd-100p mx-auto text-center">
              <Col md={12} lg={12} xl={12} className="my-auto mx-auto wd-100p">
                {/* <img src={SignupImg} className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mx-auto" alt="logo" /> */}
              </Col>
            </Row>
          </Col>
          {/* <!-- The content half --> */}
          <Col md={6} lg={6} xl={5} className="bg-white py-4">
            <div className="login d-flex align-items-center py-2">
              {/* <!-- Demo content--> */}
              <Container className="p-0">
                <Row className="">
                  <Col md={10} lg={10} xl={9} className="mx-auto">
                    <div className="card-sigin">
                      <div className="mb-5 d-flex">
                        <Link to="#">
                          <img
                            src={favicon}
                            className="sign-favicon-a ht-40"
                            alt="logo"
                          />
                          <img
                            src={faviconWhite}
                            className="sign-favicon-b ht-40"
                            alt="logo"
                          />
                        </Link>
                        <h1 className="main-logo1 ms-1 me-0 my-auto tx-28">
                          Va<span>le</span>x
                        </h1>
                      </div>
                      <div className="main-signup-header">
                        <h2 className="text-primary">Get Started</h2>
                        <h5 className="fw-normal mb-4">
                          It's free to signup and only takes a minute.
                        </h5>
                        {err && <Alert variant="danger">{err}</Alert>}
                        <Form action="#">
                          <Form.Group>
                            <Form.Label className="mb-2">
                              Firstname &amp; Lastname
                            </Form.Label>
                            <Form.Control
                              className="mb-3"
                              placeholder="Enter your firstname and lastname"
                              name="fullname"
                              type="text"
                              value={fullname}
                              onChange={changeHandler}
                              required
                            />{" "}
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="mb-2">Email</Form.Label>
                            <Form.Control
                              className="mb-3"
                              placeholder="Enter your email"
                              type="email"
                              name="email"
                              value={email}
                              onChange={changeHandler}
                              required
                            />{" "}
                          </Form.Group>
                          <Form.Group>
                            <Form.Label className="mb-2">Password</Form.Label>
                            <Form.Control
                              className="mb-3"
                              placeholder="Enter your password"
                              name="password"
                              type="password"
                              value={password}
                              onChange={changeHandler}
                              required
                            />{" "}
                          </Form.Group>
                          <Button
                            className="btn-main-primary btn-block"
                            onClick={Signup}
                          >
                            Create Account
                            {Loader ? (
                              <span
                                role="status"
                                aria-hidden="true"
                                className="spinner-border spinner-border-sm ms-2"
                              ></span>
                            ) : (
                              ""
                            )}
                          </Button>
                          <Row className="row-xs">
                            <Col sm={6} className="">
                              <Button className="btn-block">
                                <i className="fab fa-facebook-f"></i> Signup
                                with Facebook
                              </Button>
                            </Col>
                            <Col sm={6} className="mg-t-10 mg-sm-t-0">
                              <Button className="btn-info btn-block btn-b">
                                <i className="fab fa-twitter"></i> Signup with
                                Twitter
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                        <div className="main-signup-footer mt-5">
                          <p>
                            Already have an account?
                            <Link
                              to={`${import.meta.env.BASE_URL}admissionsignin`}
                            >
                              Sign In
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
              {/* <!-- End --> */}
            </div>
          </Col>
          {/* <!-- End --> */}
        </Row>
      </div>
    </div>
  );
}
