import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";

const store = configureStore({
    reducer: {
        authReducer,
        postReducer,
        commentReducer,
    }
});
export default store;
