import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import reauthBaseQueryWrapper from "./reauthBaseQueryWrapper";
import { allTags } from "./rtkQueryCacheUtils";

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: reauthBaseQueryWrapper(axiosBaseQuery({ baseUrl: "/api/" })),
  tagTypes: allTags,
  endpoints: (builder) => ({
    refetchErrorQueries: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: ["UNKNOWN_ERROR"],
    }),
  }),
});

export default appApi;

export const {
  useRefetchErrorQueriesMutation,
} = appApi;
