import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import { errorHandle, getCookie } from '@/lib/utils';

const initialState = {
    concentration: []
}

export const getConcentration = createAsyncThunk(
    "todo/getConcentration",
    async (data) => {
        const token = getCookie('ungradeToken');

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/concentration`,
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

export const ConcentrationSlice = createSlice({
    name: 'ConcentrationSlice',
    initialState,
    reducers: {
        addConcentration: (state, action) => {
            try {
                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/concentration`,
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
        updateConcentration: (state, action) => {
            try {

                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/concentration/${action.payload.id}`,
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConcentration.pending, (state, action) => {
            })
            .addCase(getConcentration.fulfilled, (state, action) => {
                state.concentration = action.payload;
            })
            .addCase(getConcentration.rejected, (state, action) => {
            })
    }
})

export const { addConcentration,updateConcentration } = ConcentrationSlice.actions

export default ConcentrationSlice.reducer