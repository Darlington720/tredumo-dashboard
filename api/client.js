// import { create } from "apisauce";
const { create } = await import("apisauce");
import urls from "./apiConstants";

const apiClient = create({
  baseURL: urls.baseUrl1,
});

const apiClient2 = create({
  baseURL: urls.baseURL2,
});

const apiClient3 = create({
  baseURL: urls.baseUrl3,
});

const extApi = create({
  baseURL: "https://student.nkumbauniversity.ac.ug/",
  // headers: {
  //   "User-Agent":
  //     "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
  //   "Content-Type": "text/plain",
  //   Cookie:
  //     "ai=64613931303335623536653534396262636331343863323936663839363631327C7C6E6B756D6261; as=64663037386462636238303562333039623633633438646634366537633031367C7C32303030313031303431; asc=92dbca2fc1052703619e9cfcb61bc810; ast=f5e8aeaa-9a31-45a3-af67-f76b97311779-1669651773",
  // },
  headers: {
    "sec-ch-ua":
      '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua-mobile": "?0",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    "sec-ch-ua-platform": '"Linux"',
    Accept: "*/*",
    host: "student.nkumbauniversity.ac.ug",
    Cookie:
      "ai=62396533363832303466383161353265653662616531356635356230616632647C7C6E6B756D6261; as=62636366616665376666656263346239633736306130613531616133663834307C7C32303030313031303431; asc=01dcf8cac069962443547a057c34f790; ast=621a7977-8ffd-4ecf-a972-7d16eaccf7e2-1677794953; dp=31663838333436372D613962352D346630372D386137382D3466366335376434343266617C7C323032332D30332D30327E323032332D30332D30337E323032332D30332D3034; inst=6E6B756D6261; rt=31663838333436372D613962352D346630372D386137382D346636633537643434326661; st=32303030313031303431; tk=7ce171ce49deb66e071ba5cbe40637b1e139eea549d5793d0bfcded3a64b4647",
  },
});

// const imgClient = create({
//   baseURL: urls.images,
// });

const apiClientMain = {
  apiClient,
  apiClient2,
  apiClient3,
  // extApi,
  // imgClient,
};
export default apiClientMain;
