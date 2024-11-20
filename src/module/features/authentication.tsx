import { createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { message } from "antd";
import { act } from "react";
import { delete_cookie, getCookie } from "@/lib/utils";

const initialState = {
  user: null,
  authToken: false,
};

export const authenticationSlice = createSlice({
  name: "authenticationSlice",
  initialState,
  reducers: {
    register: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);
      action.payload.setLoader(true);
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          document.cookie = `ungradeVerificationToken=${response.data?.data?.token}`;
          action.payload.clearState();
          message.success("Email sent verify account");
          action.payload.setLoader(false);
        })
        .catch(function (error) {
          console.log(error?.response, "sadadasdasd");
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again3";
          message.error(errorMsg);

          action.payload.setLoader(false);
        });
    },
    verify_otp: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeVerificationToken");

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/verify`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          // setTimeout(() => {
          action.payload.router.push("/login");
          message.success("Account Verified");
          // }, 1000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.setLoader(false);
        });
    },
    login: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          if (typeof window !== "undefined") {
            console.log(response.data?.data, "response.data");
            if (response.data?.data?.verify_token) {
              document.cookie = `ungradeVerificationToken=${response?.data?.data?.verify_token}`;
            }
            document.cookie = `ungradeToken=${response.data?.data?.token}`;
            document.cookie = `ungradeUser=${JSON.stringify(
              response.data?.data?.user
            )}`;
          }
          setTimeout(() => {
            action.payload.clearState(response.data?.data?.user);
            if (response.data?.data?.verify_token) {
              action.payload.router.push("/account-verify");
              message.success("Lets verify your account");
            } else {
              if (response.data.data.user.userProfile) {
                action.payload.router.push("/dashboard");
              } else {
                action.payload.router.push("/welcome");
              }
              message.success("Logged In");
            }
          }, 1000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          // action.payload.setLoader(false);
        });
    },
    logout: (state: any, action: any) => {
      delete_cookie("ungradeToken");
      delete_cookie("ungradeUser");
      // document.cookie = `ungradeToken=`
      // document.cookie = `ungradeUser=`
      action.payload.callback();
      message.success("Logged Out");
    },
    loginSocial: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);

      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/social-login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(response, "responseresponse");
          if (typeof window !== "undefined") {
            document.cookie = `ungradeToken=${response.data?.token}`;
            document.cookie = `ungradeUser=${JSON.stringify(
              response.data?.user
            )}`;
            action.payload.callback();
            message.success("Logged In");
          }
        })

        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again5";
          console.log(error, "responseresponse");
          message.error(errorMsg);
        });
    },
    getUser: (state: any, action) => {
      const user = getCookie("ungradeUser");
      const token = getCookie("ungradeToken");
      if (user && token) {
        if (user === "undefined" || token === "undefined") {
          return state;
        } else {
          state.user = JSON.parse(user);
          state.authToken = token;
          return state;
        }
      } else {
        if (action.payload) {
          action.payload();
          return state;
        }
      }
    },
    reset_password: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");

      action.payload.setLoader(true);
      var config = {
        method: "put",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/resetpassword`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(response.data?.data, "response.data");
          // document.cookie = `ungradeToken=${response.data?.data?.token}`
          // document.cookie = `ungradeUser=${JSON.stringify(response.data?.data?.user)}`
          setTimeout(() => {
            action.payload.clearState();
            action.payload.setLoader(false);
            message.success("Password has been changed");
          }, 1000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.setLoader(false);
        });
    },
    confirmEmailForget: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);

      action.payload.setLoader(true);
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/generateForgetLink`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          action.payload.setEmailSent(true);

          setTimeout(() => {
            action.payload.clearState();
            action.payload.setLoader(false);
            message.success("We've sent you an email");
          }, 1000);
          setTimeout(() => {
            action.payload.setEmailSent(false);
          }, 20000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.setLoader(false);
        });
    },
    ForgetPasswordApi: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);

      action.payload.setLoader(true);
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/forgot-password`,
        headers: {
          "Content-Type": "application/json",
          authorization: action.payload.token,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          setTimeout(() => {
            action.payload.clearState();
            action.payload.setLoader(false);
            message.success("Password has been reset");
          }, 1000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.setLoader(false);
        });
    },
    ForgotPasswordLink: (state: any, action: any) => {
      var data = JSON.stringify(action.payload.data);

      action.payload.setLoader(true);
      var config = {
        method: "post",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/auth/forgot-password`,
        headers: {
          "Content-Type": "application/json",
          authorization: action.payload.token,
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          setTimeout(() => {
            action.payload.clearState();
            action.payload.setLoader(false);
            message.success("Password has been reset");
          }, 1000);
        })
        .catch(function (error) {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            error?.response?.data?.message ||
            "Please Try Again";
          message.error(errorMsg);
          action.payload.setLoader(false);
        });
    },
  },
});

export const {
  register,
  login,
  loginSocial,
  getUser,
  logout,
  reset_password,
  confirmEmailForget,
  ForgetPasswordApi,
  verify_otp,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
