
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import genderReducer from "./slices/genderSlice";
import genderCategoryReducer from "./slices/genderCategorySlice";

const rootReducer = combineReducers({
    genderReducer,
    categoryReducer,
    genderCategoryReducer,
});

export const setupStore = () => configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
