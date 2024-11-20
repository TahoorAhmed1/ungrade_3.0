import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { act } from "react-dom/test-utils";

const initialState = {
  outcomes: [],
  loader: false,
  competenciesOutcome: [],
  outcomesLoader: false,
  scheduledOutcome: false,
  userScheduledOutcome: [],
  getSingleUserOutcomeResult: [],
  checkWeeklyOutcomesBoolean:false
};

export const getOutcomes = createAsyncThunk(
  "outcomesSlice/getOutcomes",
  async () => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/outcome`,
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

export const getOutcomeById = createAsyncThunk(
  "outcomesSlice/getOutcomeById",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      console.log(data);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/outcome/${data?.ids}`,
        headers: { authorization: token },
        data: data,
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

// export const getScheduledOutcome = createAsyncThunk(
//     "outcomesSlice/getScheduledOutcome",
//     async (data:any) => {
//         try {
//             console.log(data)
//             let config = {
//                 method: 'get',
//                 maxBodyLength: Infinity,
//                 url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}emailToStudents/get`,
//                 headers: {}
//             };

//             const response = await axios.request(config);
//             console.log(response.data, 'response.data')
//             if (response?.data?.data?.length) {
//                 return response.data?.data[0]; // Return the data here
//             }

//         } catch (error) {
//             console.error(error);
//         }
//     });

export const getUserOutcome = createAsyncThunk(
  "outcomesSlice/getUserOutcome",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      console.log(data);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/outcome/${data?.ids}?user_id=${data?.userId}`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      if (response?.data?.data?.length) {
        return response.data?.data; // Return the data here
      }
    } catch (error: any) {
      // console.log(error.response.data, 'asdsadsadasdasd')
      // console.error(error);
      message.error(error.response.data?.message);
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }
);

export const getUserOutcomeForAllCourse = createAsyncThunk(
    "outcomesSlice/getUserOutcome",
    async (data: any) => {
      const token = getCookie("ungradeToken");
      try {
        console.log(data);
        let config = {
          method: "get",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/outcome/user`,
          headers: {
            authorization: token,
          },
        };
  
        const response = await axios.request(config);
        if (response?.data?.data?.length) {
          return response.data?.data; // Return the data here
        }
      } catch (error: any) {
        // console.log(error.response.data, 'asdsadsadasdasd')
        // console.error(error);
        message.error(error.response.data?.message);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
  );
export const getSingleUserOutcome = createAsyncThunk(
  "outcomesSlice/getSingleUserOutcome",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      console.log(data);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/outcome/course/outcome/${data?.courseId}`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data, "userOutcome response.data");
      if (response?.data?.data) {
        return response.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const checkWeeklyOutcomes = createAsyncThunk(
  "outcomesSlice/checkWeeklyOutcomes",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/outcome/weekly/check`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data, "asdadasd");
      return response.data?.data;
      // return {
      // totalPage: response.data?.totalPage,
      // mergedResults: response.data?.mergedResults ? response.data?.mergedResults[0] : {}
      // }; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const outcomesSlice = createSlice({
  name: "outcomesSlice",
  initialState,
  reducers: {
    addOutcomes: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      // state.loader = true
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/outcome`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Outcome Added");
          if (action.payload.callback) {
            action.payload.callback();
            // state.loader = false
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again16";
          message.error(errorMsg);
          // state.loader = false
        });
    },
    updateOutcomes: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      state.loader = true;
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/outcome/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Outcome Updated");
          if (action.payload.callback) {
            action.payload.callback();
            // state.loader = false
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again17";
          message.error(errorMsg);
          // state.loader = false
        });
    },
    deleteOutcomes: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      state.loader = true;
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}outcomes/delete/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Outcome Deleted");
          if (action.payload.callback) {
            action.payload.callback();
            // state.loader = false
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again18";
          message.error(errorMsg);
          // state.loader = false
        });
    },
    // sendOutcomesEmail: (state:any, action:any) => {
    //     let data = JSON.stringify(action.payload.data);
    //     state.loader = true
    //     let config = {
    //         method: 'post',
    //         maxBodyLength: Infinity,
    //         url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}emailToStudents/setTime`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //             message.success("Outcomes Scheduled")
    //             if (action.payload.callback) {
    //                 action.payload.callback()
    //                 // state.loader = false
    //             }
    //         })
    //         .catch((error) => {
    //             let errorMsg = error?.response?.data?.error  || error?.response?.data?.message || 'Please Try Again19'
    //             message.error(errorMsg)
    //             // state.loader = false

    //         });
    // },

    // updateSendOutcomesEmail: (state:any, action:any) => {
    //     let data = JSON.stringify(action.payload.data);
    //     state.loader = true
    //     let config = {
    //         method: 'put',
    //         maxBodyLength: Infinity,
    //         url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}emailToStudents/updateTime/${action.payload.id}`,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         data: data
    //     };

    //     axios.request(config)
    //         .then((response) => {
    //             message.success("Outcomes Scheduled")
    //             if (action.payload.callback) {
    //                 action.payload.callback()
    //                 // state.loader = false
    //             }
    //         })
    //         .catch((error) => {
    //             let errorMsg = error?.response?.data?.error  || error?.response?.data?.message || 'Please Try Again20'
    //             message.error(errorMsg)
    //             // state.loader = false

    //         });
    // },

    updateUserOutcome: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      state.loader = true;
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/user-outcome`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Outcomes Scheduled");
          if (action.payload.callback) {
            action.payload.callback();
            // state.loader = false
          }
        })
        .catch((error) => {
          console.log(error?.response);
          // errorHandle(error)
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again21";
          message.error(errorMsg);
          // state.loader = false
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOutcomes.pending, (state: any, action: any) => {})
      .addCase(getOutcomes.fulfilled, (state: any, action: any) => {
        state.outcomes = action.payload;
      })
      .addCase(getOutcomes.rejected, (state: any, action: any) => {})

      .addCase(getOutcomeById.pending, (state: any, action: any) => {
        state.outcomesLoader = true;
      })
      .addCase(getOutcomeById.fulfilled, (state: any, action: any) => {
        state.competenciesOutcome = action.payload;
        state.outcomesLoader = false;
      })
      .addCase(getOutcomeById.rejected, (state: any, action: any) => {
        state.outcomesLoader = false;
      })

      .addCase(getUserOutcome.pending, (state: any, action: any) => {
        // state.outcomesLoader = true
      })
      .addCase(getUserOutcome.fulfilled, (state: any, action: any) => {
        state.userScheduledOutcome = action.payload;
        // state.outcomesLoader = false
      })
      .addCase(getUserOutcome.rejected, (state: any, action: any) => {
        // state.outcomesLoader = false
      })

      .addCase(getSingleUserOutcome.pending, (state: any, action: any) => {
        // state.outcomesLoader = true
      })
      .addCase(getSingleUserOutcome.fulfilled, (state: any, action: any) => {
        state.getSingleUserOutcomeResult = action.payload;
        // state.outcomesLoader = false
      })
      .addCase(getSingleUserOutcome.rejected, (state: any, action: any) => {
        // state.outcomesLoader = false
      })
      .addCase(checkWeeklyOutcomes.pending, (state: any, action: any) => {
        // state.outcomesLoader = true
      })
      .addCase(checkWeeklyOutcomes.fulfilled, (state: any, action: any) => {
        state.checkWeeklyOutcomesBoolean = action.payload;
        // state.outcomesLoader = false
      })
      .addCase(checkWeeklyOutcomes.rejected, (state: any, action: any) => {
        // state.outcomesLoader = false
      });
  },
});

export const {
  addOutcomes,
  updateOutcomes,
  deleteOutcomes,
  updateUserOutcome,
} = outcomesSlice.actions;

export default outcomesSlice.reducer;
