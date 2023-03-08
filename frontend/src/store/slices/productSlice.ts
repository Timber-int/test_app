import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductBucket, IProductResponse, IProductSizeResponse, ISelectedProduct} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {productService} from "../../service";
import {CONSTANTS} from "../../constants";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
                title: payload.title,
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
    searchData: string,
    showModalWindow: boolean,
    selectedProducts: ISelectedProduct[],
    chosenProductSize: IProductSizeResponse | null,
    reviewedProducts: IProductResponse[],
    productsBucket: IProductBucket[],

}

const initialState: ProductInitialState = {
    products: [],
    status: null,
    serverErrors: null,
    page: 1,
    perPage: 20,
    itemCount: 20,
    searchData: '',
    chosenProductSize: null,
    showModalWindow: false,
    reviewedProducts: cookies.get(CONSTANTS.REVIEWED_PRODUCTS_KEY) as IProductResponse[]
        ? cookies.get(CONSTANTS.REVIEWED_PRODUCTS_KEY)
        : [],
    selectedProducts: cookies.get(CONSTANTS.SELECTED_PRODUCTS_KEY) as ISelectedProduct[]
        ? cookies.get(CONSTANTS.SELECTED_PRODUCTS_KEY)
        : [],
    productsBucket: []
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setShowModalWindow: (state, action: PayloadAction<void>) => {
            state.showModalWindow = !state.showModalWindow;
        },
        setChosenProductSize: (state, action: PayloadAction<{ chosenProductSize: IProductSizeResponse }>) => {
            state.chosenProductSize = action.payload.chosenProductSize;
        },
        setChosenProductSizeNull: (state, action: PayloadAction<void>) => {
            state.chosenProductSize = null;
        },
        setPage: (state, action: PayloadAction<{ pageNumber: number }>) => {
            state.page = action.payload.pageNumber;
        },
        setSearchData: (state, action: PayloadAction<{ searchData: string }>) => {
            state.searchData = action.payload.searchData;
        },
        setSearchDataEmpty: (state, action: PayloadAction<void>) => {
            state.searchData = '';
        },
        setProductDataToSelected: (state, action: PayloadAction<{ product: IProductResponse, userId: number }>) => {

            const selectedProduct = state.selectedProducts.find(selectedProduct => selectedProduct.id === action.payload.product.id);

            if (selectedProduct) {
                state.selectedProducts = state.selectedProducts.filter(product => product.id !== selectedProduct.id);

                cookies.set(CONSTANTS.SELECTED_PRODUCTS_KEY, JSON.stringify([...state.selectedProducts]));
                return;
            }

            cookies.set(CONSTANTS.SELECTED_PRODUCTS_KEY, JSON.stringify([...state.selectedProducts, {
                ...action.payload.product,
                userId: action.payload.userId
            }]));

            state.selectedProducts = [...state.selectedProducts, {
                ...action.payload.product,
                userId: action.payload.userId,
            }];
        },

        setReviewedProducts: (state, action: PayloadAction<{ reviewedProduct: IProductResponse }>) => {

            const reviewedProductExist = state.reviewedProducts.find(reviewedProduct => reviewedProduct.id === action.payload.reviewedProduct.id);

            if (!reviewedProductExist) {
                cookies.set(CONSTANTS.REVIEWED_PRODUCTS_KEY, JSON.stringify([...state.reviewedProducts, {
                    ...action.payload.reviewedProduct,
                }]));

                state.reviewedProducts = [...state.reviewedProducts, {
                    ...action.payload.reviewedProduct,
                }];
            }
        },

        setProductToBucket: (state, action: PayloadAction<{ product: IProductBucket }>) => {

            const productExist = state.productsBucket.find(productElement =>
                productElement.id === action.payload.product.id
                &&
                productElement.size === action.payload.product.size
            );
            // Доробити


















            // if (productExist){
            //     state.productsBucket = state.productsBucket.map(productElement=>{...productElement,})
            // }

            state.productsBucket.push(action.payload.product);

        }
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
const {
    setPage,
    setSearchData,
    setSearchDataEmpty,
    setProductDataToSelected,
    setShowModalWindow,
    setChosenProductSize,
    setReviewedProducts,
    setChosenProductSizeNull,
} = productSlice.actions;
export const productActions = {
    setPage,
    setSearchData,
    setSearchDataEmpty,
    setProductDataToSelected,
    setShowModalWindow,
    setChosenProductSize,
    setReviewedProducts,
    setChosenProductSizeNull,
};
export default productReducer;
