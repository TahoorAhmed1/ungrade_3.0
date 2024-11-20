import { getCookie } from "@/lib/utils";
import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
const initialState = {
  loader: false,
  universityList: [],
  singleUniversity: false,
  compares: {},
  universitiesRating: [],
  searchUniversitiesData: [],
  searchUniversitieWithYoursData: []
};

export const getUniversities = createAsyncThunk(
  "university/getAll",
  async (data:any) => {
    const token = getCookie('ungradeToken');
    const user:any = getCookie('ungradeUser');

    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/${user.type === 'admin' ? 'admin' : 'client'}/university`,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, must-revalidate",
          'authorization': token

        },
      };

      let res = await axios.request(config).then((response) => {
        return response.data?.data;
      })
      console.log(res)
      return res
    } catch (error) {
      console.error(error);
    }
  }
);

export const getSingleUniversities = createAsyncThunk(
  "university/getSingleUniversities",
  async (data:any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/${data?.id}`,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, must-revalidate"
        },
      };

      let res = await axios.request(config).then((response) => {
        return response.data?.data;
      })
      console.log(res)
      return res
    } catch (error) {
      console.error(error);
    }
  }
);


export const getComapredUniversities = createAsyncThunk(
  "university/getComapredUniversities",
  async (data:any) => {
    try {
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/compare`,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, must-revalidate"
        },
        data: data
      };

      let res = await axios.request(config).then((response) => {
        return response.data?.data;
      })
      console.log(res)
      return res
    } catch (error) {
      console.error(error);
    }
  }
);


export const searchUniversities = createAsyncThunk(
  "university/searchUniversities",
  async (data:any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/search?${data?.search ? `search=${data?.search}${data?.university_id ? '&' : ''}` : ''}${data?.university_id ? `university_id=${data?.university_id}` : ''}`,
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

export const searchUniversitiesWithYour = createAsyncThunk(
  "university/searchUniversitiesWithYour",
  async (data:any) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/client/university/search?${data?.search ? `search=${data?.search}${data?.university_id ? '&' : ''}` : ''}${data?.university_id ? `university_id=${data?.university_id}` : ''}`,
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



export const universitySlice = createSlice({
  name: "university",
  initialState,
  reducers: {
    addUniversity: (state:any, action:any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/university`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("university Added");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error  || error?.response?.data?.message || "Please Try Again25";
          message.error(errorMsg);
          state.loader = false;
        });
    },
    editUniversity: (state:any, action:any) => {
      let data = JSON.stringify(action.payload.data);
      const token = getCookie('ungradeToken');

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/university/${action.payload.id}`,
        headers: {
          "Content-Type": "application/json",
          'authorization': token
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          message.success("university Updated");
          if (action.payload.callback) {
            action.payload.callback();
          }
        })
        .catch((error) => {
          let errorMsg = error?.response?.data?.error  || error?.response?.data?.message || "Please Try Again26";
          message.error(errorMsg);
          state.loader = false;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUniversities.pending, (state:any, action:any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getUniversities.fulfilled, (state:any, action:any) => {
        state.universityList = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getUniversities.rejected, (state:any, action:any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getSingleUniversities.pending, (state:any, action:any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getSingleUniversities.fulfilled, (state:any, action:any) => {
        state.singleUniversity = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getSingleUniversities.rejected, (state:any, action:any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(getComapredUniversities.pending, (state:any, action:any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(getComapredUniversities.fulfilled, (state:any, action:any) => {
        state.compares = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(getComapredUniversities.rejected, (state:any, action:any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(searchUniversities.pending, (state:any, action:any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(searchUniversities.fulfilled, (state:any, action:any) => {
        state.searchUniversitiesData = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(searchUniversities.rejected, (state:any, action:any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })
      .addCase(searchUniversitiesWithYour.pending, (state:any, action:any) => {
        // state.isLoading = true;
        // state.hasError = false;
      })
      .addCase(searchUniversitiesWithYour.fulfilled, (state:any, action:any) => {
        state.searchUniversitieWithYoursData = action.payload;
        //   state.isLoading = false;
        //   state.hasError = false
      })
      .addCase(searchUniversitiesWithYour.rejected, (state:any, action:any) => {
        //   state.hasError = true
        //   state.isLoading = false;
      })

  },
});

export const { addUniversity, editUniversity } = universitySlice.actions;

export default universitySlice.reducer;
