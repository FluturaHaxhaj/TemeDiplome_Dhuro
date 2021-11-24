import _ from "lodash";
import axios from "axios";
import Config from "../Config";

class Request {
  static async get(endpoint, headers) {
    return axios
      .get(Config.Server.API_BASE_URL + endpoint, headers)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error?.response || error));
  }

  static async post(endpoint, data, headers) {
    return axios
      .post(Config.Server.API_BASE_URL + endpoint, data, headers)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error?.response || error));
  }

  static async patch(endpoint, data, headers) {
    return axios
      .patch(Config.Server.API_BASE_URL + endpoint, data, headers)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error?.response?.data || error));
  }
  static async put(endpoint, data, headers) {
    return axios
      .put(Config.Server.API_BASE_URL + endpoint, data, headers)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error?.response?.data || error));
  }

  static async delete(endpoint, headers) {
    return axios
      .delete(Config.Server.API_BASE_URL + endpoint, headers)
      .then((response) => response.data)
      .catch((error) => Promise.reject(error?.response?.data?.error || error));
  }

  static buildQueryParamString(paramsObject) {
    let queryParams = "";

    for (let param in paramsObject) {
      if (_.isUndefined(paramsObject[param])) continue;

      queryParams +=
        (queryParams ? "&" : "?") + `${param}=${paramsObject[param]}`;
    }

    return queryParams;
  }
}

export default Request;
