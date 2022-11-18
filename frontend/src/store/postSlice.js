import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {postService} from "../services";
import {CONSTANTS} from "../constants";

export const getAllPosts = createAsyncThunk(
    'postSlice/getAllPosts',
    async (_, {dispatch, rejectWithValue}) => {
        try {
            const data = await postService.getAllPosts();

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const deletePostById = createAsyncThunk(
    'postSlice/deletePostById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await postService.deletePostById(id);

            dispatch(deleteSinglePostById({data}));

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const changePostViewsById = createAsyncThunk(
    'postSlice/changePostViewsById',
    async ({id}, {dispatch, rejectWithValue}) => {
        try {
            const data = await postService.changePostViewsById(id);

            dispatch(postActions.updateSinglePostById({data}));

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

export const createPost = createAsyncThunk(
    'postSlice/createPost',
    async ({postData}, {dispatch, rejectWithValue}) => {
        try {

            const {title, text, photo, userId} = postData;

            let formData = new FormData();

            formData.append('title', title);
            formData.append('text', text);
            formData.append('photo', photo[0]);
            formData.append('userId', userId);

            const data = await postService.createPost(formData);

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);
export const updatePostById = createAsyncThunk(
    'postSlice/updatePostById',
    async ({postId, postData}, {dispatch, rejectWithValue}) => {
        try {
            const {title, text, photo, userId, uniqueTitle} = postData;

            let formData = new FormData();

            if (title !== uniqueTitle) {
                formData.append('title', title);
            }

            formData.append('text', text);
            if (typeof photo === 'string') {
                formData.append('photo', photo);
            } else {
                formData.append('photo', photo[0]);
            }
            formData.append('userId', userId);

            const data = await postService.updatePostById(postId, formData);

            dispatch(postActions.updateSinglePostById({data}));

            return {data};
        } catch (e) {
            return rejectWithValue(e.response.data.message);
        }
    }
);

const postSlice = createSlice({
    name: 'postSlice',
    initialState: {
        posts: [],
        visible: false,
        postDataToUpdate: null,
        serverErrors: null,
        status: null,
        text: '',
    },
    reducers: {
        deleteSinglePostById: (state, action) => {
            const id = action.payload.data.post.id;

            state.posts = state.posts.filter(post => post.id !== id);
        },
        setPostDataToUpdate: (state, action) => {
            state.postDataToUpdate = action.payload.postData;
        },

        updateSinglePostById: (state, action) => {
            const updatedPost = action.payload.data.post;
            const {id} = updatedPost;
            state.posts = state.posts.map(post => post.id === id ? {...updatedPost} : post);
            state.postDataToUpdate = null;
        },

        setShowWindow: (state, action) => {
            state.visible = !state.visible;
            state.text = action.payload.text;
        }
    },
    extraReducers: {
        [getAllPosts.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [getAllPosts.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.posts = action.payload.data.posts;
            state.serverErrors = null;
        },
        [getAllPosts.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [deletePostById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [deletePostById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [deletePostById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [createPost.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [createPost.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.posts.push(action.payload.data.post);
            state.serverErrors = null;
        },
        [createPost.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [updatePostById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [updatePostById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [updatePostById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
        [changePostViewsById.pending]: (state, action) => {
            state.status = CONSTANTS.LOADING;
            state.serverErrors = null;
        },
        [changePostViewsById.fulfilled]: (state, action) => {
            state.status = CONSTANTS.RESOLVED;
            state.serverErrors = null;
        },
        [changePostViewsById.rejected]: (state, action) => {
            state.status = CONSTANTS.REJECTED;
            state.serverErrors = action.payload;
        },
    },
});

const postReducer = postSlice.reducer;

const {deleteSinglePostById, setPostDataToUpdate, updateSinglePostById, setShowWindow} = postSlice.actions;

export const postActions = {deleteSinglePostById, setPostDataToUpdate, updateSinglePostById, setShowWindow};

export default postReducer;
