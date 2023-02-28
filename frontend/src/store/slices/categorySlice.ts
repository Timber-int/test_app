import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ICategoryResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {categoryService} from "../../service";
import { CONSTANTS } from "../../constants";

export const getAllCategory = createAsyncThunk(
    'categorySlice/getAllCategory',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await categoryService.getAllCategory();
            console.log(data)
            return {category: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type CategoryInitialState = {
    category: ICategoryResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: CategoryInitialState = {
    category: [],
    status: null,
    serverErrors: null,
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllCategory.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllCategory.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.category = action.payload.category.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllCategory.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const categoryReducer = categorySlice.reducer;
const {} = categorySlice.actions;
export const categoryActions = {};
export default categoryReducer;
