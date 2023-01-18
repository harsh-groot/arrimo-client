import Axios, { Method } from "axios";
import queryString from "querystring";

export const hostname = () => {
  let hostUrl = "";
  if (typeof window !== "undefined") {
    switch (window.location.hostname) {
      // production
      case "test.test.info":
        hostUrl = "https://api.test.info";
        break;

      // dev
      case "localhost":
        /**API URL for Local NODE Server */
        hostUrl = `http://localhost:5500`;
        break;
      default:
        hostUrl = "http://localhost:5000";
        break;
    }
  }
  return hostUrl;
};

const hostUrl = hostname();

export const makeUrl = ({ uri = "", pathParams, query, version }, host) =>
  `${host || hostUrl}${version || ""}${uri
    .split("/")
    .map((param) =>
      param.charAt(0) === ":" ? encodeURI(pathParams[param.slice(1)]) : param
    )
    .join("/")}${query ? `?${queryString.stringify(query)}` : ""}`;

export const callApi = ({
  uriEndPoint = { uri: "", method: "GET", version: "", headerProps: {} },
  pathParams,
  query,
  body,
  header,
}) => {
  return new Promise(async (resolve, reject) => {
    Axios({
      method: uriEndPoint.method || "POST",
      url: makeUrl({ ...uriEndPoint, pathParams, query }, hostUrl),
      headers: header || getDefaultHeaders(),

      data: body || undefined,
    })
      .then((response) => {
        if (response?.data?.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }
        resolve(response);
      })
      .catch((err) => {
        if (!err.response) {
        }

        if (err?.response?.status === 401) {
          // Unauthorized

          reject(err.response);
        }
        reject(err.response);
      });
  });
};

export const getDefaultHeaders = () => ({
  "Content-Type": "application/json",
});
