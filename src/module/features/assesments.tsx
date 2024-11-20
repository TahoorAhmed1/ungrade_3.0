import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
const initialState = {
  assessments: [],
  assessmentsLoader: false,
  answers: [],
  tierAssesment: [],
  tierAssesmentLoader: false,
  tieranswers: [],
  occupation: [],
  occupationLoader: false,
  assesmentType: "pre",
  assesmentCompleted: false,
};

export const getAssessments = createAsyncThunk(
  "assessments/getAssessments",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    const ungradeUser: any = getCookie("ungradeUser");

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/${ungradeUser?.type === "admin" ? ungradeUser.type : "client"
          }/assessment/competency/${data?.id}`,
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

export const getAssessmentsTier = createAsyncThunk(
  "assessments/getAssessmentsTier",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/assessment/tier/${data?.id}`,
        headers: {},
      };

      const response = await axios.request(config);
      const chunkArray = (array: any[], chunkSize: number) => {
        const result: any = [];
        for (let i = 0; i < array.length; i += chunkSize) {
          result.push(array.slice(i, i + chunkSize));
        }
        return result;
      };

      return chunkArray(response.data?.data, 10);
    } catch (error) {
      console.error(error);
    }
  }
);

export const getanswers = createAsyncThunk(
  "assessments/getanswers",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/assessmentanswer/competency/${data?.competencyId}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      const response = await axios.request(config);
      // return response.data?.preanswers
      console.log(
        {
          answers: response.data?.data?.preTest
            ? response.data?.data?.postanswers
            : response.data?.data?.preanswers,
          assesmentType: response.data?.data?.preTest ? "post" : "pre",
          completed: response.data?.data?.preTest && response.data?.data?.postTest,
        },
        "asdasdsadsadsa"
      );
      return {
        answers: response.data?.data?.preTest
          ? response.data?.data?.postanswers
          : response.data?.data?.preanswers,
        assesmentType: response.data?.data?.preTest ? "post" : "pre",
        completed: response.data?.data?.preTest && response.data?.data?.postTest,
      }; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getanswersTier = createAsyncThunk(
  "assessments/getanswersTier",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/assessmentanswer/tier/${data?.courseIds}`,
        headers: {
          "Content-Type": "application/json",
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

export const getStudentOccupation = createAsyncThunk(
  "completeProfileSlice/getStudentOccupation",
  async (data: any) => {
    const token = getCookie("ungradeToken");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/occupation/user`,
        headers: {
          "Content-Type": "application/json",
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
export const assessmentSlice = createSlice({
  name: "assessmentSlice",
  initialState,
  reducers: {
    addAssessments: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/assessment`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };
      axios
        .request(config)
        .then((response) => {
          message.success("Assesment Created");
          action.payload.callback();
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again1";
          message.error(errorMsg);
        });
    },
    editAssessments: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie("ungradeToken");
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/assessment/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Assesment Created");
          action.payload.callback();
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again2";
          message.error(errorMsg);
        });
    },
    addAssessmentsAnswers: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      action.payload.setLoader(true);
      const token = getCookie("ungradeToken");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/assessmentanswer`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Answer Has Been Submitted");
          action.payload.callback(action.payload.index);
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again asd";
          message.error(errorMsg);
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        });
    },
    addAssessmentsAnswersTier: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      action.payload.setLoader(true);
      const token = getCookie("ungradeToken");
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/assessmentanswer/tier`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Answer Has Been Submitted");
          action.payload.callback(action.payload.index);
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        })
        .catch((error) => {
          let errorMsg =
            error?.response?.data?.error ||
            error?.response?.data?.message ||
            "Please Try Again asd";
          message.error(errorMsg);
          if (action.payload.setLoader) {
            action.payload.setLoader(false);
          }
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssessments.pending, (state: any, action: any) => {
        state.assessmentsLoader = true;
        // state.hasError = false;
      })
      .addCase(getAssessments.fulfilled, (state: any, action: any) => {
        state.assessments = action.payload;
      })
      .addCase(getAssessments.rejected, (state: any, action: any) => { })

      .addCase(getanswers.pending, (state: any, action: any) => {
        state.assessmentsLoader = true;
      })
      .addCase(getanswers.fulfilled, (state, action: any) => {
        state.answers = action.payload.answers;
        state.assesmentType = action.payload.assesmentType;
        state.assesmentCompleted = action.payload.completed;
        state.assessmentsLoader = false;
      })
      .addCase(getanswers.rejected, (state: any, action: any) => {
        //   state.hasError = true
        state.assessmentsLoader = false;
      })

      .addCase(getAssessmentsTier.pending, (state: any, action: any) => {
        state.tierAssesmentLoader = true;
      })
      .addCase(getAssessmentsTier.fulfilled, (state: any, action: any) => {
        state.tierAssesment = action.payload;
        // state.tierAssesmentLoader = false;
      })
      .addCase(getAssessmentsTier.rejected, (state: any, action: any) => {
        // state.tierAssesmentLoader = false;
      })

      .addCase(getanswersTier.pending, (state: any, action: any) => {
        state.tierAssesmentLoader = true;
      })
      .addCase(getanswersTier.fulfilled, (state: any, action: any) => {
        state.tieranswers = action.payload;
        state.tierAssesmentLoader = false;
      })
      .addCase(getanswersTier.rejected, (state: any, action: any) => {
        state.tierAssesmentLoader = false;
      })

      .addCase(getStudentOccupation.pending, (state: any, action: any) => {
        state.occupationLoader = true;
      })
      .addCase(getStudentOccupation.fulfilled, (state: any, action: any) => {
        state.occupation = action.payload;
        // state.totalOccupationPage = action.payload?.totalPage;
        // state.mergedResults = action.payload?.mergedResults;

        state.occupationLoader = false;
      })
      .addCase(getStudentOccupation.rejected, (state: any, action: any) => {
        state.occupationLoader = false;
      });
  },
});

export const {
  addAssessments,
  addAssessmentsAnswers,
  editAssessments,
  addAssessmentsAnswersTier,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;
