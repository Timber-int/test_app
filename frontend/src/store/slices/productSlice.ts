import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProductResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {productService} from "../../service";
import {CONSTANTS} from "../../constants";

interface IGetAllProductData {
    genderCategoryId: number,
    categoryId?: number,
    page?: number,
    perPage?: number,
    title?: string,
}

export const getAllProducts = createAsyncThunk(
    'categorySlice/getAllProducts',
    async (payload: IGetAllProductData, {dispatch, rejectWithValue}) => {
        try {
            const data = await productService.getAllProducts(payload.genderCategoryId, payload.categoryId);
            return {productResponse: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type ProductInitialState = {
    products: IProductResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
    page: number,
    perPage: number,
    itemCount: number,
}

const initialState: ProductInitialState = {
    products: [],
    status: null,
    serverErrors: null,
    page: 1,
    perPage: 20,
    itemCount: 20,
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProducts.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.products = action.payload.productResponse.products.data;
                    state.page = action.payload.productResponse.products.page;
                    state.perPage = action.payload.productResponse.products.perPage;
                    state.itemCount = action.payload.productResponse.products.itemCount;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProducts.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const productReducer = productSlice.reducer;
const {} = productSlice.actions;
export const productActions = {};
export default productReducer;
