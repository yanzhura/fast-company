import axios from 'axios';
import { getAccessToken, getRefreshToken } from './localStorage.service';

const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY
    }
});

const authService = {
    register: async ({ email, password }) => {
        const { data } = await httpAuth.post('accounts:signUp', {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post('accounts:signInWithPassword', {
            email,
            password,
            returnSecureToken: true
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: getRefreshToken()
        });
        return data;
    },
    update: async ({ email, ...rest }) => {
        const { data } = await httpAuth.post('accounts:update', {
            idToken: getAccessToken(),
            email,
            returnSecureToken: true
        });
        return data;
    }
};

export default authService;
