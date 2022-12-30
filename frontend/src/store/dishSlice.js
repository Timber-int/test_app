import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CONSTANTS} from "../constants";
import {dishService} from "../services";

export const getAllDishes = createAsyncThunk(
    'dishSlice/getAllDishes',
    async ({categoryId, page, perPage, name}, {dispatch, rejectWithValue}) => {
        try {

            const data = await dishService.getAllDishes(categoryId, page, perPage, name);

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
)

const dishSlice = createSlice({
    name: 'dishSlice',
    initialState: {
        dishes: [],
        serverErrors: null,
        status: null,
        page: null,
        perPage: null,
        itemCount: null,
        chosenDish: null,
        visible: false,
        searchData: '',

    },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload.pageNumber;
        },
        setShowWindow: (state, action) => {
            state.visible = !state.visible;
            state.chosenDish = action.payload.chosenDish;
        },
        setSearchData: (state, action) => {
            state.searchData = action.payload.searchData;
            state.page = 1;
        },
        clearSearchData: (state, action) => {
            state.searchData = '';
        },

    },
    extraReducers: {
        [getAllDishes.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllDishes.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.dishes = action.payload.data.dishes.data;
            state.page = action.payload.data.dishes.page;
            state.perPage = action.payload.data.dishes.perPage;
            state.itemCount = action.payload.data.dishes.itemCount;
            state.serverErrors = null;
        },
        [getAllDishes.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    }
});

const dishesReducer = dishSlice.reducer;

const {setPage, setShowWindow, setSearchData, clearSearchData} = dishSlice.actions;

export const dishesActions = {setPage, setShowWindow, setSearchData, clearSearchData};

export default dishesReducer;
