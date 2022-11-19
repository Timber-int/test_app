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
export const deleteCommentById = createAsyncThunk(
    'postSlice/deleteCommentById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await commentService.deleteCommentById(id);

            dispatch(commentActions.deleteSingleComment({data}));

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
        },
        deleteSingleComment: (state, action) => {
            state.comments = state.comments.filter(comment => comment.id !== action.payload.data.comment.id);
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
        [deleteCommentById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deleteCommentById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deleteCommentById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const commentReducer = commentSlice.reducer;

const {createSingleComment, deleteSingleComment} = commentSlice.actions;

export const commentActions = {createSingleComment, deleteSingleComment};

export default commentReducer;
