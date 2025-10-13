import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
})

apiClient.interceptors.request.use((config)=>{
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
})

export default apiClient;