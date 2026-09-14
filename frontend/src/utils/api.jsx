import axios from "axios";

const BACKEND_BASE_URL = "https://elite-attire-backend.onrender.com/api/v1"; 
const api=axios.create({
    baseURL:BACKEND_BASE_URL,
    withCredentials:true,
      
});
export default api;