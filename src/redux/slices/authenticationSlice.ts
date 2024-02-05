import SignInResponse from "@/models/apis/SignInResponse";
import User from "@/models/entities/User";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appApi from "../apis/appApi";
import { RootState } from "../store";

export type AuthenticationState = {
  expirationTime: number | null;// miliseconds
  user: User | null;
}

export const expirationTimeStorageKey = "expirationTime";

const initialState: AuthenticationState = {
  expirationTime: null,
  user: null,
};

export const loadAuthStateFromLocalAsync = createAsyncThunk(
  "authentication/loadAuthStateFromLocalAsync",
  async (_arg, thunkApi) => {
    const { authentication: state } = thunkApi.getState() as RootState;

    state.expirationTime = Number(localStorage.getItem(expirationTimeStorageKey));

    // check token expired
    if (isNaN(state.expirationTime) || state.expirationTime <= Date.now()) {
      // call refresh token api
      const refreshTokenPromise = thunkApi.dispatch(appApi.endpoints.refreshToken.initiate());
      await refreshTokenPromise;
      refreshTokenPromise.reset();
    } else if (!state.user) {
      // todo: load signed in user details from BE
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<SignInResponse>) => {
      state.expirationTime = Date.parse(action.payload.expirationTime);
      localStorage.setItem(expirationTimeStorageKey, state.expirationTime.toString());
    },
    clearAuthState: (state) => {
      localStorage.removeItem(expirationTimeStorageKey);
      state.expirationTime = null;
    },
  },
});

export const {
  setAuthState,
  clearAuthState,
} = authenticationSlice.actions;

export const selectIsSignedIn = (state: RootState): boolean => !!state.authentication.user && !selectIsTokenExpired(state);
export const selectIsTokenExpired = (state: RootState): boolean => !!state.authentication.expirationTime && state.authentication.expirationTime <= Date.now();
export const selectExpirationTime = (state: RootState) => state.authentication.expirationTime;
export const selectAuthUser = (state: RootState) => state.authentication.user;

export default authenticationSlice;
