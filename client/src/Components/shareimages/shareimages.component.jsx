import React from "react";
import { Link } from "react-router-dom";
import "./shareimages.styles.css";
import AuthService from "../../services/auth.service";

export default class ShareImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      success: false,
      message: "",
    };
  }

  render() {
    return (
      <div class="container">
        <div class="container-image">
          <img src="https://i.pinimg.com/originals/69/1d/d8/691dd87d4cfd7da641cd841370b85ef7.jpg" alt="CaT ViciOuSly EaTeN bY sHaRk"/>
        </div>
        <div class="container-info">
          <h1 class="title">Cat eaten by vicious shark!</h1>
          <p>Uploaded by: <span class="user">Jane</span></p>
          <p><span class="bold highlight">Image shared with following friends:</span></p>
          <p><span class="user">Joe</span> <span class="user">Paul</span> <span class="user">Logan</span></p>
        </div>
      </div>
    );
  }
}
