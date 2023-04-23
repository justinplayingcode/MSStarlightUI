import axios from "axios";

const token = localStorage.getItem("accessToken");

const instance = axios.create({
    baseURL: "https://datn-benhvien.onrender.com",
    headers: {
        "Content-Type": "application/json",
        "Authorization": ""
    },
});

export const get = (url, options) => {
    return instance.get(url, options).catch(handleError);
};

export const post = (url, data, options) => {
    return instance.post(url, data, options).catch(handleError);
};

export const put = (url, data, options) => {
    return instance.put(url, data, options).catch(handleError);
};

export const remove = (url, options) => {
    return instance.delete(url, options).catch(handleError);
};

const handleError = async (error) => {
    const { status } = error.response;
    if (status === 300000) {
        // call API to refresh token and update it in local storage
        // then retry the original request
        // const newToken = await api.refreshToken();
        // localStorage.setItem("accessToken", newToken);
        // const originalRequest = error.config;
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return instance(originalRequest);
    }
    throw error;
};
