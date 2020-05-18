import React from "react";
import { Redirect } from "react-router-dom";
import "./homepage.styles.css";
import AuthService from "../../services/auth.service";
import ProtectedService from "../../services/protected.service";
import UserList from "../user-list/user-list.component.js";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      isLoaded: false,
      message: "",
    };
  }

  componentDidMount() {
    ProtectedService.getProtectedRoute().then((response) => {
      this.setState({
        isLoaded: true,
        message: response.data.message,
      });
    });
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
      <div>
        <h1>Hello {this.state.currentUser.user.username}</h1>
        {this.message()}
        <button onClick={this.logoutHandler}>Logout</button>
        <UserList />
      </div>
    ) : (
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
