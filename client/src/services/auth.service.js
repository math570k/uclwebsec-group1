import axios from "axios";

const API_URL = "http://localhost:8000";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "/signin", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              user: response.data.user,
              token: response.data.token,
            })
          );
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(name, email, password) {
    return axios.post(API_URL + "/signup", { name, email, password });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  isAuthenticated() {
    if (!this.getCurrentUser()) return false;

    return true;
  }
}

export default new AuthService();
