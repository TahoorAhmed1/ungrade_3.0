import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  loader: false,
  professorList: [],
  professorRating: [],
  professor: false,
  avgRating: [],
  bothAvg: 0,
  CoursesRating: false,
  outcomes: false,
  singleUniversityAllProfessor: [],
  singleUniversityAllProfessorforCourse: [],
  searchProfessorsData: [],
  compares: {}
};

export const getProfessors = createAsyncThunk(
  "professor/getAll",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log(response.data, 'response.dataresponse.data')
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getSingleProfessor = createAsyncThunk(
  "professor/getSingleProfessor",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor/${data?.id}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log(response, 'response?.data?.data')
      if (response?.data?.data) {
        return response.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getSingleProfessorRating = createAsyncThunk(
  "professor/getSingleProfessorRating",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professor/getRating/${data?.id}`,
        headers: {},
      };

      const response = await axios.request(config);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);
export const getSingleAvgProfessorRating = createAsyncThunk(
  "professor/getSingleAvgProfessorRating",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor/averages`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data?.data, 'response?.data')
      // if (response?.data?.data?.data) {
      return Object.values(response?.data?.data); // Return the data here
      // }
    } catch (error) {
      console.error(error);
    }
  }
);
export const getProfessorOutcomes = createAsyncThunk(
  "professor/getProfessorOutcomes",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/user-outcome/course/professor`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data?.outcome, 'response?.data?.data')
      if (response?.data?.data) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const searchProfessors = createAsyncThunk(
  "professor/searchProfessors",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor/search${data?.search ? `?search=${data?.search}` : ''}`,
        headers: {}
      };

      const response = await axios.request(config);
      console.log(response?.data?.data, 'response?.data')
      if (response?.data?.data) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
)
export const universityProfessors = createAsyncThunk(
  "professor/universityProfessors",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor/university/${data?.id}`,
        headers: {}
      };

      const response = await axios.request(config);
      console.log(response?.data?.data, 'response?.data')
      if (response?.data?.data) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
)
export const universityProfessorsforCourse = createAsyncThunk(
  "professor/universityProfessorsforCourse",
  async (data: any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professor/geAllWithUniversityId/${data?.id}`,
        headers: {}
      };

      const response = await axios.request(config);
      console.log(response?.data?.data, 'response?.data')
      if (response?.data?.data) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
)
export const professorCompare = createAsyncThunk(
  "professor/professorCompare",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/professor/compare`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data?.data, 'response?.data')
      if (response?.data?.data) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
)
export const professorSlice = createSlice({
  name: "professor",
  initialState,
  reducers: {
    adminAddProfessor: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/professor`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Professor Added");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again22";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    adminEditProfessor: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/professor/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Professor Updated");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again22";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    addProfessor: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api / client / professor`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Professor Added");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again22";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    editProfessor: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professor / update / ${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Professor Updated");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again23";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    addProfessorRating: (state: any, action: any) => {
      let data = JSON.stringify(action.payload.data);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professor / addRating / `,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("Professor rating submitted");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error || error?.response?.data?.message || "Please Try Again24";
          message.error(errorMsg);
          state.loader = false;
        });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfessors.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getProfessors.fulfilled, (state: any, action: any) => {
        console.log(action.payload, 'professorList')
        state.professorList = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getProfessors.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSingleProfessorRating.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSingleProfessorRating.fulfilled, (state: any, action: any) => {
        state.professorRating = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSingleProfessorRating.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSingleProfessor.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSingleProfessor.fulfilled, (state: any, action: any) => {
        state.professor = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSingleProfessor.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSingleAvgProfessorRating.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSingleAvgProfessorRating.fulfilled, (state: any, action: any) => {
        console.log('action.payload', action.payload)
        state.CoursesRating = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSingleAvgProfessorRating.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getProfessorOutcomes.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getProfessorOutcomes.fulfilled, (state: any, action: any) => {
        state.outcomes = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getProfessorOutcomes.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(universityProfessors.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(universityProfessors.fulfilled, (state: any, action: any) => {
        state.singleUniversityAllProfessor = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(universityProfessors.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(searchProfessors.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(searchProfessors.fulfilled, (state: any, action: any) => {
        state.searchProfessorsData = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(searchProfessors.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(universityProfessorsforCourse.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(universityProfessorsforCourse.fulfilled, (state: any, action: any) => {
        state.singleUniversityAllProfessorforCourse = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(universityProfessorsforCourse.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(professorCompare.pending, (state: any, action: any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(professorCompare.fulfilled, (state: any, action: any) => {
        state.compares = action.payload
        // state.avgRating = action.payload?.data;
        // state.bothAvg = action.payload?.bothAvg
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(professorCompare.rejected, (state: any, action: any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      });
  },
});

export const { adminAddProfessor, adminEditProfessor, addProfessor, editProfessor, addProfessorRating } = professorSlice.actions;

export default professorSlice.reducer;
