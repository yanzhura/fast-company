import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/quality.service';

const qualitiesSlice = createSlice({
    name: 'qualities',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        qualitiesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { actions, reducer: qualitiesReducer } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFailed } =
    actions;

const isOutdated = (date) => {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    } else {
        return false;
    }
};

export const loadQualitiesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().qualities;
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualityService.fetchAll();
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFailed(error.message));
        }
    }
};

export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
export const getQuality = (id) => (state) => {
    return state.qualities.entities.find((q) => q._id === id);
};

export default qualitiesReducer;
