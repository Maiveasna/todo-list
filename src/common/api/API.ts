import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
let accessToken: string;
export var setAccessToken = (ctx: string) => {
  accessToken = ctx;
};

export var getAccessToken = () => {
  return accessToken || "Anonymous";
};
Axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
const API = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});

API.interceptors.request.use((request: AxiosRequestConfig & any) => {
  if (!request.headers.Authorization) {
    let bearerToken = getAccessToken();
    if (bearerToken) {
      request.headers.Authorization = `Bearer ` + bearerToken;
    }
  }
  request.headers.channel = "web";
  request.headers = {
    ...(request.headers || {}),
    "Accept-Language": "en",
    "x-client-id": "v-tech",
  };
  return request;
});

if (process.env.NODE_ENV !== "production") {
  console.log(" ********* AXIOS logging enabled ********* ");
  var responseLogger = (response: AxiosResponse) => {
    //console.log(`::::REQUEST COMPLETED FROM${response.request.fromCache ? ' [CACHE]' : ''} ${response.config.url}`, response);
    return response;
  };
  const responseErrorLogger = (error: AxiosError) => {
    //console.log(`[LOG]::::REQUEST ERROR from ${error.config?.url}`, error?.response?.data);
    error && error.response && console.log(error.response.data);
    return Promise.reject(error);
  };
  API.interceptors.response.use(responseLogger, responseErrorLogger);
}

export default API;
