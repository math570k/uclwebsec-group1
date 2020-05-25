import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000";

class UserService {
  getUserList() {
    return axios
      .get(API_URL + "/api/users", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  getUserFriends() {
    return axios
      .get(API_URL + "/api/users/friends", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  removeUserFriend(id) {
    return axios
      .delete(API_URL + "/api/users/friends/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  addUserFriend(id) {
    return axios
      .post(API_URL + "/api/users/friends/" + id, {}, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new UserService();
