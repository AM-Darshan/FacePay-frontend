import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURLSpring } from "../../constants/contants";

interface initType {
  loginEmail: string;
  loginPassword: string;
  loginStatus: string;
}

const initState: initType = {
  loginEmail: "",
  loginPassword: "",
  loginStatus: "",
};

export const loginDetails = createAsyncThunk(
  "get/loginDetails",
  async (args: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = baseURLSpring + "/facepay/login";
      console.log(url);
      const getBody = {
        email: args.email,
        password: args.password,
      };
      const response = await axios.post(url,getBody);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const loginDetailsSlice = createSlice({
  name: "loginDetailsSlice",
  initialState: initState,
  reducers: {
    setLoginEmail: (state, action) => {
      state.loginEmail = action.payload;
    },
    setLoginPassword: (state, action) => {
      state.loginPassword = action.payload;
    },
    resetLoginDetails: (state) => {
      state.loginEmail = "";
      state.loginPassword = "";
      state.loginStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loginStatus = "done";
      })
      .addCase(loginDetails.pending, (state) => {
        console.log("Pending");
        state.loginStatus = "pending";
      })
      .addCase(loginDetails.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loginStatus = "reject";
      });
  },
});
export const { setLoginEmail, setLoginPassword, resetLoginDetails } =
  loginDetailsSlice.actions;
export default loginDetailsSlice.reducer;
