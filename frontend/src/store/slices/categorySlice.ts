import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICategoryResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {categoryService} from "../../service";
import {CONSTANTS} from "../../constants";

export const getAllCategory = createAsyncThunk(
    'categorySlice/getAllCategory',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await categoryService.getAllCategory();

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
    chosenCategory: ICategoryResponse | null,
    status: null | string,
    categoryId: null | number,
    serverErrors: null | AxiosError | string,
}

const initialState: CategoryInitialState = {
    category: [],
    chosenCategory: null,
    categoryId: null,
    status: null,
    serverErrors: null,
}

export const categorySlice = createSlice({
    name: 'categorySlice',
    initialState,
    reducers: {
        setChosenCategory: (state, action: PayloadAction<{ category: ICategoryResponse }>) => {
            state.chosenCategory = action.payload.category;
            state.categoryId = action.payload.category.id
        },
        setChosenCategoryNull: (state, action: PayloadAction<void>) => {
            state.chosenCategory = null;
            state.categoryId = null;
        }
    },
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
const {setChosenCategory, setChosenCategoryNull} = categorySlice.actions;
export const categoryActions = {setChosenCategory, setChosenCategoryNull};
export default categoryReducer;
