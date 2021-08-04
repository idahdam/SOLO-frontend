import axios from "axios";

/**
 * kalo mau pake remote api, uncomment yang atas terus comment yang skrg.
 * kalo local, sebaliknya.
 *
 */

const { REACT_APP_BACK_URL_STUFF } = process.env;
const BASE_URL = REACT_APP_BACK_URL_STUFF;
// uncomment ini.
// const BASE_URL = "http://localhost:5000/api/v1";

async function http(method, endpoint, body = null, data) {
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  };

  let response = null;

  if (method) {
    response = await axios({
      url: `${BASE_URL}/${endpoint}`,
      method: method.toUpperCase(),
      headers,
      params: body,
      data: data,
    });
  }

  return response;
}

export const gatewayHelper = {
  http,
};
