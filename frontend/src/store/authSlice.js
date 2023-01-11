import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Cookies from 'universal-cookie';
import {authService} from "../services";
import {CONSTANTS, TokenType, UserRole} from "../constants";

const cookies = new Cookies();

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
        user: cookies.get(UserRole.USER) ? cookies.get(UserRole.USER) : null,
        serverErrors: null,
        status: null,
    },
    reducers: {
        userAuthorization: (state, action) => {
            cookies.set(TokenType.ACCESS_TOKEN, action.payload.data.accessToken, [{httpOnly: true}]);
            cookies.set(TokenType.REFRESH_TOKEN, action.payload.data.refreshToken, [{httpOnly: true}]);
            cookies.set(UserRole.USER, JSON.stringify(action.payload.data.user), [{httpOnly: true}]);
            state.user = action.payload.data.user;
        },
        userLogout: (state, action) => {
            cookies.remove(TokenType.ACCESS_TOKEN);
            cookies.remove(TokenType.REFRESH_TOKEN);
            cookies.remove(UserRole.USER);
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
