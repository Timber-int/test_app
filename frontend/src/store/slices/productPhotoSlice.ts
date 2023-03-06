import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProductPhotoResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {CONSTANTS} from "../../constants";
import {productPhotoService} from "../../service";

export const getAllProductPhotos = createAsyncThunk(
    'productPhotoSlice/getAllProductPhotos',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await productPhotoService.getAllProductPhotos();

            return {productPhotos: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type ProductPhotoInitialState = {
    productPhotos: IProductPhotoResponse[],
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: ProductPhotoInitialState = {
    productPhotos: [],
    status: null,
    serverErrors: null,
}

export const productPhotoSlice = createSlice({
    name: 'productPhotoSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllProductPhotos.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProductPhotos.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                if (action.payload) {
                    state.productPhotos = action.payload.productPhotos.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getAllProductPhotos.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const productPhotoReducer = productPhotoSlice.reducer;
const {} = productPhotoSlice.actions;
export const productPhotoActions = {};
export default productPhotoReducer;
