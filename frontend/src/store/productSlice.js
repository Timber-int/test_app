import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {productService} from "../services";
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

export const updateProductById = createAsyncThunk(
    'productSlice/updateProductById',
    async ({productData}, {dispatch, rejectWithValue}) => {
        try {
            const {width, weight, name, imageUrl, height, id, count} = productData;

            const dataToUpdate = {width, weight, name, imageUrl, height, id, count};

            const data = await productService.updateProduct(productData.id, dataToUpdate);

            dispatch(productActions.updateSingleProduct(data));

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteProductById = createAsyncThunk(
    'productSlice/deleteProductById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {

            const data = await productService.deleteProduct(id);

            dispatch(productActions.deleteSingleProduct(data));

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
        productDataToUpdate: {},
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
            state.products.push(createdProduct);
        },
        deleteSingleProduct: (state, action) => {
            const productFromDB = action.payload.productData;
            state.products = state.products.filter(product => product.id !== productFromDB.id);
        },
        setSingleProductToUpdate: (state, action) => {
            state.productDataToUpdate = action.payload.productDataToUpdate;
        },

        updateSingleProduct: (state, action) => {
            const productFromDB = action.payload.productData;
            state.products = state.products.map(product => product.id === productFromDB.id ? productFromDB : product);
            state.productDataToUpdate = {};
        },
        clearProductDataToUpdate:(state,action)=>{
            state.productDataToUpdate = {};
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
        [deleteProductById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteProductById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteProductById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [updateProductById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [updateProductById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [updateProductById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const productReducer = productSlice.reducer;

const {showWindow, createSingleProduct, deleteSingleProduct, setSingleProductToUpdate,updateSingleProduct,clearProductDataToUpdate} = productSlice.actions;

export const productActions = {showWindow, createSingleProduct, deleteSingleProduct, setSingleProductToUpdate,updateSingleProduct,clearProductDataToUpdate};

export default productReducer;
