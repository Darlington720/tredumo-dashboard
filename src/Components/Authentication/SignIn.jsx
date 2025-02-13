import React, { useState, useContext } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import StateContext from "../../context/context";
import mainClient from "../../../api/client";
import favicon from "../../assets/img/brand/favicon.png";
import faviconWhite from "../../assets/img/brand/favicon-white.png";
import login from "../../assets/img/im1.jpeg";
import nkumbaLogo from "../../assets/img/nkumbaLogo.png";
import staffApi from "../../../api/staffApi";
// import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils'
// import { auth } from '../Firebase/FirebaseCredential';

const isProd = process.env.NODE_ENV == "production";

const initialFormState = {
  username: "",
  password: "",
};

const _user = {
  id: 24,
  userfull_name: "Jude Lubega",
  username: "NUA213",
  email: "JudeLubega@gmail.com",
  gendar: null,
  phoneNo: null,
  DOB: null,
  Address: null,
  user_image: "NUA213",
  role: "Vice Chancellor",
  stu_no: "NUA213",
  stu_status: 0,
  is_class_rep: 0,
  for_wc: null,
  token: null,
  access_id: "2000101759",
  access_pwd: "5c1d0343f6b41d29fc5be4e2a0db4630",
  assignedRole: {
    staff_role_id: 3,
    staff_id: "NUA213",
    role: "3",
    for_wc_sch: "SCI",
    campus_id: 1,
    role_id: 3,
    role_name: "VICE CHANCELLOR",
  },
  imageUrl: "http://199.241.139.118:9000/assets/NUA213",
  active_auth:
    "428a196e57d848bd12df32cc7bcd6306e2e93503001f710798816f3489906765328113c385e9399e2c82fd9f9963ebeea40de28bd8d2c771d161b8c0400b9a04",
};

export default function SignIn() {
  const stateContext = useContext(StateContext);
  // console.log("isSignined in", stateContext.isLoggedIn);
  const [err, setError] = useState("");
  const [loading, setLoader] = useState(false);
  const [data, setData] = useState(initialFormState);
  const { username, password } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };
  const Login = async (e) => {
    e.preventDefault();
    setLoader(true);

    // console.log("am sending this", data);
    const res = await staffApi.login(data);

    setLoader(false);
    if (!res.ok) {
      // alert("Error validating the user");
      // console.log("err", res.data);
      setError(res.data.error);
      return;
    }

    if (res.data.role === "Student") {
      setError("Invalid Username or password");
      return;
    }

    console.log("response", res.data);

    stateContext.setCampus(
      res.data.assignedRole.campus_id === 1
        ? { id: 1, name: "MAIN CAMPUS" }
        : { id: 2, name: "KAMPALA CAMPUS" }
    );

    stateContext.setIsLoggedIn(true);
    stateContext.setUser(res.data);
    mainClient.apiClient.setHeader("session_token", res.data.active_auth);
    RouteChange(res.data.assignedRole.role);

    // auth.signInWithEmailAndPassword(email, password).then(
    //     user => { console.log(user); RouteChange(); setLoader(false) }).catch(err => { console.log(err); setError(err.message); setLoader(false) })
  };
  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
  };

  let navigate = useNavigate();
  const RouteChange = (role) => {
    if (role === "9") {
      let path1 = `${import.meta.env.BASE_URL}recordvoters`;
      navigate(path1);
    } else if (role === "11") {
      let path2 = `${import.meta.env.BASE_URL}voteassigning`;
      navigate(path2);
    } else {
      let path = `${import.meta.env.BASE_URL}indexpage`;
      navigate(path);
    }
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
                <img
                  src={login}
                  className="my-auto ht-xl-80p wd-md-100p wd-xl-80p mx-auto"
                  alt="logo"
                />
              </Col>
            </Row>
          </Col>
          {/* <!-- The content half --> */}
          <Col md={6} lg={6} xl={5} className="bg-white py-4">
            <div className="login d-flex align-items-center py-2">
              {/* <!-- Demo content--> */}
              <Container className="p-0">
                <Row>
                  <Col md={10} lg={10} xl={9} className="mx-auto">
                    <div className="card-sigin">
                      <div className="mb-5 d-flex">
                        {/* <Link to="#">
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
                        </h1> */}
                        <img
                          alt="user-img"
                          style={{
                            width: 200,
                            // marginLeft: -25,
                            // height: 100,
                          }}
                          src={nkumbaLogo}
                        />
                      </div>
                      <div className="card-sigin">
                        <div className="main-signup-header">
                          <h2>Welcome!!</h2>
                          <h5 className="fw-semibold mb-4">
                            Please sign in to continue.
                          </h5>
                          {err && <Alert variant="danger">{err}</Alert>}
                          <Form action="#" onSubmit={Login}>
                            <Form.Group>
                              <Form.Label className="mb-2">Username</Form.Label>
                              <Form.Control
                                className="mb-3"
                                name="username"
                                placeholder="Enter your username"
                                type="text"
                                value={username}
                                onChange={changeHandler}
                                required
                              />{" "}
                            </Form.Group>
                            <Form.Group>
                              <Form.Label className="mb-2">Password</Form.Label>
                              <Form.Control
                                className="mb-3"
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                value={password}
                                onChange={changeHandler}
                                required
                              />{" "}
                            </Form.Group>
                            <Button
                              className="btn-main-primary btn-block"
                              type="submit"
                              // onClick={Login}
                            >
                              Sign In
                              {loading ? (
                                <span
                                  role="status"
                                  aria-hidden="true"
                                  className="spinner-border spinner-border-sm ms-2"
                                ></span>
                              ) : (
                                ""
                              )}
                            </Button>
                            {/* <Row className="row-xs">
                              <Col sm={6} className="">
                                <Button
                                  className="btn-block"
                                  onClick={logGoogleUser}
                                >
                                  <i className="fab fa-facebook-f"></i> Signup
                                  with Google
                                </Button>
                              </Col>
                              <Col sm={6} className="mg-t-10 mg-sm-t-0">
                                <Button className="btn-info btn-block btn-b">
                                  <i className="fab fa-twitter"></i> Signup with
                                  Twitter
                                </Button>
                              </Col>
                            </Row> */}
                          </Form>
                          {/* <div className="main-signin-footer mt-5">
                            <p>
                              <Link to="#">Forgot password?</Link>
                            </p>
                            <p>
                              Don't have an account?{" "}
                              <Link
                                to={`${
                                  import.meta.env.BASE_URL
                                }admissionsignup`}
                              >
                                Create an Account
                              </Link>
                            </p>
                          </div> */}
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
