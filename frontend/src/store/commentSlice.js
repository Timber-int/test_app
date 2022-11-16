import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {commentService} from "../services";
import {CONSTANTS} from "../constants";

export const getAllComments = createAsyncThunk(
    'postSlice/getAllComments',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await commentService.getAllComments();

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createComment = createAsyncThunk(
    'postSlice/createComment',
    async ({commentData}, {dispatch, rejectWithValue}) => {
        try {
            const data = await commentService.createComment(commentData);

            dispatch(commentActions.createSingleComment({data}));

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comments: [],
        serverErrors: null,
        status: null,
    },
    reducers: {
        createSingleComment: (state, action) => {
            state.comments.push(action.payload.data.comment);
        }
    },
    extraReducers: {
        [getAllComments.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllComments.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.comments = action.payload.data.comments;
            state.serverErrors = null;
        },
        [getAllComments.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createComment.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createComment.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [createComment.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const commentReducer = commentSlice.reducer;

const {createSingleComment} = commentSlice.actions;

export const commentActions = {createSingleComment};

export default commentReducer;
