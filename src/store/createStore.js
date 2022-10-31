import { combineReducers, configureStore } from '@reduxjs/toolkit';
import commentsReducer from './comments';
import qualitiesReducer from './qualities';
import usersReducer from './users';

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    users: usersReducer,
    comments: commentsReducer
    // TODO professions: ProfessionsReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
