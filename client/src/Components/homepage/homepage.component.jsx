import React from "react";
import { Redirect } from "react-router-dom";
import "./homepage.styles.css";
import AuthService from "../../services/auth.service";
import Feed from "../feed/feed.component";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      isLoaded: false,
    };
  }

  logoutHandler() {
    AuthService.logout();
    this.props.history.push("/login");
  }

  message() {
    if (this.state.isLoaded) {
      return <p>{this.state.message}</p>;
    }
  }

  render() {
    return AuthService.isAuthenticated() ? (
      <div className="homepage">
        <Feed />
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
