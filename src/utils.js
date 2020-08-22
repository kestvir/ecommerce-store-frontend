import axios from "axios";
import { endpoint } from "./constants";

export const authAxios = (token) => {
  return axios.create({
    baseURL: endpoint,
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export const handleAuthErrs = (errObj) => {
  const errResponse = errObj.response;
  const errArrStrs = [];

  if (errResponse.status !== 400) {
    errArrStrs.push(errObj.message);
  } else {
    const errResponseData = errResponse.data;
    for (let key in errResponseData) {
      if (errResponseData.hasOwnProperty(key)) {
        const errResponseDataStr = `${errResponseData[key]}`;
        const errResponseDataArr = errResponseDataStr.split(",");
        const finalErrStrArr = errResponseDataArr.map((errStr) => {
          return `${errStr.trim()}`;
        });

        errArrStrs.push(
          `${String(key).toUpperCase()}: ${finalErrStrArr.join(" ")}`
        );
      }
    }
  }
  return errArrStrs;
};
