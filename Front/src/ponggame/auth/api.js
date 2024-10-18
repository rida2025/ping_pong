import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.11.10.15:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.warn('No access token found in local storage');
            throw new Error('No access token');
        }
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Unauthorized access');
            throw new Error('Unauthorized');
        }
        return Promise.reject(error);
    }
);

export default api;