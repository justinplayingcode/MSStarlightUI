import axios from "axios";
import { ApiStatusCode } from "model";

const apiClient = axios.create({
    // baseURL: "https://datn-benhvien.onrender.com",
    baseURL: "https://jsonplaceholder.typicode.com",
    headers: {
        "Content-Type": "application/json"
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
        (error) => Promise.reject(error)
    );

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(async (prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve((await apiClient(token)).request(prom.config));
        }
    });

    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // if (error.response.status === 401 && !originalRequest._retry) {
        if (error.response.statusCode === ApiStatusCode.TokenExpiredError && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const res = await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject, config: originalRequest });
                    });
                    return res;
                } catch (err) {
                    return await Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const refreshToken = localStorage.getItem('refreshToken');
            try {
                try {
                    const response = await apiClient.post('/refreshToken', { refreshToken });
                    const { accessToken } = response.data;
                    localStorage.setItem('token', accessToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    processQueue(null, accessToken);
                    return await apiClient(originalRequest);
                } catch (err_1) {
                    processQueue(err_1, null);
                    return await Promise.reject(err_1);
                }
            } finally {
                isRefreshing = false;
            }
        }
    
        return Promise.reject(error);
    }
);

export default apiClient;
