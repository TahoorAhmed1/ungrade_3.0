import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
};

export const getUsers = createAsyncThunk(
  "getUsersSlice/getUsers",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/user`,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, must-revalidate",
          authorization: token,
        },
      };

      const response = await axios.request(config);
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state: any, action: any) => { })
      .addCase(getUsers.fulfilled, (state: any, action: any) => {
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state: any, action: any) => { });
  },
});

export const { } = getUsersSlice.actions;

export default getUsersSlice.reducer;
