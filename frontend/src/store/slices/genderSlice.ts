import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IGenderResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {CONSTANTS} from "../../constants";
import {genderService} from "../../service";

export const getAllGenders = createAsyncThunk(
    'genderSlice/getAllGenders',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await genderService.getAllGenders();

            return {genders: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type GenderInitialState = {
    genders: IGenderResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: GenderInitialState = {
    genders: [],
    status: null,
    serverErrors: null,
}

export const genderSlice = createSlice({
    name: 'genderSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllGenders.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllGenders.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.genders = action.payload.genders.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllGenders.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const genderReducer = genderSlice.reducer;
const {} = genderSlice.actions;
export const genderActions = {};
export default genderReducer;
