import {configureStore} from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
    reducer: {
        productReducer,
        commentReducer,
    }
});
export default store;
