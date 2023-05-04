import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURLNode } from "../../constants/contants";

interface initType {
  uploadedImages: string[];
  status: string;
  imagestatus: string;
}

const initState: initType = {
  uploadedImages: [],
  status: "",
  imagestatus:""
};

export const userDataImages = createAsyncThunk(
  "post/useData",
  async (args: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const url = baseURLNode + "/api/upload-image";
      console.log(url);
      const response = await axios.post(url, {userImages: args.images, name: args.name});
      const data = response.data;
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const useDataSlice = createSlice({
  name: "useDataSlice",
  initialState: initState,
  reducers: {
    addUploadedImages: (state, action) => {
      console.log(action.payload);
      return { ...state, uploadedImages: [...action.payload] };
    },
    setUploadStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userDataImages.fulfilled, (state, action) => {
        console.log(action.payload);
        state.imagestatus = "success";
      })
      .addCase(userDataImages.pending, (state) => {
        console.log("Pending");
        state.imagestatus = "pending";
      })
      .addCase(userDataImages.rejected, (state,action) => {
        console.log("rejected" , action.payload);
        state.imagestatus = "reject";
      });
  },
});
export const { addUploadedImages, setUploadStatus } = useDataSlice.actions;
export default useDataSlice.reducer;
