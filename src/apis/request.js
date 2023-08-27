import axios from "axios";
const HOST = "http://127.0.0.1:8000";
export const sent = async (route, method, data = null) => {
  try {
    const config = {
      method: method,
      url: HOST + route,
      data: data,
    };
    const response = await axios(config);
    return response;
  } catch (error) {
    return error;
  }
};
