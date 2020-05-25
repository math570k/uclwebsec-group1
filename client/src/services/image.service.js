import axios from "axios";
import authHeader from "./auth-header";
const user = JSON.parse(localStorage.getItem("user"));

const API_URL = "http://localhost:8000";

class ImageService {
  getFeed() {
    return axios
      .get(API_URL + "/api/images/feed", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  getImage(id) {
    return axios
      .get(API_URL + "/api/images/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  uploadImage(formData) {
    let config = {
      headers: {
        "x-access-token": user.token,
        "content-type": "multipart/form-data",
      },
    };
    return axios
      .post(API_URL + "/api/images/upload", formData, config)
      .then((response) => {
        return alert("The file is successfully uploaded");
      })
      .catch((err) => {
        return err;
      });
  }
  userImages() {
    return axios
      .get(API_URL + "/api/images/user", { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  getImageSharedUsers(id) {
    return axios
      .get(API_URL + "/api/images/shared/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  getImageComments(id) {
    return axios
      .get(API_URL + "/api/comments/" + id, { headers: authHeader() })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  addComment(id, comment) {
    return axios
      .post(
        API_URL + "/api/comments/" + id,
        { comment },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
  saveSharedUsers(id, userIds) {
    return axios
      .post(
        API_URL + "/api/images/shared/" + id,
        { userIds },
        { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err;
      });
  }
}

export default new ImageService();
