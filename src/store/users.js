/* eslint-disable indent */
import authService from '../services/auth.service';
import {
    getAccessToken,
    getUserId,
    setTokens
} from '../services/localStorage.service';
import userService from '../services/user.service';
import { randomInt } from '../utils/utils';
import customHistory from '../utils/customHistory';

const initialState = getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { uerId: getUserId() },
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
    userCreated
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const userCreateFailed = createAction('users/userCreateFailed');

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
            dispatch(authRequestFailed(error.message));
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

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;

export default usersReducer;
