import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURLSpring } from "../../constants/contants";

interface initType {
  phoneNumber: string;
  facePayId: string;
  amount: number;
  rechargeStatus: string;
}

const initState: initType = {
  phoneNumber: "",
  facePayId: "",
  amount: 0,
  rechargeStatus: "",
};

export const rechargeBalancePost = createAsyncThunk(
  "post/rechargeBalance",
  async (postBody: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = baseURLSpring + "/facepay/updateBal";
      console.log(url);
      const response = await axios.post(url, postBody);
      const data = response.data;
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const rechargeBalanceSlice = createSlice({
  name: "rechargeBalanceSlice",
  initialState: initState,
  reducers: {
    setPhoneNumber: (state, action) => {
      console.log(action.payload);
      state.phoneNumber = action.payload;
    },
    setFacePayId: (state, action) => {
      state.facePayId = action.payload;
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setRechargeStatus: (state,action) =>{
      state.rechargeStatus = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(rechargeBalancePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.rechargeStatus = "done";
      })
      .addCase(rechargeBalancePost.pending, (state) => {
        console.log("Pending");
        state.rechargeStatus = "pending";
      })
      .addCase(rechargeBalancePost.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.rechargeStatus = "reject";
      });
  },
});
export const { setAmount, setFacePayId, setPhoneNumber,setRechargeStatus } =
  rechargeBalanceSlice.actions;
export default rechargeBalanceSlice.reducer;
