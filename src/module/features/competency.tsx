import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  competencies: [],
  courseCompetencies: [],
  selectedCourseCompetencies: [],
  selectedCourseCompetenciesWithCourse: [],
  studentAverageResults: {},
  studentAverageResultsLoader: false,
  AllCompetencieResult: [],
  AllCompetencieResultLoader: false,
  AllCompetencieTier: [],
  AllCompetencieTier2: [],
  AllCompetencieTier3: [],
  singleCompentency: {},
  singleCompentencyLoader: false,
  singleCourseCompetency: [],
  notSubmitted: false,
  userCompetencies: [],
  AllTierCompetencies: []
};

export const getCompetencies = createAsyncThunk(
  "competencySlice/getCompetencies",
  async () => {
    const token = getCookie('ungradeToken');
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency`,
        headers: {
          'authorization': token
        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCompetenciesById = createAsyncThunk(
  "completeProfileSlice/getCompetenciesById",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}competency/getByMultipleCourse`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      return response.data?.competencies; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const getSelectedCompetenciesById = createAsyncThunk(
  "completeProfileSlice/getSelectedCompetenciesById",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}competency/getByMultipleCourse`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      return response.data?.competencies; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getSelectedCompetenciesWithCourse = createAsyncThunk(
  "completeProfileSlice/getSelectedCompetenciesWithCourse",
  async (data: any) => {
    try {
      const token = getCookie('ungradeToken');

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/profile/user/courses/competencies`,
        headers: {
          'authorization': token
        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCoursesCompetencies = createAsyncThunk(
  "completeProfileSlice/getCoursesCompetencies",
  async (data: any) => {
    const token = getCookie('ungradeToken');
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency/course/${data?.id}`,
        headers: {
          'authorization': token

        }
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);


export const getCompetenciesByIdTier = createAsyncThunk(
  "completeProfileSlice/getCompetenciesByIdTier",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/competency/courses`,
        headers: {},
        data: data?.data,
      };

      const response = await axios.request(config);
      return {
        data: response.data?.data,
        tier: data?.tier,
      }; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

// need new api for this
export const getStudentAverage = createAsyncThunk(
  "completeProfileSlice/getStudentAverage",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}assesments/studentAverageResult`,
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

export const AllStudentAverageResult = createAsyncThunk(
  "completeProfileSlice/AllStudentAverageResult",
  async (data: any) => {
    const token = getCookie('ungradeToken');
    console.log(data, 'sdadas')
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/result/user?competencies=${data?.competencyIds}`,
        headers: {
          'authorization': token
        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getCompetencybyId = createAsyncThunk(
  "completeProfileSlice/getById",
  async (data: any) => {
    const token = getCookie('ungradeToken');
    try {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency/${data?.id}`,
        headers: {
          'authorization': token

        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const checkSubmitted = createAsyncThunk(
  "completeProfileSlice/checkSubmitted",
  async (data: any) => {
    const token = getCookie('ungradeToken');
    try {
      let config = {
        method: "GET",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/result/check-submitted`,
        headers: {
          'authorization': token
        },
      };

      const response = await axios.request(config);
      return response.data?.data?.notSubmitted; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUserCompentencies = createAsyncThunk(
  "completeProfileSlice/getUserCompentencies",
  async (data: any) => {
    const token = getCookie('ungradeToken');
    console.log(data, 'sdadas')
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/competency/user`,
        headers: {
          'authorization': token
        },
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const competencySlice = createSlice({
  name: "competencySlice",
  initialState,
  reducers: {
    addCompetency: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          message.success("Competency Created");
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again6";
          message.error(errorMsg);
        });
    },
    editCompetency: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          message.success("Competency Updated");
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again7";
          message.error(errorMsg);
        });
    },
    updateTierAndVisiblityCompetency: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/competency/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token

        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          message.success("Competency Updated");
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again8";
          message.error(errorMsg);
        });
    },
    deleteCompetency: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);

      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `competency/delete/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
          message.success("Competency Created");
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again9";
          message.error(errorMsg);
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompetencies.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getCompetencies.fulfilled, (state: any, action: any) => {
        state.competencies = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCompetencies.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getCompetenciesById.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getCompetenciesById.fulfilled, (state: any, action: any) => {
        state.courseCompetencies = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getCompetenciesById.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getSelectedCompetenciesById.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSelectedCompetenciesById.fulfilled, (state: any, action: any) => {
        state.selectedCourseCompetencies = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSelectedCompetenciesById.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

      .addCase(getSelectedCompetenciesWithCourse.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSelectedCompetenciesWithCourse.fulfilled, (state: any, action: any) => {
        state.selectedCourseCompetenciesWithCourse = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSelectedCompetenciesWithCourse.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getStudentAverage.pending, (state: any, action: any) => {
        state.studentAverageResultsLoader = true;
        // state.hasError = false;
      })
      .addCase(getStudentAverage.fulfilled, (state: any, action: any) => {
        state.studentAverageResults = action.payload;
        state.studentAverageResultsLoader = false;
        //   state.hasError = false
      })
      .addCase(getStudentAverage.rejected, (state: any, action: any) => {
        state.studentAverageResultsLoader = false;
      })

      .addCase(AllStudentAverageResult.pending, (state: any, action: any) => {
        state.AllCompetencieResultLoader = true;
        // state.hasError = false;
      })
      .addCase(AllStudentAverageResult.fulfilled, (state: any, action: any) => {
        state.AllCompetencieResult = action.payload;
        state.AllCompetencieResultLoader = false;
        //   state.hasError = false
      })
      .addCase(AllStudentAverageResult.rejected, (state: any, action: any) => {
        state.AllCompetencieResultLoader = false;
      })
      .addCase(getCompetencybyId.pending, (state: any, action: any) => {
        state.singleCompentencyLoader = true;
        // state.hasError = false;
      })
      .addCase(getCompetencybyId.fulfilled, (state: any, action: any) => {
        state.singleCompentency = action.payload;
        state.singleCompentencyLoader = false;
        //   state.hasError = false
      })
      .addCase(getCompetencybyId.rejected, (state: any, action: any) => {
        state.singleCompentencyLoader = false;
      })

      .addCase(getCompetenciesByIdTier.pending, (state: any, action: any) => {
        // state.AllCompetencieResultLoader = true;
        // state.hasError = false;
      })
      .addCase(getCompetenciesByIdTier.fulfilled, (state: any, action: any) => {
        if (action?.payload?.tier == 1) {
          state.AllCompetencieTier = action.payload.data;
        } else if (action?.payload?.tier == 2) {
          state.AllCompetencieTier2 = action.payload.data;
        } else if (action?.payload?.tier == 3) {
          state.AllCompetencieTier3 = action.payload.data;
        } else if (action.payload.tier === "all") {
          state.AllTierCompetencies = action.payload.data;

        }
      })
      .addCase(getCompetenciesByIdTier.rejected, (state: any, action: any) => {
        // state.AllCompetencieResultLoader = false;
      })


      .addCase(getCoursesCompetencies.pending, (state: any, action: any) => {
        // state.singleCompentencyLoader = true;
        // state.hasError = false;
      })
      .addCase(getCoursesCompetencies.fulfilled, (state: any, action: any) => {
        state.singleCourseCompetency = action.payload;
        // state.singleCompentencyLoader = false;
        //   state.hasError = false
      })
      .addCase(getCoursesCompetencies.rejected, (state: any, action: any) => {
        // state.singleCompentencyLoader = false;
      })

      .addCase(checkSubmitted.pending, (state: any, action: any) => {
        // state.singleCompentencyLoader = true;
        // state.hasError = false;
      })
      .addCase(checkSubmitted.fulfilled, (state: any, action: any) => {
        state.notSubmitted = action.payload;
        // state.singleCompentencyLoader = false;
        //   state.hasError = false
      })
      .addCase(checkSubmitted.rejected, (state: any, action: any) => {
        // state.singleCompentencyLoader = false;
      })
      .addCase(getUserCompentencies.pending, (state: any, action: any) => {
        // state.singleCompentencyLoader = true;
        // state.hasError = false;
      })
      .addCase(getUserCompentencies.fulfilled, (state: any, action: any) => {
        state.userCompetencies = action.payload;
        // state.singleCompentencyLoader = false;
        //   state.hasError = false
      })
      .addCase(getUserCompentencies.rejected, (state: any, action: any) => {
        // state.singleCompentencyLoader = false;
      })


  },
});

export const {
  addCompetency,
  editCompetency,
  deleteCompetency,
  updateTierAndVisiblityCompetency,
} = competencySlice.actions;

export default competencySlice.reducer;
