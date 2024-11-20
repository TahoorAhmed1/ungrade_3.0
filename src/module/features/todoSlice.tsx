import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    todos: [{ id: 1, text: "hello world" }]
}

export const getProfile = createAsyncThunk(
    "completeProfileSlice/getProfile",
    async (data:any) => {
        try {
            // function here

        } catch (error) {
            console.error(error);
        }
    });

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state:any, action:any) => {
            // request
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state:any, action:any) => {
            })
            .addCase(getProfile.fulfilled, (state:any, action:any) => {
                state.userProfile = action.payload;
            })
            .addCase(getProfile.rejected, (state:any, action:any) => {
            })
    }
})

export const { addTodo } = todoSlice.actions

export default todoSlice.reducer