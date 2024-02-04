import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";

// development environment only
// const reduxLogger = require("redux-logger");
// const logger = reduxLogger.createLogger();

const store = configureStore({
  reducer: {
    [counterSlice.name]: counterSlice.reducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
