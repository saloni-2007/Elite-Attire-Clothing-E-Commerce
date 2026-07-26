import axios from "axios";

const BACKEND_BASE_URL="http://localhost:4000/api/v1";
  
const api=axios.create({
    baseURL:BACKEND_BASE_URL,
    withCredentials:true,
      
});
export default api;