import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configFile from '../config.json';
import authService from './auth.service';
import localStorageService from './localStorage.service';

const http = axios.create({
    baseURL: configFile.apiBaseURL
});

http.interceptors.request.use(
    async (config) => {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json';
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await authService.refresh();
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = {
                    ...config.params,
                    auth: accessToken
                };
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const transformData = (data) => {
    return data && !data._id
        ? Object.keys(data).map((key) => ({ ...data[key] }))
        : data;
};

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
    (error) => {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedErrors) {
            console.log('Unexpected error >>> ', error);
            toast.error('Unexpected error');
        } else {
            return Promise.reject(error);
        }
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
