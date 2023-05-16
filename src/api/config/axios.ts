import axios from "axios";
import { ApiStatusCode } from "model";

export const baseURL = 'https://datn-benhvien.onrender.com/api';

const apiClient = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "application/json"
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
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
          const updatedConfig = { ...prom.config };
          updatedConfig.headers.Authorization = `Bearer ${token}`;
          try {
            const res = await apiClient.request(updatedConfig);
              prom.resolve(res);
          } catch (error) {
            prom.reject(error);
          }
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => {
        if(response.data) {
            return response.data;
        }
        return response},
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === ApiStatusCode.Forbidden && error.response.data.message === 'TokenExpiredError' && !originalRequest._retry) {
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
            try {
                try {
                    const refreshToken = localStorage.getItem('refreshToken');
                    const username = localStorage.getItem('username');
                    const response = await apiClient.post('/auth/newtoken', { refreshToken, username });
                    localStorage.setItem('accessToken', response.data.accessToken);
                    apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    processQueue(null, response.data.accessToken);
                    return await apiClient(originalRequest);
                } catch (err_1) {
                    processQueue(err_1, null);
                    localStorage.clear();
                    window.location.pathname = "/login";
                    return await Promise.reject(err_1);
                }
            } finally {
                isRefreshing = false;
            }
        }
        if (error.response.data.message === 'No token provided!' && error.response.status === ApiStatusCode.Forbidden) {
          localStorage.clear();
          window.location.pathname = "/login";
        }
        return Promise.reject(error);
    }
);

export default apiClient;
