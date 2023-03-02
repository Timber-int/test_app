import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {productService} from "../../service";
import {CONSTANTS} from "../../constants";

export interface IGetAllProductData {
    genderCategoryId?: number,
    categoryId?: number,
    genderId: number,
    page: number,
    perPage: number,
    title: string,
}

export const getAllProducts = createAsyncThunk(
    'categorySlice/getAllProducts',
    async (payload: IGetAllProductData, {dispatch, rejectWithValue}) => {
        try {
            const data = await productService.getAllProducts({
                genderId: payload.genderId,
                genderCategoryId: payload.genderCategoryId,
                categoryId: payload.categoryId,
                page: payload.page,
                perPage: payload.perPage,
                title:payload.title,
            });
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
    perPage: 1,
    itemCount: 20,
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<{ pageNumber: number }>) => {
            state.page = action.payload.pageNumber;
        },
    },
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
const {setPage} = productSlice.actions;
export const productActions = {setPage};
export default productReducer;
