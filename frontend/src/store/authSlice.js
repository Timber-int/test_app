import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authService} from "../services";
import {CONSTANTS, TokenType} from "../constants";

export const registration = createAsyncThunk(
    'authSlice/registration',
    async ({registrationData}, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.registration(registrationData);

            dispatch(authActions.userAuthorization({data}));

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.logout();

            dispatch(authActions.userLogout());

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const login = createAsyncThunk(
    'authSlice/login',
    async ({loginData}, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.login(loginData);

            dispatch(authActions.userAuthorization({data}));

            return data;
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: localStorage.getItem(CONSTANTS.USER) ? JSON.parse(localStorage.getItem(CONSTANTS.USER)) : null,
        serverErrors: null,
        status: null,
    },
    reducers: {
        userAuthorization: (state, action) => {
            localStorage.setItem(TokenType.ACCESS, action.payload.data.accessToken);
            localStorage.setItem(TokenType.REFRESH, action.payload.data.refreshToken);
            localStorage.setItem(CONSTANTS.USER, JSON.stringify(action.payload.data.user));
            state.user = action.payload.data.user;
        },
        userLogout: (state, action) => {
            localStorage.removeItem(TokenType.ACCESS);
            localStorage.removeItem(TokenType.REFRESH);
            localStorage.removeItem(CONSTANTS.USER);
            state.user = null;
        },
    },
    extraReducers: {
        [registration.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [registration.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [registration.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [login.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [login.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [logout.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [logout.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [logout.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const authReducer = authSlice.reducer;

const {userAuthorization, userLogout} = authSlice.actions;

export const authActions = {userAuthorization, userLogout};

export default authReducer;
