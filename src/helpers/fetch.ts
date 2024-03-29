import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000";
axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

type SendDataParamKeys = "days" | "folat_share" | "start_day" | "end_day";
type SendDataResponse = {
  resp: {
    columns: string[];
    values: string[][];
  };
};
export function SendData(
  params: Record<SendDataParamKeys, string>,
): Promise<SendDataResponse> {
  return axios("/get_data", { method: "get", params });
}

type UpdateDataResponse = unknown;
export function UpdateData(): Promise<UpdateDataResponse> {
  return axios("/renew_data", { method: "get" });
}
