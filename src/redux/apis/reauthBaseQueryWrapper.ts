import { BaseQueryFn } from "@reduxjs/toolkit/query";

const reauthBaseQueryWrapper = <F extends BaseQueryFn<
  string | { url: string, method?: string },
  unknown,
  { status: number | string; }
>>(baseQuery: F): F => {
  const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery({ url: "refreshToken", method: "POST" }, api, extraOptions);

      if (refreshResult.data) {
        // todo: store the new token info if any (expire time)

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        // todo: handle logging out
      }
    }
    return result;
  };
  return baseQueryWithReauth as F;
};

export default reauthBaseQueryWrapper;
