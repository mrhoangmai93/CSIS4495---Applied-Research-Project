import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/auth.action";
import "./index.scss";
import Logo from "../Logo";

const Header = ({ auth, logout }) => {
  const isAuthenticated = auth.get("isAuthenticated");
  const loading = auth.get("loading");

  const authLink = (
    <ul className="nav pull-xs-right">
      <li className="nav-item">
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLink = (
    <ul className="nav pull-xs-right">
      <li className="nav-item">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Sign in
        </Link>
      </li>

      <li className="nav-item">
        <Link to="/register" className="nav-link">
          Sign up
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <Logo theme="black" />
        </Link>

        {!loading && (
          <Fragment>{isAuthenticated ? authLink : guestLink}</Fragment>
        )}
      </div>
    </nav>
  );
};
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
