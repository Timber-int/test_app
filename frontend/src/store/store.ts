
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import genderReducer from "./slices/genderSlice";
import genderCategoryReducer from "./slices/genderCategorySlice";
import productReducer from "./slices/productSlice";
import authReducer from "./slices/authSlice";
import productSizeReducer from "./slices/productSizeSlice";
import productPhotoReducer from "./slices/productPhotoSlice";
import productInformationReducer from "./slices/productInformationSlice";

const rootReducer = combineReducers({
    genderReducer,
    categoryReducer,
    genderCategoryReducer,
    productReducer,
    authReducer,
    productSizeReducer,
    productPhotoReducer,
    productInformationReducer
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
