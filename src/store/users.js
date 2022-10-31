/* eslint-disable indent */
import authService from '../services/auth.service';
import {
    getAccessToken,
    getUserId,
    removeAuthData,
    setTokens
} from '../services/localStorage.service';
import userService from '../services/user.service';
import { randomInt } from '../utils/utils';
import customHistory from '../utils/customHistory';
import { generateAuthError } from '../utils/generateAuthError';

const initialState = getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const { createSlice, createAction } = require('@reduxjs/toolkit');

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
        userUpdated: (state, action) => {
            const newEntities = state.entities.filter(
                (user) => user._id !== action.payload._id
            );
            newEntities.push(action.payload);
            state.entities = newEntities;
        }
    }
});

const { actions, reducer: usersReducer } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut,
    authRequested,
    userUpdated
} = actions;

const userCreateRequested = createAction('users/userCreateRequested');
const userUpdateRequested = createAction('users/userUpdateRequested');
const userCreateFailed = createAction('users/userCreateFailed');
const userUpdateFailed = createAction('users/userUpdateFailed');

const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
    customHistory.push(`/users/${payload._id}`);
};

export const edit =
    ({ email, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.update({ email });
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(updateUser({ email, ...rest }));
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const signIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            customHistory.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userCreated(content));
        customHistory.push('/users');
    } catch (error) {
        dispatch(userCreateFailed(error.message));
    }
};

export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const logOut = () => (dispatch) => {
    removeAuthData();
    dispatch(userLoggedOut());
    customHistory.push('/');
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.fetchAll();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;

export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === userId);
    }
};

export const currentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
