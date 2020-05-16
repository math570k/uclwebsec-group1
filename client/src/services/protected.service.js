import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api";

class ProtectedService {
  getProtectedRoute() {
    return axios.get(API_URL + "/protected/test", { headers: authHeader() });
  }
}

export default new ProtectedService();
