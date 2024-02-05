import SignInResponse from "@/models/apis/SignInResponse";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { clearAuthState, setAuthState } from "../slices/authenticationSlice";

/**
 * Wrap `baseQuery` to automatically request for new token when current token is expired.
 * @param baseQuery `baseQuery` to be wrappped.
 * @returns Wrapped `baseQuery`.
 */
const reauthBaseQueryWrapper = <F extends BaseQueryFn<
  string | { url: string; method?: string; body?: any; },
  unknown,
  { status: number | string; }
>>(baseQuery: F): F => {
  const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
      const refreshResult = await baseQuery({ url: "refreshToken", method: "POST" }, api, extraOptions);

      if (refreshResult.data) {
        // store the new token info into store and local storage
        api.dispatch(setAuthState(refreshResult.data as SignInResponse));

        // retry the initial query
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuthState());
      }
    }
    return result;
  };
  return baseQueryWithReauth as F;
};

export default reauthBaseQueryWrapper;
