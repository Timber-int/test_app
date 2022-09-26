import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {commentService} from "../services";
import {CONSTANTS} from "../constants";

export const getAllComments = createAsyncThunk(
    'productSlice/getAllComments',
    async (_, {rejectWithValue}) => {
        try {

            const data = await commentService.getAllComments();

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createComment = createAsyncThunk(
    'productSlice/createComment',
    async ({commentData}, {dispatch, rejectWithValue}) => {
        try {

            const data = await commentService.createComment(commentData);

            dispatch(commentActions.createSingleComment(data));

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deleteCommentById = createAsyncThunk(
    'productSlice/deleteCommentById',
    async ({commentId}, {dispatch, rejectWithValue}) => {
        try {

            const data = await commentService.deleteComment(commentId);

            dispatch(commentActions.deleteSingleComment(data));

            return data;

        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState: {
        comments: [],
        status: null,
        serverErrors: null,
    },
    reducers: {
        createSingleComment: (state, action) => {
            const createdComment = action.payload.commentData;
            state.comments.push(createdComment);
        },

        deleteSingleComment: (state, action) => {
            const commentFromDB = action.payload.commentData;
            state.comments = state.comments.filter(comment => comment.id !== commentFromDB.id);
        }
    },
    extraReducers: {
        [getAllComments.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllComments.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.comments = action.payload.commentsData;
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
