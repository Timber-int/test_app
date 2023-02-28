import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {CONSTANTS} from "../../constants";
import {genderCategoryService} from "../../service";
import {IGenderCategoryResponse} from "../../interfaces";

export const getAllGenderCategory = createAsyncThunk(
    'categorySlice/getAllGenderCategory',
    async (id: number, {dispatch, rejectWithValue}) => {
        try {
            const data = await genderCategoryService.getAllGenderCategory(id);

            return {genderCategory: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type GenderCategoryInitialState = {
    genderCategory: IGenderCategoryResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: GenderCategoryInitialState = {
    genderCategory: [],
    status: null,
    serverErrors: null,
}

export const genderCategorySlice = createSlice({
    name: 'genderCategorySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllGenderCategory.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllGenderCategory.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.genderCategory = action.payload.genderCategory.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllGenderCategory.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const genderCategoryReducer = genderCategorySlice.reducer;
const {} = genderCategorySlice.actions;
export const genderCategoryActions = {};
export default genderCategoryReducer;
