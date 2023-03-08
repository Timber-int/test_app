import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {IProductInformationResponse} from "../../interfaces";
import axios, {AxiosError} from "axios";
import {CONSTANTS} from "../../constants";
import {productInformationService} from "../../service";

export const getProductInformationByProductId = createAsyncThunk(
    'productInformationSlice/getProductInformationByProductId',
    async (productId: number, {dispatch, rejectWithValue}) => {
        try {
            const data = await productInformationService.getProductInformationByProductId(productId);

            return {productInformation: data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type ProductInformationInitialState = {
    productInformation: IProductInformationResponse | null,
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: ProductInformationInitialState = {
    productInformation: null,
    status: null,
    serverErrors: null,
}

export const productInformationSlice = createSlice({
    name: 'productInformationSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProductInformationByProductId.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(getProductInformationByProductId.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                // @ts-ignore
                if (action.payload && action.payload.productInformation.data !== null) {
                    state.productInformation = action.payload.productInformation.data;
                }
                state.serverErrors = null;
            }
        )
        builder.addCase(getProductInformationByProductId.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const productInformationReducer = productInformationSlice.reducer;
const {} = productInformationSlice.actions;
export const productInformationActions = {};
export default productInformationReducer;
