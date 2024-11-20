import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const initialState = {
  wishlist: [],
  wishlistLoader: false,
  error: null,
};

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course-wishlist`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      const response = await axios.request(config);
      return {
        data: response.data?.data,
      };
    } catch (error: any) {
      throw error.response?.data || error.message;
    }
  }
);

export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    addWishlist: (state: any, action: any) => {
      console.log(action.payload, "sasa");

      let data = JSON.stringify(action.payload.data);
      action.payload.wishlistLoader(true);
      const token = getCookie("ungradeToken");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course-wishlist`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          message.success("Wishlist added");
          action.payload.wishlistLoader(false);
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.wishlistLoader(false);
        });
    },
    removeWishlist: (state: any, action: any) => {
      let data: any = action.payload.data;
      console.log(data, "wishlist_id");

      action.payload.wishlistLoader(true);
      const token = getCookie("ungradeToken");
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course-wishlist/${data?.wishlist_id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };
      axios
        .request(config)
        .then((response) => {
          message.success("Wishlist course remove");
          action.payload.wishlistLoader(false);
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.wishlistLoader(false);
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state: any) => {
        state.wishlistLoader = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state: any, action: any) => {
        state.wishlist = action.payload.data;
        state.wishlistLoader = false;
      })
      .addCase(getWishlist.rejected, (state: any, action: any) => {
        state.wishlistLoader = false;
        state.error = action.error.message;
      });
  },
});

export const { addWishlist, removeWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
