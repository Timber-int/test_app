import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import categoryReducer from "./categorySlice";
import dishesReducer from "./dishSlice";

const store = configureStore({
    reducer: {
        authReducer,
        userReducer,
        categoryReducer,
        dishesReducer,
    }
});
export default store;
