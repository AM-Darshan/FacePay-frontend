import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURLSpring } from "../../constants/contants";

interface initType {
  name: string;
  email: string;
  username: string;
  mobile: string;
  facePayID: string;
  balance: number;
  userDetailsStatus: string;
}

const initState: initType = {
  name: "",
  email: "",
  username: "",
  mobile: "",
  facePayID: "",
  userDetailsStatus: "",
  balance: 0,
};

export const getProfileDetails = createAsyncThunk(
  "get/profileDetails",
  async (userEmail: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = baseURLSpring + "/facepay/details";
      console.log(url);
      const response = await axios.get(url, { params: { email: userEmail } });
      const data = response.data;
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const profileDetailsSlice = createSlice({
  name: "profileDetailsSlice",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        const details = action.payload;
        state.email = details.email;
        state.mobile = details.phone;
        state.facePayID = details.userID;
        state.name = details.fullName;
        state.username = details.userName;
        state.balance = details.balance;
        state.userDetailsStatus = "done";
      })
      .addCase(getProfileDetails.pending, (state) => {
        console.log("Pending");
        state.userDetailsStatus = "pending";
      })
      .addCase(getProfileDetails.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.userDetailsStatus = "reject";
      });
  },
});
export const {} = profileDetailsSlice.actions;
export default profileDetailsSlice.reducer;
