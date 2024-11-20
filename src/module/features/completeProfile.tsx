import { delete_cookie, getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";

const initialState = {
  userProfile: null,
  tutorial: []
};

export const getProfile = createAsyncThunk(
  "completeProfileSlice/getProfile",
  async () => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/user`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const completeProfileSlice = createSlice({
  name: "completeProfileSlice",
  initialState,
  reducers: {
    completeProfile: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      action.payload.setLoader(true);
      const token = getCookie("ungradeToken");

      let config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/user`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          message.success("Profile Updated");
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again10";
          if (errorMsg === "Profile exist.") {
            delete_cookie("ungradeToken");
            delete_cookie("ungradeUser");
            action.payload.callback("login");
          } else {
            message.error(errorMsg);
          }
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        });
    },
    updateProfile: (state: any, action: any) => {
      try {
        console.log(action.payload);
        let data = JSON.stringify(action.payload.data);
        if (action.payload.setLoader) {
          action.payload.setLoader(true);
        }
        const token = getCookie("ungradeToken");
        let config = {
          method: "patch",
          url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/user`,
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            if (action.payload.callback) {


              action.payload.callback();
              if (action.payload?.course) {
                message.success("Course Added Successfully");
              } else {
                // message.success("Profile Updated");
              }
              if (action.payload.setLoader) {
                action.payload.setLoader(false);
              }
            }
          })
          .catch((error) => {
            let errorMsg =
              error?.response?.data?.error ||
              error?.response?.data?.message ||
              "Please Try Again11";
            console.log(error);
            message.error(errorMsg);

            if (action.payload.setLoader) {
              action.payload.setLoader(false);
            }
          });
      } catch (err) {
        console.log(err, "dasdasdasd");
      }
    },
    updateProfileTier: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      // action.payload.setLoader(true)
      let config = {
        method: "patch",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/user`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          // action.payload.setLoader(false)
        })
        .catch((error) => {
          console.log(error);
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again tier";
          message.error(errorMsg);

          // action.payload.setLoader(false)
        });
    },
    uploadImage: (state: any, action: any) => {
      let config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}upload`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: action.payload.data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback(response.data);
          // action.payload.setLoader(false)
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again tier";
          message.error(errorMsg);

          // action.payload.setLoader(false)
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getProfile.fulfilled, (state: any, action: any) => {
        console.log(action.payload, 'action.payloadaction.payload')
        let tutorial = action?.payload?.tutorial.map((a, i) => {
          return a.tutorial
        })
        state.userProfile = action.payload;
        state.tutorial = tutorial
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getProfile.rejected, (state: any, action: any) => {
        state.userProfile = false;
        //   state.hasError = true
        //   state.isLoading = false;
      });
  },
});

export const {
  completeProfile,
  updateProfile,
  updateProfileTier,
  uploadImage,
} = completeProfileSlice.actions;

export default completeProfileSlice.reducer;
