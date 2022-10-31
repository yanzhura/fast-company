import { createAction, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import commentService from '../services/comment.service';

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            const sorted = action.payload.sort((a, b) => {
                return parseInt(b.createdAt) - parseInt(a.createdAt);
            });
            state.entities = sorted;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreated: (state, action) => {
            state.entities.push(action.payload);
            const sorted = state.entities.sort((a, b) => {
                return parseInt(b.createdAt) - parseInt(a.createdAt);
            });
            state.entities = sorted;
        },
        commentRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (c) => c._id !== action.payload
            );
        }
    }
});

const { actions, reducer: commentsReducer } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreated,
    commentRemoved
} = actions;

const commentCreateRequested = createAction('users/commentCreateRequested');
const commentCreateFailed = createAction('users/commentCreateFailed');
const commentRemoveRequested = createAction('users/commentRemoveRequested');
const commentRemoveFailed = createAction('users/commentRemoveFailed');

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.get(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

const newComment = ({ content, pageId, userId }) => {
    const comment = {
        _id: nanoid(),
        content,
        pageId,
        userId,
        createdAt: Date.now()
    };
    return comment;
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentCreateRequested());
    const comment = newComment(payload);
    try {
        const { content } = await commentService.create(comment);
        dispatch(commentCreated(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const removeComment = (payload) => async (dispatch) => {
    dispatch(commentRemoveRequested());
    try {
        const { content } = await commentService.remove(payload);
        if (content === null) {
            dispatch(commentRemoved(payload));
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
