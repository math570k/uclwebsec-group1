import React from "react";
import { Link } from "react-router-dom";
import "./registerpage.styles.css";
import AuthService from "../../services/auth.service";

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      name: "",
      email: "",
      password: "",
      success: false,
      message: "",
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
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

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      success: false,
    });

    AuthService.register(
      this.state.name,
      this.state.email,
      this.state.password
    ).then(
      (response) => {
        console.log(response);
        this.setState({
          message: response.data.message,
          success: true,
        });
        alert(this.state.message);
        this.props.history.push("/login");
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
      <form
        className="input_form"
        ref={(c) => {
          this.form = c;
        }}
        onSubmit={this.handleRegister}
      >
        <h1>Register</h1>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Name"
          autoComplete="off"
          value={this.state.name}
          onChange={this.onChangeName}
        />
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
          <Link to="/login">Return</Link>
          <input type="submit" name="" value="Submit" />
        </div>
      </form>
    );
  }
}
