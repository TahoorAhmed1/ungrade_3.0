import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    yourCourses: []
}

export const getYourCourses = createAsyncThunk(
    "professorCourseSlice/getYourCourses",
    async (data: any) => {
        try {
            let config = {
                method: "post",
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professorcourses/getWithIds`,
                headers: {},
                data: data
            };

            const response = await axios.request(config);
            console.log(response, 'response?.data?.data')
            if (response?.data?.data) {
                return response.data?.data; // Return the data here
            }
        } catch (error) {
            console.error(error);
        }
    });


export const professorCourseSlice = createSlice({
    name: 'professorCourseSlice',
    initialState,
    reducers: {
        professorCourseAdd: (state: any, action: any) => {

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professorcourses/create/`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: action.payload.data
            };

            axios.request(config)
                .then((response) => {
                    if (action.payload.callback) {
                        action.payload.callback()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        },
        professorCourseUpdate: (state: any, action: any) => {

            let config = {
                method: 'put',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}professorcourses/update/${action.payload.id}`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: action.payload.data
            };

            axios.request(config)
                .then((response) => {
                    if (action.payload.callback) {
                        action.payload.callback()
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }

    },



    extraReducers: (builder) => {
        builder
            .addCase(getYourCourses.pending, (state: any, action: any) => {
            })
            .addCase(getYourCourses.fulfilled, (state: any, action: any) => {
                // state.userProfile = action.payload;
                state.yourCourses = action.payload
            })
            .addCase(getYourCourses.rejected, (state: any, action: any) => {
            })
    }
})

export const { professorCourseAdd, professorCourseUpdate } = professorCourseSlice.actions

export default professorCourseSlice.reducer