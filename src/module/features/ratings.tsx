import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  professorRating: [],
  universityRating: [],
  universityWithProfessorRating: false,
  unversityAvgRating: {},
  universityOutcomes: false,
  universityOutcomesCompareWith: false,
  universityOutcomesCompareTo: false,

  professorOutcomesCompareWith: false,
  professorOutcomesCompareTo: false
};

export const getProfessorRating = createAsyncThunk(
  "ratingSlice/getProfessorRating",
  async (data:any) => {
    try {
      // function here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUniversityRating = createAsyncThunk(
  "ratingSlice/getUniversityRating",
  async (data:any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}university/getRating/${data?.id}`,
        headers: {},
      };

      const response = await axios.request(config);

      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUniversityWithProfessorAvgRating = createAsyncThunk(
  "ratingSlice/getUniversityWithProfessorAvgRating",
  async (data:any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/average`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);

      if (response?.data?.data) {
        return Object.values(response.data?.data?.averages); // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const getUniversityAvgRating = createAsyncThunk(
  "ratingSlice/getUniversityAvgRating",
  async (data:any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}university/GetAverageOfRating/${data?.id}`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response?.data?.data?.length) {
        return response.data?.data[0]; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const getUniversityOutcomes = createAsyncThunk(
  "ratingSlice/getUniversityOutcomes",
  async (data:any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/outcome`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data, 'response.data')
      if (response?.data?.data?.length) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUniversityOutcomesCompareWith = createAsyncThunk(
  "ratingSlice/getUniversityOutcomesCompareWith",
  async (data:any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/outcome`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data, 'response.data')
      if (response?.data?.data?.length) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getUniversityOutcomesCompareTo = createAsyncThunk(
  "ratingSlice/getUniversityOutcomesCompareTo",
  async (data:any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/outcome`,
        headers: {},
        data: data
      };

      const response = await axios.request(config);
      console.log(response?.data, 'response.data')
      if (response?.data?.data?.length) {
        return response?.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);

export const getProfessorOutcomesCompareWith = createAsyncThunk(
  "professor/getProfessorOutcomesCompareWith",
  async (data:any) => {
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
export const getProfessorOutcomesCompareTo = createAsyncThunk(
  "professor/getProfessorOutcomesCompareTo",
  async (data:any) => {
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
export const ratingSlice = createSlice({
  name: "ratingSlice",
  initialState,
  reducers: {
    addUniversityRating: (state:any, action:any) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}university/addRating/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: action.payload.data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addProfessorRating: (state:any, action:any) => {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professor/addRating/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: action.payload.data,
      };

      axios
        .request(config)
        .then((response) => {
          action.payload.callback();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfessorRating.pending, (state:any, action:any) => { })
      .addCase(getProfessorRating.fulfilled, (state:any, action:any) => {
        state.professorRating = action.payload;
      })
      .addCase(getProfessorRating.rejected, (state:any, action:any) => { })
      .addCase(getUniversityRating.pending, (state:any, action:any) => { })
      .addCase(getUniversityRating.fulfilled, (state:any, action:any) => {
        state.universityRating = action.payload;
      })
      .addCase(getUniversityRating.rejected, (state:any, action:any) => { })
      .addCase(getUniversityAvgRating.pending, (state:any, action:any) => { })
      .addCase(getUniversityAvgRating.fulfilled, (state:any, action:any) => {
        state.unversityAvgRating = action.payload;
      })
      .addCase(getUniversityAvgRating.rejected, (state:any, action:any) => { })
      .addCase(
        getUniversityWithProfessorAvgRating.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityWithProfessorAvgRating.fulfilled,
        (state:any, action:any) => {
          state.universityWithProfessorRating = action.payload;
        }
      )
      .addCase(
        getUniversityWithProfessorAvgRating.rejected,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomes.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomes.fulfilled,
        (state:any, action:any) => {
          state.universityOutcomes = action.payload;
        }
      )
      .addCase(
        getUniversityOutcomes.rejected,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomesCompareWith.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomesCompareWith.fulfilled,
        (state:any, action:any) => {
          state.universityOutcomesCompareWith = action.payload;
        }
      )
      .addCase(
        getUniversityOutcomesCompareWith.rejected,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomesCompareTo.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getUniversityOutcomesCompareTo.fulfilled,
        (state:any, action:any) => {
          state.universityOutcomesCompareTo = action.payload;
        }
      )
      .addCase(
        getUniversityOutcomesCompareTo.rejected,
        (state:any, action:any) => { }
      )
      .addCase(
        getProfessorOutcomesCompareWith.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getProfessorOutcomesCompareWith.fulfilled,
        (state:any, action:any) => {
          state.professorOutcomesCompareWith = action.payload;
        }
      )
      .addCase(
        getProfessorOutcomesCompareWith.rejected,
        (state:any, action:any) => { }
      )
      .addCase(
        getProfessorOutcomesCompareTo.pending,
        (state:any, action:any) => { }
      )
      .addCase(
        getProfessorOutcomesCompareTo.fulfilled,
        (state:any, action:any) => {
          state.professorOutcomesCompareTo = action.payload;
        }
      )
      .addCase(
        getProfessorOutcomesCompareTo.rejected,
        (state:any, action:any) => { }
      )

  },
});

export const { addUniversityRating } = ratingSlice.actions;

export default ratingSlice.reducer;
