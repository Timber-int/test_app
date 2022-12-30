import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CONSTANTS} from "../constants";
import {categoryService} from "../services";

export const getAllCategory = createAsyncThunk(
    'categorySlice/getAllCategory',
    async (_, {dispatch, rejectWithValue}) => {
        try {

            const data = await categoryService.getAllCategory();

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const categorySlice = createSlice({
    name: 'categorySlice',
    initialState: {
        category: [],
        serverErrors: null,
        status: null,
        theme: JSON.parse(localStorage.getItem(CONSTANTS.THEME)) || false,
    },
    reducers: {
        setTheme: (state, action) => {
            state.theme = !state.theme;
            localStorage.setItem(CONSTANTS.THEME, JSON.stringify(state.theme));
        },
    },
    extraReducers: {
        [getAllCategory.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllCategory.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.category = action.payload.data.category;
            state.serverErrors = null;
        },
        [getAllCategory.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const categoryReducer = categorySlice.reducer;

const {setTheme} = categorySlice.actions;

export const categoryActions = {setTheme};

export default categoryReducer;
