const baseURL = "http://127.0.0.1:5000";

export function fetchHelper<T>(url: string, init?: RequestInit): Promise<T> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(baseURL + url, init);
      const result = response.json();
      resolve(result);
    } catch (error) {
      reject(error?.message || JSON.stringify(error));
    }
  });
}

interface IResponseData {
  resp: {
    columns: string[];
    values: string[][];
  };
}

interface ISendParams {
  days: number | string;
  folat_share: number | string;
  start_day: string;
  end_day: string;
}

export function SendData(params: ISendParams) {
  const paramsStr = new URLSearchParams(params).toString();
  return fetchHelper<IResponseData>("/get_data?" + paramsStr);
}

export function UpdateData() {
  return fetchHelper<void>("/renew_data");
}
