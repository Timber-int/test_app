import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userService} from "../services";
import {CONSTANTS} from "../constants";

export const getUserById = createAsyncThunk(
    'userSlice/getUserById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await userService.getUserById(id);

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: undefined,
        serverErrors: null,
        status: null,
    },
    reducers: {

    },
    extraReducers: {
        [getUserById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getUserById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.user = action.payload.data.user;
            state.serverErrors = null;
        },
        [getUserById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const userReducer = userSlice.reducer;

const {} = userSlice.actions;

export const userActions = {};

export default userReducer;
