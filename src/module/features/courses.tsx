import { errorHandle, getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loader: false,
  courses: [],
  chooseCourses: [],
  yourCourses: false,
  yourCoursesLoader: false,
  studentCourses: false,
  studentCoursesLoader: false,
  tier1: [],
  tier2: [],
  tier3: [],
  majorCourses: [],
  minorCourses: [],
  courseTracking: false,
  courseProgessInfo: [],
  recommendedCourses: [],
  concentrationCourses: [],
  userCourses: [],
  SingleCourse: [],
  searchCourses: [],
  allCourses: [],
  comparecourses: false,
};

export const getCourse: any = createAsyncThunk(
  "courses/getCourse",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/course`,
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

export const getCourseByConcentration = createAsyncThunk(
  "courses/getCourseByConcentration",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/course/concentration/${data?.id}`,
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

export const getCourseTracking = createAsyncThunk(
  "courses/getCourseTracking",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course/user-tracking`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCourseById = createAsyncThunk(
  "courses/getCourseById",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}course/getByMultipleIds`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      return response.data?.courses; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCourseStudentById = createAsyncThunk(
  "courses/getCourseStudentById",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}course/getUserCourses`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      return response.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getStudentCourseById = createAsyncThunk(
  "courses/getStudentCourseById",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/profile/user/${data?.userId}`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data, "asdasdsadasdsadsa");
      return [
        ...response.data?.data?.majorCourses,
        ...response.data?.data?.minorCourses,
      ]; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const getStudentCourses = createAsyncThunk(
  "courses/getStudentCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/user/course`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data, "asdasdsadasdsadsa");
      return [...response.data?.data]; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getTierCourses = createAsyncThunk(
  "courses/getTierCourses",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course/tier/${data}`,
        headers: {},
      };

      const response = await axios.request(config);
      return {
        data: response.data?.data,
        tier: data,
      }; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getMajorCourses = createAsyncThunk(
  "courses/getMajorCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/major/courses`,
        headers: {
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

export const getMinorCourses = createAsyncThunk(
  "courses/getMinorCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/minor/courses`,
        headers: {
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

export const getCourseProgress = createAsyncThunk(
  "courses/getCourseProgress",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/result/user-course?courses=${data?.id}`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data?.data, "courseProgessInfo");
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getRecomendedCourses = createAsyncThunk(
  "courses/getRecomendedCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course/recommended`,
        headers: {
          authorization: token,
        },
        data: { competencies: data },
      };

      const response = await axios.request(config);
      console.log(response.data?.data, "courseProgessInfo");
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getSingleCourse = createAsyncThunk(
  "courses/getSingleCourse",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course/${data?.id}`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response.data?.data, "courseProgessInfo");
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCompareCourses = createAsyncThunk(
  "courses/getCompareCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course/compare`,
        headers: {
          authorization: token,
        },
        data,
      };

      const response = await axios.request(config);
      console.log(response.data?.data, "courseProgessInfo");
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getSearchCourses = createAsyncThunk(
  "courses/getSearchCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL
          }api/client/course/search/course?search=${data?.search ? data?.search : []
          }&degrees_id=${data?.degrees_id ? data?.degrees_id : []
          }&concentrations_id=${data?.concentrations_id ? data?.concentrations_id : []
          }`,
        headers: {
          authorization: token,
        },
      };

      const response = await axios.request(config);
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const getAllCourses = createAsyncThunk(
  "courses/getAllCourses",
  async (data: any) => {
    const token = getCookie("ungradeToken");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/course`,
        headers: {
          authorization: token,
        },
      };

      console.log(config);

      const response = await axios.request(config);
      return response.data?.data;
    } catch (error) {
      console.error(error);
    }
  }
);
export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state: any, action: any) => {
      try {
        let data = JSON.stringify(action.payload.data);
        const token = getCookie("ungradeToken");

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/course`,
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            message.success("Course Added");
            if (action.payload.callback) {
              action.payload.callback();
            }
          })
          .catch((error) => {
            errorHandle(error.response.data);

          });
      } catch (err) { }
    },
    editCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/course/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Updated");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again13";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    updateTierAndVisiblityCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/course/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Updated");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again14";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    deleteCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}course/delete/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Deleted");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again15";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    addUserCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/${action.payload.type}/courses`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Added");
          if (action.payload.callback) {
            action.payload.callback(response);
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.message || ["Please Try Again"];
          console.log(error?.response?.data?.message, "sadasda");
          message.error(error?.response?.data?.message);
          // state.loader = false
        });
    },
    updateUserCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/${action.payload.type}/courses/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Added");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again15";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    deleteUserCourse: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/${action.payload.type}/courses/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Course Deleted");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again15";
          message.error(errorMsg);
          state.loader = false;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCourse.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getCourse.fulfilled, (state: any, action: any) => {
        state.courses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCourse.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getCourseByConcentration.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(
        getCourseByConcentration.fulfilled,
        (state: any, action: any) => {
          console.log(action.payload, "action.payloadaction.payload");
          state.concentrationCourses = action.payload;
          //   state.isLoading = false;
          //   state.hasError = false
        }
      )
      .addCase(getCourseByConcentration.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getCourseById.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getCourseById.fulfilled, (state: any, action: any) => {
        state.chooseCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCourseById.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getCourseStudentById.pending, (state: any, action: any) => {
        state.yourCoursesLoader = true;
        // state.hasError = false;
      })
      .addCase(getCourseStudentById.fulfilled, (state: any, action: any) => {
        state.yourCourses = action.payload;
        state.yourCoursesLoader = false;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCourseStudentById.rejected, (state: any, action: any) => {
        state.yourCoursesLoader = false;
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getTierCourses.pending, (state: any, action: any) => { })
      .addCase(getTierCourses.fulfilled, (state: any, action: any) => {
        if (action?.payload?.tier === 1) {
          state.tier1 = action.payload.data;
        } else if (action?.payload?.tier === 2) {
          state.tier2 = action.payload.data;
        } else if (action.payload?.tier === 3) {
          state.tier3 = action.payload.data;
        }
      })
      .addCase(getTierCourses.rejected, (state: any, action: any) => { })

      .addCase(getStudentCourseById.pending, (state: any, action: any) => {
        state.studentCoursesLoader = true;
        // state.hasError = false;
      })
      .addCase(getStudentCourseById.fulfilled, (state: any, action: any) => {
        state.studentCourses = action.payload;
        state.studentCoursesLoader = false;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getStudentCourseById.rejected, (state: any, action: any) => {
        state.studentCoursesLoader = false;
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getStudentCourses.pending, (state: any, action: any) => {
        state.studentCoursesLoader = true;
        // state.hasError = false;
      })
      .addCase(getStudentCourses.fulfilled, (state: any, action: any) => {
        state.userCourses = action.payload;
        state.studentCoursesLoader = false;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getStudentCourses.rejected, (state: any, action: any) => {
        state.studentCoursesLoader = false;
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getMajorCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getMajorCourses.fulfilled, (state: any, action: any) => {
        state.majorCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getMajorCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getMinorCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getMinorCourses.fulfilled, (state: any, action: any) => {
        state.minorCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getMinorCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getCourseTracking.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getCourseTracking.fulfilled, (state: any, action: any) => {
        state.courseTracking = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCourseTracking.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getCourseProgress.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getCourseProgress.fulfilled, (state: any, action: any) => {
        state.courseProgessInfo = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCourseProgress.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getRecomendedCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getRecomendedCourses.fulfilled, (state: any, action: any) => {
        state.recommendedCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getRecomendedCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSingleCourse.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getSingleCourse.fulfilled, (state: any, action: any) => {
        state.SingleCourse = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSingleCourse.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getCompareCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getCompareCourses.fulfilled, (state: any, action: any) => {
        state.comparecourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCompareCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSearchCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getSearchCourses.fulfilled, (state: any, action: any) => {
        state.searchCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSearchCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getAllCourses.pending, (state: any, action: any) => {
        // state.hasError = false;
      })
      .addCase(getAllCourses.fulfilled, (state: any, action: any) => {
        state.allCourses = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getAllCourses.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      });
  },
});

export const {
  addCourse,
  editCourse,
  deleteCourse,
  updateTierAndVisiblityCourse,
  addUserCourse,
  updateUserCourse,
  deleteUserCourse,
} = coursesSlice.actions;

export default coursesSlice.reducer;
