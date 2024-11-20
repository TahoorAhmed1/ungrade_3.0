import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import { errorHandle, getCookie } from '@/lib/utils';

const initialState = {
    department: []
}

export const getDepartment = createAsyncThunk(
    "DegreeSlice/getDegree",
    async (data) => {
        const token = getCookie('ungradeToken');

        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/department`,
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

export const DepartmentSlice = createSlice({
    name: 'DepartmentSlice',
    initialState,
    reducers: {
        addDepartment: (state, action) => {
            try {

                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/department`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': token

                    },
                    data: data
                };

                axios.request(config)
                    .then((response) => {
                        message.success("Department Added")
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
        updateDepartment: (state, action) => {
            try {

                let data = JSON.stringify(action.payload.data);
                const token = getCookie('ungradeToken');

                let config = {
                    method: 'patch',
                    maxBodyLength: Infinity,
                    url: `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/department/${action.payload.id}`,
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
            .addCase(getDepartment.pending, (state, action) => {
            })
            .addCase(getDepartment.fulfilled, (state, action) => {
                state.department = action.payload;
            })
            .addCase(getDepartment.rejected, (state, action) => {
            })
    }
})

export const { addDepartment, updateDepartment } = DepartmentSlice.actions

export default DepartmentSlice.reducer