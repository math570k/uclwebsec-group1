import React from "react";
import "./navbar.styles.css";
import { Link, withRouter } from "react-router-dom";
import { FaFileImage, FaSignOutAlt, FaUser } from "react-icons/fa";
import AuthService from "../../services/auth.service";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler() {
    AuthService.logout();
    this.props.history.push("/login");
  }

  render() {
    return (
      <div className="navbar">
        <div className="navbar__logo">
          <Link to="/">ImageShare</Link>
        </div>
        <div className="navbar__nav">
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link to="/yourimages" className="nav__link">
                  <FaFileImage /> Your Images
                </Link>
              </li>

              <li className="nav__item">
                <Link to="/friends" className="nav__link">
                  <FaUser /> Friends
                </Link>
              </li>

              <li className="nav__item">
                <button
                  onClick={this.logoutHandler}
                  href="#"
                  className="nav__link"
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default withRouter(NavBar);
