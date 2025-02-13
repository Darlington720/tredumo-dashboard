import React, { useState, useEffect, useContext } from "react";
import Scrollbars from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import styles from "./Switcher.module.scss";
import * as SwitcherData from "./Data/SwitcherData";
import { connect } from "react-redux";
import {
  SwitcherAction,
  changePrimaryColor,
  darkPrimaryColor,
  transparentPrimaryColor,
  transparentBackground,
  BGImagePrimaryColor,
} from "../../CommonFileComponents/redux/action";

// BG PRIMARY Images

import StateContext from "../../../context/context";
import constraintsApi from "../../../../api/constraintsApi";

const Switcher = ({
  SwitcherAction,
  changePrimaryColor,
  darkPrimaryColor,
  transparentPrimaryColor,
  transparentBackground,
  BGImagePrimaryColor,
}) => {
  const stateContext = useContext(StateContext);
  const [loading, setLoading] = useState(false);
  const [real, setReal] = useState(
    stateContext.data
      ? stateContext.data.constraints[2].c_percentage
      : stateContext.realTime
  );
  console.log(
    "stateContext in switcher",
    stateContext.data
      ? stateContext.data.constraints[2].c_percentage
      : stateContext.realTime
  );

  useEffect(() => {
    SwitcherData.localStorageBackUp();
  });

  const handleRealTimeChange = async () => {
    //update the contraints in the db
    setLoading(true);
    const constRes = await constraintsApi.getContraints();

    // if (!constRes.data.success) {
    //   alert(constRes.data.result);
    //   return;
    // }

    console.log("const res", constRes.data);

    const res = await constraintsApi.updateConstraint({
      ...constRes.data[2],
      c_percentage: constRes.data[2].c_percentage === 0 ? 1 : 0,
    });

    const constRes2 = await constraintsApi.getContraints();

    setLoading(false);

    if (!res.ok) return alert("Error in updating the contraint");

    stateContext.setRealTime(Boolean(constRes2.data[2].c_percentage));
  };

  const [Basic, setShow1] = useState(false);

  return (
    <div className={styles.Switcher}>
      {/* <!-- Switcher --> */}
      <div
        style={{
          position: "absolute",
          top: 0,
          // backgroundColor: "red",
          zIndex: 10,
        }}
      >
        <span
          onClick={() => {
            console.log("span");
            document.querySelector(".demo_changer").classList.remove("active");
          }}
        >
          close
        </span>
      </div>
      <div className="switcher-wrapper">
        <div className="demo_changer">
          <div className="form_holder sidebar-right1">
            <Scrollbars className="hor-scroll">
              <div className="row">
                <div className="predefined_styles">
                  <div className="swichermainleft switcher-nav">
                    <h4>SWITCH CAMPUS</h4>
                    <div className="p-3 d-grid gap-2">
                      <a
                        // href="https://react.spruko.com/valex/"
                        style={{
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          // console.log("main");
                          stateContext.setCampus({
                            id: 1,
                            name: "MAIN CAMPUS",
                          });
                        }}
                        className="btn ripple btn-primary mt-0"
                      >
                        MAIN CAMPUS
                      </a>
                      {/* <Link to='#' onClick={() => viewDemoShow("Basic")} className="btn ripple btn-info">Buy Now</Link> */}

                      {/* <!-- buynow modal --> */}

                      {/* <!-- End buynow modal --> */}
                      <a
                        // href="https://themeforest.net/user/spruko/portfolio"
                        style={{
                          color: "white",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          // console.log("Kampala");
                          stateContext.setCampus({
                            id: 2,
                            name: "KAMPALA CAMPUS",
                          });
                        }}
                        className="btn ripple btn-danger"
                      >
                        KAMPALA CAMPUS
                      </a>
                    </div>
                  </div>
                  <div className="swichermainleft text-center"></div>
                  <div className="swichermainleft text-center">
                    <h4>REAL TIME ACTIVATION</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">REAL TIME</span>
                          {/* <p className="onoffswitch2 my-0"> */}
                          <Toggle
                            id="cheese-status"
                            // defaultChecked={realTime}
                            checked={Boolean(stateContext.realTime)}
                            disabled={loading}
                            onChange={handleRealTimeChange}
                          />
                          {/* <input
                              type="checkbox"
                              // disabled
                              name="onoffswitch25"
                              id="myonoffswitch54"
                              className="onoffswitch2-checkbox"
                              onChange={(e) => {
                                console.log(stateContext.realTime);
                                stateContext.setRealTime(
                                  stateContext.realTime ? false : true
                                );
                              }}
                              // value={true}
                              // onClick={() => toggleRealTime()}
                              defaultChecked={stateContext.realTime}
                            /> */}

                          {/* <label
                              htmlFor="myonoffswitch54"
                              className="onoffswitch2-label"
                            ></label> */}
                          {/* </p> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <div className="swichermainleft">
                    <h4>Light Theme Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              id="myonoffswitch1"
                              onClick={() => SwitcherAction("LightTheme")}
                              className="onoffswitch2-checkbox"
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch1"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Primary</span>
                          <div className="">
                            <input
                              className="wd-25 ht-25 input-color-picker color-primary-light"
                              defaultValue="#0162e8"
                              id="colorID"
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id7="transparentcolor"
                              name="lightPrimary"
                              onChange={(ele) => {
                                changePrimaryColor(ele.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Dark Theme Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              id="myonoffswitch2"
                              onClick={() => {
                                SwitcherAction("DarkTheme");
                              }}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitch2"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Primary</span>
                          <div className="">
                            <input
                              className="wd-25 ht-25 input-dark-color-picker color-primary-dark"
                              defaultValue="#0162e8"
                              id="darkPrimaryColorID"
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id8="transparentcolor"
                              name="darkPrimary"
                              onChange={(ele) => {
                                darkPrimaryColor(ele.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Transparent Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex mt-2 mb-3">
                          <span className="me-auto">Transparent Theme</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch1"
                              id="myonoffswitchTransparent"
                              onClick={() => {
                                SwitcherAction("Transparent");
                              }}
                              className="onoffswitch2-checkbox"
                            />
                            <label
                              htmlFor="myonoffswitchTransparent"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Transparent Primary</span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-primary-transparent"
                              defaultValue="#0162e8"
                              id="transparentPrimaryColorID"
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id4="primary"
                              data-id9="transparentcolor"
                              name="tranparentPrimary"
                              onChange={(ele) => {
                                transparentPrimaryColor(ele.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">
                            Transparent Background
                          </span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-bg-transparent"
                              defaultValue="#0162e8"
                              id="transparentBgColorID"
                              type="color"
                              data-id5="body"
                              data-id6="theme"
                              data-id9="transparentcolor"
                              name="transparentBackground"
                              onChange={(ele) => {
                                transparentBackground(ele.target.value);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Transparent Bg-Image Style</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">BG-Image Primary</span>
                          <div className="">
                            <input
                              className="wd-30 ht-30 input-transparent-color-picker color-primary-transparent"
                              defaultValue="#0162e8"
                              id="transparentBgImgPrimaryColorID"
                              type="color"
                              data-id="bg-color"
                              data-id1="bg-hover"
                              data-id2="bg-border"
                              data-id3="primary"
                              data-id4="primary"
                              data-id9="transparentcolor"
                              name="tranparentPrimary"
                              onChange={(ele) => {
                                BGImagePrimaryColor(ele.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="switch-toggle">
                          <Link
                            className="bg-img1"
                            onClick={() => {
                              SwitcherAction("BG-Image-1");
                            }}
                            to="#"
                          >
                            <img src={bg1} id="bgimage1" alt="switch-img" />
                          </Link>
                          <Link
                            className="bg-img2"
                            onClick={() => {
                              SwitcherAction("BG-Image-2");
                            }}
                            to="#"
                          >
                            <img src={bg2} id="bgimage2" alt="switch-img" />
                          </Link>
                          <Link
                            className="bg-img3"
                            onClick={() => {
                              SwitcherAction("BG-Image-3");
                            }}
                            to="#"
                          >
                            <img src={bg3} id="bgimage3" alt="switch-img" />
                          </Link>
                          <Link
                            className="bg-img4"
                            onClick={() => {
                              SwitcherAction("BG-Image-4");
                            }}
                            to="#"
                          >
                            <img src={bg4} id="bgimage4" alt="switch-img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft leftmenu-styles">
                    <h4>Leftmenu Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch3"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("LightMenu");
                              }}
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch3"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Color Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch4"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("ColorMenu");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch4"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch5"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("DarkMenu");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch5"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Gradient Menu</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch2"
                              id="myonoffswitch25"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("GradientMenu");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch25"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft header-styles">
                    <h4>Header Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Light Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch6"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Lightheader");
                              }}
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch6"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Color Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch7"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Colorheader");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch7"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Dark Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch8"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Darkheader");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch8"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Gradient Header</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch3"
                              id="myonoffswitch26"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("gradientheader");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch26"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Skin Modes</h4>
                    <div className="switch_section">
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Default Body</span>
                        <div className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitchBody"
                            id="myonoffswitch07"
                            className="onoffswitch2-checkbox"
                            onClick={() => {
                              SwitcherAction("DefaultBody");
                            }}
                            defaultChecked="true"
                          />
                          <label
                            htmlFor="myonoffswitch07"
                            className="onoffswitch2-label"
                          ></label>
                        </div>
                      </div>
                      <div className="switch-toggle d-flex">
                        <span className="me-auto">Body Style1</span>
                        <div className="onoffswitch2">
                          <input
                            type="radio"
                            name="onoffswitchBody"
                            id="myonoffswitch06"
                            className="onoffswitch2-checkbox"
                            onClick={() => {
                              SwitcherAction("BodyStyle1");
                              localStorage.setItem("BodyStyle1", "true");
                            }}
                          />
                          <label
                            htmlFor="myonoffswitch06"
                            className="onoffswitch2-label"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft vertical-images">
                    <h4>Leftmenu Bg-Image</h4>
                    <div className="skin-body light-pattern">
                      <button
                        type="button"
                        id="leftmenuimage1"
                        onClick={() => {
                          SwitcherData.leftsideBGImg1("leftbgimage1"),
                            localStorage.setItem("sidebar-img", "leftbgimage1");
                        }}
                        className="bg1 wscolorcode1 blackborder"
                      ></button>
                      <button
                        type="button"
                        id="leftmenuimage2"
                        onClick={() => {
                          SwitcherData.leftsideBGImg1("leftbgimage2"),
                            localStorage.setItem("sidebar-img", "leftbgimage2");
                        }}
                        className="bg2 wscolorcode1 blackborder"
                      ></button>
                      <button
                        type="button"
                        id="leftmenuimage3"
                        onClick={() => {
                          SwitcherData.leftsideBGImg1("leftbgimage3"),
                            localStorage.setItem("sidebar-img", "leftbgimage3");
                        }}
                        className="bg3 wscolorcode1 blackborder"
                      ></button>
                      <button
                        type="button"
                        id="leftmenuimage4"
                        onClick={() => {
                          SwitcherData.leftsideBGImg1("leftbgimage4"),
                            localStorage.setItem("sidebar-img", "leftbgimage4");
                        }}
                        className="bg4 wscolorcode1 blackborder"
                      ></button>
                      <button
                        type="button"
                        id="leftmenuimage5"
                        onClick={() => {
                          SwitcherData.leftsideBGImg1("leftbgimage5"),
                            localStorage.setItem("sidebar-img", "leftbgimage5");
                        }}
                        className="bg5 wscolorcode1 blackborder"
                      ></button>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Layout Width Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Full Width</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch9"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("FullWidth");
                              }}
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch9"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Boxed</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch4"
                              id="myonoffswitch10"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Boxed");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch10"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft switcher-layout">
                    <h4>Layout Positions</h4>
                    <div className="skin-body">
                      <div className="switch_section">
                        <div className="switch-toggle d-flex">
                          <span className="me-auto">Fixed</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch11"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Fixed");
                              }}
                              defaultChecked
                            />
                            <label
                              htmlFor="myonoffswitch11"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                        <div className="switch-toggle d-flex mt-2">
                          <span className="me-auto">Scrollable</span>
                          <p className="onoffswitch2 my-0">
                            <input
                              type="radio"
                              name="onoffswitch5"
                              id="myonoffswitch12"
                              className="onoffswitch2-checkbox"
                              onClick={() => {
                                SwitcherAction("Scrollable");
                              }}
                            />
                            <label
                              htmlFor="myonoffswitch12"
                              className="onoffswitch2-label"
                            ></label>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swichermainleft">
                    <h4>Reset All Styles</h4>
                    <div className="skin-body">
                      <div className="switch_section my-4">
                        <button
                          className="btn btn-danger btn-block"
                          onClick={() => {
                            SwitcherAction("ResetAll");
                          }}
                          type="button"
                        >
                          Reset All
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </Scrollbars>
          </div>
        </div>
      </div>
      {/* <!-- End Switcher --> */}
    </div>
  );
};

Switcher.defaultProps = {};

const mapStateToProps = (state) => ({
  local_varaiable: state,
});

export default connect(mapStateToProps, {
  SwitcherAction,
  changePrimaryColor,
  darkPrimaryColor,
  transparentPrimaryColor,
  transparentBackground,
  BGImagePrimaryColor,
})(Switcher);
