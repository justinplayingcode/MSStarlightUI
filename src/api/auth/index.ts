import axios from "axios";

const authApi = {
    login: (reqbody) => {
        return axios.post('https://datn-benhvien.onrender.com/api/auth/login', reqbody);
    }
}

export default authApi;