import React from "react";
import { Link } from "react-router-dom";
import "./fileupload.styles.css";
import AuthService from "../../services/auth.service";

export default class FileUpload extends React.Component {
  render() {
    return (
      <div class="image">
        <h3>Upload your image here!</h3>
        <input type="file" class="upload" />
      </div>
    );
  }
}
