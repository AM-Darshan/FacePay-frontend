import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import imageUploadSlice from "./userData/imageUploadSlice";
import registerDetailsSlice from "./userData/registerSlice";
import loginDetailsSlice from "./userData/loginSlice";
import profileDetailsSlice from "./userData/profileDetails";
import rechargeBalanceSlice from "./userData/rechargeBalance";


export const store = configureStore({
  reducer: {
    imageUploadReducer: imageUploadSlice,
    registerDetailsReducer: registerDetailsSlice,
    loginDetailsReducer: loginDetailsSlice, 
    profileDetailsReducer: profileDetailsSlice,
    rechargeBalanceReducer: rechargeBalanceSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;