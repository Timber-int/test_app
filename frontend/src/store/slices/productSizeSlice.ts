import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProductSizeResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {CONSTANTS} from "../../constants";
import {productSizeService} from "../../service";

export const getAllProductSizes = createAsyncThunk(
    'productSizeSlice/getAllProductSizes',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await productSizeService.getAllProductSizes();

            return {productSizes: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type ProductSizeInitialState = {
    productSizes: IProductSizeResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: ProductSizeInitialState = {
    productSizes: [],
    status: null,
    serverErrors: null,
}

export const productSizeSlice = createSlice({
    name: 'productSizeSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProductSizes.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProductSizes.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.productSizes = action.payload.productSizes.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProductSizes.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const productSizeReducer = productSizeSlice.reducer;
const {} = productSizeSlice.actions;
export const productSizeActions = {};
export default productSizeReducer;
