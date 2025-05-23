import React, { Fragment, useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { MENUITEMS } from "./SideBarMenu";
import Scrollbars from "react-custom-scrollbars";
import { useLocation } from "react-router-dom";
let history = [];

// import icon from "../../../assets/img/faces/6.jpg";
import ProfileService from "../../CommonFileComponents/service/profile";
import EditProfileService from "../../CommonFileComponents/service/edit-profile";
import nkumbaLogo from "../../../assets/img/nkumbaLogo.png";

import StateContext from "../../../context/context";

export default function Sidebar() {
  let location = useLocation();
  const [menuitems, setMenuitems] = useState(MENUITEMS);
  const [outPut, setoutPut] = useState(EditProfileService.returnId());
  // initial loading
  useEffect(() => {
    history.push(location.pathname); // add  history to history  stack for current location.pathname to prevent multiple history calls innerWidth  and innerWidth  calls from  multiple users. This is important because the history stack is not always empty when the user clicks  the history
    if (history.length > 2) {
      history.shift();
    }
    if (history[0] !== history[1]) {
      setSidemenu();
    }
    let mainContent = document.querySelector(".main-content");

    //when we click on the body to remove
    mainContent.addEventListener("click", mainContentClickFn);
    return () => {
      mainContent.removeEventListener("click", mainContentClickFn);
    };
  }, [location]);

  // location
  useEffect(() => {
    if (
      document.body.classList.contains("horizontal") &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }, []);

  //  In Horizontal When we click the body it should we Closed using in useEfffect Refer line No:16
  function mainContentClickFn() {
    if (
      document.body.classList.contains("horizontal") &&
      window.innerWidth >= 992
    ) {
      clearMenuActive();
    }
  }
  //<-------End---->
  function setSidemenu() {
    if (menuitems) {
      menuitems.filter((mainlevel) => {
        if (mainlevel.Items) {
          mainlevel.Items.filter((items) => {
            items.active = false;
            items.selected = false;
            if (
              location.pathname === "/valex/preview/" ||
              location.pathname === "/valex/preview/"
            ) {
              location.pathname = "/valex/preview/indexpage";
            }
            if (location.pathname === items.path + "/") {
              items.active = true;
              items.selected = true;
            }
            if (items.children) {
              items.children.filter((submenu) => {
                submenu.active = false;
                submenu.selected = false;
                if (location.pathname === submenu.path + "/") {
                  items.active = true;
                  items.selected = true;
                  submenu.active = true;
                  submenu.selected = true;
                }
                if (submenu.children) {
                  submenu.children.filter((submenu1) => {
                    submenu1.active = false;
                    submenu1.selected = false;
                    if (location.pathname === submenu1.path + "/") {
                      items.active = true;
                      items.selected = true;
                      submenu.active = true;
                      submenu.selected = true;
                      submenu1.active = true;
                      submenu1.selected = true;
                    }
                    return submenu1;
                  });
                }
                return submenu;
              });
            }
            return items;
          });
        }
        setMenuitems((arr) => [...arr]);
        return mainlevel;
      });
    }
  }
  function toggleSidemenu(item) {
    if (
      !document.body.classList.contains("horizontal-hover") ||
      window.innerWidth < 992
    ) {
      // To show/hide the menu
      if (!item.active) {
        menuitems.filter((mainlevel) => {
          if (mainlevel.Items) {
            mainlevel.Items.filter((sublevel) => {
              sublevel.active = false;
              if (item === sublevel) {
                sublevel.active = true;
              }
              if (sublevel.children) {
                sublevel.children.filter((sublevel1) => {
                  sublevel1.active = false;
                  if (item === sublevel1) {
                    sublevel.active = true;
                    sublevel1.active = true;
                  }
                  if (sublevel1.children) {
                    sublevel1.children.filter((sublevel2) => {
                      sublevel2.active = false;
                      if (item === sublevel2) {
                        sublevel.active = true;
                        sublevel1.active = true;
                        sublevel2.active = true;
                      }
                      if (sublevel2.children) {
                        sublevel2.children.filter((sublevel3) => {
                          sublevel3.active = false;
                          if (item === sublevel3) {
                            sublevel.active = true;
                            sublevel1.active = true;
                            sublevel2.active = true;
                            sublevel3.active = true;
                          }
                          return sublevel2;
                        });
                      }
                      return sublevel2;
                    });
                  }
                  return sublevel1;
                });
              }
              return sublevel;
            });
          }
          return mainlevel;
        });
      } else {
        item.active = !item.active;
      }
    }

    setMenuitems((arr) => [...arr]);
  }
  function clearMenuActive() {
    MENUITEMS.filter((mainlevel) => {
      if (mainlevel.Items) {
        mainlevel.Items.filter((sublevel) => {
          sublevel.active = false;
          if (sublevel.children) {
            sublevel.children.filter((sublevel1) => {
              sublevel1.active = false;
              if (sublevel1.children) {
                sublevel1.children.filter((sublevel2) => {
                  sublevel2.active = false;
                  if (sublevel2.children) {
                    sublevel2.children.filter((sublevel3) => {
                      sublevel3.active = false;
                      return sublevel3;
                    });
                  }
                  return sublevel2;
                });
              }
              return sublevel1;
            });
          }
          return sublevel;
        });
      }
      return mainlevel;
    });
    setMenuitems((arr) => [...arr]);
  }
  //Hover effect
  function Onhover() {
    if (document.querySelector(".app")) {
      if (document.querySelector(".app").classList.contains("sidenav-toggled"))
        document.querySelector(".app").classList.add("sidenav-toggled-open");
    }
  }
  function Outhover() {
    if (document.querySelector(".app")) {
      document.querySelector(".app").classList.remove("sidenav-toggled-open");
    }
  }

  // const [profileImage, setprofileImage] = useState(ProfileService.returnImage());
  // const [faces6, setfaces6] = useState();

  const stateContext = useContext(StateContext);

  // useEffect(() => {
  //   if (ProfileService.returnImage() != undefined) {
  //     // setfaces6(ProfileService.returnImage());
  //   }
  //   setoutPut(EditProfileService.returnId());
  // }, [location]);

  return (
    <div>
      <div
        className="app-sidebar "
        onMouseOver={() => Onhover()}
        onMouseOut={() => Outhover()}
      >
        <Scrollbars options={{ suppressScrollX: true }} className="hor-scroll">
          <div className="main-sidebar-header active">
            <Link
              className="desktop-logo logo-light active"
              to={`${import.meta.env.BASE_URL}indexpage`}
            >
              {/* <img src={logo} className="main-logo" alt="logo" />
               */}
              <h4
                className="main-logo txt-white"
                style={{
                  color: "white",
                }}
              >
                {stateContext.campus.name}
              </h4>
            </Link>
            <Link
              className="desktop-logo logo-dark active"
              to={`${import.meta.env.BASE_URL}indexpage`}
            >
              {/* <img src={logoWhite} className="main-logo" alt="logo" /> */}
              <h4
                style={{
                  color: "white",
                }}
                className="main-logo txt-white"
              >
                NU
              </h4>
            </Link>
            <Link
              className="logo-icon mobile-logo icon-light active"
              to={`${import.meta.env.BASE_URL}indexpage`}
            >
              {/* <img src={favicon} className="" alt="logo" /> */}
              NU
            </Link>
            <Link
              className="logo-icon mobile-logo icon-dark active"
              to={`${import.meta.env.BASE_URL}indexpage`}
            >
              {/* <img src={faviconWhite} className="" alt="logo" /> */}
              NU
            </Link>
          </div>
          <div className="main-sidemenu">
            {/* <div className="app-sidebar__user clearfix">
              <div className="dropdown user-pro-body">
                <div className="">
                  <img
                    alt="user-img"
                    // className="avatar avatar-xl brround"
                    src={nkumbaLogo}
                  />
                  <span className="avatar-status profile-status bg-green"></span>
                </div>
                <div className="user-info">
                  <h4 className="fw-semibold mt-3 mb-0">
                    {outPut.firstName == undefined ? "Petey" : outPut.firstName}{" "}
                    {outPut.lastName == undefined ? "Cruiser" : outPut.lastName}
                  </h4>
                  <span className="mb-0 text-muted">Premium Member</span>
                </div>
              </div>
            </div> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                // backgroundColor: "red",
                marginTop: 80,
                marginBottom: -20,
              }}
            >
              <img
                alt="user-img"
                style={{
                  width: 200,
                  marginLeft: -25,
                  // height: 100,
                }}
                src={nkumbaLogo}
              />
            </div>
            <div className="slide-left disabled" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z" />
              </svg>
            </div>

            <ul className="side-menu open">
              {MENUITEMS.map((Item, i) => {
                return (
                  <Fragment key={i}>
                    {/* {console.log("item", Item)} */}
                    <li className="side-item side-item-category">
                      {Item.menutitle}
                    </li>
                    {Item.Items.map((menuItem, i) => {
                      // console.log(menuItem.title, menuItem.access_ids);
                      // console.log(
                      //   "role id",
                      //   stateContext.user.assignedRole.role_id
                      // );

                      // console.log(
                      //   "comparison",
                      //   menuItem.access_ids &&
                      //     menuItem.access_ids.includes(
                      //       stateContext.user.assignedRole.role_id
                      //     )
                      // );
                      if (
                        menuItem.access_ids &&
                        menuItem.access_ids.includes(
                          stateContext.user.assignedRole.role_id
                        )
                      ) {
                        // console.log(menuItem.title, "has access ids");
                        return (
                          <li
                            className={`slide ${
                              menuItem.active ? "is-expanded" : ""
                            }`}
                            key={i}
                          >
                            {menuItem.type === "link" ? (
                              <Link
                                to={menuItem.path + "/"}
                                className={`side-menu__item ${
                                  menuItem.active ? "active" : ""
                                }`}
                                onClick={() => {
                                  toggleSidemenu(menuItem);
                                }}
                              >
                                {menuItem.icon}
                                <span className="side-menu__label">
                                  {menuItem.title}
                                </span>
                              </Link>
                            ) : (
                              ""
                            )}

                            {menuItem.type === "sub" ? (
                              <Link
                                to={menuItem.path + "/"}
                                className={`side-menu__item ${
                                  menuItem.active ? "active" : ""
                                }`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleSidemenu(menuItem);
                                }}
                              >
                                {menuItem.icon}
                                <span className="side-menu__label">
                                  {menuItem.title}
                                </span>
                                {menuItem.badge ? (
                                  <label
                                    className={`${menuItem.badge} side-badge`}
                                  >
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ""
                                )}
                                {/* <i className="angle fe fe-chevron-right"></i>
                                 */}
                                <i class="angle bi bi-chevron-right"></i>
                              </Link>
                            ) : (
                              ""
                            )}
                            {menuItem.children ? (
                              <ul
                                className={`slide-menu ${
                                  menuItem.active ? "open" : " "
                                }`}
                                style={
                                  menuItem.active
                                    ? {
                                        opacity: 1,
                                        transition: "opacity 500ms ease-in",
                                        display: "block",
                                      }
                                    : { display: "none" }
                                }
                              >
                                {menuItem.children.map(
                                  (childrenItem, index) => {
                                    return (
                                      <li className="sub-slide" key={index}>
                                        {childrenItem.type === "sub" ? (
                                          <Link
                                            to="javascript"
                                            className="slide-item"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              toggleSidemenu(childrenItem);
                                            }}
                                          >
                                            <span className="sub-side-menu__label">
                                              {childrenItem.title}
                                            </span>
                                            {childrenItem.active ? (
                                              // <i className="sub-angle  fe fe-chevron-down"></i>
                                              <i class="sub-angle bi bi-chevron-down"></i>
                                            ) : (
                                              // <i className="sub-angle fe fe-chevron-right"></i>
                                              <i class="sub-angle bi bi-chevron-right"></i>
                                            )}
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                        {childrenItem.type === "link" ? (
                                          <Link
                                            to={childrenItem.path + "/"}
                                            className={`slide-item ${
                                              childrenItem.active
                                                ? "active"
                                                : " "
                                            }`}
                                            onClick={() =>
                                              toggleSidemenu(childrenItem)
                                            }
                                          >
                                            {childrenItem.title}
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                        {childrenItem.children ? (
                                          <ul
                                            className={`sub-slide-menu ${
                                              menuItem.active ? "" : "open"
                                            }`}
                                            style={
                                              childrenItem.active
                                                ? { display: "block" }
                                                : { display: "none" }
                                            }
                                          >
                                            {childrenItem.children.map(
                                              (childrenSubItem, key) => (
                                                <li key={key}>
                                                  {childrenSubItem.type ===
                                                  "link" ? (
                                                    <Link
                                                      to={
                                                        childrenSubItem.path +
                                                        "/"
                                                      }
                                                      className={`${"sub-side-menu__item"}`}
                                                      onClick={() =>
                                                        toggleSidemenu(
                                                          childrenSubItem
                                                        )
                                                      }
                                                    >
                                                      {childrenSubItem.title}
                                                    </Link>
                                                  ) : (
                                                    ""
                                                  )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              ""
                            )}
                          </li>
                        );
                      }

                      if (!menuItem.access_ids) {
                        return (
                          <li
                            className={`slide ${
                              menuItem.active ? "is-expanded" : ""
                            }`}
                            key={i}
                          >
                            {menuItem.type === "link" ? (
                              <Link
                                to={menuItem.path + "/"}
                                className={`side-menu__item ${
                                  menuItem.active ? "active" : ""
                                }`}
                                onClick={() => {
                                  toggleSidemenu(menuItem);
                                }}
                              >
                                {menuItem.icon}
                                <span className="side-menu__label">
                                  {menuItem.title}
                                </span>
                              </Link>
                            ) : (
                              ""
                            )}

                            {menuItem.type === "sub" ? (
                              <Link
                                to={menuItem.path + "/"}
                                className={`side-menu__item ${
                                  menuItem.active ? "active" : ""
                                }`}
                                onClick={(event) => {
                                  event.preventDefault();
                                  toggleSidemenu(menuItem);
                                }}
                              >
                                {menuItem.icon}
                                <span className="side-menu__label">
                                  {menuItem.title}
                                </span>
                                {menuItem.badge ? (
                                  <label
                                    className={`${menuItem.badge} side-badge`}
                                  >
                                    {menuItem.badgetxt}
                                  </label>
                                ) : (
                                  ""
                                )}
                                {/* <i className="angle fe fe-chevron-right"></i> */}
                                <i class="angle bi bi-chevron-right"></i>
                              </Link>
                            ) : (
                              ""
                            )}
                            {menuItem.children ? (
                              <ul
                                className={`slide-menu ${
                                  menuItem.active ? "open" : " "
                                }`}
                                style={
                                  menuItem.active
                                    ? {
                                        opacity: 1,
                                        transition: "opacity 500ms ease-in",
                                        display: "block",
                                      }
                                    : { display: "none" }
                                }
                              >
                                {menuItem.children.map(
                                  (childrenItem, index) => {
                                    return (
                                      <li className="sub-slide" key={index}>
                                        {childrenItem.type === "sub" ? (
                                          <Link
                                            to="javascript"
                                            className="slide-item"
                                            onClick={(event) => {
                                              event.preventDefault();
                                              toggleSidemenu(childrenItem);
                                            }}
                                          >
                                            <span className="sub-side-menu__label">
                                              {childrenItem.title}
                                            </span>
                                            {childrenItem.active ? (
                                              // <i className="sub-angle  fe fe-chevron-down"></i>
                                              <i class="sub-angle bi bi-chevron-down"></i>
                                            ) : (
                                              // <i className="sub-angle fe fe-chevron-right"></i>
                                              <i class="sub-angle bi bi-chevron-right"></i>
                                            )}
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                        {childrenItem.type === "link" ? (
                                          <Link
                                            to={childrenItem.path + "/"}
                                            className={`slide-item ${
                                              childrenItem.active
                                                ? "active"
                                                : " "
                                            }`}
                                            onClick={() =>
                                              toggleSidemenu(childrenItem)
                                            }
                                          >
                                            {childrenItem.title}
                                          </Link>
                                        ) : (
                                          ""
                                        )}
                                        {childrenItem.children ? (
                                          <ul
                                            className={`sub-slide-menu ${
                                              menuItem.active ? "" : "open"
                                            }`}
                                            style={
                                              childrenItem.active
                                                ? { display: "block" }
                                                : { display: "none" }
                                            }
                                          >
                                            {childrenItem.children.map(
                                              (childrenSubItem, key) => (
                                                <li key={key}>
                                                  {childrenSubItem.type ===
                                                  "link" ? (
                                                    <Link
                                                      to={
                                                        childrenSubItem.path +
                                                        "/"
                                                      }
                                                      className={`${"sub-side-menu__item"}`}
                                                      onClick={() =>
                                                        toggleSidemenu(
                                                          childrenSubItem
                                                        )
                                                      }
                                                    >
                                                      {childrenSubItem.title}
                                                    </Link>
                                                  ) : (
                                                    ""
                                                  )}
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        ) : (
                                          ""
                                        )}
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            ) : (
                              ""
                            )}
                          </li>
                        );
                      }
                    })}
                  </Fragment>
                );
              })}
            </ul>
            <div className="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z" />
              </svg>
            </div>
          </div>
        </Scrollbars>
      </div>
    </div>
  );
}

Sidebar.propTypes = {};

Sidebar.defaultProps = {};
