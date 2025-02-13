// import { PODUCTDATA } from "../../Pages/Ecommerce/WishList/Data/wishlistData";
import {
  checkHoriMenu,
  Horizontalmenudefultclose,
  switcherArrowFn,
} from "./../../Layouts/Switcher/Data/SwitcherData";

// const data = PODUCTDATA

//Elements
const app = document.querySelector(".app");
const body = document.querySelector("body");

export default function reducer(state, action) {
  const { type, payload } = action;
  const isValidHex = (hexValue) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hexValue);
  const dynamicBackgroundColor = document.querySelectorAll(
    "input.color-primary-light"
  );

  const horizontalmenusticky = () => {
    if (document.querySelector(".main-header")) {
      if (
        !document.body.classList.contains("scrollable-layout") &&
        document.body.classList.contains("horizontal")
      ) {
        if (window.scrollY > 30) {
          document
            .querySelector(".main-header")
            .classList.add("fixed-header", "visible-title");
          let Scolls = document.querySelectorAll(".sticky");
          Scolls.forEach((e) => {
            e.classList.add("sticky-pin");
          });
        } else {
          document
            .querySelector(".main-header")
            .classList.remove("fixed-header", "visible-title");
          let Scolls = document.querySelectorAll(".sticky");
          Scolls.forEach((e) => {
            e.classList.remove("sticky-pin");
          });
        }
      }
    }
  };

  window.addEventListener("scroll", horizontalmenusticky);

  function reset() {
    let lighttheme = document.querySelector("#myonoffswitch1");
    lighttheme.checked = true; //lighttheme
    let fixed = document.querySelector("#myonoffswitch11");
    fixed.checked = true; //fixed
    let lightmenu = document.querySelector("#myonoffswitch3");
    lightmenu.checked = true; //lightmenu
    let lightheader = document.querySelector("#myonoffswitch6");
    lightheader.checked = true; //lightheader
    let fullwidth = document.querySelector("#myonoffswitch9");
    fullwidth.checked = true; //fullwidth
    let ltr = document.querySelector("#myonoffswitch54");
    ltr.checked = true; //Ltr
    let Vertail = document.querySelector("#myonoffswitch34");
    Vertail.checked = true; //Vertail
    let HorizontalHoverMenu = document.querySelector("#myonoffswitch111");
    HorizontalHoverMenu.checked = false;
    app.classList.remove("leftbgimage1");
    app.classList.remove("leftbgimage2");
    app.classList.remove("leftbgimage3");
    app.classList.remove("leftbgimage4");
    app.classList.remove("transparent-theme");
    app.classList.remove("dark-theme");
    app.classList.remove("dark-menu");
    app.classList.remove("color-menu");
    app.classList.remove("gradient-menu");
    app.classList.remove("dark-header");
    app.classList.remove("color-header");
    app.classList.remove("gradient-header");
    app.classList.remove("layout-boxed");
    app.classList.remove("body-style1");
    app.classList.remove("scrollable-layout");

    app.classList.remove("closed-leftmenu");

    app.classList.remove("sidenav-toggled");

    app.classList.remove("horizontal");
    app.classList.remove("horizontal-hover");
    document.querySelector(".app-sidebar").classList.remove("horizontal-main");
    document.querySelector(".main-header").classList.remove("hor-header");
    document.querySelector(".main-sidemenu").classList.remove("container");
    document.querySelector(".main-container").classList.remove("container");
    document.querySelector(".side-app").classList.remove("container");

    app.classList.add("sidebar-mini");
    if (document.querySelector(".header") != null) {
      document.querySelector(".header").classList.add("app-header");
    }
    document.querySelector(".main-content").classList.add("app-content");
    document.querySelector(".main-container").classList.add("container-fluid");
    document
      .querySelector(".main-content")
      .classList.remove("horizontal-content");
    app.classList.add("ltr");
    app.classList.remove("rtl");
    localStorage.removeItem("valexprimaryColor");

    let html = document.querySelector("html")?.style;
  }

  function dynamicBgTransparentBackground(primaryColor, color) {
    primaryColor.forEach((item) => {
      const cssPropName1 = `--transparent-${item.getAttribute("data-id5")}`;
      handleThemeUpdate({
        [cssPropName1]: hexToRgba(color),
      });
    });
  }
  const convertHexUnitTo256 = (hexStr) =>
    parseInt(hexStr.repeat(2 / hexStr.length), 16);
  const getAlphafloat = (a, alpha) => {
    if (typeof a !== "undefined") {
      return a / 255;
    }
    if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
      return 1;
    }
    return alpha;
  };
  function OpacityValuePrimary() {
    let primaryColorVal = getComputedStyle(document.documentElement)
      .getPropertyValue("--primary-bg-color")
      .trim();

    //get variable
    let myVarVal =
      localStorage.getItem("valexprimaryColor") ||
      localStorage.getItem("valexdarkPrimaryColor") ||
      localStorage.getItem("valextransparentPrimaryColor") ||
      localStorage.getItem("valextransparent-bgImgPrimaryColor") ||
      localStorage.getItem("valextransparentBgImgPrimary") ||
      primaryColorVal;

    let colorData = hexToRgba(myVarVal, 0.1);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-color", colorData);

    let colorData1 = hexToRgba(myVarVal, 0.2);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-hover", colorData1);

    let colorData2 = hexToRgba(myVarVal, 0.3);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-border", colorData2);

    let colorData3 = hexToRgba(myVarVal, 0.6);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-color", colorData3);

    let colorData4 = hexToRgba(myVarVal, 0.9);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-color", colorData4);

    let colorID = hexToRgba(myVarVal, 1);
    document
      .querySelector("html")
      ?.style.setProperty("--primary-bg-color", colorID);
  }
  function dynamicTransparentPrimaryColor(events, color) {
    events.forEach((item) => {
      const cssPropName = `--primary-bg-color`;
      const cssPropName1 = `--primary-bg-hover`;
      const cssPropName2 = `--primary-bg-border`;
      handleThemeUpdate({
        [cssPropName]: hexToRgba(color),
        [cssPropName1]: hexToRgba(color),
        [cssPropName2]: hexToRgba(color),
      });
    });
  }
  function handleThemeUpdate(cssVars) {
    const root = document.querySelector(":root");
    const keys = Object.keys(cssVars);

    keys.forEach((key) => {
      root.style.setProperty(key, cssVars[key]);
    });
  }
  function hexToRgba(hexValue, alpha = 1) {
    if (!isValidHex(hexValue)) {
      return null;
    }
    const chunkSize = Math.floor((hexValue.length - 1) / 3);
    const hexArr = getChunksFromString(hexValue.slice(1), chunkSize);
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
  }
  function dynamicBgImgTransparentPrimaryColor(primaryColor, color) {
    primaryColor.forEach((item) => {
      const cssPropName = `--primary-${item.getAttribute("data-id")}`;
      const cssPropName1 = `--primary-${item.getAttribute("data-id1")}`;
      const cssPropName2 = `--primary-${item.getAttribute("data-id2")}`;

      handleThemeUpdate({
        [cssPropName]: hexToRgba(color),
        [cssPropName1]: hexToRgba(color),
        [cssPropName2]: hexToRgba(color),
      });
    });
    OpacityValuePrimary();
  }

  const getChunksFromString = (st, chunkSize) =>
    st.match(new RegExp(`.{${chunkSize}}`, "g"));
  switch (type) {
    case "RTL":
      app.classList.add("rtl");
      document.querySelector("html[lang=en]").setAttribute("dir", "rtl");
      app.classList.remove("ltr");
      localStorage.setItem("valexrtl", true);
      localStorage.removeItem("valexltr");
      break;

    case "LTR":
      app.classList.add("ltr");
      document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
      app.classList.remove("rtl");
      localStorage.setItem("valexltr", true);
      localStorage.removeItem("valexrtl");
      break;

    case "Verticalmenu":
      app.classList.add("sidebar-mini");
      document.querySelector(".main-header").classList.add("side-header");
      document.querySelector(".main-content").classList.add("app-content");
      document
        .querySelector(".main-container")
        .classList.add("container-fluid");
      document.querySelector(".side-app").classList.remove("container");
      app.classList.remove("horizontal");

      app.classList.remove("horizontal-hover");
      document
        .querySelector(".app-sidebar")
        .classList.remove("horizontal-main");
      document.querySelector(".main-header").classList.remove("hor-header");
      document.querySelector(".main-sidemenu").classList.remove("container");
      document.querySelector(".main-container").classList.remove("container");
      document
        .querySelector(".main-content")
        .classList.remove("horizontal-content");
      document.querySelector(".side-app").classList.add("container-fluid");

      localStorage.setItem("valexvertical", true);
      localStorage.removeItem("valexhorizontal");
      localStorage.removeItem("valexhorizontalHover");
      break;

    case "horizontalclickmenu":
      document.querySelector(".main-header")?.classList.add("hor-header");
      app.classList.remove("sidebar-mini");
      document.querySelector(".main-header").classList.remove("side-header");
      document.querySelector(".main-content").classList.remove("app-content");
      document
        .querySelector(".main-container")
        .classList.remove("container-fluid");
      app.classList.remove("sidenav-toggled");
      app.classList.remove("horizontal-hover");
      app.classList.add("horizontal");
      document.querySelector(".main-container").classList.add("container");
      document.querySelector(".main-sidemenu").classList.add("container");
      document
        .querySelector(".main-content")
        .classList.add("horizontal-content");
      document.querySelector(".app-sidebar").classList.add("horizontal-main");
      document.querySelector(".side-app").classList.add("container");

      // $('#slide-left').remove('d-none');
      // $('#slide-right').remove('d-none');
      document.querySelector(".horizontal .side-menu").style.flexWrap =
        "nowrap";

      checkHoriMenu();
      Horizontalmenudefultclose();
      switcherArrowFn();

      localStorage.removeItem("valexvertical");
      localStorage.setItem("valexhorizontal", true);
      localStorage.removeItem("valexhorizontalHover");
      break;

    case "Horizontalhovermenu":
      app.classList.add("horizontal-hover");
      app.classList.add("horizontal");
      document
        .querySelector(".main-content")
        .classList.add("horizontal-content");
      document.querySelector(".main-container").classList.add("container");
      document.querySelector(".main-header").classList.add("hor-header");
      document.querySelector(".app-sidebar").classList.add("horizontal-main");
      document.querySelector(".main-sidemenu").classList.add("container");
      document.querySelector(".side-app").classList.add("container");

      document.querySelector("#slide-left").classList.remove("d-none");
      document.querySelector("#slide-right").classList.remove("d-none");
      document.querySelector(".main-content").classList.remove("app-content");
      document
        .querySelector(".main-container")
        .classList.remove("container-fluid");
      app.classList.remove("sidebar-mini");
      app.classList.remove("sidenav-toggled");

      document
        .querySelector(".horizontal-hover", ".side-menu")
        ?.classList.add("flex-nowrap");
      let li = document.querySelectorAll(".side-menu", "li");
      li.forEach((e, i) => {
        if (e.classList.contains("is-expaned")) {
          let ele = [...e.children];
          ele.forEach((el, i) => {
            el.classList.remove("active");
            if (el.classList.contains("slide-menu")) {
              el.style = "";
              el.style.display = "none";
            }
          });
          e.classList.remove("is-expaned");
        }
      });
      checkHoriMenu();
      Horizontalmenudefultclose();
      switcherArrowFn();

      localStorage.removeItem("valexvertical");
      localStorage.setItem("valexhorizontalHover", true);
      localStorage.removeItem("valexhorizontal");
      break;

    case "LightTheme":
      body.classList.add("light-theme");
      document.querySelector("#myonoffswitch3").checked = true;
      document.querySelector("#myonoffswitch6").checked = true;

      body.classList.remove("transparent-theme");
      body.classList.remove("dark-theme");
      body?.classList.remove("dark-header");
      body?.classList.remove("color-header");
      body?.classList.remove("gradient-header");
      body?.classList.remove("dark-menu");
      body?.classList.remove("color-menu");
      body?.classList.remove("gradient-menu");
      body?.classList.remove("bg-img1");
      body?.classList.remove("bg-img2");
      body?.classList.remove("bg-img3");
      body?.classList.remove("bg-img4");

      document.querySelector("html").style = "";

      localStorage.removeItem("valexdark");
      localStorage.setItem("valexlighttheme", true);
      localStorage.removeItem("valextransparent");
      localStorage.removeItem("valexBgImage");
      localStorage.removeItem("");
      break;

    case "DarkTheme":
      body.classList.add("dark-theme");
      document.querySelector("#myonoffswitch8").checked = true;
      document.querySelector("#myonoffswitch5").checked = true;

      body.classList.remove("transparent-theme");
      body.classList.remove("light-theme");
      body?.classList.remove("light-header");
      body?.classList.remove("color-header");
      body?.classList.remove("gradient-header");
      body?.classList.remove("light-menu");
      body?.classList.remove("color-menu");
      body?.classList.remove("gradient-menu");

      document.querySelector("html").style = "";

      localStorage.removeItem("valexlighttheme");
      localStorage.setItem("valexdark", true);
      localStorage.removeItem("valextransparent");
      localStorage.removeItem("valexBgImage");
      break;

    case "Transparent":
      // console.log(Math.random());
      app.classList.add("transparent-theme");

      app.classList.remove("light-theme");
      app.classList.remove("dark-theme");
      body.classList.remove("bg-img1");
      app.classList.remove("bg-img2");
      app.classList.remove("bg-img3");
      app.classList.remove("bg-img4");

      app.classList.remove("light-menu");
      app.classList.remove("color-menu");
      app.classList.remove("dark-menu");
      app.classList.remove("gradient-menu");

      app.classList.remove("color-header");
      app.classList.remove("gradient-header");
      app.classList.remove("light-header");
      app.classList.remove("dark-header");
      document.querySelector("#myonoffswitch3").checked = false;
      document.querySelector("#myonoffswitch6").checked = false;
      document.querySelector("#myonoffswitch8").checked = false;
      document.querySelector("#myonoffswitch5").checked = false;
      document.querySelector("html").style = "";
      localStorage.removeItem("valexlighttheme");
      localStorage.setItem("valextransparent", true);
      localStorage.removeItem("valexdark");
      localStorage.removeItem("valexBgImage");
      break;

    case "BG-Image-1":
      body.classList.add("bg-img1");
      body.classList.remove("bg-img2");
      body.classList.remove("bg-img3");
      body.classList.remove("bg-img4");
      body.classList.add("transparent-theme");
      localStorage.setItem("valexBgImage", "bg-img1");

      app.classList.remove("light-theme");
      app.classList.remove("dark-theme");
      localStorage.removeItem("valexPrimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");

      document.querySelector("#myonoffswitch2").checked = false;
      document.querySelector("#myonoffswitch1").checked = false;
      document.querySelector("#myonoffswitchTransparent").checked = true;

      document.querySelector("html").style.removeProperty("--transparent-body");
      break;

    case "BG-Image-2":
      body.classList.add("bg-img2");
      body.classList.remove("bg-img1");
      body.classList.remove("bg-img3");
      body.classList.remove("bg-img4");
      body.classList.add("transparent-theme");
      localStorage.setItem("valexBgImage", "bg-img2");

      app.classList.remove("light-theme");
      app.classList.remove("dark-theme");
      localStorage.removeItem("valexPrimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");

      document.querySelector("#myonoffswitch2").checked = false;
      document.querySelector("#myonoffswitch1").checked = false;
      document.querySelector("#myonoffswitchTransparent").checked = true;

      document.querySelector("html").style.removeProperty("--transparent-body");
      break;

    case "BG-Image-3":
      body.classList.add("bg-img3");
      body.classList.remove("bg-img1");
      body.classList.remove("bg-img2");
      body.classList.remove("bg-img4");
      body.classList.add("transparent-theme");
      app.classList.remove("light-theme");
      app.classList.remove("dark-theme");
      localStorage.setItem("valexBgImage", "bg-img3");
      document.querySelector("html").style.removeProperty("--transparent-body");

      localStorage.removeItem("valexPrimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");

      document.querySelector("#myonoffswitch2").checked = false;
      document.querySelector("#myonoffswitch1").checked = false;
      document.querySelector("#myonoffswitchTransparent").checked = true;
      break;

    case "BG-Image-4":
      body.classList.add("bg-img4");
      body.classList.remove("bg-img1");
      body.classList.remove("bg-img2");
      body.classList.remove("bg-img3");
      body.classList.add("transparent-theme");
      app.classList.remove("light-theme");
      app.classList.remove("dark-theme");
      localStorage.setItem("valexBgImage", "bg-img4");
      document.querySelector("html").style.removeProperty("--transparent-body");

      localStorage.removeItem("valexPrimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");

      document.querySelector("#myonoffswitch2").checked = false;
      document.querySelector("#myonoffswitch1").checked = false;
      document.querySelector("#myonoffswitchTransparent").checked = true;
      break;

    case "LightMenu":
      localStorage.setItem("LightMenu", "true");
      localStorage.removeItem("ColorMenu");
      localStorage.removeItem("DarkMenu");
      localStorage.removeItem("GradientMenu");
      app.classList.remove("color-menu");
      app.classList.remove("dark-menu");
      app.classList.remove("gradient-menu");
      app.classList.add("light-menu");
      break;

    case "ColorMenu":
      localStorage.setItem("ColorMenu", "true");
      localStorage.removeItem("LightMenu");
      localStorage.removeItem("DarkMenu");
      localStorage.removeItem("GradientMenu");
      app.classList.remove("light-menu");
      app.classList.remove("dark-menu");
      app.classList.remove("gradient-menu");
      app.classList.add("color-menu");
      break;

    case "DarkMenu":
      localStorage.setItem("DarkMenu", "true");
      localStorage.removeItem("LightMenu");
      localStorage.removeItem("ColorMenu");
      localStorage.removeItem("GradientMenu");
      app.classList.remove("light-menu");
      app.classList.remove("color-menu");
      app.classList.remove("gradient-menu");
      app.classList.add("dark-menu");
      break;

    case "GradientMenu":
      localStorage.setItem("GradientMenu", "true");
      localStorage.removeItem("LightMenu");
      localStorage.removeItem("ColorMenu");
      localStorage.removeItem("DarkMenu");
      app.classList.remove("light-menu");
      app.classList.remove("color-menu");
      app.classList.remove("dark-menu");
      app.classList.add("gradient-menu");
      break;

    case "Lightheader":
      localStorage.setItem("Lightheader", "true");
      localStorage.removeItem("Colorheader");
      localStorage.removeItem("Darkheader");
      localStorage.removeItem("gradientheader");
      app.classList.remove("color-header");
      app.classList.remove("gradient-header");
      app.classList.remove("dark-header");
      app.classList.add("light-header");
      break;

    case "Colorheader":
      localStorage.setItem("Colorheader", "true");
      localStorage.removeItem("Lightheader");
      localStorage.removeItem("Darkheader");
      localStorage.removeItem("gradientheader");
      app.classList.remove("gradient-header");
      app.classList.remove("dark-header");
      app.classList.remove("light-header");
      app.classList.add("color-header");
      break;

    case "gradientheader":
      localStorage.setItem("gradientheader", "true");
      localStorage.removeItem("Lightheader");
      localStorage.removeItem("Darkheader");
      localStorage.removeItem("Colorheader");
      app.classList.remove("color-header");
      app.classList.remove("dark-header");
      app.classList.remove("light-header");
      app.classList.add("gradient-header");
      break;

    case "Darkheader":
      localStorage.setItem("Darkheader", "true");
      localStorage.removeItem("Lightheader");
      localStorage.removeItem("gradientheader");
      localStorage.removeItem("Colorheader");
      app.classList.remove("color-header");
      app.classList.remove("gradient-header");
      app.classList.remove("light-header");
      app.classList.add("dark-header");
      break;
    case "DefaultBody":
      localStorage.setItem("DefaultBody", "true");

      app.classList.remove("body-style1");

      break;

    case "BodyStyle1":
      localStorage.setItem("BodyStyle1", "true");

      app.classList.add("body-style1");
      document.querySelector("#myonoffswitch06").checked = true;
      break;

    case "FullWidth":
      localStorage.setItem("FullWidth", "true");

      app.classList.remove("layout-boxed");
      app.classList.add("layout-fullwidth");
      break;

    case "Boxed":
      localStorage.setItem("Boxed", "true");

      app.classList.remove("layout-fullwidth");
      app.classList.add("layout-boxed");
      break;

    case "Fixed":
      localStorage.setItem("Fixed", "true");

      app.classList.remove("scrollable-layout");
      app.classList.add("fixed-layout");
      break;

    case "Scrollable":
      localStorage.setItem("Scrollable", "true");

      app.classList.remove("fixed-layout");
      app.classList.add("scrollable-layout");
      break;

    case "lightPrimary":
      // console.log(payload);
      localStorage.setItem("valexprimaryColor", payload);
      document.body.classList.remove("dark-theme");

      dynamicTransparentPrimaryColor(
        document.querySelectorAll("input.color-primary-light"),
        payload
      );

      // let myonoffswitch = document.getElementById("myonoffswitch1")
      document.getElementById("myonoffswitch1").checked = true;

      // Adding
      body?.classList.add("light-mode");

      // Removing
      body?.classList.remove("dark-mode");
      body?.classList.remove("transparent-theme");
      body?.classList.remove("bg-img1");
      body?.classList.remove("bg-img2");
      body?.classList.remove("bg-img3");
      body?.classList.remove("bg-img4");

      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");
      localStorage.removeItem("valextransparent-bgImgPrimaryColor");
      localStorage.removeItem("valexBgImage");

      OpacityValuePrimary();
      break;

    case "darkPrimary":
      console.log(payload);
      localStorage.setItem("valexdarkPrimaryColor", payload);

      dynamicTransparentPrimaryColor(
        document.querySelectorAll("input.color-primary-dark"),
        payload
      );

      document.getElementById("myonoffswitch2").checked = true;

      // Adding
      body.classList.add("dark-theme");

      // Removing
      app.classList.remove("transparent-theme");
      app.classList.remove("light-mode");
      body.classList.remove("header-light");
      body.classList.remove("color-header");
      body.classList.remove("gradient-header");
      body.classList.remove("light-menu");
      body.classList.remove("color-menu");
      body.classList.remove("gradient-menu");

      localStorage.removeItem("valexprimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");
      localStorage.removeItem("valextransparent-bgImgPrimaryColor");
      localStorage.removeItem("valexBgImage");

      OpacityValuePrimary();
      break;

    case "transparentPrimary":
      // console.log(payload);
      localStorage.removeItem("valexdarkPrimaryColor");

      localStorage.setItem("valextransparentPrimaryColor", payload);

      dynamicTransparentPrimaryColor(
        document.querySelectorAll("input.color-primary-transparent"),
        payload
      );

      document.getElementById("myonoffswitchTransparent").checked = true;

      // Adding
      body.classList.add("transparent-theme");

      // Removing
      body.classList.remove("light-mode");
      body.classList.remove("dark-mode");
      body.classList.remove("bg-img1");
      body.classList.remove("bg-img2");
      body.classList.remove("bg-img3");
      body.classList.remove("bg-img4");

      localStorage.removeItem("valexprimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");

      localStorage.removeItem("valextransparentBgColor");
      localStorage.removeItem("valextransparent-bgImgPrimaryColor");
      localStorage.removeItem("valexBgImage");

      OpacityValuePrimary();

      break;

    case "TransparentBackground":
      localStorage.setItem("valextransparentBgColor", payload);

      const dynamicBackgroundColor = document.querySelectorAll(
        "input.color-bg-transparent"
      );

      dynamicBgTransparentBackground(
        document.querySelectorAll("input.color-bg-transparent"),
        payload
      );

      let myonoffswitch = document.getElementById("myonoffswitchTransparent");
      myonoffswitch.checked = true;

      // Adding
      body?.classList.add("transparent-theme");

      // Removing
      body?.classList.remove("light-mode");
      body?.classList.remove("dark-mode");
      body?.classList.remove("bg-img1");
      body?.classList.remove("bg-img2");
      body?.classList.remove("bg-img3");
      body?.classList.remove("bg-img4");
      body?.classList.remove("light-header");
      body?.classList.remove("color-header");
      body?.classList.remove("dark-header");
      body?.classList.remove("gradient-header");
      body?.classList.remove("light-menu");
      body?.classList.remove("color-menu");
      body?.classList.remove("dark-menu");
      body?.classList.remove("gradient-menu");

      localStorage.removeItem("valexprimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparent-bgImgPrimaryColor");
      localStorage.removeItem("valexBgImage");

      OpacityValuePrimary();
      break;

    case "BgImgPrimary":
      console.log(payload);
      localStorage.setItem("valextransparent-bgImgPrimaryColor", payload);

      const dynamicPrimaryImgTransparent = document.querySelectorAll(
        "input.color-primary-img-transparent"
      );

      dynamicBgImgTransparentPrimaryColor(
        document.querySelectorAll("input.color-primary-transparent-img"),
        payload
      );

      let myonoffswitchTransparent = document.getElementById(
        "myonoffswitchTransparent"
      );
      myonoffswitchTransparent.checked = true;

      // Adding
      body.classList.add("transparent-theme");

      // Removing
      body.classList.remove("light-mode");
      body.classList.remove("dark-mode");

      localStorage.removeItem("valexprimaryColor");
      localStorage.removeItem("valexprimaryHoverColor");
      localStorage.removeItem("valexprimaryBorderColor");
      localStorage.removeItem("valexprimaryTransparent");
      localStorage.removeItem("valexdarkPrimaryColor");
      localStorage.removeItem("valextransparentPrimaryColor");
      localStorage.removeItem("valextransparentBgColor");

      document
        .querySelector("html")
        ?.style.removeProperty("--transparent-body");

      if (
        body.classList.contains("bg-img1") === false &&
        body.classList.contains("bg-img2") === false &&
        body.classList.contains("bg-img3") === false &&
        body.classList.contains("bg-img4") === false
      ) {
        body.classList.add("bg-img1");
        localStorage.setItem("valexBgImage", "bg-img1");
      }
      OpacityValuePrimary();
      break;

    case "ResetAll":
      localStorage.clear();
      reset();
      document.querySelector("html[lang=en]").setAttribute("dir", "ltr");
      OpacityValuePrimary();
      break;

    case "horizontalmenusticky":
      horizontalmenusticky();
      break;

    default:
    // return Math.random()
  }
}
