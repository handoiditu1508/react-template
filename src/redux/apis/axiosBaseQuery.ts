import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: "" }
): BaseQueryFn<
  string | Pick<AxiosRequestConfig, "method" | "data" | "params" | "headers"> & {
    url: string;
  },
  unknown,
  unknown
> => async (arg) => {
  try {
    const result = typeof arg === "string"
      ? await axios(baseUrl + arg)
      : await axios({
        url: baseUrl + arg.url,
        method: arg.method,
        data: arg.data,
        params: arg.params,
        headers: arg.params,
      });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response ? err.response.status : undefined,
        data: err.response ? err.response.data : err.message,
      },
    };
  }
};

export default axiosBaseQuery;
