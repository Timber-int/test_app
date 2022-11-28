import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        authReducer,
        postReducer,
        commentReducer,
        userReducer,
    }
});
export default store;
