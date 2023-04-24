import apiClient from "../config/axios"

const authApi = {
    login: () => {
        return apiClient.get('/userss');
    }
}

export default authApi;