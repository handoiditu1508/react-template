import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export type AxiosBaseQueryError = {
  status: number | "UNKNOWN_ERROR";
  data?: any;
}

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: "" }
): BaseQueryFn<
  string | Pick<AxiosRequestConfig, "method" | "params" | "headers"> & {
    url: string;
    body?: AxiosRequestConfig["data"];
  },
  unknown,
  AxiosBaseQueryError
> => async (arg) => {
  try {
    const result = typeof arg === "string"
      ? await axios(baseUrl + arg)
      : await axios({
        url: baseUrl + arg.url,
        method: arg.method,
        data: arg.body,
        params: arg.params,
        headers: arg.params,
      });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response ? err.response.status : "UNKNOWN_ERROR",
        data: err.response ? err.response.data : err.message,
      },
    };
  }
};

export default axiosBaseQuery;
