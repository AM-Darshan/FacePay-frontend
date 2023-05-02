import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURLSpring } from "../../constants/contants";

interface initType {
  fullName: string;
  email: string;
  userName: string;
  phoneNumber: string;
  password: string;
  registerStatus: string;
}

const initState: initType = {
  fullName: "",
  email: "",
  userName: "",
  phoneNumber: "",
  password: "",
  registerStatus: "",
};

export const registerDetails = createAsyncThunk(
  "post/registerDetails",
  async (postBody: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = baseURLSpring + "/facepay/register";
      console.log(url);
      console.log(postBody);
      const response = await axios.post(url, postBody);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const registerDetailsSlice = createSlice({
  name: "registerDetailsSlice",
  initialState: initState,
  reducers: {
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetRegisterDetails: (state) => {
      state.fullName = "";
      state.email = "";
      state.userName = "";
      state.phoneNumber = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.registerStatus = "done";
      })
      .addCase(registerDetails.pending, (state) => {
        console.log("Pending");
        state.registerStatus = "pending";
      })
      .addCase(registerDetails.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.registerStatus = "reject";
      });
  },
});
export const {
  setFullName,
  setEmail,
  setPassword,
  setPhoneNumber,
  setUserName,
} = registerDetailsSlice.actions;
export default registerDetailsSlice.reducer;
