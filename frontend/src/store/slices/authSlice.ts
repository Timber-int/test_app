import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios, {AxiosError} from "axios";
import {CONSTANTS, TokenType, UserRole} from "../../constants";
import {
    IForgotPassword, IForgotPasswordSet,
    ILogin,
    IRegistration,
    IUser,
    IUserResponse,
    IUserResponseWithActionToken
} from "../../interfaces";
import {authService} from "../../service/authService";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const registration = createAsyncThunk(
    'authSlice/registration',
    async (registrationData: IRegistration, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.registration(registrationData);

            dispatch(authActions.userAuthorization({data}));

            return {data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

export const forgotPassword = createAsyncThunk(
    'authSlice/forgotPassword',
    async (forgotPasswordData: IForgotPassword, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.forgotPassword(forgotPasswordData);

            dispatch(authActions.setActionToken({data}));

            return {data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

export const forgotPasswordSet = createAsyncThunk(
    'authSlice/forgotPasswordSet',
    async (forgotPasswordSetData: IForgotPasswordSet, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.forgotPasswordSet(forgotPasswordSetData);

            dispatch(authActions.deleteActionToken());

            return {data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

export const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, {dispatch, rejectWithValue}) => {
        try {

            const data = await authService.logout();

            dispatch(authActions.userLogout());

            return {data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

export const login = createAsyncThunk(
    'authSlice/login',
    async (loginData: ILogin, {dispatch, rejectWithValue}) => {
        try {
            const data = await authService.login(loginData);

            dispatch(authActions.userAuthorization({data}));

            return {data};
        } catch (e) {
            if (axios.isAxiosError(e)) {
                return rejectWithValue(e.message);
            }
        }
    }
);

type AuthInitialState = {
    user: IUser | null,
    status: null | string,
    serverErrors: null | AxiosError | string,
}

const initialState: AuthInitialState = {
    user: cookies.get(UserRole.USER) ? cookies.get(UserRole.USER) : null,
    status: null,
    serverErrors: null,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userAuthorization: (state, action: PayloadAction<{ data: IUserResponse }>) => {
            cookies.set(TokenType.ACCESS_TOKEN, action.payload.data.accessToken);
            cookies.set(TokenType.REFRESH_TOKEN, action.payload.data.refreshToken);
            cookies.set(UserRole.USER, JSON.stringify(action.payload.data.user));
            state.user = action.payload.data.user as IUser;
        },
        setActionToken: (state, action: PayloadAction<{ data: IUserResponseWithActionToken }>) => {
            cookies.set(TokenType.ACTION_TOKEN, action.payload.data.actionToken);
            state.user = action.payload.data.user as IUser;
        },
        deleteActionToken: (state, action: PayloadAction<void>) => {
            cookies.remove(TokenType.ACTION_TOKEN);
        },
        userLogout: (state, action: PayloadAction<void>) => {
            cookies.remove(TokenType.ACCESS_TOKEN);
            cookies.remove(TokenType.REFRESH_TOKEN);
            cookies.remove(UserRole.USER);
            state.user = null;
        },
    },
    extraReducers: builder => {
        builder.addCase(registration.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(registration.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                state.serverErrors = null;
            }
        )
        builder.addCase(registration.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
        builder.addCase(login.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(login.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                state.serverErrors = null;
            }
        )
        builder.addCase(login.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
        builder.addCase(logout.pending, (state, action) => {
                state.status = CONSTANTS.LOADING;
                state.serverErrors = null;
            }
        )
        builder.addCase(logout.fulfilled, (state, action) => {
                state.status = CONSTANTS.RESOLVED;
                state.serverErrors = null;
            }
        )
        builder.addCase(logout.rejected, (state, action) => {
                state.status = CONSTANTS.REJECTED;
                state.serverErrors = action.payload as string;
            }
        )
    }
});

const authReducer = authSlice.reducer;
const {userAuthorization, userLogout, setActionToken, deleteActionToken} = authSlice.actions;
export const authActions = {userAuthorization, userLogout, setActionToken, deleteActionToken};
export default authReducer;
