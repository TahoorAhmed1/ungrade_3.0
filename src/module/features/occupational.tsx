import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  usaJobs: [],
  usaJobsCountAll: 0,
  usaJobsCount: 0,
  linkedInJobs: [],
  getRelatedJobs: [],
  getOccupationCompetency: [],
  getOccupationdetail: false,
};

export const getUSAJobs = createAsyncThunk(
  "occupationalTodo/getUSAJobs",
  async (data: any) => {
    console.log(data, "datadatadata");
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://data?.usajobs.gov/api/Search?Keyword=${data}`,
        headers: {
          "User-Agent": "saqibyousuf001@gmail.com",
          "Authorization-Key": "bQPu0L7kIsM7YlZZItqJTfj0z/WVbBkghmcZy2qn6gU=",
          Host: "data?.usajobs.gov",
          Cookie:
            "akavpau_DATA_USAJ=1705333561~id=1dc3858580c57afc971c35bf5e03b71a",
        },
      };
      // https://data?.usajobs.gov/api/Search?Keyword=Cognitive Abilities&WhoMayApply=public&fields=all
      const response = await axios.request(config);
      console.log(response);
      return response.data?.SearchResult; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getRelatableJobs = createAsyncThunk(
  "occupationalTodo/getRelatableJobs",
  async (data: any) => {
    console.log(data, "datadatadata");
    try {
      let arr = [];
      if (data && data?.length) {
        // Map each courseObj to a promise
        const promises = data?.map(async (courseObj: any) => {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `https://data?.usajobs.gov/api/Search?Keyword=${courseObj.course.course}&ResultsPerPage=3&WhoMayApply=public&fields=all`,
            headers: {
              "User-Agent": "saqibyousuf001@gmail.com",
              "Authorization-Key":
                "bQPu0L7kIsM7YlZZItqJTfj0z/WVbBkghmcZy2qn6gU=",
              Host: "data?.usajobs.gov",
              Cookie:
                "akavpau_DATA_USAJ=1705333561~id=1dc3858580c57afc971c35bf5e03b71a",
            },
          };
          // Fetch data for each courseObj
          const response = await axios.request(config);
          return response.data?.SearchResult?.SearchResultItems;
        });

        // Wait for all promises to resolve
        // @ts-ignore
        arr = await Promise.all(promises);
        arr = arr.flat();
      }

      console.log(arr, "relatedjobs"); // This will execute after all promises are resolved
      return arr; // Return the data here
    } catch (error) {
      console.error(error);
      throw error; // Rethrow the error to handle it in the caller
    }
  }
);

export const getLinkedInJobs = createAsyncThunk(
  "occupationalTodo/getLinkedInJobs",
  async (data: any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/occupation/linkedIn`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      console.log(response);
      return response.data?.data; // Return the data here
    } catch (error) {
      console.error(error);
    }
  }
);

export const getOccupationalMap = createAsyncThunk(
  "occupationalTodo/getOccupationalMap",
  async (data: any) => {
    try {
      const token = getCookie("ungradeToken");
      console.log(data, "dsadsadas");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/occupation/competency/${data?.onetId}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      if (response) {
        if (data?.handleShowMap) {
          data?.handleShowMap();
        }
        return response.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const getOccupationalMapscrapping = createAsyncThunk(
  "occupationalTodo/getOccupationalMapscrapping",
  async (data: any) => {
    try {
      const token = getCookie("ungradeToken");
      console.log(data, "dsadsadas");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/occupation/scrapping/${data?.id}`,
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      };

      const response = await axios.request(config);
      console.log(response);
      if (response) {
        if (data?.handleShowMap) {
          data?.handleShowMap();
        }
        return response.data?.data; // Return the data here
      }
    } catch (error) {
      console.error(error);
    }
  }
);
export const occupationalTodo = createSlice({
  name: "occupationalTodo",
  initialState,
  reducers: {
    addTodo: (state: any, action: any) => {
      // request
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUSAJobs.pending, (state: any, action: any) => {})
      .addCase(getUSAJobs.fulfilled, (state: any, action: any) => {
        state.usaJobs = action.payload?.SearchResultItems;
        state.usaJobsCountAll = action.payload?.SearchResultCountAll;
        state.usaJobsCount = action.payload?.SearchResultCount;
      })
      .addCase(getUSAJobs.rejected, (state: any, action: any) => {})
      .addCase(getLinkedInJobs.pending, (state: any, action: any) => {})
      .addCase(getLinkedInJobs.fulfilled, (state: any, action: any) => {
        console.log(action.payload, "action.payload");
        state.linkedInJobs = action.payload;
      })
      .addCase(getLinkedInJobs.rejected, (state: any, action: any) => {})
      .addCase(getRelatableJobs.pending, (state: any, action: any) => {})
      .addCase(getRelatableJobs.fulfilled, (state: any, action: any) => {
        console.log(action.payload, "action.payload");
        state.getRelatedJobs = action.payload;
      })
      .addCase(getRelatableJobs.rejected, (state: any, action: any) => {})
      .addCase(getOccupationalMap.pending, (state: any, action: any) => {})
      .addCase(getOccupationalMap.fulfilled, (state: any, action: any) => {
        console.log(action.payload, "action.payload");
        state.getOccupationCompetency = action.payload;
      })
      .addCase(getOccupationalMap.rejected, (state: any, action: any) => {})
      .addCase(getOccupationalMapscrapping.pending, (state: any, action: any) => {})
      .addCase(getOccupationalMapscrapping.fulfilled, (state: any, action: any) => {
        console.log(action.payload, "action.payload");
        state.getOccupationdetail = action.payload;
      })
      .addCase(getOccupationalMapscrapping.rejected, (state: any, action: any) => {});
  },
});

export const { addTodo } = occupationalTodo.actions;

export default occupationalTodo.reducer;
