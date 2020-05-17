import React from "react";
import { Link } from "react-router-dom";
import "./loginpage.styles.css";
import AuthService from "../../services/auth.service";


export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      success: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      success: false,
    });

    AuthService.login(this.state.email, this.state.password).then(
      (response) => {
        console.log(response);
        this.setState({
          message: response.message,
          success: true,
        });
        this.props.history.push("/");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
  }

  render() {
    return (
      <div className="loginpage">
        <form
          className="input_form"
          action="/login"
          method="POST"
          ref={(c) => {
            this.form = c;
          }}
          onSubmit={this.handleLogin}
        >
          <h1>Login</h1>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            autoComplete="off"
            value={this.state.email}
            onChange={this.onChangeEmail}
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChangePassword}
          />
          <div>
            <Link to="/register">Register</Link>
            <input type="submit" name="" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
