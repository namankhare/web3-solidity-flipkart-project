import axios from "axios";

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "Content-type": "application/json",
        Accept: "application/json",
    },
});

//inerceptor
apiClient.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                let getRefreshToken = localStorage.getItem("refreshtoken");
                const { data } = await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`, { refreshToken: getRefreshToken },
                    {
                        withCredentials: true,
                        headers: {
                            "Content-type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                // console.log("df", data)
                localStorage.setItem("refreshtoken", data.refreshToken);
                localStorage.setItem('token', data.token);
                error.response.config.headers['Authorization'] = `Bearer ${data.token}`
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
                return apiClient.request(originalRequest);
            } catch (err) {
                console.log(err)
            }
        }
        throw error;
    }
);

export default apiClient;
