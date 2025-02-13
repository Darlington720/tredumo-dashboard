import React, { Fragment, useContext, useEffect, useState } from "react";
// import StateContext from "./context/context";
import Header from "./Components/Layouts/Header/Header";
import Switcher from "./Components/Layouts/Switcher/Switcher";
import Sidebar from "./Components/Layouts/Sidebar/Sidebar";
import Rightside from "./Components/Layouts/Rightside/Rightside";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Components/Layouts/Footer/Footer";
import BacktoTop from "./Components/Layouts/BacktoTop/BacktoTop";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import store from "./Components/CommonFileComponents/redux/store";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import StateContext from "./context/context";
export const RightSideBarclose = () => {
  //rightsidebar close function
  // document.querySelector(".sidebar-right").classList.remove("sidebar-open");

  //SwitcherMenu close function
  document.querySelector(".demo_changer").classList.remove("active");
  document.querySelector(".demo_changer").style.right = "-270px";

  if (document.querySelector(".card.search-result") != null) {
    document.querySelector(".card.search-result").classList.add("d-none");
  }
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

function App() {
  const stateContext = useContext(StateContext);
  const navigate = useNavigate();

  // mainClient.apiClient.setHeader("session_token", _user.active_auth);

  // let path = `${import.meta.env.BASE_URL}indexpage`;
  // navigate(path);

  console.log("state context", stateContext);
  useEffect(() => {
    document
      .querySelector("body")
      ?.classList.remove(
        "ltr",
        "bg-primary-transparent",
        "error-page1",
        "main-body",
        "error-2"
      );
  }, []);

  return (
    // <StateContext.Provider
    //   value={{
    //     lectures2de,
    //     setLecture2de,
    //     isLoggedIn,
    //     setIsLoggedIn,
    //   }}
    // >
    <Provider store={store}>
      <PrimeReactProvider>
        <Fragment>
          <div className="horizontalMenucontainer">
            <div className="page custom-index" style={{ zIndex: 20 }}>
              <Switcher />
              <Header />
              <div
                className="sticky"
                style={{ paddingTop: "-63px", zIndex: 90 }}
              >
                <Sidebar />
              </div>
              <div
                className="jumps-prevent"
                style={{ paddingTop: "63px" }}
              ></div>
              <div
                className="main-content app-content"
                onClick={() => RightSideBarclose()}
              >
                <div className="main-container container-fluid">
                  <div className="side-app">
                    <Outlet />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
            <Rightside />
            <BacktoTop />
          </div>
        </Fragment>
      </PrimeReactProvider>
    </Provider>
    // </StateContext.Provider>
  );
}

export default App;
