import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import { errorHandle, getCookie } from '@/lib/utils';

const initialState = {
    degrees: []
}

export const getDegree = createAsyncThunk(
    "DegreeSlice/getDegree",
    async (data) => {
        const token = getCookie('ungradeToken');

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/degree`,
                headers: {
                    'authorization': token
                },
            };

            const response = await axios.request(config);
            console.log(response.data?.data, 'degreeInfo')
            return response.data?.data;

        } catch (error) {
            console.error(error);
        }
    });

export const DegreeSlice = createSlice({
    name: 'DegreeSlice',
    initialState,
    reducers: {
        addDegree: (state, action) => {
            try {

                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/degree`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token

                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        message.success("Degree Added")
                        if (action.payload.callback) {
                            action.payload.callback()
                        }
                    })
                    .catch((error) => {
                        errorHandle(error.response.data)
                        console.log(error.response.data, 'sadasdasdas')
                        // let errorMsg = error?.response?.data?.error  || error?.response?.data?.message || 'Please Try Again12'
                        // message.error(errorMsg)
                        // state.loader = false

                    });
            } catch (err) { }
        },
        updateDegree: (state, action) => {
            try {

                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/degree/${action.payload.id}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token

                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        message.success("Degree updated")
                        if (action.payload.callback) {
                            action.payload.callback()
                        }
                    })
                    .catch((error) => {
                        errorHandle(error.response.data)


                    });
            } catch (err) { }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDegree.pending, (state, action) => {
            })
            .addCase(getDegree.fulfilled, (state, action) => {
                state.degrees = action.payload;
            })
            .addCase(getDegree.rejected, (state, action) => {
            })
    }
})

export const { addDegree, updateDegree } = DegreeSlice.actions

export default DegreeSlice.reducer