import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {productService} from "../services/productService";
import {CONSTANTS} from "../constants";

export const getAllProducts = createAsyncThunk(
    'productSlice/getAllProducts',
    async (_, {rejectWithValue}) => {
        try {

            const data = await productService.getAllProducts();

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createProduct = createAsyncThunk(
    'productSlice/createProduct',
    async ({productData}, {dispatch, rejectWithValue}) => {
        try {

            const data = await productService.createProduct(productData);

            dispatch(productActions.createSingleProduct(data));

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const productSlice = createSlice({
    name: 'productSlice',
    initialState: {
        products: [],
        serverErrors: null,
        status: null,
        showWindow: false,
    },
    reducers: {
        showWindow: (state, action) => {
            state.showWindow = !state.showWindow;
        },
        createSingleProduct: (state, action) => {
            const createdProduct = action.payload.productData;
            console.log(createdProduct)
            state.products.push(createdProduct);
        }
    },
    extraReducers: {
        [getAllProducts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.products = action.payload.productsData;
            state.serverErrors = null;
        },
        [getAllProducts.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createProduct.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createProduct.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createProduct.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const productReducer = productSlice.reducer;

const {showWindow, createSingleProduct} = productSlice.actions;

export const productActions = {showWindow, createSingleProduct};

export default productReducer;
